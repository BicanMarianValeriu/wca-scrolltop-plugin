<?php
/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://www.wecodeart.com/
 * @since      1.0.0
 *
 * @package    WCA\EXT\ScrollTop
 * @subpackage WCA\EXT\ScrollTop\I18N
 */

namespace WCA\EXT\ScrollTop;

use WeCodeArt\Singleton;

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    WCA\EXT\ScrollTop
 * @subpackage WCA\EXT\ScrollTop\I18N
 * @author     Bican Marian Valeriu <marianvaleriubican@gmail.com>
 */
class I18N {

	use Singleton;
	
	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {
		load_plugin_textdomain( 'wca-scrolltop', false, dirname( WCA_SCROLLTOP_EXT_BASE ) . '/languages' );
	}
}
