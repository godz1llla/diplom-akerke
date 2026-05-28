# CriticalMinds — Diploma Research Project

> **Developing Critical and Creative Thinking in High School Students through Digital Linguistic Tools and Online Learning Platforms**

A full-stack educational web platform built with **Next.js 14**, **Supabase**, and deployed on **Vercel**.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Open **SQL Editor** and run the contents of `supabase-schema.sql`
3. Copy your project URL and anon key from **Settings → API**

### 3. Configure environment variables

Open `.env.local` and fill in your values:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 4. Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Vercel

1. Push the project to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard (same as `.env.local`)
5. Click **Deploy** ✅

---

## 📁 Project Structure

```
diplom-akerka/
├── app/
│   ├── globals.css          # Global design system
│   ├── layout.jsx           # Root layout + metadata
│   └── page.jsx             # Main page (all sections)
├── components/
│   ├── Navbar.jsx            # Sticky responsive navbar
│   ├── HeroSection.jsx       # Hero with stats
│   ├── LearningProcess.jsx   # 8-step timeline
│   ├── QuizSection.jsx       # Interactive quiz with answers
│   ├── ErrorAnalysisSection.jsx # Error Journal
│   ├── ChallengeSection.jsx  # 2-Week challenge
│   ├── GallerySection.jsx    # Project gallery
│   ├── UploadSection.jsx     # Upload form → Supabase
│   ├── FeedbackSection.jsx   # Charts + testimonials
│   ├── ResultsSection.jsx    # Pre/Post-test results
│   ├── ReflectionSection.jsx # Final reflection → Supabase
│   └── Footer.jsx            # Footer
├── lib/
│   └── supabase.js           # Supabase client
├── supabase-schema.sql       # Database schema (run in Supabase)
├── vercel.json               # Vercel deployment config
└── package.json
```

---

## 🗄️ Database Tables (Supabase)

| Table | Purpose |
|-------|---------|
| `projects` | Student project uploads (title, type, Drive link, video) |
| `reflections` | Final reflection answers from students |
| `quiz_results` | Optional quiz score tracking |

---

## 📚 Site Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | Hero | Landing page with stats and CTA |
| 2 | Learning Process | 8-stage timeline model |
| 2b | Quiz | Interactive self-assessment quiz |
| 3 | Error Analysis | Google Docs journal system |
| 4 | 2-Week Challenge | TikTok & creative video tasks |
| 5 | Gallery | Student project showcase |
| 6 | Upload | Submit projects to Supabase |
| 7 | Feedback | Pre/post-test charts + testimonials |
| 8 | Results | Experimental vs control group data |
| 9 | Final Reflection | Metacognitive reflection form |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: CSS Modules + Custom Design System
- **Hosting**: Vercel
- **Font**: Outfit (Google Fonts)

---

## 👨‍🎓 About

This platform was created as a **diploma research project** exploring the effectiveness of digital linguistic tools in developing critical and creative thinking among high school students (Grades 10–11).
# diplom-akerke
