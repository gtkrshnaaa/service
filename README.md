# Gilang Teja Krishna - Software Engineering Services

Production-grade promotional landing page for software engineering services by Gilang Teja Krishna. Covers high-performance web applications, cross-platform mobile apps (Flutter and React Native), and robust Laravel fullstack backend systems.

Live Domain: [https://service.gtkrshnaaa.my.id](https://service.gtkrshnaaa.my.id)

---

## Technical Overview

- **Design System:** Warm Editorial Light (Codename: `default`)
  - Canvas: `#fbfbfa` warm bone background with alternating `#f4f6f2` sections
  - Typography: `'Fraunces'` serif for editorial headlines and `'DM Sans'` for UI/body text
  - Hairlines: 1px subtle borders (`rgba(0, 0, 0, 0.08)`) with zero blurry drop shadows
  - Accents: Organic sage (`#5a8357`, `#eef2ec`, `#e7f2e4`) and obsidian buttons (`#252724`)
  - Form Controls: Themed checkboxes and select dropdowns (zero default browser controls)
  - Quality Discipline: Zero emojis, professional SVG icons only, zero em dashes
- **Visual Assets:** Hand-crafted 2D architectural sketch illustrations in sage green palette:
  - Hero Multi-Platform Overview (`assets/images/hero-software-architecture.jpg`)
  - Web Application Engineering (`assets/images/service-web-engineering.jpg`)
  - Mobile Application Development (`assets/images/service-mobile-apps.jpg`)
  - Fullstack Laravel & Backend Systems (`assets/images/service-backend-laravel.jpg`)
  - Custom Enterprise Software Architecture (`assets/images/service-custom-software.svg`)
- **Interactive Capabilities:**
  - Standalone Capabilities Brochure (`brochure.html`) with one-click print-to-PDF export
  - Dynamic Project Cost & Timeline Estimator with dual-tier support (Skala UMKM & Skala Bisnis)
  - One-click WhatsApp consultation dispatch (`0851-5077-1763` / `+62 851 5077 1763`) with encoded project brief
  - Accessible technical consultation booking modal
  - Mobile drawer navigation with smooth responsive transitions
  - Accordion FAQ system
- **Copy Standard:** Clean Indo-English technical tone tailored for Indonesian market founders and business owners while preserving international tech nomenclature.

---

## Service Tiers & Engagement Models

The service catalog is strictly divided into two distinct engagement tracks:

### 1. Skala UMKM (Micro, Small & Medium Businesses)
- **Scope Limit:** Strictly web-only (landing page 1 halaman, digital profile/catalog multi-halaman, up to fullstack Laravel web apps). No mobile apps.
- **Budget Bounds:** Strictly bounded between **Rp 600.000 (600 Ribu)** minimum and **Rp 5.000.000 (5.0 Juta)** maximum.
- **Delivery Timeline:** 1 to 10 business days.
- **Base Packages:**
  - Landing Page (1 Halaman): Rp 600.000 (1 responsive page, SEO basics, direct WhatsApp CTA)
  - Web Profil Multi-Halaman: Rp 1.200.000 (Multi-page company profile tailored to business volume, structured navigation)
  - Web Katalog Bisnis: Rp 2.500.000 (Multi-page catalog, admin CRUD, inquiry form / WhatsApp)
  - Fullstack Laravel UMKM: Rp 3.800.000 - Rp 5.000.000 (Dynamic relational database, auth, admin panel)

### 2. Skala Bisnis (Enterprise & Growth Platform)
- **Scope Limit:** Multi-platform web systems, cross-platform mobile apps (Flutter & React Native), scalable backend APIs, and custom enterprise infrastructure.
- **Budget Range:** Starting from Rp 8.500.000 up to custom enterprise scale.
- **Delivery Timeline:** 2 to 8 weeks depending on architectural complexity.
- **Capabilities:** High-concurrency Laravel 11 backends, Redis caching, queue workers, offline-first SQLite synchronization, CI/CD pipelines, and SLA maintenance retainers.

---

## Technology Stacks Covered

1. **Web Ecosystem:**
   - JavaScript (ESNext), TypeScript
   - React 19, Next.js, Vue 3
   - Tailwind CSS, HTML5, CSS3 Custom Properties
2. **Mobile Ecosystem:**
   - Flutter & Dart (Cross-platform iOS and Android)
   - React Native & Expo
   - SQLite, Hive, offline-first data sync
3. **Backend & Cloud:**
   - Laravel 11+, PHP 8.3+
   - Node.js, Express
   - PostgreSQL, MySQL, Redis caching and queue workers
   - RESTful APIs and GraphQL contracts
   - Docker containerization and CI/CD pipelines

---

## Directory Structure

```text
.
├── CNAME                           # Custom domain configuration (service.gtkrshnaaa.my.id)
├── README.md                       # Architectural documentation
├── deploy.sh                       # Single-enter production deployment bundle
├── redeploy.sh                     # Single-enter branch pull and deployment pipeline
├── test.sh                         # Single-enter automated test runner
├── index.html                      # Semantic HTML5 landing page
├── brochure.html                   # Standalone capabilities brochure & PDF export
├── assets/
│   ├── css/
│   │   ├── tokens.css              # Design tokens, variables, and typography reset
│   │   ├── components.css          # Reusable buttons, badges, chips, and cards
│   │   ├── layout.css              # Grid, headers, responsive breakpoints, drawer
│   │   ├── sections.css            # Section layouts, estimator, modal, FAQ
│   │   └── brochure.css            # Editorial brochure layout and print styles
│   ├── js/
│   │   ├── main.js                 # Orchestrator entry point
│   │   ├── estimator.js            # Interactive pricing & scope calculation
│   │   ├── modal.js                # Consultation modal controller
│   │   ├── navigation.js           # Mobile drawer and navigation handlers
│   │   ├── faq.js                  # Accordion toggle controller
│   │   ├── select.js               # Custom accessible select dropdown
│   │   ├── brochure.js             # Print-to-PDF dispatch and export controller
│   │   └── app.js                  # Standalone zero-dependency bundle
│   └── images/                     # 2D architectural sketch illustrations in sage palette
├── docs/preview/screenshots/       # Visual preview screenshots
└── tests/
    └── e2e.test.mjs                # Automated assertions suite (Node.js test runner)
```

---

## Single-Enter Execution

### Run Tests
```bash
bash test.sh
```

### Local Deployment / Verification
```bash
bash deploy.sh
```

### Fast Redeploy
```bash
bash redeploy.sh
```