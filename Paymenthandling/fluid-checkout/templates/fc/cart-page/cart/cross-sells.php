<?php
/**
 * Cross-sells, with optimized layout for the cart page.
 *
 * @package fluid-checkout
 * @version 4.2.7
 * @wc-version 9.6.0
 * @original plugins/woocommerce/templates/cart/cross-sells.php
 */

defined( 'ABSPATH' ) || exit;

if ( $cross_sells ) : ?>

	<section class="cross-sells fc-cart-section fc-cart-section--cross-sells">
		<?php
		$heading = apply_filters( 'woocommerce_product_cross_sells_products_heading', __( 'You may be interested in&hellip;', 'woocommerce' ) );

		if ( $heading ) :
			?>
			<h2 class="fc-page-section__title"><?php echo esc_html( $heading ); ?></h2>
		<?php endif; ?>

		<ul class="fc-cross-sells" style="--fc-cross-sells-columns: <?php echo esc_attr( absint( $columns ) ); ?>;">

			<?php foreach ( $cross_sells as $cross_sell ) : ?>

				<?php
				$post_object = get_post( $cross_sell->get_id() );

				// Also sets the global product object used by the add to cart button template
				setup_postdata( $GLOBALS['post'] = $post_object ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited, Squiz.PHP.DisallowMultipleAssignments.Found
				?>

				<li class="fc-cross-sells__item product">
					<a href="<?php echo esc_url( $cross_sell->get_permalink() ); ?>" class="fc-cross-sells__image">
						<?php echo wp_kses_post( $cross_sell->get_image( 'woocommerce_thumbnail' ) ); ?>
					</a>
					<div class="fc-cross-sells__details">
						<a href="<?php echo esc_url( $cross_sell->get_permalink() ); ?>" class="fc-cross-sells__name"><?php echo wp_kses_post( $cross_sell->get_name() ); ?></a>
						<span class="fc-cross-sells__price price"><?php echo wp_kses_post( $cross_sell->get_price_html() ); ?></span>
						<div class="fc-cross-sells__actions">
							<?php woocommerce_template_loop_add_to_cart(); ?>
						</div>
					</div>
				</li>

			<?php endforeach; ?>

		</ul>

	</section>
	<?php
endif;

wp_reset_postdata();
