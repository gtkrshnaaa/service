import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

test('Project Structure: Essential Files Exist', () => {
  const requiredFiles = [
    'index.html',
    'brochure.html',
    'CNAME',
    'assets/css/tokens.css',
    'assets/css/components.css',
    'assets/css/layout.css',
    'assets/css/sections.css',
    'assets/css/brochure.css',
    'assets/js/main.js',
    'assets/js/app.js',
    'assets/js/estimator.js',
    'assets/js/modal.js',
    'assets/js/navigation.js',
    'assets/js/faq.js',
    'assets/js/select.js',
    'assets/js/workflow.js',
    'assets/js/brochure.js',
    'assets/images/hero-software-architecture.jpg',
    'assets/images/hero-software-architecture.webp',
    'assets/images/service-digitalisasi-umkm.jpg',
    'assets/images/service-digitalisasi-umkm.webp',
    'assets/images/service-web-engineering.jpg',
    'assets/images/service-web-engineering.webp',
    'assets/images/service-mobile-apps.jpg',
    'assets/images/service-mobile-apps.webp',
    'assets/images/service-backend-laravel.jpg',
    'assets/images/service-backend-laravel.webp',
    'assets/images/service-custom-software.svg',
    'docs/preview/allpages.md',
    'docs/preview/screenshots.zip',
    'docs/preview/screenshots/01-landing-desktop.jpg',
    'docs/preview/screenshots/07-workflow-interactive.jpg'
  ];

  for (const file of requiredFiles) {
    const fullPath = path.join(rootDir, file);
    assert.ok(fs.existsSync(fullPath), `Expected file to exist: ${file}`);
    const stats = fs.statSync(fullPath);
    assert.ok(stats.size > 0, `Expected file to be non-empty: ${file}`);
  }
});

test('CNAME Configuration', () => {
  const cnameContent = fs.readFileSync(path.join(rootDir, 'CNAME'), 'utf8').trim();
  assert.strictEqual(cnameContent, 'service.gtkrshnaaa.my.id');
});

test('HTML Verification: Identity and Requirements', () => {
  const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

  // Verify Identity
  assert.ok(html.includes('Gilang Teja Krishna'), 'Must include engineer name Gilang Teja Krishna');

  // Verify Tech Stacks
  assert.ok(html.includes('Flutter'), 'Must mention Flutter');
  assert.ok(html.includes('Laravel'), 'Must mention Laravel');
  assert.ok(html.includes('JavaScript'), 'Must mention JavaScript');
  assert.ok(html.includes('React Native'), 'Must mention React Native');

  // Verify Official WhatsApp Contact Number
  assert.ok(html.includes('6285150771763'), 'Must include WhatsApp phone number 6285150771763');

  // Verify Mobile Viewport & Navigation
  assert.ok(html.includes('name="viewport"'), 'Must have responsive viewport tag');
  assert.ok(html.includes('mobile-menu-toggle'), 'Must have mobile navigation trigger');
  assert.ok(html.includes('mobile-drawer'), 'Must have mobile navigation drawer');

  // Verify Mobile Scope: Android Only
  assert.ok(html.includes('Aplikasi Mobile Android'), 'Must feature Android mobile apps');
  assert.strictEqual(/\biOS\b/.test(html), false, 'index.html must not mention iOS');
  assert.strictEqual(/\bApp Store\b/.test(html), false, 'index.html must not mention App Store');

  // Verify Dedicated Brochure Showcase Section
  assert.ok(html.includes('id="brochure"'), 'Must have dedicated brochure section');
  assert.ok(html.includes('href="brochure.html"'), 'Must link to brochure detail page');

  // Verify No Personal Photo (service illustrations only)
  assert.ok(!html.includes('profile-photo'), 'Should not have personal profile photo');
  assert.ok(!html.includes('my-photo'), 'Should not have personal photo');
});

test('Dual-Tier Architecture: Skala UMKM vs Skala Bisnis Requirements', () => {
  const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

  // Verify Skala Tiers exist on landing page
  assert.ok(html.includes('Skala UMKM'), 'Must present Skala UMKM tier');
  assert.ok(html.includes('Skala Bisnis'), 'Must present Skala Bisnis tier');

  // Verify Skala UMKM pricing bounds (Min 600 Ribu, Max 5 Juta)
  assert.ok(html.includes('600.000') || html.includes('600 Ribu'), 'Must feature UMKM minimum 600k');
  assert.ok(html.includes('1.200.000') || html.includes('1.2 Juta'), 'Must feature UMKM multi-page 1.2M');
  assert.ok(html.includes('5.000.000') || html.includes('5 Juta'), 'Must feature UMKM maximum 5M');

  // Verify UMKM is web-only (landing, multipage, catalog, fullstack laravel)
  assert.ok(html.includes('Web-Only') || html.includes('web-only'), 'Must state UMKM is web-only');
  assert.ok(html.includes('umkm-landing'), 'Estimator must feature UMKM Landing option');
  assert.ok(html.includes('umkm-multipage'), 'Estimator must feature UMKM Multipage option');
  assert.ok(html.includes('umkm-catalog'), 'Estimator must feature UMKM Catalog option');
  assert.ok(html.includes('umkm-laravel'), 'Estimator must feature UMKM Laravel option');

  // Verify scale toggle tabs in estimator
  assert.ok(html.includes('data-scale="umkm"'), 'Estimator must have UMKM tab trigger');
  assert.ok(html.includes('data-scale="bisnis"'), 'Estimator must have Bisnis tab trigger');

  // Verify refined Indo-English copy
  assert.ok(html.includes('Estimasi Investasi'), 'Estimator summary must use Indo-English copy');
  assert.ok(html.includes('Pesan Paket via WhatsApp'), 'Estimator CTA must use Indo-English copy');
  assert.ok(html.includes('Pertanyaan Umum'), 'FAQ section must use Indo-English eyebrow');
  assert.ok(html.includes('Apa perbedaan Skala UMKM dan Skala Bisnis?'), 'FAQ must explain tier differences');
});

test('Brochure Detail Page: Capabilities & Dual-Tier Verification', () => {
  const brochureHtml = fs.readFileSync(path.join(rootDir, 'brochure.html'), 'utf8');

  // Verify Identity & Scope
  assert.ok(brochureHtml.includes('Gilang Teja Krishna'), 'Brochure must include engineer name');
  assert.ok(brochureHtml.includes('Software Engineering Services'), 'Brochure must include services title');
  assert.ok(brochureHtml.includes('service.gtkrshnaaa.my.id'), 'Brochure must reference service domain');
  assert.ok(brochureHtml.includes('6285150771763'), 'Brochure must include official WhatsApp contact');

  // Verify PDF Export Features
  assert.ok(brochureHtml.includes('id="btn-export-pdf"'), 'Brochure must have PDF export button');
  assert.ok(brochureHtml.includes('assets/js/brochure.js'), 'Brochure must load brochure controller script');
  assert.ok(brochureHtml.includes('assets/css/brochure.css'), 'Brochure must load brochure stylesheet');

  // Verify Dual Tiers in Brochure
  assert.ok(brochureHtml.includes('Skala UMKM'), 'Brochure must document Skala UMKM');
  assert.ok(brochureHtml.includes('Skala Bisnis'), 'Brochure must document Skala Bisnis');
  assert.ok(brochureHtml.includes('600.000') || brochureHtml.includes('600 Ribu'), 'Brochure must list UMKM base 600k');
  assert.ok(brochureHtml.includes('1.200.000'), 'Brochure must list UMKM multipage 1.2M');
  assert.ok(brochureHtml.includes('5.000.000'), 'Brochure must list UMKM max 5M');

  // Verify Core Stacks Covered
  assert.ok(brochureHtml.includes('React 19'), 'Brochure must include React 19');
  assert.ok(brochureHtml.includes('Flutter'), 'Brochure must include Flutter');
  assert.ok(brochureHtml.includes('Laravel 11'), 'Brochure must include Laravel 11');

  // Verify Android Mobile Scope
  assert.ok(brochureHtml.includes('Aplikasi Mobile Android'), 'Brochure must feature Android mobile apps');
  assert.strictEqual(/\biOS\b/.test(brochureHtml), false, 'brochure.html must not mention iOS');
  assert.strictEqual(/\bApp Store\b/.test(brochureHtml), false, 'brochure.html must not mention App Store');
});

test('Estimator Pricing Logic: UMKM Clamping Bounds', () => {
  const estimatorJs = fs.readFileSync(path.join(rootDir, 'assets/js/estimator.js'), 'utf8');
  const appJs = fs.readFileSync(path.join(rootDir, 'assets/js/app.js'), 'utf8');

  // Verify UMKM clamp logic in both modular and standalone bundle
  [estimatorJs, appJs].forEach((content, idx) => {
    const label = idx === 0 ? 'estimator.js' : 'app.js';
    assert.ok(content.includes('5000000'), `${label} must clamp upper bound to 5000000`);
    assert.ok(content.includes('600000'), `${label} must clamp lower bound to 600000`);
    assert.ok(content.includes('Math.min(5000000, Math.max(600000'), `${label} must enforce 600k - 5M clamp formula`);
    assert.ok(content.includes('umkm-multipage'), `${label} must include umkm-multipage option`);
  });
});

test('Quality Gate: No Ambiguous "M" Currency Suffixes in Indonesian Copy', () => {
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  const brochureHtml = fs.readFileSync(path.join(rootDir, 'brochure.html'), 'utf8');

  // Regex to detect "Rp ...M" or "+...M" currency shorthand that could be confused with Miliar
  const ambiguousMRegex = /(Rp\s*\d+(\.\d+)?\s*M|\+\d+(\.\d+)?\s*M)\b/;

  assert.strictEqual(
    ambiguousMRegex.test(indexHtml),
    false,
    'index.html must not use ambiguous "M" suffix for Rupiah millions'
  );
  assert.strictEqual(
    ambiguousMRegex.test(brochureHtml),
    false,
    'brochure.html must not use ambiguous "M" suffix for Rupiah millions'
  );

  // Assert that explicit "Juta" is used
  assert.ok(indexHtml.includes('Rp 1.2 Juta'), 'index.html must explicitly use Rp 1.2 Juta');
  assert.ok(indexHtml.includes('Rp 5.0 Juta') || indexHtml.includes('Rp 5 Juta'), 'index.html must explicitly use Rp 5 Juta');
  assert.ok(brochureHtml.includes('Rp 1.2 Juta'), 'brochure.html must explicitly use Rp 1.2 Juta');
});

test('Quality Gate: Zero Emojis and Zero Em Dashes', () => {
  const textFiles = [
    'index.html',
    'brochure.html',
    'README.md',
    'assets/css/tokens.css',
    'assets/css/components.css',
    'assets/css/layout.css',
    'assets/css/sections.css',
    'assets/css/brochure.css',
    'assets/js/main.js',
    'assets/js/app.js',
    'assets/js/estimator.js',
    'assets/js/modal.js',
    'assets/js/navigation.js',
    'assets/js/faq.js',
    'assets/js/select.js',
    'assets/js/workflow.js',
    'assets/js/brochure.js',
    'docs/preview/allpages.md'
  ];

  // Em dash check: \u2014
  const emDashRegex = /\u2014/;
  // Common emoji ranges
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

  for (const relPath of textFiles) {
    const content = fs.readFileSync(path.join(rootDir, relPath), 'utf8');
    assert.strictEqual(
      emDashRegex.test(content),
      false,
      `File ${relPath} must not contain em dashes (\u2014)`
    );
    assert.strictEqual(
      emojiRegex.test(content),
      false,
      `File ${relPath} must not contain emojis`
    );
  }
});

test('Layout Architecture: 82 Percent Viewport Container', () => {
  const layoutCss = fs.readFileSync(path.join(rootDir, 'assets/css/layout.css'), 'utf8');
  assert.ok(layoutCss.includes('width: 82%'), 'layout.css must set container width to 82%');
  assert.ok(layoutCss.includes('max-width: 82vw'), 'layout.css must set max-width to 82vw');
});

test('Responsive Architecture: Breakpoints & Mobile Overflow Safeguards', () => {
  const tokensCss = fs.readFileSync(path.join(rootDir, 'assets/css/tokens.css'), 'utf8');
  const sectionsCss = fs.readFileSync(path.join(rootDir, 'assets/css/sections.css'), 'utf8');
  const layoutCss = fs.readFileSync(path.join(rootDir, 'assets/css/layout.css'), 'utf8');
  const brochureCss = fs.readFileSync(path.join(rootDir, 'assets/css/brochure.css'), 'utf8');

  // Verify overflow safeguards
  assert.ok(tokensCss.includes('overflow-x: hidden'), 'tokens.css must enforce overflow-x: hidden on body/html');

  // Verify header desktop nav collapse at 992px
  assert.ok(layoutCss.includes('@media (max-width: 992px)'), 'layout.css must have 992px breakpoint');

  // Verify sections responsive rules
  assert.ok(sectionsCss.includes('.brochure-preview-grid'), 'sections.css must define brochure-preview-grid');
  assert.ok(sectionsCss.includes('.scope-tiers-banner'), 'sections.css must define scope-tiers-banner');
  assert.ok(sectionsCss.includes('@media (max-width: 540px)'), 'sections.css must have small phone 540px breakpoint');

  // Verify brochure mobile rules
  assert.ok(brochureCss.includes('.guarantees-grid'), 'brochure.css must define guarantees-grid');
  assert.ok(brochureCss.includes('.brochure-toolbar-inner'), 'brochure.css must define toolbar mobile layout');
});

test('Quality Gate: Problem-Solution Orientation and Grounded Tone', () => {
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  const brochureHtml = fs.readFileSync(path.join(rootDir, 'brochure.html'), 'utf8');
  const readmeMd = fs.readFileSync(path.join(rootDir, 'README.md'), 'utf8');

  // Strict check: forbid the word "menengah" everywhere
  const menengahRegex = /menengah/i;
  assert.strictEqual(menengahRegex.test(indexHtml), false, 'index.html must not contain "menengah"');
  assert.strictEqual(menengahRegex.test(brochureHtml), false, 'brochure.html must not contain "menengah"');
  assert.strictEqual(menengahRegex.test(readmeMd), false, 'README.md must not contain "menengah"');

  // Verify four problem-solution service titles in index.html
  assert.ok(indexHtml.includes('Digitalisasi &amp; Reputasi Usaha'), 'Must feature Digitalisasi & Reputasi Usaha');
  assert.ok(indexHtml.includes('Aplikasi Web &amp; Portal Operasional'), 'Must feature Aplikasi Web & Portal Operasional');
  assert.ok(indexHtml.includes('Aplikasi Mobile Android'), 'Must feature Aplikasi Mobile Android');
  assert.ok(indexHtml.includes('Integrasi Sistem &amp; Otomasi Alur Kerja'), 'Must feature Integrasi Sistem & Otomasi Alur Kerja');

  // Verify brochure capability titles
  assert.ok(brochureHtml.includes('Digitalisasi &amp; Reputasi Usaha UMKM'), 'Brochure must feature Digitalisasi UMKM');
  assert.ok(brochureHtml.includes('Aplikasi Web &amp; Portal Operasional'), 'Brochure must feature Aplikasi Web');
  assert.ok(brochureHtml.includes('Aplikasi Mobile Android'), 'Brochure must feature Mobile Android');
  assert.ok(brochureHtml.includes('Integrasi Sistem &amp; Otomasi Alur Kerja'), 'Brochure must feature Integrasi Sistem');
});

test('Interactive Collaboration Workflow Pipeline Verification', () => {
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  const workflowJs = fs.readFileSync(path.join(rootDir, 'assets/js/workflow.js'), 'utf8');
  const sectionsCss = fs.readFileSync(path.join(rootDir, 'assets/css/sections.css'), 'utf8');
  const appJs = fs.readFileSync(path.join(rootDir, 'assets/js/app.js'), 'utf8');

  // Verify container and elements in index.html
  assert.ok(indexHtml.includes('id="workflow-interactive"'), 'index.html must have #workflow-interactive container');
  assert.ok(indexHtml.includes('role="tablist"'), 'index.html must define tablist for stepper track');
  assert.ok(indexHtml.includes('id="wf-autoplay-toggle"'), 'index.html must have autoplay toggle button');
  assert.ok(indexHtml.includes('id="wf-progress-bar"'), 'index.html must have animated progress bar');
  assert.ok(indexHtml.includes('id="wf-visual-slot"'), 'index.html must have dynamic visual slot');
  assert.ok(indexHtml.includes('id="wf-stage-deliverables"'), 'index.html must have stage deliverables list');
  assert.ok(indexHtml.includes('id="wf-stage-client-role"'), 'index.html must have client role callout box');

  // Verify 5 stages in workflow.js
  assert.ok(workflowJs.includes('WORKFLOW_STAGES'), 'workflow.js must export WORKFLOW_STAGES');
  assert.ok(workflowJs.includes('initWorkflow'), 'workflow.js must export initWorkflow');
  assert.ok(workflowJs.includes('Konsultasi & Pemetaan Kebutuhan'), 'workflow.js must contain Stage 1');
  assert.ok(workflowJs.includes('Perancangan Arsitektur & Roadmap Sprint'), 'workflow.js must contain Stage 2');
  assert.ok(workflowJs.includes('Pengerjaan Modular & Live Demo Staging'), 'workflow.js must contain Stage 3');
  assert.ok(workflowJs.includes('Pengujian Menyeluruh & Uji Bersama'), 'workflow.js must contain Stage 4');
  assert.ok(workflowJs.includes('Peluncuran Resmi & 100% Serah Terima'), 'workflow.js must contain Stage 5');

  // Verify SVG generation for all 5 stages
  assert.ok(workflowJs.includes("case 'consultation':"), 'workflow.js must have consultation SVG');
  assert.ok(workflowJs.includes("case 'architecture':"), 'workflow.js must have architecture SVG');
  assert.ok(workflowJs.includes("case 'development':"), 'workflow.js must have development SVG');
  assert.ok(workflowJs.includes("case 'testing':"), 'workflow.js must have testing SVG');
  assert.ok(workflowJs.includes("case 'launch':"), 'workflow.js must have launch SVG');

  // Verify CSS styles & animations
  assert.ok(sectionsCss.includes('.workflow-interactive-container'), 'sections.css must have .workflow-interactive-container');
  assert.ok(sectionsCss.includes('.wf-stepper-track'), 'sections.css must have .wf-stepper-track');
  assert.ok(sectionsCss.includes('.wf-stage-showcase'), 'sections.css must have .wf-stage-showcase');
  assert.ok(sectionsCss.includes('@keyframes wfPulseDotAnim'), 'sections.css must define pulse animation');
  assert.ok(sectionsCss.includes('@media (prefers-reduced-motion: reduce)'), 'sections.css must support reduced motion');

  // Verify app.js integration
  assert.ok(appJs.includes('initWorkflow()'), 'app.js must call initWorkflow');

  // Verify section title does NOT contain "Bersama Gilang"
  assert.strictEqual(indexHtml.includes('Bersama Gilang'), false, 'index.html must not contain "Bersama Gilang"');
  assert.ok(indexHtml.includes('Alur Kolaborasi &amp; Pengerjaan Proyek'), 'index.html must have clean collaboration title');

  // Verify default Zero-DP pay-at-end policy emphasis
  assert.ok(indexHtml.includes('Default Tanpa DP (Bayar di Akhir)'), 'index.html must feature Zero-DP badge');
  assert.ok(indexHtml.includes('tanpa uang muka (DP)'), 'index.html must emphasize zero DP in copy');
  assert.ok(workflowJs.includes('Default Tanpa DP (Bayar di Akhir)'), 'workflow.js must define Zero-DP badge');
  assert.ok(indexHtml.includes('apakah perlu uang muka (DP)'), 'index.html must have FAQ regarding DP policy');

  const brochureHtml = fs.readFileSync(path.join(rootDir, 'brochure.html'), 'utf8');
  assert.ok(brochureHtml.includes('Default Zero-DP (Pay-at-End) Guarantee'), 'brochure.html must feature Zero-DP guarantee');
});

test('Performance Architecture: WebP Assets, Responsive Pictures, and Battery Optimization', () => {
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  const sectionsCss = fs.readFileSync(path.join(rootDir, 'assets/css/sections.css'), 'utf8');
  const workflowJs = fs.readFileSync(path.join(rootDir, 'assets/js/workflow.js'), 'utf8');
  const appJs = fs.readFileSync(path.join(rootDir, 'assets/js/app.js'), 'utf8');

  // Verify responsive <picture> elements and WebP sources
  assert.ok(indexHtml.includes('<picture>'), 'index.html must use <picture> elements');
  assert.ok(indexHtml.includes('type="image/webp"'), 'index.html must specify WebP MIME type');
  assert.ok(indexHtml.includes('assets/images/hero-software-architecture.webp'), 'Hero must use WebP');
  assert.ok(indexHtml.includes('fetchpriority="high"'), 'Hero image must set fetchpriority="high"');
  assert.ok(indexHtml.includes('decoding="async"'), 'Images must set decoding="async"');

  // Verify content-visibility optimization in CSS
  assert.ok(sectionsCss.includes('content-visibility: auto'), 'sections.css must define content-visibility: auto for offscreen sections');
  assert.ok(sectionsCss.includes('contain-intrinsic-size: 1px 700px'), 'sections.css must define contain-intrinsic-size');

  // Verify GPU compositor transform in workflow progress
  assert.ok(sectionsCss.includes('transform-origin: left'), 'sections.css must set transform-origin: left on progress fill');
  assert.ok(sectionsCss.includes('will-change: transform'), 'sections.css must set will-change: transform');

  // Verify CPU and battery conservation hooks (IntersectionObserver and visibilitychange)
  assert.ok(workflowJs.includes('IntersectionObserver'), 'workflow.js must use IntersectionObserver');
  assert.ok(workflowJs.includes('visibilitychange'), 'workflow.js must listen to visibilitychange');
  assert.ok(appJs.includes('IntersectionObserver'), 'app.js must use IntersectionObserver');
  assert.ok(appJs.includes('visibilitychange'), 'app.js must listen to visibilitychange');
});
test('UI Tokens: Custom Selection, Mobile Tap Highlight, and Styled Scrollbar', () => {
  const tokensCss = fs.readFileSync(path.join(rootDir, 'assets/css/tokens.css'), 'utf8');

  // Verify text selection custom styling
  assert.ok(tokensCss.includes('::selection'), 'tokens.css must define ::selection');
  assert.ok(tokensCss.includes('::-moz-selection'), 'tokens.css must define ::-moz-selection');
  assert.ok(tokensCss.includes('background-color: var(--accent-sage)'), 'tokens.css ::selection must use --accent-sage');

  // Verify mobile tap highlight indicator
  assert.ok(tokensCss.includes('-webkit-tap-highlight-color: rgba(90, 131, 87, 0.18)'), 'tokens.css must set themed -webkit-tap-highlight-color');

  // Verify custom styled scrollbars
  assert.ok(tokensCss.includes('::-webkit-scrollbar'), 'tokens.css must define ::-webkit-scrollbar');
  assert.ok(tokensCss.includes('::-webkit-scrollbar-thumb'), 'tokens.css must define ::-webkit-scrollbar-thumb');
  assert.ok(tokensCss.includes('scrollbar-color: #cad2c5 #f4f3ef'), 'tokens.css must define W3C standard scrollbar-color');
});

test('Mobile UI Precision: Rigid Icon Buttons, Themed Checkboxes, and FAQ Bugfix', () => {
  const componentsCss = fs.readFileSync(path.join(rootDir, 'assets/css/components.css'), 'utf8');
  const sectionsCss = fs.readFileSync(path.join(rootDir, 'assets/css/sections.css'), 'utf8');

  // Verify .btn-icon-only definition
  assert.ok(componentsCss.includes('.btn-icon-only'), 'components.css must define .btn-icon-only');
  assert.ok(componentsCss.includes('flex-shrink: 0'), 'components.css .btn-icon-only must set flex-shrink: 0');

  // Verify .themed-checkbox box model rigidity
  assert.ok(componentsCss.includes('.themed-checkbox'), 'components.css must define .themed-checkbox');
  assert.ok(componentsCss.includes('flex: 0 0 18px'), 'components.css .themed-checkbox must enforce flex: 0 0 18px');
  assert.ok(componentsCss.includes('display: inline-grid'), 'components.css .themed-checkbox must set display: inline-grid');

  // Verify .chip-scope for preventing awkward wrapping
  assert.ok(componentsCss.includes('.chip-scope'), 'components.css must define .chip-scope');
  assert.ok(componentsCss.includes('white-space: nowrap'), 'components.css .chip-scope must have white-space: nowrap');

  // Verify mobile FAQ accordion leak safeguard
  assert.ok(sectionsCss.includes('.faq-answer'), 'sections.css must style .faq-answer');
  assert.ok(sectionsCss.includes('visibility: hidden'), 'sections.css .faq-answer closed state must set visibility: hidden');

  // Verify .addon-card and checkbox top alignment beside title
  assert.ok(sectionsCss.includes('.addon-card {\n  display: flex;\n  align-items: flex-start;'), 'sections.css must set .addon-card to align-items: flex-start');
  assert.ok(sectionsCss.includes('.addon-card .themed-checkbox {\n  margin-top: 1px;\n}'), 'sections.css must align .addon-card checkbox with top margin');
  assert.ok(sectionsCss.includes('.addon-card .chip {\n  display: inline-flex;'), 'sections.css must style .addon-card .chip below description text');
});

test('Official Contact Standardization & Social Links', () => {
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  const brochureHtml = fs.readFileSync(path.join(rootDir, 'brochure.html'), 'utf8');

  // Verify official email
  assert.ok(indexHtml.includes('hello.gtkrshnaaa@gmail.com'), 'index.html must include hello.gtkrshnaaa@gmail.com');
  assert.ok(brochureHtml.includes('hello.gtkrshnaaa@gmail.com'), 'brochure.html must include hello.gtkrshnaaa@gmail.com');
  assert.strictEqual(indexHtml.includes('hallo.gtkrshnaaa@gmail.com'), false, 'index.html must not contain typo hallo.gtkrshnaaa@gmail.com');
  assert.strictEqual(brochureHtml.includes('hallo.gtkrshnaaa@gmail.com'), false, 'brochure.html must not contain typo hallo.gtkrshnaaa@gmail.com');

  // Verify standardized WhatsApp format
  assert.ok(indexHtml.includes('WhatsApp: +62 851-5077-1763'), 'index.html footer must display single format WhatsApp: +62 851-5077-1763');
  assert.strictEqual(indexHtml.includes('(+62 851 5077 1763)'), false, 'index.html must not contain duplicate parenthetical phone format');
  assert.ok(brochureHtml.includes('+62 851-5077-1763'), 'brochure.html must display standardized WhatsApp number');
});
