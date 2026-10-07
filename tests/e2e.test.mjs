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
    'assets/images/service-custom-software.svg'
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

test('Brochure Detail Page: Capabilities & PDF Export Verification', () => {
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

  // Verify Core Stacks Covered
  assert.ok(brochureHtml.includes('React 19'), 'Brochure must include React 19');
  assert.ok(brochureHtml.includes('Flutter'), 'Brochure must include Flutter');
  assert.ok(brochureHtml.includes('Laravel 11'), 'Brochure must include Laravel 11');
});

test('Quality Gate: Zero Emojis and Zero Em Dashes', () => {
  const textFiles = [
    'index.html',
    'brochure.html',
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
    'assets/js/brochure.js'
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
