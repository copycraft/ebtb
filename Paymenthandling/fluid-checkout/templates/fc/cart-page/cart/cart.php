<?php
/**
 * Cart Page
 *
 * @package fluid-checkout
 * @version 4.2.7
 * @wc-version 10.1.0
 * @original plugins/woocommerce/templates/cart/cart.php
 */

defined( 'ABSPATH' ) || exit;

$button_class = function_exists( 'wc_wp_theme_get_element_class_name' ) && wc_wp_theme_get_element_class_name( 'button' ) ? ' ' . wc_wp_theme_get_element_class_name( 'button' ) : '';
$coupon_code_position = FluidCheckout_CartPage::instance()->get_coupon_code_position();

do_action( 'woocommerce_before_cart' ); ?>

<div class="fc-cart">

	<div class="fc-cart__main">

		<?php do_action( 'fc_cart_before_cart_items' ); ?>

		<section class="fc-page-section fc-cart-section fc-cart-section--cart-items" aria-labelledby="fc-page-section__title--cart-items">

			<form class="woocommerce-cart-form" action="<?php echo esc_url( wc_get_cart_url() ); ?>" method="post">
				<?php // Section title is inside the form so it is updated along with the cart items ?>
				<h2 id="fc-page-section__title--cart-items" class="fc-page-section__title">
					<?php echo esc_html( __( 'Cart items', 'fluid-checkout' ) ); ?>
					<span class="fc-page-section__title-count">(<?php echo esc_html( WC()->cart->get_cart_contents_count() ); ?>)</span>
				</h2>

				<?php do_action( 'woocommerce_before_cart_table' ); ?>

				<table class="shop_table shop_table_responsive cart woocommerce-cart-form__contents fc-cart-items" cellspacing="0">
					<thead class="screen-reader-text">
						<tr>
							<th scope="col" class="product-thumbnail"><?php esc_html_e( 'Thumbnail image', 'woocommerce' ); ?></th>
							<th scope="col" class="product-name"><?php esc_html_e( 'Product', 'woocommerce' ); ?></th>
							<th scope="col" class="product-quantity"><?php esc_html_e( 'Quantity', 'woocommerce' ); ?></th>
							<th scope="col" class="product-subtotal"><?php esc_html_e( 'Subtotal', 'woocommerce' ); ?></th>
							<th scope="col" class="product-remove"><?php esc_html_e( 'Remove item', 'woocommerce' ); ?></th>
						</tr>
					</thead>
					<tbody>
						<?php do_action( 'woocommerce_before_cart_contents' ); ?>

						<?php
						foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
							$_product   = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
							$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );
							$visible    = apply_filters( 'woocommerce_cart_item_visible', true, $cart_item, $cart_item_key );

							if ( $_product instanceof WC_Product && $_product->exists() && $cart_item['quantity'] > 0 && $visible ) {
								$cart_item_name    = WC()->cart->get_item_product_name( $cart_item, $_product );
								$product_name      = apply_filters( 'woocommerce_cart_item_name', $cart_item_name, $cart_item, $cart_item_key );
								$product_permalink = apply_filters( 'woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '', $cart_item, $cart_item_key );
								?>
								<tr class="woocommerce-cart-form__cart-item fc-cart-item <?php echo esc_attr( apply_filters( 'woocommerce_cart_item_class', 'cart_item', $cart_item, $cart_item_key ) ); ?>">

									<td class="product-thumbnail">
									<?php
									$thumbnail = apply_filters( 'woocommerce_cart_item_thumbnail', $_product->get_image(), $cart_item, $cart_item_key );

									if ( ! $product_permalink ) {
										echo $thumbnail; // PHPCS: XSS ok.
									} else {
										printf( '<a href="%s">%s</a>', esc_url( $product_permalink ), $thumbnail ); // PHPCS: XSS ok.
									}
									?>
									</td>

									<td role="rowheader" class="product-name" data-title="<?php esc_attr_e( 'Product', 'woocommerce' ); ?>">
									<?php
									if ( ! $product_permalink ) {
										echo wp_kses_post( $product_name . '&nbsp;' );
									} else {
										echo wp_kses_post( apply_filters( 'woocommerce_cart_item_name', sprintf( '<a href="%s">%s</a>', esc_url( $product_permalink ), $cart_item_name ), $cart_item, $cart_item_key ) );
									}

									do_action( 'woocommerce_after_cart_item_name', $cart_item, $cart_item_key );

									// Meta data.
									echo wc_get_formatted_cart_item_data( $cart_item, false, $cart_item_name ); // PHPCS: XSS ok.

									// Backorder notification.
									if ( $_product->backorders_require_notification() && $_product->is_on_backorder( $cart_item['quantity'] ) ) {
										echo wp_kses_post( apply_filters( 'woocommerce_cart_item_backorder_notification', '<p class="backorder_notification">' . esc_html__( 'Available on backorder', 'woocommerce' ) . '</p>', $product_id ) );
									}
									?>
										<div class="product-price fc-cart-item__price">
											<?php echo apply_filters( 'woocommerce_cart_item_price', WC()->cart->get_product_price( $_product ), $cart_item, $cart_item_key ); // PHPCS: XSS ok. ?>
										</div>
									</td>

									<td class="product-quantity" data-title="<?php esc_attr_e( 'Quantity', 'woocommerce' ); ?>">
									<?php
									if ( $_product->is_sold_individually() ) {
										$min_quantity = 1;
										$max_quantity = 1;
									} else {
										$min_quantity = 0;
										$max_quantity = $_product->get_max_purchase_quantity();
									}

									$product_quantity = woocommerce_quantity_input(
										array(
											'input_name'   => "cart[{$cart_item_key}][qty]",
											'input_value'  => $cart_item['quantity'],
											'max_value'    => $max_quantity,
											'min_value'    => $min_quantity,
											'product_name' => $product_name,
										),
										$_product,
										false
									);

									echo apply_filters( 'woocommerce_cart_item_quantity', $product_quantity, $cart_item_key, $cart_item ); // PHPCS: XSS ok.
									?>
									</td>

									<td class="product-subtotal" data-title="<?php esc_attr_e( 'Subtotal', 'woocommerce' ); ?>">
										<?php echo apply_filters( 'woocommerce_cart_item_subtotal', WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ), $cart_item, $cart_item_key ); // PHPCS: XSS ok. ?>
									</td>

									<td class="product-remove">
										<?php
										echo apply_filters( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
											'woocommerce_cart_item_remove_link',
											sprintf(
												'<a role="button" href="%s" class="remove" aria-label="%s" data-product_id="%s" data-product_sku="%s">&times;</a>',
												esc_url( wc_get_cart_remove_url( $cart_item_key ) ),
												/* translators: %s is the product name */
												esc_attr( sprintf( __( 'Remove %s from cart', 'woocommerce' ), wp_strip_all_tags( $product_name ) ) ),
												esc_attr( $product_id ),
												esc_attr( $_product->get_sku() )
											),
											$cart_item_key
										);
										?>
									</td>
								</tr>
								<?php
							}
						}
						?>

						<?php do_action( 'woocommerce_cart_contents' ); ?>

						<tr class="fc-cart-actions-row">
							<td colspan="5" class="actions">

								<?php if ( wc_coupons_enabled() && 'none' !== $coupon_code_position ) { ?>
									<div class="coupon">
										<label for="coupon_code" class="screen-reader-text"><?php esc_html_e( 'Coupon:', 'woocommerce' ); ?></label> <input type="text" name="coupon_code" class="input-text" id="coupon_code" value="" placeholder="<?php esc_attr_e( 'Coupon code', 'woocommerce' ); ?>" /> <button type="submit" class="button<?php echo esc_attr( $button_class ); ?>" name="apply_coupon" value="<?php esc_attr_e( 'Apply coupon', 'woocommerce' ); ?>"><?php esc_html_e( 'Apply coupon', 'woocommerce' ); ?></button>
										<?php do_action( 'woocommerce_cart_coupon' ); ?>
									</div>
								<?php } ?>

								<button type="submit" class="button<?php echo esc_attr( $button_class ); ?>" name="update_cart" value="<?php esc_attr_e( 'Update cart', 'woocommerce' ); ?>"><?php esc_html_e( 'Update cart', 'woocommerce' ); ?></button>

								<?php do_action( 'woocommerce_cart_actions' ); ?>

								<?php wp_nonce_field( 'woocommerce-cart', 'woocommerce-cart-nonce' ); ?>
							</td>
						</tr>

						<?php do_action( 'woocommerce_after_cart_contents' ); ?>
					</tbody>
				</table>
				<?php do_action( 'woocommerce_after_cart_table' ); ?>
			</form>

		</section>

		<?php do_action( 'fc_cart_after_cart_items' ); ?>

	</div>

	<div class="fc-cart__sidebar fc-split-panel">
		<div class="fc-cart__sidebar-inner">

			<?php do_action( 'woocommerce_before_cart_collaterals' ); ?>

			<section class="fc-cart-section fc-cart-section--order-summary cart-collaterals">
				<?php
				/**
				 * Cart order summary.
				 *
				 * @hooked woocommerce_cart_totals - 10
				 */
				do_action( 'fc_cart_order_summary' );

				// Keep the WooCommerce hook for other plugins adding content to the cart collaterals
				do_action( 'woocommerce_cart_collaterals' );
				?>
			</section>

			<?php do_action( 'fc_cart_after_order_summary' ); ?>

		</div>
	</div>

</div>

<?php do_action( 'woocommerce_after_cart' ); ?>
