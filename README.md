<div align="center">

# 🤖 RYOSAI — AI Career Coach

### Your Intelligent Career Companion for Professional Success

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.com/)
[![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3-F55036?style=for-the-badge)](https://groq.com/)
[![PostgreSQL](https://img.shields.io/badge/Neon-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql)](https://neon.tech/)

[Live Demo](#) · [Report Bug](https://github.com/siddharthasiddu11/Ryosai-AI-Career-Coach/issues) · [Request Feature](https://github.com/siddharthasiddu11/Ryosai-AI-Career-Coach/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Database Schema](#-database-schema)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🎯 Overview

**RYOSAI** is a full-stack AI-powered career coaching platform that provides personalized industry insights, AI-driven resume building, mock interview preparation with performance analytics, and real-time market intelligence — all powered by **LLaMA 3.3 70B** via Groq.

> *Advance your career with personalized guidance, interview prep, and AI-powered tools for job success.*

### What makes RYOSAI different?

| Feature | Description |
|---|---|
| 🧠 **AI-Powered Insights** | Real-time industry analysis with salary data, growth trends, and skill recommendations |
| 📝 **Smart Resume Builder** | Markdown-based resume editor with AI content improvement and PDF export |
| 🎯 **Mock Interviews** | Industry-specific quiz generation with performance tracking over time |
| 📊 **Analytics Dashboard** | Interactive charts for salary ranges, market outlook, and skill demand |
| ⏱️ **Background Jobs** | Automated weekly industry insight updates via Inngest cron jobs |

---

## ✨ Key Features

### 1. 🏭 Industry Insights Dashboard
- AI-generated market analysis for 50+ industries
- Interactive salary range bar charts (Recharts)
- Market outlook indicators (Positive/Neutral/Negative)
- Demand level tracking (High/Medium/Low)
- Key trends and recommended skills
- Auto-refresh via Inngest weekly cron jobs

### 2. 📝 AI Resume Builder
- Structured form with contact info, summary, skills, experience, education, and projects
- Real-time Markdown preview with `@uiw/react-md-editor`
- **AI-powered content improvement** — enhance your professional summary with one click
- Inline Markdown editing with live preview toggle
- **PDF export** via `html2pdf.js`
- Auto-save to database

### 3. 🎓 Interview Preparation
- AI-generated 10-question multiple-choice quizzes tailored to your industry and skills
- Real-time scoring with detailed explanations
- AI-generated improvement tips for wrong answers
- Performance tracking with historical charts
- Assessment history with expandable quiz results

### 4. 🔐 Authentication & Onboarding
- Clerk-powered authentication (Sign In / Sign Up)
- Neobrutalism themed auth UI
- Industry selection onboarding flow
- Automatic user profile creation on first sign-in
- Protected routes with auth guards

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework with App Router, Server Actions, SSR |
| **React 19** | UI library with Server & Client Components |
| **Tailwind CSS 4** | Utility-first styling |
| **Radix UI** | Accessible, unstyled component primitives |
| **Recharts** | Data visualization (salary charts, performance graphs) |
| **Lucide React** | Icon library |
| **@uiw/react-md-editor** | Markdown editor with preview |
| **html2pdf.js** | Client-side PDF generation |
| **Sonner** | Toast notifications |
| **next-themes** | Dark/Light mode theming |

### Backend
| Technology | Purpose |
|---|---|
| **Next.js Server Actions** | Server-side mutations (no REST/GraphQL needed) |
| **Prisma 6** | Type-safe ORM for PostgreSQL |
| **Neon PostgreSQL** | Serverless PostgreSQL database |
| **Clerk** | Authentication & user management |
| **Inngest** | Background job processing (cron-based insight updates) |

### AI / LLM
| Technology | Purpose |
|---|---|
| **Groq** | Ultra-fast LLM inference |
| **LLaMA 3.3 70B Versatile** | Industry analysis, quiz generation, resume improvement, feedback |
| **OpenAI SDK** | Client library (compatible with Groq's OpenAI-compatible API) |

### Validation
| Technology | Purpose |
|---|---|
| **Zod** | Schema validation for forms |
| **React Hook Form** | Form state management |
| **@hookform/resolvers** | Zod ↔ React Hook Form integration |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                        │
│  ┌───────────┐  ┌──────────┐  ┌───────────┐  ┌──────────────┐  │
│  │  Landing   │  │Dashboard │  │  Resume   │  │  Interview   │  │
│  │  Page      │  │  View    │  │  Builder  │  │  Prep + Quiz │  │
│  └─────┬─────┘  └────┬─────┘  └─────┬─────┘  └──────┬───────┘  │
│        │              │              │               │          │
│  ┌─────┴──────────────┴──────────────┴───────────────┴─────┐    │
│  │              React Hook Form + Zod Validation           │    │
│  └─────────────────────────────┬───────────────────────────┘    │
└────────────────────────────────┼────────────────────────────────┘
                                 │  Server Actions
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NEXT.JS SERVER (App Router)                │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   Server Actions Layer                    │   │
│  │  ┌────────────┐ ┌─────────────┐ ┌──────────┐ ┌────────┐ │   │
│  │  │ dashboard  │ │  interview  │ │  resume  │ │  user  │ │   │
│  │  │   .js      │ │    .js      │ │   .js    │ │  .js   │ │   │
│  │  └─────┬──────┘ └──────┬──────┘ └────┬─────┘ └───┬────┘ │   │
│  └────────┼───────────────┼─────────────┼───────────┼──────┘   │
│           │               │             │           │           │
│  ┌────────┴───────────────┴─────────────┴───────────┴──────┐   │
│  │                    Prisma ORM (v6)                        │   │
│  └──────────────────────────┬───────────────────────────────┘   │
│           │                 │                                   │
│  ┌────────┴────────┐  ┌────┴──────────────┐                    │
│  │   Clerk Auth    │  │   Groq LLM API    │                    │
│  │  (Middleware)   │  │  (LLaMA 3.3 70B)  │                    │
│  └─────────────────┘  └───────────────────┘                    │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Inngest (Background Jobs)                    │   │
│  │  ┌──────────────────────────────────────────────────┐    │   │
│  │  │  generateIndustryInsights — Cron: "0 0 * * 0"   │    │   │
│  │  │  (Weekly refresh of all industry insights)        │    │   │
│  │  └──────────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │   Neon PostgreSQL (DB)    │
                    │   ────────────────────    │
                    │   • User                 │
                    │   • Assessment           │
                    │   • Resume               │
                    │   • CoverLetter          │
                    │   • IndustryInsight       │
                    └──────────────────────────┘
```

---

## 🗄️ Database Schema

```mermaid
erDiagram
    User ||--o| Resume : has
    User ||--o{ Assessment : takes
    User ||--o{ CoverLetter : creates
    User }o--o| IndustryInsight : belongs_to

    User {
        string id PK
        string clerkUserId UK
        string email UK
        string name
        string imageUrl
        string industry FK
        string bio
        int experience
        string[] skills
        datetime createdAt
        datetime updatedAt
    }

    Assessment {
        string id PK
        string userId FK
        float quizScore
        json[] questions
        string category
        string improvementTip
        datetime createdAt
    }

    Resume {
        string id PK
        string userId FK_UK
        text content
        float atsScore
        string feedback
        datetime createdAt
        datetime updatedAt
    }

    CoverLetter {
        string id PK
        string userId FK
        string content
        string jobDescription
        string companyName
        string jobTitle
        string status
        datetime createdAt
    }

    IndustryInsight {
        string id PK
        string industry UK
        json[] salaryRanges
        float growthRate
        enum demandLevel
        string[] topSkills
        enum marketOutlook
        string[] keyTrends
        string[] recommendedSkills
        datetime lastUpdated
        datetime nextUpdate
    }
```

---

## 📁 Project Structure

```
sensai/
├── app/
│   ├── (auth)/                     # Auth route group
│   │   ├── sign-in/                # Clerk sign-in page
│   │   ├── sign-up/                # Clerk sign-up page
│   │   └── layout.js               # Auth layout (centered)
│   ├── (main)/                     # Main app route group
│   │   ├── dashboard/
│   │   │   ├── _components/
│   │   │   │   └── dashboard-view.jsx  # Industry insights dashboard
│   │   │   ├── layout.js
│   │   │   └── page.jsx            # SSR: fetches insights, redirects if not onboarded
│   │   ├── interview/
│   │   │   ├── _components/
│   │   │   │   ├── performance-chart.jsx
│   │   │   │   ├── quiz-list.jsx
│   │   │   │   ├── quiz-result.tsx
│   │   │   │   ├── quiz.jsx        # Interactive quiz component
│   │   │   │   └── stats-cards.jsx
│   │   │   ├── mock/
│   │   │   │   └── page.jsx        # Mock interview quiz page
│   │   │   ├── layout.js
│   │   │   └── page.jsx            # Interview prep dashboard
│   │   ├── onboarding/
│   │   │   ├── _components/
│   │   │   │   └── onboarding-form.jsx
│   │   │   └── page.jsx            # Industry selection onboarding
│   │   ├── resume/
│   │   │   ├── _components/
│   │   │   │   ├── entry-form.jsx  # Dynamic entry form (experience, education, projects)
│   │   │   │   └── resume-builder.jsx  # Full resume builder with MD editor
│   │   │   ├── layout.js
│   │   │   └── page.tsx            # Resume page (fetches saved resume)
│   │   └── layout.js               # Main layout with top padding
│   ├── api/
│   │   └── inngest/
│   │       └── route.js            # Inngest webhook handler
│   ├── lib/
│   │   ├── helper.js               # Markdown utility (entriesToMarkdown)
│   │   └── schema.js               # Zod validation schemas
│   ├── globals.css                 # Global styles + gradient animations
│   ├── layout.js                   # Root layout (Clerk, theme, header, footer)
│   └── page.jsx                    # Landing page (hero, features, FAQ, testimonials)
│
├── actions/                        # Next.js Server Actions
│   ├── dashboard.js                # generateAIInsights, getIndustryInsights
│   ├── interview.js                # generateQuiz, saveQuizResult, getAssessments
│   ├── resume.js                   # saveResume, getResume, improveWithAI
│   └── user.js                     # updateUser, getOnboardingData
│
├── components/
│   ├── header.jsx                  # Global nav bar (logo, links, Clerk UserButton)
│   ├── hero.jsx                    # Animated hero section with parallax
│   ├── theme-provider.jsx          # next-themes wrapper
│   └── ui/                         # shadcn/ui component library
│       ├── accordion.jsx
│       ├── alert-dialog.jsx
│       ├── badge.jsx
│       ├── button.jsx
│       ├── card.jsx
│       ├── dialog.jsx
│       ├── dropdown-menu.jsx
│       ├── input.jsx
│       ├── label.jsx
│       ├── progress.jsx
│       ├── radio-group.jsx
│       ├── select.jsx
│       ├── sonner.jsx
│       ├── tabs.jsx
│       └── textarea.jsx
│
├── data/                           # Static content data
│   ├── faqs.js                     # FAQ questions/answers
│   ├── feature.js                  # Feature cards data
│   ├── howItWorks.js               # "How it works" steps
│   ├── industries.js               # 50+ industry options
│   └── testimonials.js             # User testimonials
│
├── hooks/
│   └── use-fetch.js                # Custom hook for async server action calls
│
├── lib/
│   ├── checkUser.js                # Clerk → DB user sync utility
│   ├── inngest/
│   │   ├── client.js               # Inngest client initialization
│   │   └── functions.js            # Cron job: weekly industry insights refresh
│   ├── prisma.js                   # Prisma client singleton
│   ├── schema.js                   # Zod schemas (onboarding, contact info)
│   └── utils.js                    # cn() utility (clsx + tailwind-merge)
│
├── prisma/
│   ├── schema.prisma               # Database schema (5 models, 2 enums)
│   └── migrations/                 # Database migration history
│
├── public/
│   ├── banner.png                  # Hero banner image
│   └── mainlogo.png                # RYOSAI logo
│
├── types/
│   └── html2pdf.d.ts               # Type declarations for html2pdf.js
│
├── .env.example                    # Environment variable template
├── .gitignore
├── jsconfig.json                   # Path aliases (@/*)
├── next.config.mjs                 # Next.js configuration
├── package.json
├── postcss.config.mjs
└── tailwind.config.js
```

---

## 🔌 API Reference

RYOSAI uses **Next.js Server Actions** instead of traditional REST endpoints. All server actions are located in the `actions/` directory and are invoked directly from client components.

### Server Actions

#### 📊 Dashboard (`actions/dashboard.js`)

| Action | Description | Auth | Returns |
|---|---|---|---|
| `generateAIInsights(industry)` | Generates AI-powered industry analysis via Groq | No | `IndustryInsight` object |
| `getIndustryInsights()` | Fetches or generates insights for the current user's industry | ✅ | `IndustryInsight` |

#### 🎯 Interview (`actions/interview.js`)

| Action | Description | Auth | Returns |
|---|---|---|---|
| `generateQuiz()` | Generates 10 MCQ questions tailored to user's industry & skills | ✅ | `Question[]` |
| `saveQuizResult(questions, answers, score)` | Saves quiz results with AI-generated improvement tips | ✅ | `Assessment` |
| `getAssessments()` | Fetches all assessments for the current user | ✅ | `Assessment[]` |

#### 📝 Resume (`actions/resume.js`)

| Action | Description | Auth | Returns |
|---|---|---|---|
| `saveResume(content)` | Creates or updates the user's resume (upsert) | ✅ | `Resume` |
| `getResume()` | Fetches the current user's saved resume | ✅ | `Resume \| null` |
| `improveWithAI({ current, type })` | Enhances resume content using AI | ✅ | `string` (improved text) |

#### 👤 User (`actions/user.js`)

| Action | Description | Auth | Returns |
|---|---|---|---|
| `updateUser(data)` | Updates user profile and generates industry insights if new | ✅ | `{ success, updatedUser, industryInsight }` |
| `getOnboardingData()` | Checks if the user has completed onboarding | ✅ | `{ isOnboarded: boolean }` |

### Background Jobs (Inngest)

| Function | Trigger | Description |
|---|---|---|
| `generate-industry-insights` | Cron: `0 0 * * 0` (weekly, Sunday midnight) | Refreshes AI insights for all tracked industries |

### API Route

| Route | Method | Description |
|---|---|---|
| `/api/inngest` | `GET, POST, PUT` | Inngest webhook handler for serving background functions |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** or **yarn**
- **PostgreSQL** database (we recommend [Neon](https://neon.tech) for serverless)
- **Clerk** account for authentication
- **Groq** API key for LLM inference

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/siddharthasiddu11/Ryosai-AI-Career-Coach.git
cd Ryosai-AI-Career-Coach

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and fill in your values (see Environment Variables section)

# 4. Generate Prisma client
npx prisma generate

# 5. Run database migrations
npx prisma db push

# 6. Start the development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Running Inngest Dev Server (Optional)

To enable background job processing locally:

```bash
npx inngest-cli@latest dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory. See [`.env.example`](.env.example) for the template.

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ | Clerk publishable key (from Clerk dashboard) |
| `CLERK_SECRET_KEY` | ✅ | Clerk secret key |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | ✅ | Sign-in page route (`/sign-in`) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | ✅ | Sign-up page route (`/sign-up`) |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | ✅ | Redirect after sign-in (`/onboarding`) |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | ✅ | Redirect after sign-up (`/onboarding`) |
| `DATABASE_URL` | ✅ | PostgreSQL connection string (Neon recommended) |
| `GROQ_API_KEY` | ✅ | Groq API key for LLaMA 3.3 inference |
| `GEMINI_API_KEY` | ❌ | Google Gemini API key (legacy, optional fallback) |
| `INNGEST_DEV` | ❌ | Set to `1` for local Inngest development |

---

## ☁️ Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Vercel Configuration:
1. Connect your GitHub repository
2. Set all environment variables in Vercel Dashboard → Settings → Environment Variables
3. The `postinstall` script (`prisma generate`) runs automatically during build
4. Set up Inngest integration via [Vercel Marketplace](https://vercel.com/integrations/inngest)

### Build for Production

```bash
npm run build
npm start
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow the existing code structure and naming conventions
- Use Server Actions for all data mutations
- Validate all user input with Zod schemas
- Add error handling with user-friendly toast notifications
- Keep components in `_components/` directories within their route folders

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Veldurthi Siddhartha**

- GitHub: [@siddharthasiddu11](https://github.com/siddharthasiddu11)

---

<div align="center">

Made with 💗 by Veldurthi Siddhartha

⭐ Star this repo if you found it helpful!

</div>
