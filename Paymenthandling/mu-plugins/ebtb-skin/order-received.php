<?php
/**
 * Thank-you page template (see ebtb-checkout-skin.php). Same chrome as the checkout: ticker, wordmark, no theme header/footer/sidebar.
 */

defined('ABSPATH') || exit;
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class('ebtb-thankyou'); ?>>
<?php wp_body_open(); ?>
<header class="ebtb-header">
	<div class="ebtb-header__inner">
		<?php ebtb_wordmark(); ?>
		<?php ebtb_header_extra('← Vissza a boltba', '/bolt'); ?>
	</div>
	<?php ebtb_ticker(); ?>
</header>
<main class="ebtb-thankyou__main">
	<?php
	while (have_posts()) {
		the_post();
		the_content();
	}
	?>
</main>
<footer class="ebtb-footer">
	<span>© <?php echo esc_html(date_i18n('Y')); ?> EBTB</span>
	<a href="<?php echo esc_url(ebtb_site_url('/aszf')); ?>">ÁSZF</a>
	<a href="<?php echo esc_url(ebtb_site_url('/adatvedelem')); ?>">Adatvédelem</a>
	<a href="<?php echo esc_url(ebtb_site_url('/kapcsolat')); ?>">Kapcsolat</a>
</footer>
<?php wp_footer(); ?>
</body>
</html>
