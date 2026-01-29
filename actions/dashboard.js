"use server"

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const generateAIInsights = async (industry) => {
    const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "HIGH" | "MEDIUM" | "LOW",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: 
          - Return ONLY the JSON. No additional text, notes, or markdown formatting.
          - demandLevel must be exactly one of: HIGH, MEDIUM, LOW (uppercase)
          - marketOutlook must be exactly one of: POSITIVE, NEUTRAL, NEGATIVE (uppercase)
          - Include at least 5 common roles for salary ranges.
          - Growth rate should be a percentage.
          - Include at least 5 skills and trends.
        `;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    const insights = JSON.parse(cleanedText);

    // Ensure enum values are uppercase
    insights.demandLevel = insights.demandLevel?.toUpperCase() || "MEDIUM";
    insights.marketOutlook = insights.marketOutlook?.toUpperCase() || "NEUTRAL";

    return insights;
}

export async function getIndustryInsights() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
        include: { industryInsight: true },
    });

    if (!user) throw new Error("User not found");

    // If user already has industry insight linked, return it
    if (user.industryInsight) {
        return user.industryInsight;
    }

    // Check if insight already exists for this industry in the database
    const existingInsight = await db.industryInsight.findUnique({
        where: { industry: user.industry },
    });

    if (existingInsight) {
        return existingInsight;
    }

    // If no insights exist, generate them
    const insights = await generateAIInsights(user.industry);

    const industryInsight = await db.industryInsight.create({
        data: {
            industry: user.industry,
            ...insights,
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });

    return industryInsight;
}