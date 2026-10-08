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
    'assets/js/brochure.js',
    'assets/images/hero-software-architecture.jpg',
    'assets/images/service-web-engineering.jpg',
    'assets/images/service-mobile-apps.jpg',
    'assets/images/service-backend-laravel.jpg',
    'assets/images/service-custom-software.svg',
    'docs/preview/allpages.md',
    'docs/preview/screenshots.zip',
    'docs/preview/screenshots/01-landing-desktop.jpg'
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
