#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo " Running Test Suite: Gilang Teja Krishna Services"
echo "=================================================="

echo "[*] Checking JavaScript syntax..."
for js_file in assets/js/*.js; do
  node --check "$js_file"
done
echo "[OK] All JavaScript files passed syntax verification."

echo "[*] Running end-to-end automated assertions..."
node --test tests/e2e.test.mjs
echo "[OK] All test suites passed successfully."

echo "=================================================="
echo " [OK] Test Suite Passed with Zero Errors"
echo "=================================================="
