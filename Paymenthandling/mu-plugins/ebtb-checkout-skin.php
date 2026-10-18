<?php
/**
 * Plugin Name: EBTB checkout skin
 * Description: Dresses the Fluid Checkout pages in the EBTB design system and keeps shoppers on the Next.js site for everything else.
 *
 * Styles: ebtb-skin/checkout.css (tokens copied from styles/ds/tokens in the Next.js repo).
 * Set EBTB_SITE_URL in wp-config.php (no trailing slash).
 */

defined('ABSPATH') || exit;

function ebtb_site_url($path = '/')
{
    $base = defined('EBTB_SITE_URL') ? untrailingslashit(EBTB_SITE_URL) : home_url();
    return $base . $path;
}

/** Store pages the shopper may see here. Everything else lives on the Next.js site. */
function ebtb_is_store_page()
{
    return is_checkout() || is_account_page() || is_wc_endpoint_url() || is_page('megrendeles-kovetese');
}

// --- Only the checkout lives here: cart → the site's bag, shop/product/blog pages → the site.
add_action('template_redirect', function () {
    if (is_admin() || wp_doing_ajax() || isset($_GET['ebtb_cart']) || isset($_GET['wc-ajax']) || is_preview()) {
        return;
    }
    if (function_exists('is_cart') && is_cart()) {
        wp_redirect(ebtb_site_url('/?kosar=nyit'));
        exit;
    }
    // ÁSZF / privacy pages exist so WooCommerce shows the terms checkbox; the real text is on the site.
    $legal = [wc_terms_and_conditions_page_id() => '/aszf', (int) get_option('wp_page_for_privacy_policy') => '/adatvedelem'];
    foreach ($legal as $page_id => $path) {
        if ($page_id && is_page($page_id)) {
            wp_redirect(ebtb_site_url($path));
            exit;
        }
    }
    if (function_exists('is_checkout') && !ebtb_is_store_page()) {
        wp_redirect(ebtb_site_url('/'));
        exit;
    }
}, 20); // after the cart handoff (priority 10)

// --- Assets.
add_action('wp_enqueue_scripts', function () {
    if (!ebtb_is_store_page()) {
        return;
    }
    wp_enqueue_style('ebtb-fonts', 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700;900&family=Bagel+Fat+One&family=DM+Mono:wght@400;500&display=swap', [], null);
    $file = WPMU_PLUGIN_DIR . '/ebtb-skin/checkout.css';
    wp_enqueue_style('ebtb-checkout', WPMU_PLUGIN_URL . '/ebtb-skin/checkout.css', [], file_exists($file) ? filemtime($file) : null);
}, 999);

add_filter('body_class', function ($classes) {
    if (ebtb_is_store_page()) {
        $classes[] = 'ebtb-skin';
    }
    return $classes;
});

// --- Header: ticker, wordmark back to the site, "back to shop" pill.
function ebtb_ticker()
{
    $items = ['Ingyenes szállítás 15 000 Ft-tól', 'Két munkanapon belül feladjuk', 'Biztonságos pénztár'];
    $run = array_merge($items, $items, $items, $items, $items, $items);
    echo '<div class="ebtb-ticker" aria-hidden="true"><div class="ebtb-ticker__track">';
    foreach ($run as $item) {
        echo '<span>' . esc_html($item) . '</span><span class="ebtb-ticker__sep">✳</span>';
    }
    echo '</div></div>';
}

function ebtb_wordmark()
{
    printf('<a href="%s" class="custom-logo-link ebtb-wordmark" rel="home" aria-label="EBTB — főoldal">EBTB</a>', esc_url(ebtb_site_url('/')));
}

function ebtb_header_extra($back_label = '← Vissza a kosárhoz', $back_path = '/?kosar=nyit')
{
    printf(
        '<div class="ebtb-header-extra"><span class="ebtb-secure">%s Pénztár</span><a class="ebtb-back" href="%s">%s</a></div>',
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
        esc_url(ebtb_site_url($back_path)),
        esc_html($back_label)
    );
}

add_action('fc_checkout_header', 'ebtb_ticker', 5);
add_filter('fc_checkout_header_logo_home_url', fn() => ebtb_site_url('/'));
add_action('fc_checkout_header_logo', 'ebtb_wordmark');
add_action('fc_checkout_header_widgets', fn() => ebtb_header_extra());

// --- Thank-you page: Fluid Checkout Lite leaves it to the theme, so it gets our own lean template.
add_filter('template_include', function ($template) {
    if (function_exists('is_order_received_page') && is_order_received_page()) {
        return WPMU_PLUGIN_DIR . '/ebtb-skin/order-received.php';
    }
    return $template;
}, 200);

// --- Once free home delivery applies, drop the paid home-delivery rate (pickup points stay).
add_filter('woocommerce_package_rates', function ($rates) {
    $free = array_filter($rates, fn($r) => $r->get_method_id() === 'free_shipping');
    if (!$free) {
        return $rates;
    }
    return array_filter($rates, fn($r) => $r->get_method_id() !== 'flat_rate');
}, 100);

// --- Product thumbnails: the site's colored tiles instead of Woo's grey placeholder.
function ebtb_product_tone($product)
{
    $tones = [
        'everything-blend' => 'blaze',
        'extra-fokhagyma' => 'garlic',
        'chili-everything' => 'onion',
        'utantolto' => 'scallion',
    ];
    $sku = $product ? $product->get_sku() : '';
    return $tones[$sku] ?? 'blaze';
}

function ebtb_product_tile($product)
{
    if (!$product || $product->get_image_id()) {
        return null;
    }
    // Wrapped like FC's own thumbnail so the order summary floats it the same way.
    return sprintf('<div class="product-thumbnail"><span class="ebtb-tile ebtb-tile--%s" aria-hidden="true"><span></span></span></div>', esc_attr(ebtb_product_tone($product)));
}

add_filter('woocommerce_cart_item_thumbnail', function ($html, $cart_item) {
    return ebtb_product_tile($cart_item['data'] ?? null) ?? $html;
}, 20, 2);

add_filter('woocommerce_order_item_thumbnail', function ($html, $item) {
    return ebtb_product_tile(is_callable([$item, 'get_product']) ? $item->get_product() : null) ?? $html;
}, 20, 2);
