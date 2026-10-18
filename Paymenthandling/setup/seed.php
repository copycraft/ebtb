<?php
/**
 * Store config + the 4 products, via `wp eval-file`. Product IDs are pinned (101–104) so they match
 * `wooId` in lib/content.ts on every fresh install.
 */

// --- Store basics: Hungary, HUF, gross prices, no taxes.
$options = [
    'woocommerce_default_country' => 'HU',
    'woocommerce_specific_allowed_countries' => ['HU'],
    'woocommerce_allowed_countries' => 'specific',
    'woocommerce_ship_to_countries' => 'specific',
    'woocommerce_specific_ship_to_countries' => ['HU'],
    'woocommerce_currency' => 'HUF',
    'woocommerce_currency_pos' => 'right_space',
    'woocommerce_price_thousand_sep' => ' ',
    'woocommerce_price_decimal_sep' => ',',
    'woocommerce_price_num_decimals' => 0,
    'woocommerce_calc_taxes' => 'no',
    'woocommerce_weight_unit' => 'g',
    'woocommerce_coming_soon' => 'no',
    'woocommerce_store_pages_only' => 'no',
    'woocommerce_enable_guest_checkout' => 'yes',
    'woocommerce_onboarding_profile' => ['skipped' => true],
    'woocommerce_task_list_hidden' => 'yes',
    'woocommerce_show_marketplace_suggestions' => 'no',
];
foreach ($options as $key => $value) {
    update_option($key, $value);
}

// --- Pages. Classic shortcodes: Fluid Checkout and the pickup-point map work on the classic checkout.
WC_Install::create_pages();
foreach (['cart' => '[woocommerce_cart]', 'checkout' => '[woocommerce_checkout]'] as $page => $shortcode) {
    $id = wc_get_page_id($page);
    if ($id > 0) {
        wp_update_post(['ID' => $id, 'post_content' => '<!-- wp:shortcode -->' . $shortcode . '<!-- /wp:shortcode -->']);
    }
}
// Order tracking page for guest order lookup
$tracking_page = get_page_by_path('megrendeles-kovetese');
if (!$tracking_page) {
    $tracking_page_id = wp_insert_post([
        'post_type' => 'page',
        'post_status' => 'publish',
        'post_name' => 'megrendeles-kovetese',
        'post_title' => 'Rendelés követés',
        'post_content' => '<!-- wp:shortcode -->[woocommerce_order_tracking]<!-- /wp:shortcode -->',
    ]);
} else {
    wp_update_post(['ID' => $tracking_page->ID, 'post_content' => '<!-- wp:shortcode -->[woocommerce_order_tracking]<!-- /wp:shortcode -->']);
}
// ÁSZF / privacy live on the Next.js site. Stub pages make WooCommerce show the terms checkbox;
// visiting them redirects to the site (ebtb-checkout-skin.php).
foreach (['woocommerce_terms_page_id' => ['aszf', 'ÁSZF'], 'wp_page_for_privacy_policy' => ['adatvedelem', 'Adatkezelési tájékoztató']] as $option => [$slug, $title]) {
    $page = get_page_by_path($slug);
    $id = $page ? $page->ID : wp_insert_post(['post_type' => 'page', 'post_status' => 'publish', 'post_name' => $slug, 'post_title' => $title]);
    update_option($option, $id);
}
update_option('woocommerce_checkout_privacy_policy_text', 'A megadott adataidat a rendelés teljesítéséhez használjuk. Részletek: [privacy_policy].');
$site = defined('EBTB_SITE_URL') ? untrailingslashit(EBTB_SITE_URL) : 'http://localhost:3000';
update_option('woocommerce_checkout_terms_and_conditions_checkbox_text',
    sprintf('Elolvastam és elfogadom az <a href="%s/aszf" target="_blank">ÁSZF</a>-et és az <a href="%s/adatvedelem" target="_blank">adatkezelési tájékoztatót</a>.', $site, $site));

// --- Products. WooCommerce is the source for the Next.js site (ebtb-products.php serves them at /wp-json/ebtb/v1/products).
// Seeded once; after that edit them in the admin — re-running only fills in products that are missing.
$base = 'Pirított fehér és fekete szezámmag, mák, szárított fokhagyma, szárított hagyma, tengeri só, chilipehely.';
$facts = fn($w, $last) => implode("\n", ["$w G", '6 ÖSSZETEVŐ', 'VEGÁN', $last]);
$products = [
    101 => ['sku' => 'everything-blend', 'name' => 'Everything Blend', 'price' => 3490, 'weight' => 65,
        'short' => 'A keverék, amivel minden kezdődött. Pirítva, durvára törve, és még azon a héten tégelybe zárva — ezért még illata is van.',
        'claim' => 'Az eredeti. Nulla bagel.', 'badge' => 'Legkelendőbb', 'tone' => 'blaze',
        'ingredients' => "$base Semmi más — se csomósodásgátló, se cukor, se bagel.", 'facts' => $facts(65, 'GLUTÉNMENTES')],
    102 => ['sku' => 'extra-fokhagyma', 'name' => 'Extra Fokhagyma', 'price' => 3790, 'weight' => 65,
        'short' => 'Ugyanaz az alap, dupla adag pirított fokhagymával. Túróra, pirítósra, és mindenre, ami nem fél tőle.',
        'claim' => 'Akik komolyan gondolják.', 'badge' => '', 'tone' => 'garlic',
        'ingredients' => "$base Dupla adag szárított fokhagyma.", 'facts' => $facts(65, 'GLUTÉNMENTES')],
    103 => ['sku' => 'chili-everything', 'name' => 'Chili Everything', 'price' => 3790, 'weight' => 65,
        'short' => 'Az eredeti keverék több chilipehellyel. Nem éget, csak a végén szól vissza.',
        'claim' => 'Az alap, lassú csípősséggel.', 'badge' => 'Új', 'tone' => 'onion',
        'ingredients' => "$base Bővebb adag chilipehely.", 'facts' => $facts(65, 'CSÍPŐS')],
    104 => ['sku' => 'utantolto', 'name' => 'Utántöltő', 'price' => 6990, 'weight' => 250,
        'short' => 'Az Everything Blend 250 grammos tasakban. Töltsd vissza a tégelyt, ne vegyél újat.',
        'claim' => 'Négyszer annyi, kevesebb szemét.', 'badge' => '', 'tone' => 'scallion',
        'ingredients' => "$base Semmi más.", 'facts' => $facts(250, 'VISSZAZÁRHATÓ')],
];
$order = 0;
foreach ($products as $id => $p) {
    $order++;
    $product = wc_get_product($id);
    $fresh = !$product || !$product->get_meta('_ebtb_tone');
    if (!$product) {
        if (get_post($id)) {
            WP_CLI::error("Post ID $id is taken by something that isn't a product — reset the volumes (docker compose down -v).");
        }
        wp_insert_post(['import_id' => $id, 'post_type' => 'product', 'post_status' => 'publish', 'post_title' => $p['name']]);
        wp_set_object_terms($id, 'simple', 'product_type');
        $product = wc_get_product($id);
    }
    if (!$fresh) {
        WP_CLI::log("Product #$id {$p['name']} — already set up, left as edited");
        continue;
    }
    $product->set_name($p['name']);
    $product->set_sku($p['sku']);
    $product->set_regular_price((string) $p['price']);
    $product->set_weight((string) $p['weight']);
    $product->set_short_description($p['short']);
    $product->set_menu_order($order);
    $product->set_manage_stock(false);
    $product->set_stock_status('instock');
    $product->set_reviews_allowed(false);
    $product->set_status('publish');
    foreach (['claim', 'badge', 'tone', 'ingredients', 'facts'] as $key) {
        $product->update_meta_data("_ebtb_$key", $p[$key]);
    }
    $product->save();
    WP_CLI::log("Product #$id {$p['name']} — {$p['price']} Ft");
}

// --- Shipping: Hungary zone with GLS home delivery, free above 15 000 Ft, and the pickup-point map.
$zone = null;
foreach (WC_Shipping_Zones::get_zones() as $z) {
    if ($z['zone_name'] === 'Magyarország') {
        $zone = new WC_Shipping_Zone($z['id']);
    }
}
if (!$zone) {
    $zone = new WC_Shipping_Zone();
    $zone->set_zone_name('Magyarország');
    $zone->add_location('HU', 'country');
    $zone->save();
}
$have = array_map(fn($m) => $m->id, $zone->get_shipping_methods());
if (!in_array('flat_rate', $have, true)) {
    $iid = $zone->add_shipping_method('flat_rate');
    update_option("woocommerce_flat_rate_{$iid}_settings", ['title' => 'Házhozszállítás (GLS)', 'cost' => '1490', 'tax_status' => 'none']);
}
if (!in_array('free_shipping', $have, true)) {
    $iid = $zone->add_shipping_method('free_shipping');
    update_option("woocommerce_free_shipping_{$iid}_settings", ['title' => 'Ingyenes házhozszállítás', 'requires' => 'min_amount', 'min_amount' => '15000']);
}
if (!in_array('vp_pont', $have, true)) {
    $zone->add_shipping_method('vp_pont');
}

// Pickup points: what the plugin's setup wizard would save.
$providers = ['foxpost_foxpost', 'postapont_postapont', 'packeta_zbox'];
update_option('vp_woo_pont_enabled_providers', $providers);
update_option('vp_woo_pont_pricing', array_map(fn($p) => ['cost' => '990', 'conditional' => false, 'providers' => [$p]], $providers));
update_option('woocommerce_vp_pont_settings', array_merge((array) get_option('woocommerce_vp_pont_settings', []), [
    'title' => 'Csomagpont',
    'cost' => '990',
    'free_shipping_overwrite' => 'yes',
]));
update_option('_vp_woo_pont_walkthrough_finished', true);
if (class_exists('VP_Woo_Pont_Import_Database')) {
    VP_Woo_Pont_Import_Database::schedule_actions(); // downloads the point lists on the next cron run
}

// --- Payments: only the dummy gateway.
foreach (['bacs', 'cheque', 'cod', 'paypal'] as $gw) {
    $s = get_option("woocommerce_{$gw}_settings", []);
    if ($s) {
        $s['enabled'] = 'no';
        update_option("woocommerce_{$gw}_settings", $s);
    }
}
update_option('woocommerce_ebtb_dummy_settings', array_merge((array) get_option('woocommerce_ebtb_dummy_settings', []), ['enabled' => 'yes']));
update_option('woocommerce_gateway_order', ['ebtb_dummy' => 0]);

flush_rewrite_rules();
WP_CLI::success('Store seeded.');
