# SkillsPro Navigator 🚀

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.5.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Neon](https://img.shields.io/badge/Neon-Database-00E599?style=for-the-badge&logo=neon&logoColor=black)](https://neon.tech/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI--Power-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.dev/)
[![Inngest](https://img.shields.io/badge/Inngest-Workflows-FF4F00?style=for-the-badge&logo=inngest&logoColor=white)](https://www.inngest.com/)

> **Elevator Pitch:** SkillsPro Navigator is a next-generation, AI-powered career coaching platform designed to democratize professional guidance. By fusing Google Gemini AI with real-time market insights, automated quiz engines, and smart resume builders, it equips job seekers with tailormade tools to accelerate their careers, improve skills, ace interviews, and navigate the modern job market with confidence.

---

## 📌 Table of Contents
- [Project Overview](#-project-overview)
- [Problem Statement](#-problem-statement)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Usage Guide](#-usage-guide)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)
- [Learning Outcomes](#-learning-outcomes)
- [Author Information](#-author-information)

---

## 📖 Project Overview

**SkillsPro Navigator** is a production-grade, full-stack career development application built with Next.js (App Router). It caters to students, fresh graduates, and career-advancing professionals looking for tailored advice rather than generic resources.

The application leverages the **Google Gemini 2.5 Flash Lite** model to dynamically analyze user profiles (experience, skills, and industry) to generate personalized assessments, refine resume bullet points using metric-driven AI, and synthesize industry insights (salary benchmarks, demand levels, and trends).

The application features a beautifully polished UI built with Tailwind CSS and Radix UI components, configured with default dark mode, responsive grids, interactive Recharts graphs, and background jobs orchestrated by Inngest.

---

## ⚠️ Problem Statement

In the modern job market, individuals face significant hurdles in navigating their careers:
1. **Generic Career Advice:** Most platforms offer broad suggestions that fail to account for a user's specific skills, sub-industry context, and experience level.
2. **High-Friction Interview Prep:** Mock interviews are often either generic, outdated, or lack objective, actionable feedback.
3. **Suboptimal Resumes:** Job seekers struggle to write bullet points that emphasize impact, metrics, and achievements, leading to rejections from automated Applicant Tracking Systems (ATS).
4. **Information Asymmetry:** Up-to-date information on salary bands, growth rates, and required skills is scattered, making market research tedious.

---

## ✨ Key Features

### 🌟 1. AI-Powered Resume Builder
* **Dual-Mode Editing:** Seamlessly switch between structured forms (Form Mode) and direct Markdown editing (Markdown Mode) with a live split-screen preview.
* **✨ AI Description Improvement:** Enhance experience, education, or project descriptions using Google Gemini. The engine rewrites text using action verbs, quantifies achievements, highlights technical skills, and matches industry-standard keywords.
* **PDF Exporting:** Convert resumes into print-ready, A4-formatted PDFs (15mm margins, high contrast, clean typography) instantly using `html2pdf.js`.

### 🎓 2. AI-Powered Mock Interviews
* **Role-Tailored Quizzes:** Generates 10 custom multiple-choice questions tailored to the user's specific industry, sub-industry, and listed skills.
* **Instant Explanations & Feedback:** Choose answers using Radix RadioGroups, reveal detailed explanations on demand, and review results with visual correct/incorrect markers.
* **🤖 AI-Generated Improvement Tips:** On completion, the quiz engine assesses incorrect answers and generates an encouraging, 1-2 sentence target learning advice focused on the identified knowledge gaps.
* **Performance Dashboard:** Visualizes history and progress with line charts (quiz scores over time) and key metrics (average score, questions practiced, latest score).

### 📊 3. Industry Insights & Market Trends Dashboard
* **Dynamic Benchmarking:** View market outlook (positive, neutral, negative), growth rate, demand level, and top skills parsed in real-time.
* **Interactive Salary Charts:** View minimum, median, and maximum salaries across 5+ common roles using a custom-themed Recharts Bar Chart.
* **Weekly Automation:** An Inngest cron job runs weekly (`0 0 * * 0`) to automatically refresh industry insight data via Gemini, ensuring information never gets stale.

### 👤 4. Personalized Onboarding & Sync
* **Tailored Profiling:** Collects details about the user's industry (out of 15 major categories and 190+ sub-industries), years of experience, bio, and skills.
* **Automatic Database Synchronization:** Custom check-user middleware syncs authenticated Clerk users into the Postgres database automatically on their first visit, ensuring zero friction.

---

## 🏗️ System Architecture

The following diagram illustrates the data flow, services, and structural layout of SkillsPro Navigator:

```mermaid
graph TB
    subgraph "Frontend (Next.js 16 App Router)"
        A[Landing Page /] --> B[Clerk Auth /sign-in]
        B --> C[Onboarding /onboarding]
        C --> D[Dashboard /dashboard]
        D --> E[Interview Prep /interview]
        D --> F[Resume Builder /resume]
        E --> G[Mock Quiz /interview/mock]
    end

    subgraph "Backend Services (Server Actions)"
        H[actions/user.js]
        I[actions/dashboard.js]
        J[actions/interview.js]
        K[actions/resume.js]
    end

    subgraph "External Integrations & Infrastructure"
        L[Google Gemini 2.5 Flash Lite API]
        M[Clerk Authentication Provider]
        N[Neon Serverless PostgreSQL]
        O[Inngest Background Cron Workflow]
    end

    C --> H
    D --> I
    G --> J
    F --> K
    
    H & I & J & K --> L
    H & I & J & K --> N
    A --> M
    O --> I
```

### Key Architectural Patterns:
* **Prisma Transaction Scope:** During onboarding, a transaction ensures that the creation of custom industry insights and user profiles succeeds atomically.
* **Next.js Server Actions:** All API calls are replaced by React Server Actions, keeping the client code clean, type-safe, and secure.
* **Robust JSON Extraction:** Gemini responses are sanitised using regular expressions to strip out markdown fences and extract raw JSON securely, avoiding parsing failures.

---

## 🛠️ Tech Stack

* **Core Framework:** Next.js 16.2.4 (App Router)
* **Runtime/Language:** JavaScript (ES2022) / Node.js
* **Database & ORM:** Neon Serverless PostgreSQL & Prisma Client 6.5.0
* **Authentication:** Clerk Auth (`@clerk/nextjs` 6.12.0)
* **Artificial Intelligence:** Google Generative AI SDK (`@google/generative-ai` 0.24.0) with Gemini 2.5 Flash Lite
* **Styling & Styling Engine:** Tailwind CSS 3.4.1, `lucide-react` for iconography, `tailwindcss-animate` for micro-animations
* **Data Visualization:** Recharts 2.15.1 (Bar & Line charts)
* **Background Orchestration:** Inngest 3.32.8 (Cron jobs & asynchronous events)
* **Forms & Validation:** React Hook Form & Zod for client-side schemas
* **Markdown Integration:** `@uiw/react-md-editor` 4.0.5 for real-time resume building
* **PDF Utility:** `html2pdf.js` 0.10.3

---

## 📂 Project Structure

```
skillspro/
├── app/
│   ├── (auth)/                    # Public Clerk auth sign-in and sign-up pages
│   │   ├── sign-in/[[...sign-in]]/ 
│   │   └── sign-up/[[...sign-up]]/
│   ├── (main)/                    # Protected routes layout
│   │   ├── dashboard/                 # Industry Insights page
│   │   │   ├── _components/dashboard-view.jsx
│   │   │   └── page.jsx
│   │   ├── interview/                 # Mock interview dashboard and quiz
│   │   │   ├── _components/           # Performance charts, stats, and quiz elements
│   │   │   │   ├── performance-chart.jsx
│   │   │   │   ├── quiz.jsx
│   │   │   │   ├── quiz-list.jsx
│   │   │   │   ├── quiz-result.jsx
│   │   │   │   └── stats-cards.jsx
│   │   │   ├── mock/page.jsx          # Interactive quiz engine
│   │   │   └── page.jsx
│   │   ├── onboarding/                # Initial profile profiling form
│   │   │   ├── _components/onboarding-form.jsx
│   │   │   └── page.jsx
│   │   ├── resume/                    # Resume builder
│   │   │   ├── _components/           # Form entries & builder layout
│   │   │   │   ├── entry-form.jsx
│   │   │   │   └── resume-builder.jsx
│   │   │   └── page.jsx
│   │   └── layout.js
│   ├── api/inngest/               # Inngest endpoint handler
│   ├── globals.css
│   ├── layout.js                  # Global provider setups (Clerk + next-themes)
│   └── page.jsx                   # Landings and FAQ sections
├── actions/                       # Next.js Server Actions
│   ├── dashboard.js               # AI Insights & caching
│   ├── interview.js               # Quiz generation & scoring
│   ├── resume.js                  # Resume CRUD & AI helper
│   └── user.js                    # User profile & onboarding transactions
├── components/
│   ├── ui/                        # shadcn/ui shared components
│   ├── Header.jsx                 # Dynamic top navigation
│   ├── hero.jsx                   # Landing section hero
│   └── theme-provider.jsx
├── data/                          # FAQs, industries and mock data constants
├── hooks/
│   └── use-fetch.js               # Custom hook for request feedback loading state
├── lib/
│   ├── checkUser.js               # Clerk -> Postgres database sync helper
│   ├── helper.js                  # Markdown utility conversion
│   ├── inngest/                   # Inngest orchestration logic
│   │   ├── client.js
│   │   └── functions.js           # Weekly cron job handler
│   ├── prisma.js                  # Singleton client connection
│   └── utils.js
├── prisma/
│   └── schema.prisma              # Database schema definitions
├── middleware.js                   # Auth interception and route rules
├── package.json
└── tailwind.config.mjs
```

---

## ⚙️ Installation & Setup

Follow these steps to configure and run the project locally:

### 1. Prerequisites
Ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v18.0.0 or higher)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* A PostgreSQL database (e.g., [Neon DB](https://neon.tech/))

### 2. Clone the Repository
```bash
git clone https://github.com/unnatisachdeva/SkillsProNavigator.git
cd SkillsProNavigator
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory and specify the following variables:
```env
# Clerk Authentication Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Database Connection (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Google Gemini API
GEMINI_API_KEY=AIzaSy...
```

### 5. Setup the Database Schema
Sync the Prisma schema with your Neon PostgreSQL instance:
```bash
npx prisma db push
```

Generate the Prisma Client client-side bindings:
```bash
npx prisma generate
```

### 6. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 7. Run Inngest Dev Server (Optional for Local Background Jobs)
To test the weekly cron update or other Inngest functions locally:
```bash
npx inngest-cli@latest dev
```
Go to [http://localhost:8288](http://localhost:8288) to explore the Inngest local dashboard.

---

## 🧭 Usage Guide

1. **Sign Up & Auth:** Register using OAuth or password-based credentials on the landing page.
2. **Onboarding:** Input your industry, experience level, bio, and skills. On submission, the system runs an atomic transaction to load details and generates AI-powered industry insights for you.
3. **Explore Dashboard:** View the industry salary chart, growth rate, demand level, and current trends tailored to your sub-industry.
4. **Build Your Resume:** Fill in your details or write directly in Markdown. Use the **Improve with AI** button on work experience or project bullets to automatically optimize them for ATS matching. Download the clean template as a PDF.
5. **Practice Interviews:** Generate a quiz tailored to your skills. Answer the multiple-choice questions, check the explanations, and submit the quiz to review your results along with the targeted AI-generated improvement tip.

---

## 📸 Screenshots

Here is a visual walk-through of the SkillsPro Navigator interface:

### 🖥️ Dashboard & Salary Benchmarking
![Dashboard](./screenshots/dashboard.png)
*Displays industry growth, salary charts, demand levels, and key trends.*

### 📝 AI-Powered Resume Builder
![Resume Builder](./screenshots/resume_builder.png)
*Shows dual-mode editing (Form/Markdown) and the 'Improve with AI' button action.*

### 🎓 Interview Quiz Module
![Interview Prep](./screenshots/interview_quiz.png)
*Interactive mock interview interface showing question selection, timer, and visual results.*

---

## 🚀 Future Enhancements

These features are planned on the roadmap (scaffolding and schema definitions already prepared in Prisma):
* 🔴 **AI Cover Letter Generator:** Automatically generate customized cover letters matching specific job descriptions (Scaffolding exists in the database schema).
* 🔴 **ATS Resume Analyzer:** Score a user's resume against a pasted job description to provide a matching percentage and keyword recommendations.
* 🟡 **Behavioral Interview Practice:** Expand the interview module to generate behavioral scenario questions alongside technical ones.
* 🟡 **Multiple Resume Templates:** Add customizable templates with varying styles (Chronological, Functional, Creative) for export.
* 🟢 **Social Sharing & Mentorship Portal:** Allow users to share quiz badges on LinkedIn or request human mentor review on resume drafts.

---

## 💡 Learning Outcomes

Building SkillsPro Navigator provided deep insights into:
* **Next.js Server Actions & Caching:** Eliminating traditional API endpoints in favor of React Server Actions while using `revalidatePath` to keep client cache in sync.
* **Transactional Database Schemas:** Writing robust Prisma `$transaction` operations to handle cascading check-and-create operations atomically.
* **LLM Prompts and Parsing Constraints:** Formulating zero-shot and few-shot JSON structured prompts for Gemini, and handling syntax deviations with regex extractors.
* **Dynamic Cron Workflows:** Creating background cron jobs via Inngest to periodically update datasets without overloading client-side rendering.

---

## 👤 Author Information

* **Author:** Unnati Sachdeva
* **GitHub:** [@unnatisachdeva](https://github.com/unnatisachdeva)
* **Project Repository:** [SkillsProNavigator](https://github.com/unnatisachdeva/SkillsProNavigator)
* **LinkedIn:** [Unnati Sachdeva](https://www.linkedin.com/in/unnatisachdeva/)
