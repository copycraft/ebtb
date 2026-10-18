<?php
/**
 * Plugin Name: EBTB return link
 * Description: "Back to EBTB" button on the thank-you page. The Next.js site sees ?rendeles=kesz, empties its bag and thanks the shopper.
 *
 * Set EBTB_SITE_URL in wp-config.php (no trailing slash).
 */

defined('ABSPATH') || exit;

add_action('woocommerce_thankyou', function ($order_id) {
    $order = $order_id ? wc_get_order($order_id) : null;
    if (!$order || $order->has_status('failed') || !defined('EBTB_SITE_URL')) {
        return;
    }
    $url = untrailingslashit(EBTB_SITE_URL) . '/?rendeles=kesz';
    printf(
        '<p class="ebtb-return"><a class="button" href="%s">Vissza az EBTB-re</a></p>',
        esc_url($url)
    );
}, 5);
