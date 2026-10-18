<?php
defined( 'ABSPATH' ) || exit;

/**
 * Checkout admin options.
 */
class FluidCheckout_Admin extends FluidCheckout {

	/**
	 * __construct function.
	 */
	public function __construct() {
		$this->hooks();
	}



	/**
	 * Initialize hooks.
	 */
	public function hooks() {
		// Plugin settings link
		add_filter( 'plugin_action_links_' . self::$plugin_basename, array( $this, 'add_plugin_settings_link' ), 10 );
		
		// Load dashboard
		add_action( 'init', array( $this, 'load_dashboard' ), 10 );

		// Setting types
		add_action( 'init', array( $this, 'load_setting_types' ), 10 );

		// WooCommerce Settings
		add_filter( 'woocommerce_get_settings_pages', array( $this, 'add_settings_pages' ), 50 );
		add_filter( 'woocommerce_get_settings_fc_checkout', array( $this, 'remove_unavailable_settings' ), 1000 );

		// WooCommerce Settings Styles
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_styles' ), 10 );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_dashboard_styles' ), 10 );

		// Clear cache after saving settings
		add_action( 'woocommerce_settings_saved', array( $this, 'flush_cache' ), 10 );
	}



	/**
	 * Enqueue styles for the current admin settings page.
	 *
	 * @param int $hook_suffix Hook suffix for the current admin page.
	 */
	public function enqueue_admin_styles( $hook_suffix ) {
		// Bail if not on WooCommerce settings page
		if ( $hook_suffix !== 'woocommerce_page_wc-settings' ) { return; }

		wp_enqueue_style( 'fc-admin-options', FluidCheckout_Enqueue::instance()->get_style_url( 'css/admin-options' ), NULL, NULL );
	}

	/**
	 * Enqueue styles for the current admin settings page.
	 *
	 * @param int $hook_suffix Hook suffix for the current admin page.
	 */
	public function enqueue_admin_dashboard_styles( $hook_suffix ) {
		// Get current screen
		$current_screen = get_current_screen();

		// Bail if not on WooCommerce settings page
		if ( $current_screen->id !== 'woocommerce_page_wc-settings' ) { return; }
		
		// Get current tab and section
		$current_tab = isset( $_GET['tab'] ) ? sanitize_text_field( wp_unslash( $_GET['tab'] ?? '' ) ) : 'general';
		$current_section = isset( $_GET['section'] ) ? sanitize_text_field( wp_unslash( $_GET['section'] ?? '' ) ) : '';

		// Bail if not on dashboard settings page
		if ( 'fc_checkout' !== $current_tab || ! empty( $current_section ) ) { return; }

		wp_enqueue_style( 'fc-admin-dashboard', FluidCheckout_Enqueue::instance()->get_style_url( 'css/admin-dashboard' ), NULL, NULL );
	}



	/**
	 * Load dashboard section types.
	 */
	public function load_dashboard() {
		include_once self::$directory_path . 'inc/admin/admin-dashboard-actions.php';
		include_once self::$directory_path . 'inc/admin/admin-setting-type-fc-setup.php';
		include_once self::$directory_path . 'inc/admin/admin-setting-type-fc-addons.php';
	}

	/**
	 * Load custom setting field types.
	 */
	public function load_setting_types() {
		// Maybe add license key field type, if not already added
		if ( ! apply_filters( 'fc_admin_field_type_license_exists', false ) ) {
			include_once self::$directory_path . 'inc/admin/admin-setting-type-fc-license-key.php';

			// Set field type as existent so it won't be loaded again
			add_filter( 'fc_admin_field_type_license_exists', '__return_true', 10 );
		}

		// Load settings field types
		include_once self::$directory_path . 'inc/admin/admin-setting-type-fc-paragraph.php';
		include_once self::$directory_path . 'inc/admin/admin-setting-type-fc-input.php';
		include_once self::$directory_path . 'inc/admin/admin-setting-type-fc-select.php';
		include_once self::$directory_path . 'inc/admin/admin-setting-type-fc-multiselect.php';
		include_once self::$directory_path . 'inc/admin/admin-setting-type-fc-textarea.php';
		include_once self::$directory_path . 'inc/admin/admin-setting-type-fc-layout-selector.php';
		include_once self::$directory_path . 'inc/admin/admin-setting-type-fc-template-selector.php';
		include_once self::$directory_path . 'inc/admin/admin-setting-type-fc-image-uploader.php';
	}

	/**
	 * Add new WooCommerce settings pages/tabs.
	 */
	public function add_settings_pages( $settings ) {
		// `$settings` need to be an array
		if ( ! is_array( $settings ) ) { $settings = array( $settings ); }

		// Maybe add settings tab if not already added
		if ( ! apply_filters( 'fc_admin_tab_fluidcheckout_exists', false ) ) {
			$settings[] = include self::$directory_path . 'inc/admin/admin-tab-fluid-checkout.php';

			// Set admin tab as existent so it won't be loaded again
			add_filter( 'fc_admin_tab_fluidcheckout_exists', '__return_true', 10 );
		}

		// Load settings pages
		$settings[] = include self::$directory_path . 'inc/admin/admin-settings-wc-shipping.php';
		$settings[] = include self::$directory_path . 'inc/admin/admin-settings-dashboard.php';
		$settings[] = include self::$directory_path . 'inc/admin/admin-settings-checkout.php';
		$settings[] = include self::$directory_path . 'inc/admin/admin-settings-cart.php';
		$settings[] = include self::$directory_path . 'inc/admin/admin-settings-order-received.php';
		$settings[] = include self::$directory_path . 'inc/admin/admin-settings-integrations.php';
		$settings[] = include self::$directory_path . 'inc/admin/admin-settings-tools.php';

		// Order pay and license keys sections only have options for PRO and add-ons
		if ( FluidCheckout::instance()->is_pro_activated() ) {
			$settings[] = include self::$directory_path . 'inc/admin/admin-settings-order-pay.php';
			$settings[] = include self::$directory_path . 'inc/admin/admin-settings-license-keys.php';
		}

		return $settings;
	}



	/**
	 * Remove settings and options that are marked as disabled, which are only available with the PRO plugin.
	 * Also removes settings sections left without any settings.
	 *
	 * @param   array  $settings  Array with all settings for the current section.
	 */
	public function remove_unavailable_settings( $settings ) {
		// Bail if PRO is activated, as it handles those settings
		if ( FluidCheckout::instance()->is_pro_activated() ) { return $settings; }

		// Bail if settings are not valid
		if ( ! is_array( $settings ) ) { return $settings; }

		$filtered_settings = array();
		foreach ( $settings as $setting ) {
			// Keep invalid settings unchanged
			if ( ! is_array( $setting ) ) {
				$filtered_settings[] = $setting;
				continue;
			}

			$type = array_key_exists( 'type', $setting ) ? $setting[ 'type' ] : '';

			// Skip disabled settings
			if ( array_key_exists( 'disabled', $setting ) && true === $setting[ 'disabled' ] ) { continue; }

			// Remove disabled options
			if ( array_key_exists( 'options', $setting ) && is_array( $setting[ 'options' ] ) ) {
				$setting[ 'options' ] = array_filter( $setting[ 'options' ], function( $option ) {
					return ! ( is_array( $option ) && array_key_exists( 'disabled', $option ) && true === $option[ 'disabled' ] );
				} );

				// Skip settings left with a single option, as there is nothing to choose from
				if ( count( $setting[ 'options' ] ) <= 1 && in_array( $type, array( 'fc_select', 'fc_layout_selector', 'fc_template_selector' ) ) ) {
					// Close layout selector groups on the previous setting when removing the last setting of the group
					if ( array_key_exists( 'fc_layout_group', $setting ) && 'end' === $setting[ 'fc_layout_group' ] && ! empty( $filtered_settings ) ) {
						$last_index = count( $filtered_settings ) - 1;
						if ( is_array( $filtered_settings[ $last_index ] ) && array_key_exists( 'fc_layout_group', $filtered_settings[ $last_index ] ) ) {
							$filtered_settings[ $last_index ][ 'fc_layout_group' ] = 'start' === $filtered_settings[ $last_index ][ 'fc_layout_group' ] ? '' : 'end';
						}
					}

					continue;
				}
			}

			// Skip sections left empty, removing the section title already added
			if ( 'sectionend' === $type ) {
				$last_setting = end( $filtered_settings );
				if ( is_array( $last_setting ) && array_key_exists( 'type', $last_setting ) && 'title' === $last_setting[ 'type' ] ) {
					array_pop( $filtered_settings );
					continue;
				}
			}

			$filtered_settings[] = $setting;
		}

		return $filtered_settings;
	}



	/**
	 * Add settings page link to plugin listing.
	 * @param array $links
	 */
	public function add_plugin_settings_link( $links = array() ) {
		// Add links before existing ones
		$new_links = array(
			sprintf( '<a href="%s">%s</a>', admin_url( 'admin.php?page=wc-settings&tab=fc_checkout' ), esc_html( __( 'Settings', 'fluid-checkout' ) ) ),
			sprintf( '<a href="%s" target="_blank">%s</a>', 'https://fluidcheckout.com/support/', esc_html( __( 'Support', 'fluid-checkout' ) ) ),
		);

		$links = array_merge( $new_links, $links );

		return $links;
	}



	/**
	 * Get HTML for "upgrade to PRO" to be used on settings descriptions.
	 * Upgrade messages are no longer displayed, PRO-only settings are removed instead.
	 *
	 * @param  bool  $newline  Whether to add a new line before.
	 */
	public function get_upgrade_pro_html( $newline = true ) {
		return '';
	}

	/**
	 * Get HTML for PRO features label.
	 * PRO labels are no longer displayed, PRO-only options are removed instead.
	 *
	 * @param  bool  $add_space_after  Whether to add a space after the text. Defaults to `false`, which adds the space before.
	 */
	public function get_pro_feature_option_html( $add_space_after = false ) {
		return '';
	}

	/**
	 * Get HTML for Experimental features label.
	 * 
	 * @param  bool  $newline  Whether to add a new line before.
	 */
	public function get_experimental_feature_html( $newline = false ) {
		return ' ' . ( $newline ? '<br>' : '' ) . __( '(experimental)', 'fluid-checkout' );
	}

	/**
	 * Get HTML experimental features explanation.
	 * 
	 * @param  bool  $newline  Whether to add a new line before.
	 */
	public function get_experimental_feature_explanation_html( $newline = false ) {		
		return ' ' . ( $newline ? '<br>' : '' ) . __( 'This is an experimental feature and may not work as expected in all setups. Use it with caution.', 'fluid-checkout' );
	}

	/**
	 * Get HTML for documentation link to be used on settings descriptions.
	 */
	public function get_documentation_link_html( $url = 'https://fluidcheckout.com/docs/' ) {
		return sprintf( '<a target="_blank" href="%s">%s</a>', esc_url( $url ), __( 'Read the documentation.', 'fluid-checkout' ) );
	}



	/**
	 * Encloses the function `wp_cache_flush()` to ensure no parameter is passed into it.
	 */
	public function flush_cache() {
		wp_cache_flush();
	}

}

FluidCheckout_Admin::instance();
