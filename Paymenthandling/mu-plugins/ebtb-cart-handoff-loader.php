<?php
/**
 * Plugin Name: EBTB cart handoff (dev loader)
 * Description: Loads docs/ebtb-cart-handoff.php from the Next.js repo (mounted at /opt/ebtb-docs), so dev runs the exact file that ships.
 */

defined('ABSPATH') || exit;

require_once '/opt/ebtb-docs/ebtb-cart-handoff.php';
