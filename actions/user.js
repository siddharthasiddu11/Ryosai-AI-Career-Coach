"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { demandLevel, marketOutlook } from "@prisma/client";

export async function updateUser(data) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const user = await db.user.findUnique({
        where: { clerkUserId: userId, },
    });

    if (!user) throw new Error("User not found");

    try {
        const result = await db.$transaction(
            async (tx) => {
                // find if industry exists
                const industryInsight = await tx.industryInsights.findUnique({
                    where: { industryId: data.industryId },
                });
                //If industry doesnt exists
                if (!industryInsight) {
                    const industryInsight = await tx.industryInsights.create({
                        data: {
                            industryId: data.industryId,
                            salaryRanges: [],
                            growthRtae: 0,
                            demandLevel: "Medium",
                            topSkills: [],
                            marketOutlook: "Neutral",
                            keyTrends: [],
                            recommendedSkills: [],
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
                        },
                    });
                }


                //update user
                const updatedUser = await tx.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        industry: data.industry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills,
                    },
                });

                return { updatedUser, industryInsight };
            }, {
            timeout: 10000,
        })
    } catch (error) {
        console.error("Error updating user and industry:", error.message);
        throw new Error("Failed to update profile");
    }
}

export async function getOnboardingData() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const user = await db.user.findUnique({
        where: { clerkUserId: userId, },
    });

    if (!user) throw new Error("User not found");

    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
            select: {
                industry: true,
            },
        });

        return {
            isOnboarded: !!user?.industry,
        };
    } catch (error) {
        console.error("Error checking onboarding status:", error);
        throw new Error("Failed to check onboarding status");
    }
}