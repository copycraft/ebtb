<?php
defined( 'ABSPATH' ) || exit;

/**
 * Order received (thank you) page and order details optimizations.
 */
class FluidCheckout_OrderReceived extends FluidCheckout {

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
		return 'yes' === FluidCheckout_Settings::instance()->get_option( 'fc_pro_enable_order_received' );
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

		// Template files
		add_filter( 'woocommerce_locate_template', array( $this, 'locate_template' ), 100, 3 );

		// Order status progress bar
		add_action( 'fc_order_received_after_overview', array( $this, 'output_order_status_progress_bar' ), 10 );
		add_action( 'woocommerce_view_order', array( $this, 'output_order_status_progress_bar' ), 5 );

		// Widget areas
		add_action( 'widgets_init', array( $this, 'register_widgets_areas' ), 50 );
		add_action( 'fc_order_received_after_order_details', array( $this, 'output_widget_area_order_received' ), 50 );
	}



	/**
	 * Check whether the current page is the order received page.
	 */
	public function is_order_received_page() {
		return function_exists( 'is_order_received_page' ) && is_order_received_page();
	}

	/**
	 * Check whether the current page is the view order page on the account pages.
	 */
	public function is_view_order_page() {
		return function_exists( 'is_view_order_page' ) && is_view_order_page();
	}



	/**
	 * Add page body class for feature detection.
	 *
	 * @param array $classes Classes for the body element.
	 */
	public function add_body_class( $classes ) {
		// Bail if not on affected pages
		if ( ! $this->is_order_received_page() && ! $this->is_view_order_page() ) { return $classes; }

		$add_classes = array( 'has-fc-order-details' );

		// Order received page
		if ( $this->is_order_received_page() ) {
			$add_classes[] = 'has-fc-order-received';
		}

		// Wide layout
		if ( 'yes' === FluidCheckout_Settings::instance()->get_option( 'fc_pro_enable_order_details_wide_layout' ) ) {
			$add_classes[] = 'has-fc-order-details--wide';
		}

		// Highlighted order totals, uses the same option as the checkout page
		if ( 'yes' === FluidCheckout_Settings::instance()->get_option( 'fc_show_order_totals_row_highlighted' ) ) {
			$add_classes[] = 'has-highlighted-order-totals';
		}

		return array_merge( $classes, $add_classes );
	}

	/**
	 * Apply design templates to the order received page.
	 *
	 * @param  bool  $is_design_template_page  Whether the design template is applied to the current page.
	 */
	public function maybe_set_design_template_page( $is_design_template_page ) {
		// Bail if not on affected pages
		if ( ! $this->is_order_received_page() && ! $this->is_view_order_page() ) { return $is_design_template_page; }

		return true;
	}



	/**
	 * Register assets.
	 */
	public function register_assets() {
		wp_register_style( 'fc-order-received', FluidCheckout_Enqueue::instance()->get_style_url( 'css/order-received' ), NULL, NULL );
	}

	/**
	 * Maybe enqueue assets on the order received and view order pages.
	 */
	public function maybe_enqueue_assets() {
		// Bail if not on affected pages
		if ( is_admin() || ( ! $this->is_order_received_page() && ! $this->is_view_order_page() ) ) { return; }

		wp_enqueue_style( 'fc-order-received' );
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
		if ( 'checkout/thankyou.php' !== $template_name ) { return $template; }

		// Get the template from this plugin, if it exists
		$plugin_template = self::$directory_path . 'templates/fc/order-received/' . $template_name;
		if ( file_exists( $plugin_template ) ) {
			$template = $plugin_template;
		}

		return $template;
	}



	/**
	 * Get the greeting title for the order received page.
	 *
	 * @param  WC_Order  $order  The order object.
	 */
	public function get_order_received_title( $order ) {
		$first_name = $order ? trim( $order->get_billing_first_name() ) : '';

		// translators: %s: Customer first name.
		$title = ! empty( $first_name ) ? sprintf( __( 'Thank you, %s!', 'fluid-checkout' ), $first_name ) : __( 'Thank you!', 'fluid-checkout' );

		return apply_filters( 'fc_order_received_title', $title, $order );
	}



	/**
	 * Get the steps for the order status progress bar.
	 */
	public function get_order_status_steps() {
		return apply_filters( 'fc_order_status_progress_bar_steps', array(
			'received'   => array( 'label' => __( 'Order received', 'fluid-checkout' ), 'statuses' => array( 'pending', 'on-hold' ) ),
			'processing' => array( 'label' => __( 'Processing', 'fluid-checkout' ), 'statuses' => array( 'processing' ) ),
			'completed'  => array( 'label' => __( 'Completed', 'fluid-checkout' ), 'statuses' => array( 'completed' ) ),
		) );
	}

	/**
	 * Output the order status progress bar.
	 *
	 * @param  int|WC_Order  $order  The order object or order ID.
	 */
	public function output_order_status_progress_bar( $order ) {
		// Bail if progress bar is not enabled
		if ( 'yes' !== FluidCheckout_Settings::instance()->get_option( 'fc_pro_enable_order_details_order_status_progress_bar' ) ) { return; }

		// Get order object
		if ( ! $order instanceof WC_Order ) {
			$order = wc_get_order( $order );
		}

		// Bail if order is not available
		if ( ! $order ) { return; }

		// Get current step from the order status
		$steps = $this->get_order_status_steps();
		$current_step_index = false;
		$step_index = 0;
		foreach ( $steps as $step ) {
			if ( in_array( $order->get_status(), $step[ 'statuses' ], true ) ) {
				$current_step_index = $step_index;
				break;
			}
			$step_index++;
		}

		// Bail if order status is not part of the progress, such as cancelled or failed orders
		if ( false === $current_step_index ) { return; }

		wc_get_template(
			'order/order-status-progress-bar.php',
			array(
				'order'              => $order,
				'steps'              => $steps,
				'current_step_index' => $current_step_index,
			),
			'',
			self::$directory_path . 'templates/fc/order-received/'
		);
	}



	/**
	 * Register widget areas.
	 */
	public function register_widgets_areas() {
		// Bail if widget areas are not enabled for the order received page
		if ( 'yes' !== FluidCheckout_Settings::instance()->get_option( 'fc_pro_enable_order_received_widget_areas' ) ) { return; }

		register_sidebar( array(
			'name'          => __( 'Thank You Page - After Order Details', 'fluid-checkout' ),
			'id'            => 'fc_order_received_after_order_details',
			'description'   => __( 'Display widgets after the order details on the thank you page.', 'fluid-checkout' ),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		) );
	}

	/**
	 * Output widget area after the order details on the order received page.
	 */
	public function output_widget_area_order_received() {
		// Bail if widget areas are not enabled for the order received page
		if ( 'yes' !== FluidCheckout_Settings::instance()->get_option( 'fc_pro_enable_order_received_widget_areas' ) ) { return; }

		// Bail if widget area is empty
		if ( ! is_active_sidebar( 'fc_order_received_after_order_details' ) ) { return; }
		?>
		<div class="fc-widget-area fc-order-received-widgets">
			<?php dynamic_sidebar( 'fc_order_received_after_order_details' ); ?>
		</div>
		<?php
	}

}

FluidCheckout_OrderReceived::instance();
