<div align="center">

<img src="public/mainlogo.png" alt="RYOSAI Logo" width="280" />

# 🤖 RYOSAI — AI Career Coach

**Your Intelligent Career Companion for Professional Success**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3-F55036?style=for-the-badge)](https://groq.com/)
[![PostgreSQL](https://img.shields.io/badge/Neon-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql)](https://neon.tech/)

[🌐 Live Demo](https://ryosai.vercel.app/) · [🐛 Report Bug](https://github.com/siddharthasiddu11/Ryosai-AI-Career-Coach/issues) · [✨ Request Feature](https://github.com/siddharthasiddu11/Ryosai-AI-Career-Coach/issues)

</div>

---

## 📸 Screenshots

### 🏠 Landing Page
<img src="screenshots/landing-page.png" alt="RYOSAI Landing Page" width="100%" />

### 🔐 Onboarding
> Select your industry, skills, and experience to get personalized career insights.

<img src="screenshots/onboarding.png" alt="Onboarding - Complete Your Profile" width="100%" />

### 📊 Industry Insights Dashboard
> AI-powered market analysis with salary charts, growth trends, demand levels, and skill recommendations.

<img src="screenshots/dashboard.png" alt="Industry Insights Dashboard" width="100%" />

### 📝 AI Resume Builder — Form View
> Structured form with contact info, professional summary, skills, experience, education, and projects.

<img src="screenshots/resume-form.png" alt="Resume Builder - Form View" width="100%" />

### 📝 AI Resume Builder — Markdown Preview
> Live Markdown preview with AI-enhanced content and PDF export.

<img src="screenshots/resume-preview.png" alt="Resume Builder - Markdown Preview" width="100%" />

### 🎓 Interview Preparation
> Performance tracking with score analytics, trend charts, and AI improvement tips.

<img src="screenshots/interview-prep.png" alt="Interview Preparation" width="100%" />

### 🎯 Mock Interview
> AI-generated 10-question quizzes tailored to your industry and skills.

<img src="screenshots/mock-interview.png" alt="Mock Interview Start" width="100%" />
<img src="screenshots/quiz-question.png" alt="Quiz Question with MCQ Options" width="100%" />

---

## 🎯 What is RYOSAI?

RYOSAI is a full-stack **AI-powered career coaching platform** that helps professionals with:

- 📊 **Industry Insights Dashboard** — Real-time market analysis, salary data, growth trends, and skill recommendations powered by AI
- 📝 **AI Resume Builder** — Markdown editor with AI content improvement and one-click PDF export
- 🎓 **Mock Interview Prep** — AI-generated quizzes tailored to your industry with performance tracking
- 🔐 **Smart Onboarding** — Industry-specific personalization from day one

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 16, React 19, Tailwind CSS 4, Radix UI, Recharts, Lucide Icons |
| **Backend** | Next.js Server Actions, Prisma 6, Neon PostgreSQL |
| **AI** | Groq (LLaMA 3.3 70B) via OpenAI SDK |
| **Auth** | Clerk (Neobrutalism theme) |
| **Background Jobs** | Inngest (weekly cron for industry insight refresh) |
| **PDF Export** | html2pdf.js |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                       │
│  Landing · Dashboard · Resume Builder · Interview Prep   │
└──────────────────────┬───────────────────────────────────┘
                       │ Server Actions
                       ▼
┌──────────────────────────────────────────────────────────┐
│                 NEXT.JS SERVER (App Router)               │
│                                                          │
│  Server Actions ──→ Prisma ORM ──→ Neon PostgreSQL       │
│       │                                                  │
│       ├──→ Clerk (Auth & User Sync)                      │
│       ├──→ Groq API (LLaMA 3.3 70B)                     │
│       └──→ Inngest (Weekly Cron Jobs)                    │
└──────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Models

| Model | Description |
|---|---|
| **User** | Profile data, skills, industry, linked to Clerk |
| **Assessment** | Quiz scores, questions, AI improvement tips |
| **Resume** | Markdown content, ATS score, feedback |
| **CoverLetter** | Job-specific cover letters (draft/completed) |
| **IndustryInsight** | Salary ranges, growth rate, trends, skills — auto-refreshed weekly |

---

## 🚀 Getting Started

```bash
# Clone & install
git clone https://github.com/siddharthasiddu11/Ryosai-AI-Career-Coach.git
cd Ryosai-AI-Career-Coach
npm install

# Configure environment
cp .env.example .env
# Fill in your Clerk, Neon DB, and Groq API keys

# Set up database
npx prisma generate
npx prisma db push

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `GROQ_API_KEY` | Groq API key for LLaMA 3.3 |
| `INNGEST_DEV` | Set to `1` for local dev |

See [`.env.example`](.env.example) for the full template.

---

## 📁 Project Structure

```
├── app/
│   ├── (auth)/          # Sign in / Sign up pages
│   ├── (main)/
│   │   ├── dashboard/   # Industry insights dashboard
│   │   ├── interview/   # Interview prep + mock quizzes
│   │   ├── onboarding/  # Industry selection flow
│   │   └── resume/      # AI resume builder
│   ├── api/inngest/     # Background job webhook
│   └── page.jsx         # Landing page
├── actions/             # Server Actions (dashboard, interview, resume, user)
├── components/          # Shared components + shadcn/ui
├── lib/                 # Prisma client, Inngest, utilities
├── prisma/              # Database schema & migrations
└── data/                # Static content (FAQs, features, industries)
```

---

## ☁️ Deployment

Deployed on **Vercel**. The `postinstall` script auto-runs `prisma generate` during build.

1. Connect your GitHub repo to Vercel
2. Add all environment variables in Vercel Settings
3. Deploy — that's it!

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push & open a Pull Request

---

## 📄 License

Open source under the [MIT License](LICENSE).

---

<div align="center">

Made with 💗 by **Veldurthi Siddhartha**

[@siddharthasiddu11](https://github.com/siddharthasiddu11)

⭐ Star this repo if you found it helpful!

</div>
