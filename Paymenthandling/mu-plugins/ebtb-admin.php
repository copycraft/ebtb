<?php
/**
 * Plugin Name: EBTB lean admin
 * Description: WordPress here only runs the shop — the site is Next.js. The admin shows orders, products, coupons, media and the store settings; everything else is hidden.
 *
 * Need the full admin (plugins, themes, users…)? define('EBTB_FULL_ADMIN', true) in wp-config.php (Docker: EBTB_FULL_ADMIN=1 in Paymenthandling/.env).
 */

defined('ABSPATH') || exit;

if (defined('EBTB_FULL_ADMIN') && EBTB_FULL_ADMIN) {
    return;
}

function ebtb_orders_admin_url()
{
    $hpos = class_exists('Automattic\WooCommerce\Utilities\OrderUtil')
        && Automattic\WooCommerce\Utilities\OrderUtil::custom_orders_table_usage_is_enabled();
    return admin_url($hpos ? 'admin.php?page=wc-orders' : 'edit.php?post_type=shop_order');
}

// --- Menu: keep Orders, Products, Coupons, Media, WooCommerce › Customers/Settings.
add_action('admin_menu', function () {
    $hidden = [
        'index.php',                    // Dashboard — login lands on Orders instead
        'edit.php',                     // Posts
        'edit.php?post_type=page',      // Pages (the checkout pages exist but are managed in code)
        'edit-comments.php',
        'themes.php',
        'plugins.php',
        'users.php',
        'tools.php',
        'options-general.php',
        'wc-admin&path=/analytics/overview',
        'woocommerce-marketing',
        'admin.php?page=wc-settings&tab=checkout&from=PAYMENTS_MENU_ITEM', // also under WooCommerce › Settings › Payments
    ];
    foreach ($hidden as $slug) {
        remove_menu_page($slug);
    }
    foreach (['wc-admin', 'wc-reports', 'wc-status', 'wc-admin&path=/extensions', 'wc-addons'] as $slug) {
        remove_submenu_page('woocommerce', $slug);
    }
    foreach (['product_brand', 'product_tag'] as $taxonomy) {
        remove_submenu_page('edit.php?post_type=product', "edit-tags.php?taxonomy=$taxonomy&amp;post_type=product");
    }
    remove_submenu_page('edit.php?post_type=product', 'product-reviews');
}, PHP_INT_MAX);

// --- Screens behind the hidden menus send you to Orders instead of a half-hidden admin.
add_action('current_screen', function ($screen) {
    $blocked_bases = ['dashboard', 'edit-comments', 'themes', 'plugins', 'users', 'tools', 'options-general', 'options-writing',
        'options-reading', 'options-discussion', 'options-media', 'options-permalink', 'options-privacy', 'site-health', 'import', 'export'];
    $blocked_types = ['post', 'page'];
    if (in_array($screen->base, $blocked_bases, true)
        || (in_array($screen->base, ['edit', 'post'], true) && in_array($screen->post_type, $blocked_types, true))) {
        wp_safe_redirect(ebtb_orders_admin_url());
        exit;
    }
});

add_filter('login_redirect', fn() => ebtb_orders_admin_url());

// --- Admin bar: no WP logo, comments, "new post/page", updates or search.
add_action('admin_bar_menu', function ($bar) {
    foreach (['wp-logo', 'comments', 'new-post', 'new-page', 'new-user', 'updates', 'customize', 'search', 'woocommerce-site-visibility-badge'] as $node) {
        $bar->remove_node($node);
    }
}, PHP_INT_MAX);

// --- No comments or reviews anywhere: the site has none.
add_filter('comments_open', '__return_false', 20);
add_filter('pings_open', '__return_false', 20);
add_filter('woocommerce_product_tabs', function ($tabs) {
    unset($tabs['reviews']);
    return $tabs;
}, 98);

// --- Quieter screens: no WooCommerce marketing/suggestion boxes.
add_filter('woocommerce_allow_marketplace_suggestions', '__return_false');
add_filter('woocommerce_admin_features', fn($features) => array_values(array_diff($features, ['marketing', 'analytics', 'remote-inbox-notifications'])));
