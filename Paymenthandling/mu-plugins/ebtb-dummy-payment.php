<?php
/**
 * Plugin Name: EBTB dummy payment
 * Description: Test-only WooCommerce gateway. No money moves: the shopper picks "paid" or "declined" and the order follows.
 *
 * DEV ONLY — never ship this to the live store.
 */

defined('ABSPATH') || exit;

add_action('plugins_loaded', function () {
    if (!class_exists('WC_Payment_Gateway')) {
        return;
    }

    class EBTB_Dummy_Gateway extends WC_Payment_Gateway
    {
        public function __construct()
        {
            $this->id = 'ebtb_dummy';
            $this->method_title = 'EBTB tesztfizetés';
            $this->method_description = 'Álfizetés fejlesztéshez. Nem terhel semmit.';
            $this->has_fields = true;
            $this->supports = ['products'];

            $this->init_form_fields();
            $this->init_settings();
            $this->title = $this->get_option('title');
            $this->description = $this->get_option('description');
            $this->enabled = $this->get_option('enabled');

            add_action('woocommerce_update_options_payment_gateways_' . $this->id, [$this, 'process_admin_options']);
        }

        public function init_form_fields()
        {
            $this->form_fields = [
                'enabled' => ['title' => 'Bekapcsolva', 'type' => 'checkbox', 'label' => 'Tesztfizetés engedélyezése', 'default' => 'yes'],
                'title' => ['title' => 'Cím', 'type' => 'text', 'default' => 'Bankkártya (TESZT)'],
                'description' => ['title' => 'Leírás', 'type' => 'textarea', 'default' => 'Tesztüzem — valódi terhelés nem történik.'],
            ];
        }

        public function payment_fields()
        {
            echo wpautop(wp_kses_post($this->description));
            ?>
            <fieldset id="ebtb-dummy-fields">
                <p class="form-row form-row-wide">
                    <label><input type="radio" name="ebtb_dummy_outcome" value="paid" checked> Sikeres fizetés</label><br>
                    <label><input type="radio" name="ebtb_dummy_outcome" value="declined"> Elutasított kártya</label>
                </p>
            </fieldset>
            <?php
        }

        public function process_payment($order_id)
        {
            $order = wc_get_order($order_id);
            $outcome = isset($_POST['ebtb_dummy_outcome']) ? sanitize_key(wp_unslash($_POST['ebtb_dummy_outcome'])) : 'paid'; // phpcs:ignore WordPress.Security.NonceVerification -- checkout already verified the nonce

            if ($outcome === 'declined') {
                $order->update_status('failed', 'Tesztfizetés: elutasítva.');
                wc_add_notice('A kártyát elutasították (teszt). Próbáld újra „Sikeres fizetés”-sel.', 'error');
                return ['result' => 'failure'];
            }

            $order->payment_complete('DUMMY-' . $order_id . '-' . time());
            $order->add_order_note('Tesztfizetés: sikeres. Nem történt valódi terhelés.');
            WC()->cart->empty_cart();

            return ['result' => 'success', 'redirect' => $this->get_return_url($order)];
        }
    }

    add_filter('woocommerce_payment_gateways', function ($gateways) {
        $gateways[] = 'EBTB_Dummy_Gateway';
        return $gateways;
    });
}, 11);
