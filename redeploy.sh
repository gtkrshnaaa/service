#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo " Redeploying: Gilang Teja Krishna Service Portal"
echo "=================================================="

ACTIVE_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "[*] Current branch: ${ACTIVE_BRANCH}"

echo "[*] Fetching and syncing latest commits..."
git fetch origin
git pull origin "${ACTIVE_BRANCH}"

echo "[*] Triggering deploy pipeline..."
bash deploy.sh
