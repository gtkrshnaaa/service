import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

test('Project Structure: Essential Files Exist', () => {
  const requiredFiles = [
    'index.html',
    'CNAME',
    'assets/css/tokens.css',
    'assets/css/components.css',
    'assets/css/layout.css',
    'assets/css/sections.css',
    'assets/js/main.js',
    'assets/js/app.js',
    'assets/js/estimator.js',
    'assets/js/modal.js',
    'assets/js/navigation.js',
    'assets/js/faq.js',
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

  // Verify WhatsApp Dummy Number
  assert.ok(html.includes('6281234567890'), 'Must include dummy WhatsApp phone number');

  // Verify Mobile Viewport
  assert.ok(html.includes('name="viewport"'), 'Must have responsive viewport tag');
  assert.ok(html.includes('mobile-menu-toggle'), 'Must have mobile navigation trigger');
  assert.ok(html.includes('mobile-drawer'), 'Must have mobile navigation drawer');

  // Verify No Personal Photo (service illustrations only)
  assert.ok(!html.includes('profile-photo'), 'Should not have personal profile photo');
  assert.ok(!html.includes('my-photo'), 'Should not have personal photo');
});

test('Quality Gate: Zero Emojis and Zero Em Dashes', () => {
  const textFiles = [
    'index.html',
    'assets/css/tokens.css',
    'assets/css/components.css',
    'assets/css/layout.css',
    'assets/css/sections.css',
    'assets/js/main.js',
    'assets/js/app.js',
    'assets/js/estimator.js',
    'assets/js/modal.js',
    'assets/js/navigation.js',
    'assets/js/faq.js'
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
