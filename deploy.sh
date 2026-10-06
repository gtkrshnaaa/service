#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo " Deploying: Gilang Teja Krishna Service Portal"
echo "=================================================="

echo "[*] Step 1: Running verification tests..."
bash test.sh

echo "[*] Step 2: Enforcing file permissions..."
chmod -R u=rwX,go=rX .
chmod +x deploy.sh redeploy.sh test.sh

echo "[*] Step 3: Verifying custom domain configuration..."
if [[ -f CNAME ]]; then
  DOMAIN=$(cat CNAME)
  echo "[OK] Custom domain configured: https://${DOMAIN}"
else
  echo "[!] Warning: CNAME file not found"
fi

echo "=================================================="
echo " [OK] Deployment Ready"
echo " Live Target : https://service.gtkrshnaaa.my.id"
echo " Local Test  : python3 -m http.server 8080"
echo "=================================================="
