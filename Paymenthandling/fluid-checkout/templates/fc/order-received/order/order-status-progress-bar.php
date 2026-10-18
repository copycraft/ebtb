<?php
/**
 * Order status progress bar.
 *
 * @package fluid-checkout
 * @version 4.2.7
 *
 * @var WC_Order $order
 * @var array    $steps
 * @var int      $current_step_index
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="fc-order-status">
	<p class="fc-order-status__label">
		<?php // translators: %s: Order status name. ?>
		<?php echo wp_kses_post( sprintf( __( 'Order status: %s', 'fluid-checkout' ), '<strong>' . esc_html( wc_get_order_status_name( $order->get_status() ) ) . '</strong>' ) ); ?>
	</p>
	<ol class="fc-order-status__steps">
		<?php
		$step_index = 0;
		foreach ( $steps as $step_id => $step ) :
			$step_class = $step_index < $current_step_index ? 'is-complete' : ( $step_index === $current_step_index ? 'is-current' : '' );
			?>
			<li class="fc-order-status__step fc-order-status__step--<?php echo esc_attr( $step_id ); ?> <?php echo esc_attr( $step_class ); ?>" <?php echo $step_index === $current_step_index ? 'aria-current="step"' : ''; ?>>
				<span class="fc-order-status__step-label"><?php echo esc_html( $step[ 'label' ] ); ?></span>
			</li>
			<?php
			$step_index++;
		endforeach;
		?>
	</ol>
</div>
