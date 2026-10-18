<?php
/**
 * Plugin Name: EBTB cart handoff
 * Description: Fills the WooCommerce cart from the Next.js site's ?ebtb_cart=ID:QTY,ID:QTY link and sends the shopper to checkout.
 *
 * Install: copy this file to wp-content/mu-plugins/ebtb-cart-handoff.php (create the folder if needed).
 * Must-use plugins load automatically — nothing to activate.
 */

defined('ABSPATH') || exit;

add_action('template_redirect', function () {
    if (!isset($_GET['ebtb_cart']) || !function_exists('WC') || !WC()->cart) {
        return;
    }

    $raw = sanitize_text_field(wp_unslash($_GET['ebtb_cart']));
    $pairs = array_slice(explode(',', $raw), 0, 20); // a bag never holds more than a handful of lines

    // Start a session for first-time visitors so the cart survives the redirect.
    if (WC()->session && !WC()->session->has_session()) {
        WC()->session->set_customer_session_cookie(true);
    }

    WC()->cart->empty_cart();

    foreach ($pairs as $pair) {
        if (!preg_match('/^(\d+):(\d+)$/', trim($pair), $m)) {
            continue;
        }
        $product_id = absint($m[1]);
        $qty = min(99, max(1, absint($m[2])));
        $product = wc_get_product($product_id);
        if ($product && $product->is_purchasable() && $product->is_in_stock()) {
            WC()->cart->add_to_cart($product_id, $qty);
        }
    }

    wp_safe_redirect(WC()->cart->is_empty() ? wc_get_cart_url() : wc_get_checkout_url());
    exit;
});
