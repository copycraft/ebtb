<?php
/**
 * Plugin Name: EBTB products for the site
 * Description: WooCommerce is the product source for the Next.js site. Adds the site-only fields (claim, badge, color, ingredients, facts)
 * to the product editor, serves the catalog at /wp-json/ebtb/v1/products, and tells the site to refresh when a product changes.
 *
 * Site fields map onto Woo's own where one exists: name, slug, price, weight (g), short description (lead paragraph),
 * product image + gallery (photos), menu order (shop order).
 * Optional wp-config constants: EBTB_REVALIDATE_URL (site origin as seen from this server), EBTB_REVALIDATE_SECRET.
 */

defined('ABSPATH') || exit;

const EBTB_TONES = [
    'blaze' => 'Paprika (narancspiros)',
    'garlic' => 'Fokhagyma (sárga)',
    'onion' => 'Hagyma (lila)',
    'scallion' => 'Snidling (zöld)',
    'cream' => 'Szezám (krém)',
];

// --- Editor: "EBTB weboldal" box on the product screen.
add_action('add_meta_boxes_product', function () {
    add_meta_box('ebtb-site', 'EBTB weboldal', 'ebtb_product_box', 'product', 'normal', 'high');
});

function ebtb_product_box($post)
{
    wp_nonce_field('ebtb_product_save', 'ebtb_product_nonce');
    $v = fn($key) => get_post_meta($post->ID, "_ebtb_$key", true);
    $tone = $v('tone') ?: 'blaze';
    ?>
    <style>
        .ebtb-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 20px; }
        .ebtb-fields label { display: block; font-weight: 600; margin-bottom: 4px; }
        .ebtb-fields .wide { grid-column: 1 / -1; }
        .ebtb-fields input[type=text], .ebtb-fields select, .ebtb-fields textarea { width: 100%; }
        .ebtb-fields .description { margin-top: 4px; }
    </style>
    <p>Ezek csak a weboldalon jelennek meg. A <strong>rövid leírás</strong> a termékoldal bevezetője, a <strong>termékkép</strong> és a <strong>galéria</strong> a fotók, a <strong>súly</strong> (gramm) a kiszerelés.</p>
    <div class="ebtb-fields">
        <p>
            <label for="ebtb_claim">Szlogen</label>
            <input type="text" id="ebtb_claim" name="ebtb_claim" value="<?php echo esc_attr($v('claim')); ?>" placeholder="Az eredeti. Nulla bagel.">
            <span class="description">A termékkártyán a név alatt.</span>
        </p>
        <p>
            <label for="ebtb_badge">Matrica</label>
            <input type="text" id="ebtb_badge" name="ebtb_badge" value="<?php echo esc_attr($v('badge')); ?>" placeholder="Új, Legkelendőbb…">
            <span class="description">Üresen hagyva nincs matrica.</span>
        </p>
        <p>
            <label for="ebtb_tone">Szín</label>
            <select id="ebtb_tone" name="ebtb_tone">
                <?php foreach (EBTB_TONES as $key => $label) : ?>
                    <option value="<?php echo esc_attr($key); ?>" <?php selected($tone, $key); ?>><?php echo esc_html($label); ?></option>
                <?php endforeach; ?>
            </select>
            <span class="description">A kártya és a termékoldal háttérszíne.</span>
        </p>
        <p>
            <label for="ebtb_facts">Tények</label>
            <textarea id="ebtb_facts" name="ebtb_facts" rows="4" placeholder="65 G&#10;VEGÁN"><?php echo esc_textarea($v('facts')); ?></textarea>
            <span class="description">Soronként egy, a termékoldalon az ár alatt.</span>
        </p>
        <p class="wide">
            <label for="ebtb_ingredients">Összetevők</label>
            <textarea id="ebtb_ingredients" name="ebtb_ingredients" rows="3"><?php echo esc_textarea($v('ingredients')); ?></textarea>
        </p>
    </div>
    <?php
}

add_action('save_post_product', function ($post_id) {
    if (!isset($_POST['ebtb_product_nonce']) || !wp_verify_nonce(sanitize_key($_POST['ebtb_product_nonce']), 'ebtb_product_save')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE || !current_user_can('edit_post', $post_id)) {
        return;
    }
    $text = fn($key) => sanitize_text_field(wp_unslash($_POST["ebtb_$key"] ?? ''));
    $long = fn($key) => sanitize_textarea_field(wp_unslash($_POST["ebtb_$key"] ?? ''));
    $tone = $text('tone');
    update_post_meta($post_id, '_ebtb_claim', $text('claim'));
    update_post_meta($post_id, '_ebtb_badge', $text('badge'));
    update_post_meta($post_id, '_ebtb_tone', isset(EBTB_TONES[$tone]) ? $tone : 'blaze');
    update_post_meta($post_id, '_ebtb_facts', $long('facts'));
    update_post_meta($post_id, '_ebtb_ingredients', $long('ingredients'));
});

// --- API: GET /wp-json/ebtb/v1/products — the published, visible catalog in shop order.
add_action('rest_api_init', function () {
    register_rest_route('ebtb/v1', '/products', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function () {
            $products = wc_get_products([
                'status' => 'publish',
                'visibility' => 'catalog',
                'type' => ['simple'],
                'limit' => -1,
                'orderby' => ['menu_order' => 'ASC', 'title' => 'ASC'],
            ]);
            return rest_ensure_response(array_values(array_map('ebtb_product_json', $products)));
        },
    ]);
});

function ebtb_image_json($attachment_id)
{
    $large = wp_get_attachment_image_src($attachment_id, 'woocommerce_single');
    $thumb = wp_get_attachment_image_src($attachment_id, 'woocommerce_thumbnail');
    if (!$large) {
        return null;
    }
    return [
        'src' => $large[0],
        'width' => (int) $large[1],
        'height' => (int) $large[2],
        'thumb' => $thumb ? $thumb[0] : $large[0],
        'alt' => trim((string) get_post_meta($attachment_id, '_wp_attachment_image_alt', true)) ?: get_the_title($attachment_id),
    ];
}

function ebtb_product_json(WC_Product $p)
{
    $meta = fn($key) => (string) $p->get_meta("_ebtb_$key");
    $lines = fn($key) => array_values(array_filter(array_map('trim', explode("\n", $meta($key)))));
    $image_ids = array_filter(array_merge([$p->get_image_id()], $p->get_gallery_image_ids()));
    $weight = $p->get_weight();

    return [
        'id' => $p->get_id(),
        'slug' => $p->get_slug(),
        'name' => $p->get_name(),
        'price' => (int) round((float) $p->get_price()),
        'regularPrice' => (int) round((float) $p->get_regular_price()),
        'inStock' => $p->is_in_stock(),
        'claim' => $meta('claim'),
        'badge' => $meta('badge') ?: null,
        'tone' => $meta('tone') ?: 'blaze',
        'weight' => $weight !== '' ? wc_format_localized_decimal($weight) . ' ' . get_option('woocommerce_weight_unit', 'g') : '',
        'description' => trim(wp_strip_all_tags($p->get_short_description())),
        'ingredients' => $meta('ingredients'),
        'facts' => $lines('facts'),
        'images' => array_values(array_filter(array_map('ebtb_image_json', $image_ids))),
    ];
}

// --- Refresh the site when the catalog changes (one ping per request, sent after the response).
function ebtb_queue_revalidate($post_id = 0)
{
    if ($post_id && get_post_type($post_id) !== 'product') {
        return;
    }
    if (!has_action('shutdown', 'ebtb_send_revalidate')) {
        add_action('shutdown', 'ebtb_send_revalidate');
    }
}

function ebtb_send_revalidate()
{
    $base = defined('EBTB_REVALIDATE_URL') && EBTB_REVALIDATE_URL ? EBTB_REVALIDATE_URL : (defined('EBTB_SITE_URL') ? EBTB_SITE_URL : '');
    if (!$base || !defined('EBTB_REVALIDATE_SECRET') || !EBTB_REVALIDATE_SECRET) {
        return;
    }
    wp_remote_post(untrailingslashit($base) . '/api/revalidate', [
        'headers' => ['x-ebtb-secret' => EBTB_REVALIDATE_SECRET],
        'timeout' => 3,
        'blocking' => false,
    ]);
}

add_action('woocommerce_new_product', 'ebtb_queue_revalidate');
add_action('woocommerce_update_product', 'ebtb_queue_revalidate');
add_action('woocommerce_product_set_stock_status', 'ebtb_queue_revalidate');
add_action('trashed_post', 'ebtb_queue_revalidate');
add_action('untrashed_post', 'ebtb_queue_revalidate');
add_action('before_delete_post', 'ebtb_queue_revalidate');
add_action('save_post_product', 'ebtb_queue_revalidate'); // the EBTB box saves meta outside the WC_Product save
