# Resume Manager

> **All your resumes—tailored, AI-enhanced, and paywall-free.**

🚧 **Project status (August 2025)**: _Work in progress._ At the moment, **only authentication** (Better Auth + Convex) **and the basic dashboard UI** are functional. Everything else outlined below is **planned** and under active development.

---

## ✨ Planned Key Features

| Feature                         | Why it matters                                                                                         | Status         |
| ------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------- |
| **Single Source of Truth**      | Enter your skills, experience, education, and projects once—re-use them across every resume.           | 🔜 Planned     |
| **Unlimited Resume Versions**   | Maintain multiple targeted resumes (e.g., _Frontend Engineer_, _Product Manager_) without hidden fees. | 🔜 Planned     |
| **AI Analyzer**                 | Upload a job description and get actionable, keyword-driven suggestions to boost ATS match rates.      | 🔜 Planned     |
| **Live WYSIWYG Builder**        | Drag, drop, and edit content while a real-time preview updates instantly.                              | 🔜 Planned     |
| **Flexible Templates & Themes** | Switch layouts, fonts, and color accents without breaking formatting.                                  | 🔜 Planned     |
| **Pixel-Perfect PDF Export**    | One-click server-side rendering produces professional PDFs identical to the on-screen preview.         | 🔜 Planned     |
| **Free & Open Source**          | No paywalls for core features—ever. Deploy on Vercel or run locally.                                   | 🔜 Planned     |
| **Authentication & Dashboard**  | Email/OAuth sign-in backed by Convex and a responsive dashboard layout.                                | ✅ Implemented |

---

## 🏗 Tech Stack

- **Next.js 15** — React framework with App Router, server components, and edge-ready rendering.
- **Vercel** — Zero-config deployment and serverless functions for PDF generation.
- **Convex** — Serverless data platform with real-time updates and type-safe queries.
- **Shadcn/UI + Tailwind CSS** — Accessible component library and utility-first styling.
- **Better Auth** — Secure OAuth & email/password authentication for Next.js.
- **Resend** — Transactional email for sign-up verification and password resets.
- **Vercel AI SDK** — Streamlined OpenAI integration powering the resume analyzer _(planned)_.
- **Lit Web Components** — Isolated, template-driven resume preview _(planned)_.
- **Puppeteer + chrome-aws-lambda** — Headless Chrome for high-fidelity PDF export _(planned)_.

> **Tip:** The stack is 100 % TypeScript from front to back.

---

## 🔧 Getting Started

### Prerequisites

- **Node.js ≥ 18**
- **pnpm** (recommended) or **npm**
- A Vercel account (optional for local dev, required for deployment)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/zodakzach/resume-manager.git
cd resume-manager

# 2. Install dependencies
pnpm install

# 3. Configure environment variables
cp .env.example .env.local
#   → Edit .env.local with your Convex, Resend, and OpenAI keys

# 4. Start the dev server
pnpm dev
```

The app will be available at **http://localhost:3000** with hot reload.

### Production build

```bash
pnpm build   # Next.js + Convex
pnpm start   # Runs the compiled app
```

---

## 🛠 Useful Dev Scripts

| Script              | Description                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| `pnpm dev`          | Runs frontend (**Next.js**) and backend (**Convex**) in parallel.      |
| `pnpm dev:frontend` | Starts Next.js with **Turbopack** for lightning-fast HMR.              |
| `pnpm dev:backend`  | Starts Convex with component type-checking.                            |
| `pnpm build`        | Production build of the Next.js app.                                   |
| `pnpm start`        | Serves the compiled build.                                             |
| `pnpm lint`         | Runs `next lint`, TypeScript checks for the Convex folder, and ESLint. |
| `pnpm format`       | Formats the codebase with Prettier + Tailwind plugin.                  |
| `pnpm generate`     | One-off Convex codegen & component type-checking.                      |

---

## 🚀 Deploying to Vercel

1. **Push** your code to GitHub.
2. **Import** the repository in Vercel and set the environment variables from `.env.example`.
3. **Deploy**—Vercel will handle builds, Convex migrations, and edge functions automatically.

> Need help? Check Vercel’s [Next.js deployment docs](https://vercel.com/docs) and Convex’s [deployment guide](https://docs.convex.dev).  
> For PDF export, Vercel automatically bundles `chrome-aws-lambda` in its serverless runtime.

---

## 🧑‍💻 Usage Guide

_The following guide assumes all planned features are available. Until then, the primary flow is signing up and exploring the dashboard shell._

1. **Sign Up / Sign In** via Google, GitHub, or email. _(implemented)_
2. **Explore Dashboard**—theme toggle, sidebar navigation, and placeholder pages. _(implemented)_
3. **Populate "My Information"** _(planned)_
4. **Create a Resume** _(planned)_
5. **Analyze** a job description _(planned)_
6. **Export** a PDF _(planned)_

---

## 🗺 Roadmap

### Near-term

- 💾 Data model for experience, education, and skills
- 🖋 WYSIWYG resume builder
- 📜 PDF export service on Vercel Edge

### Long-term

- 🔄 Public share links with view analytics
- 🛠 Template marketplace & community themes
- 🌐 Localization (i18n) starting with Spanish & French
- 📊 Integrated application tracker

Have an idea? Open an [issue](https://github.com/zodakzach/resume-manager/issues) or start a discussion!

---

## 🤝 Contributing

This is currently a **solo project** maintained by [Zach](https://github.com/zodakzach). PRs and suggestions are welcome—just fork the repo, create a feature branch, and open a pull request targeting `main`.

1. Run `pnpm lint` before committing.
2. Follow the [Conventional Commits](https://www.conventionalcommits.org) spec (feat:, fix:, docs:, etc.).

---

## 📜 License

Released under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

## 🙏 Acknowledgements

- **Reactive Resume** for inspiring an open, paywall-free builder.
- The **Shadcn/UI** and **Convex** communities for outstanding open-source tooling.
