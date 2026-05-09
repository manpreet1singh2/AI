# 🚀 Aura AI — Social Media Automation SaaS Platform

> The next-generation AI marketing operating system. Generate, schedule, and publish viral content across every platform — automatically.

![Aura AI Dashboard](https://via.placeholder.com/1200x600/0a0a0f/6366f1?text=Aura+AI+Dashboard)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://typescriptlang.org)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-20-green)](https://nodejs.org)
[![Prisma](https://img.shields.io/badge/Prisma-5.15-purple)](https://prisma.io)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://docker.com)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Content Engine** | Generate captions, scripts, hooks with GPT-4o, Gemini, Claude |
| 🎨 **AI Image Generation** | DALL-E 3, Stable Diffusion, Flux — all styles & ratios |
| 🎬 **AI Video & Reels** | Generate cinematic reels, shorts, avatar videos |
| 📅 **Smart Scheduling** | AI-optimal timing, bulk schedule, auto-publish |
| 📊 **Deep Analytics** | Cross-platform insights with AI recommendations |
| ⚡ **Workflow Automation** | Drag-drop AI agent workflows with triggers |
| 🌐 **7 Platforms** | Instagram, YouTube, TikTok, LinkedIn, X, Facebook, Pinterest |
| 🎙️ **AI Voiceover** | ElevenLabs integration, voice cloning |
| 🏷️ **Hashtag AI** | Trending hashtag generation & virality scoring |
| 👥 **Team Workspace** | Multi-workspace, roles, approvals, client management |

---

## 🏗️ Architecture

```
aura-ai-saas/
├── apps/
│   ├── web/                    # Next.js 14 Frontend
│   │   ├── src/
│   │   │   ├── app/            # App Router pages
│   │   │   │   ├── (dashboard)/ # Protected dashboard routes
│   │   │   │   ├── (auth)/      # Auth pages
│   │   │   │   └── api/         # Next.js API routes
│   │   │   ├── components/
│   │   │   │   ├── landing/     # Marketing pages
│   │   │   │   ├── dashboard/   # Dashboard UI
│   │   │   │   ├── ui/          # Reusable UI components
│   │   │   │   └── shared/      # Shared components
│   │   │   ├── hooks/           # Custom React hooks
│   │   │   ├── store/           # Zustand state management
│   │   │   └── lib/             # Utility functions
│   │   └── public/
│   │
│   └── api/                    # Node.js/Express Backend
│       └── src/
│           ├── routes/          # API route handlers
│           ├── services/
│           │   ├── ai/          # AI generation services
│           │   ├── social/      # Social media publishers
│           │   ├── media/       # Media processing
│           │   └── analytics/   # Analytics aggregation
│           ├── middleware/      # Express middleware
│           ├── queue/           # BullMQ job queues
│           ├── models/          # Data models
│           └── utils/           # Helpers & logger
│
├── packages/
│   ├── database/
│   │   └── prisma/schema.prisma # Full DB schema
│   ├── types/                   # Shared TypeScript types
│   └── ui/                      # Shared UI components
│
├── docker/
│   ├── nginx/nginx.conf         # Reverse proxy config
│   └── postgres/init.sql        # DB initialization
│
├── docker-compose.yml           # Full stack local dev
├── .env.example                 # Environment variables template
└── turbo.json                   # Turborepo config
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- npm 10+

### 1. Clone & Install
```bash
git clone https://github.com/manpreet1singh2/AI.git
cd AI
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your API keys
```

### 3. Start with Docker (Recommended)
```bash
docker-compose up -d
```

### 4. Or Start Manually
```bash
# Terminal 1 — Frontend
cd apps/web && npm run dev

# Terminal 2 — Backend
cd apps/api && npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Required API Keys

| Service | Purpose | Get Key |
|---|---|---|
| OpenRouter | AI text generation | [openrouter.ai](https://openrouter.ai) |
| Google Gemini | Fallback AI | [aistudio.google.com](https://aistudio.google.com) |
| OpenAI | DALL-E 3 images | [platform.openai.com](https://platform.openai.com) |
| ElevenLabs | AI voiceover | [elevenlabs.io](https://elevenlabs.io) |
| Cloudinary | Media storage | [cloudinary.com](https://cloudinary.com) |
| Stripe | Payments | [stripe.com](https://stripe.com) |

---

## 🤖 AI Pipeline

```
User Prompt: "Create 5 luxury fitness reels for Instagram"
          ↓
    [AI Content Engine]
    ├── Trend Research
    ├── Hook Generation (GPT-4o / Gemini)
    ├── Script Writing
    └── Caption + Hashtag Generation
          ↓
    [AI Media Generation]
    ├── AI Images (DALL-E 3 / Stable Diffusion)
    ├── AI Video (RunwayML / Pika)
    ├── AI Voiceover (ElevenLabs)
    └── Thumbnail Generation
          ↓
    [Publishing Queue (BullMQ)]
    ├── Instagram Reel
    ├── YouTube Short
    ├── TikTok Video
    └── LinkedIn Post
          ↓
    [Analytics Collection]
    └── Performance Insights
```

---

## 📦 Tech Stack

**Frontend:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Radix UI, TanStack Query, Zustand

**Backend:** Node.js, Express, TypeScript, Prisma ORM, BullMQ, Redis

**AI Services:** OpenAI GPT-4o, Gemini 1.5, OpenRouter, DALL-E 3, ElevenLabs, Whisper

**Database:** PostgreSQL, Redis

**Infrastructure:** Docker, Nginx, AWS S3 / Cloudinary

**Auth:** NextAuth.js, JWT, OAuth 2.0

---

## 🌐 Supported Platforms

- 📸 Instagram (Posts, Reels, Stories, Carousels)
- ▶️ YouTube (Videos, Shorts)
- 🎵 TikTok (Videos)
- 💼 LinkedIn (Posts, Articles)
- 𝕏 Twitter/X (Tweets, Threads)
- 📘 Facebook (Posts, Reels)
- 📌 Pinterest (Pins)

---

## 💰 Pricing Plans

| Plan | Price | Generations | Platforms |
|---|---|---|---|
| **Starter** | $29/mo | 50/mo | 3 |
| **Pro** | $79/mo | 500/mo | 10 |
| **Agency** | $199/mo | Unlimited | Unlimited |
| **Enterprise** | Custom | Custom | Custom |

---

## 🐳 Production Deployment

### Docker
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Vercel (Frontend)
```bash
cd apps/web
vercel deploy --prod
```

### Railway / Render (Backend)
Set environment variables and connect your GitHub repo.

---

## 📄 License

MIT License — See [LICENSE](LICENSE) for details.

---

<p align="center">
  Built with ❤️ by the Aura AI Team
  <br />
  <a href="https://aura-ai.com">Website</a> · 
  <a href="mailto:hello@aura-ai.com">Contact</a>
</p>
