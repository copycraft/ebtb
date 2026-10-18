<?php
defined( 'ABSPATH' ) || exit;

/**
 * Cart page optimizations.
 */
class FluidCheckout_CartPage extends FluidCheckout {

	/**
	 * __construct function.
	 */
	public function __construct() {
		$this->hooks();
	}



	/**
	 * Check whether the feature is enabled or not.
	 */
	public function is_feature_enabled() {
		return 'yes' === FluidCheckout_Settings::instance()->get_option( 'fc_pro_enable_cart_page' );
	}



	/**
	 * Initialize hooks.
	 */
	public function hooks() {
		// Bail if feature is not enabled
		if ( ! $this->is_feature_enabled() ) { return; }

		// General
		add_filter( 'body_class', array( $this, 'add_body_class' ), 10 );
		add_filter( 'fc_is_design_template_page', array( $this, 'maybe_set_design_template_page' ), 10 );

		// Assets
		add_action( 'wp_enqueue_scripts', array( $this, 'register_assets' ), 5 );
		add_action( 'wp_enqueue_scripts', array( $this, 'maybe_enqueue_assets' ), 10 );

		// Page and template files
		add_filter( 'template_include', array( $this, 'cart_page_template' ), 100 );
		add_filter( 'woocommerce_locate_template', array( $this, 'locate_template' ), 100, 3 );

		// Late hooks
		add_action( 'init', array( $this, 'late_hooks' ), 100 );

		// Widget areas
		add_action( 'widgets_init', array( $this, 'register_widgets_areas' ), 50 );
	}

	/**
	 * Add or remove late hooks.
	 */
	public function late_hooks() {
		// Header and footer
		add_action( 'fc_cart_header', array( $this, 'output_cart_header' ), 1 );
		add_action( 'fc_cart_footer', array( $this, 'output_cart_footer' ), 100 );

		// Cart sections
		remove_action( 'woocommerce_cart_collaterals', 'woocommerce_cross_sell_display' );
		remove_action( 'woocommerce_cart_collaterals', 'woocommerce_cart_totals', 10 );
		add_action( 'fc_cart_order_summary', 'woocommerce_cart_totals', 10 );
		add_action( 'fc_cart_after_order_summary', array( $this, 'output_widget_area_cart_sidebar' ), 50 );

		// Cross-sells
		$cross_sells_position = $this->get_cross_sells_position();
		if ( 'after_cart_items' === $cross_sells_position ) {
			add_action( 'fc_cart_after_cart_items', array( $this, 'output_cross_sells' ), 10 );
		}
		else if ( 'after_order_summary' === $cross_sells_position ) {
			add_action( 'fc_cart_after_order_summary', array( $this, 'output_cross_sells' ), 10 );
		}
		add_filter( 'woocommerce_cross_sells_total', array( $this, 'change_cross_sells_total' ), 10 );
		add_filter( 'woocommerce_cross_sells_columns', array( $this, 'change_cross_sells_columns' ), 10 );

		// Shipping
		add_filter( 'woocommerce_cart_ready_to_calc_shipping', array( $this, 'maybe_hide_shipping_cart_page' ), 100 );
	}



	/**
	 * Check whether the current page is the cart page, also when updating the cart via AJAX.
	 */
	public function is_cart_page() {
		return function_exists( 'is_cart' ) && is_cart();
	}



	/**
	 * Add page body class for feature detection.
	 *
	 * @param array $classes Classes for the body element.
	 */
	public function add_body_class( $classes ) {
		// Bail if not on cart page
		if ( ! $this->is_cart_page() ) { return $classes; }

		$add_classes = array( 'has-fc-cart-page' );

		// Distraction free header and footer
		if ( $this->is_distraction_free_header_footer() ) {
			$add_classes[] = 'has-checkout-header';
		}

		// Sticky order summary
		if ( 'yes' === FluidCheckout_Settings::instance()->get_option( 'fc_pro_enable_cart_sticky_order_summary' ) ) {
			$add_classes[] = 'has-fc-cart-sticky-order-summary';
		}

		// Optimized cross-sells layout
		if ( $this->is_optimized_cross_sells_enabled() ) {
			$add_classes[] = 'has-fc-cart-cross-sells--optimized';
		}

		// Highlighted order totals, uses the same option as the checkout page
		if ( 'yes' === FluidCheckout_Settings::instance()->get_option( 'fc_show_order_totals_row_highlighted' ) ) {
			$add_classes[] = 'has-highlighted-order-totals';
		}

		return array_merge( $classes, $add_classes );
	}

	/**
	 * Apply design templates to the cart page.
	 *
	 * @param  bool  $is_design_template_page  Whether the design template is applied to the current page.
	 */
	public function maybe_set_design_template_page( $is_design_template_page ) {
		// Bail if not on cart page
		if ( ! $this->is_cart_page() ) { return $is_design_template_page; }

		return true;
	}



	/**
	 * Register assets.
	 */
	public function register_assets() {
		wp_register_style( 'fc-cart-page', FluidCheckout_Enqueue::instance()->get_style_url( 'css/cart-page' ), NULL, NULL );
	}

	/**
	 * Maybe enqueue assets on the cart page.
	 */
	public function maybe_enqueue_assets() {
		// Bail if not on cart page
		if ( is_admin() || ! $this->is_cart_page() ) { return; }

		wp_enqueue_style( 'fc-cart-page' );
	}



	/**
	 * Check whether using the distraction free header and footer on the cart page.
	 */
	public function is_distraction_free_header_footer() {
		return 'yes' === FluidCheckout_Settings::instance()->get_option( 'fc_pro_hide_site_header_footer_at_cart' );
	}

	/**
	 * Check whether replacing the cart page template.
	 */
	public function is_page_template_enabled() {
		// Theme header and footer cannot be loaded when using block-based themes
		$is_enabled = $this->is_distraction_free_header_footer() || ! current_theme_supports( 'block-templates' );

		return true === apply_filters( 'fc_enable_cart_page_template', $is_enabled );
	}

	/**
	 * Replace the cart page template with our own file.
	 *
	 * @param   string  $template  Template file path.
	 */
	public function cart_page_template( $template ) {
		// Bail if not on cart page
		if ( ! $this->is_cart_page() ) { return $template; }

		// Bail if page template is not enabled
		if ( ! $this->is_page_template_enabled() ) { return $template; }

		// Bail if the cart page is not using the cart shortcode, as only that is supported
		if ( ! $this->is_cart_shortcode_page() ) { return $template; }

		// Locate new cart page template
		$_template = $this->locate_template( $template, 'cart/page-cart.php', null );

		// Check if the file exists
		if ( file_exists( $_template ) ) {
			$template = $_template;
		}

		return $template;
	}

	/**
	 * Check whether the cart page content uses the cart shortcode.
	 */
	public function is_cart_shortcode_page() {
		$cart_page_id = wc_get_page_id( 'cart' );
		$cart_page = $cart_page_id > 0 ? get_post( $cart_page_id ) : null;

		// Bail if cart page is not found
		if ( ! $cart_page ) { return false; }

		return has_shortcode( $cart_page->post_content, apply_filters( 'woocommerce_cart_shortcode_tag', 'woocommerce_cart' ) );
	}



	/**
	 * Get the list of template files replaced by this feature.
	 */
	public function get_template_names() {
		$template_names = array( 'cart/page-cart.php', 'cart/page-cart-header.php', 'cart/page-cart-footer.php', 'cart/cart.php', 'cart/cart-totals.php' );

		// Optimized cross-sells layout
		if ( $this->is_optimized_cross_sells_enabled() ) {
			$template_names[] = 'cart/cross-sells.php';
		}

		return $template_names;
	}

	/**
	 * Locate template files from this plugin.
	 *
	 * @param   string  $template       Template file path.
	 * @param   string  $template_name  Template name.
	 * @param   string  $template_path  Template path.
	 */
	public function locate_template( $template, $template_name, $template_path ) {
		// Bail if not replacing this template file
		if ( ! in_array( $template_name, $this->get_template_names(), true ) ) { return $template; }

		// Get the template from this plugin, if it exists
		$plugin_template = self::$directory_path . 'templates/fc/cart-page/' . $template_name;
		if ( file_exists( $plugin_template ) ) {
			$template = $plugin_template;
		}

		return $template;
	}



	/**
	 * Output the cart header.
	 */
	public function output_cart_header() {
		// Bail if not using distraction free header and footer
		if ( ! $this->is_distraction_free_header_footer() ) { return; }

		// Remove the checkout cart link, which is not needed on the cart page
		remove_all_actions( 'fc_checkout_header_cart_link' );

		wc_get_template( 'checkout/checkout-header.php', array( 'checkout' => WC()->checkout() ), '', self::$directory_path . 'templates/fc/checkout-page-template/' );
	}

	/**
	 * Output the cart footer.
	 */
	public function output_cart_footer() {
		// Bail if not using distraction free header and footer
		if ( ! $this->is_distraction_free_header_footer() ) { return; }

		// Bail if nothing was added to the footer
		if ( ! has_action( 'fc_checkout_footer_widgets' ) || ! ( is_active_sidebar( 'fc_checkout_footer' ) || has_action( 'fc_checkout_footer_widgets_inside_before' ) || has_action( 'fc_checkout_footer_widgets_inside_after' ) ) ) { return; }

		wc_get_template( 'checkout/checkout-footer.php', array(), '', self::$directory_path . 'templates/fc/checkout-page-template/' );
	}



	/**
	 * Get the position of the coupon code section on the cart page.
	 */
	public function get_coupon_code_position() {
		return FluidCheckout_Settings::instance()->get_option( 'fc_pro_cart_section_position_coupon_code' );
	}

	/**
	 * Get the position of the cross-sells section on the cart page.
	 */
	public function get_cross_sells_position() {
		return FluidCheckout_Settings::instance()->get_option( 'fc_pro_cart_section_position_cross_sells' );
	}

	/**
	 * Check whether the optimized cross-sells layout is enabled.
	 */
	public function is_optimized_cross_sells_enabled() {
		return 'yes' === FluidCheckout_Settings::instance()->get_option( 'fc_pro_enable_cart_cross_sells' );
	}



	/**
	 * Output the cross-sells section.
	 */
	public function output_cross_sells() {
		woocommerce_cross_sell_display( $this->change_cross_sells_total( 2 ), $this->change_cross_sells_columns( 2 ) );
	}

	/**
	 * Change the number of cross-sell items displayed on the cart page.
	 *
	 * @param  int  $limit  Number of cross-sell items.
	 */
	public function change_cross_sells_total( $limit ) {
		$option_limit = absint( FluidCheckout_Settings::instance()->get_option( 'fc_pro_cart_cross_sells_display_items_limit' ) );

		// Bail if option value is not valid
		if ( $option_limit < 1 ) { return $limit; }

		return $option_limit;
	}

	/**
	 * Change the number of columns for cross-sell items on the cart page.
	 *
	 * @param  int  $columns  Number of columns.
	 */
	public function change_cross_sells_columns( $columns ) {
		// Display all items in one row when using the optimized cross-sells layout
		if ( $this->is_optimized_cross_sells_enabled() ) {
			return min( 4, $this->change_cross_sells_total( $columns ) );
		}

		return $columns;
	}



	/**
	 * Maybe hide the shipping costs and calculator on the cart page.
	 *
	 * @param  bool  $show_shipping  Whether to show shipping costs on the cart page.
	 */
	public function maybe_hide_shipping_cart_page( $show_shipping ) {
		// Bail if not on cart page
		if ( ! $this->is_cart_page() ) { return $show_shipping; }

		// Bail if shipping is not set to hidden
		if ( ! $this->is_shipping_hidden() ) { return $show_shipping; }

		return false;
	}

	/**
	 * Check whether the shipping costs and calculator are hidden on the cart page.
	 */
	public function is_shipping_hidden() {
		return 'none' === FluidCheckout_Settings::instance()->get_option( 'fc_pro_cart_section_position_shipping' );
	}



	/**
	 * Register widget areas.
	 */
	public function register_widgets_areas() {
		// Bail if widget areas are not enabled for the cart page
		if ( 'yes' !== FluidCheckout_Settings::instance()->get_option( 'fc_pro_enable_cart_widget_areas' ) ) { return; }

		register_sidebar( array(
			'name'          => __( 'Cart Sidebar', 'fluid-checkout' ),
			'id'            => 'fc_cart_sidebar',
			'description'   => __( 'Display widgets below the order summary on the cart page.', 'fluid-checkout' ),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		) );
	}

	/**
	 * Output widget area below the order summary on the cart page.
	 */
	public function output_widget_area_cart_sidebar() {
		// Bail if widget areas are not enabled for the cart page
		if ( 'yes' !== FluidCheckout_Settings::instance()->get_option( 'fc_pro_enable_cart_widget_areas' ) ) { return; }

		// Bail if widget area is empty
		if ( ! is_active_sidebar( 'fc_cart_sidebar' ) ) { return; }
		?>
		<div class="fc-widget-area fc-cart-sidebar-widgets">
			<?php dynamic_sidebar( 'fc_cart_sidebar' ); ?>
		</div>
		<?php
	}

}

FluidCheckout_CartPage::instance();
