#!/usr/bin/env bash
# Provisions the local store. Idempotent: re-running only fills in what is missing.
set -euo pipefail
cd /var/www/html

STORE_URL="${STORE_URL:-http://localhost:8080}"

echo "Waiting for WordPress files…"
for _ in $(seq 1 60); do [ -f wp-config.php ] && break; sleep 1; done
for _ in $(seq 1 30); do wp db check --quiet >/dev/null 2>&1 && break; sleep 1; done

if ! wp core is-installed 2>/dev/null; then
  wp core install --url="$STORE_URL" --title="EBTB Pénztár" \
    --admin_user=admin --admin_password=admin --admin_email=admin@example.com --skip-email
fi

wp language core install hu_HU --activate || echo "(Hungarian language pack skipped)"
wp rewrite structure '/%postname%/' --hard

wp plugin is-installed woocommerce || wp plugin install woocommerce
wp plugin activate woocommerce
wp language plugin install woocommerce hu_HU || true
wp plugin activate fluid-checkout hungarian-pickup-points-for-woocommerce

# Default themes are block themes; Storefront is the classic theme Fluid Checkout is built around.
wp theme is-installed storefront || wp theme install storefront
wp theme activate storefront

wp eval-file /setup/seed.php

echo
echo "Done. Store: $STORE_URL  ·  Admin: $STORE_URL/wp-admin (admin / admin)"
