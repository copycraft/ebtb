<?php
/**
 * The cart page template file.
 *
 * @package fluid-checkout
 * @version 4.2.7
 */

defined( 'ABSPATH' ) || exit;

// Replace header with our distraction free template
if ( FluidCheckout_CartPage::instance()->is_distraction_free_header_footer() ) {
	wc_get_template( 'cart/page-cart-header.php' );
}
// Display the site's default header
else {
	get_header( 'cart' );
}
?>

<?php do_action( 'fc_cart_before_main_section_wrapper' ); ?>

<div class="fc-content fc-cart-content <?php echo FluidCheckout_CartPage::instance()->is_distraction_free_header_footer() ? '' : 'fc-container'; ?>">

	<?php do_action( 'fc_cart_before_main_section' ); ?>

	<h1 class="fc-cart__title"><?php echo esc_html( apply_filters( 'fc_cart_page_title', get_the_title() ) ); ?></h1>

	<?php
	// Load the cart page content
	while ( have_posts() ) :
		the_post();
		the_content();
	endwhile;
	?>

	<?php do_action( 'fc_cart_after_main_section' ); ?>

</div>

<?php do_action( 'fc_cart_after_main_section_wrapper' ); ?>

<?php
// Replace footer with our distraction free template
if ( FluidCheckout_CartPage::instance()->is_distraction_free_header_footer() ) {
	wc_get_template( 'cart/page-cart-footer.php' );
}
// Display the site's default footer
else {
	get_footer( 'cart' );
}
