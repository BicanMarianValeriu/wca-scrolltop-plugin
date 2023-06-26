<?php
/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://www.wecodeart.com/
 * @since             1.0.0
 * @package           WCA\EXT\ScrollTop
 *
 * @wordpress-plugin
 * Plugin Name:       WCA: Scroll Top
 * Plugin URI:        https://github.com/BicanMarianValeriu/wca-scrolltop
 * Description:       Add scroll to top button in WeCodeArt themes.
 * Version:           1.0.0
 * Author:            Bican Marian Valeriu
 * Author URI:        https://www.wecodeart.com/about/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wca-scrolltop
 * Domain Path:       /languages
 * Requires at least: 6.2
 * Requires PHP:      7.4
 */
namespace WCA\EXT\ScrollTop;

// If this file is called directly, abort.
defined( 'WPINC' ) || die;

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'WCA_SCROLLTOP_EXT',	    __FILE__ );
define( 'WCA_SCROLLTOP_EXT_VER', 	get_file_data( WCA_SCROLLTOP_EXT, [ 'Version' ] )[0] ); // phpcs:ignore
define( 'WCA_SCROLLTOP_EXT_DIR', 	plugin_dir_path( WCA_SCROLLTOP_EXT ) );
define( 'WCA_SCROLLTOP_EXT_URL', 	plugin_dir_url( WCA_SCROLLTOP_EXT ) );
define( 'WCA_SCROLLTOP_EXT_BASE',	plugin_basename( WCA_SCROLLTOP_EXT ) );

require_once( WCA_SCROLLTOP_EXT_DIR . '/includes/class-autoloader.php' );

new Autoloader( 'WCA\EXT\ScrollTop', WCA_SCROLLTOP_EXT_DIR . '/includes' );
new Autoloader( 'WCA\EXT\ScrollTop', WCA_SCROLLTOP_EXT_DIR . '/frontend' );
new Autoloader( 'WCA\EXT\ScrollTop', WCA_SCROLLTOP_EXT_DIR . '/admin' );

// Activation/Deactivation Hooks
register_activation_hook( WCA_SCROLLTOP_EXT, [ Activator::class, 'run' ] );
register_deactivation_hook( WCA_SCROLLTOP_EXT, [ Deactivator::class, 'run' ] );

/**
 * Hook the extension after WeCodeArt is Loaded
 */
add_action( 'wecodeart/theme/loaded', fn() => wecodeart( 'integrations' )->register( 'plugin/scrolltop', __NAMESPACE__ ) );
