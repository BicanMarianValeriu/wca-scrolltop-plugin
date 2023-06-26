<?php
/**
 * Fired during plugin activation
 *
 * @link       https://www.wecodeart.com/
 * @since      1.0.0
 *
 * @package    WCA\EXT\ScrollTop
 * @subpackage WCA\EXT\ScrollTop\Activator
 */

namespace WCA\EXT\ScrollTop;

use WeCodeArt\Admin\Notifications;
use WeCodeArt\Admin\Notifications\Notification;

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    IAmBican
 * @subpackage WCA\EXT\ScrollTop\Activator
 * @author     Bican Marian Valeriu <marianvaleriubican@gmail.com>
 */
class Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function run() {
		$errors = self::if_compatible();

		if ( count( $errors ) ) {
			deactivate_plugins( WCA_SCROLLTOP_EXT_BASE );
			wp_die( current( $errors ) );
		}

		if( ! wecodeart_option( 'scrolltop' ) ) {
			wecodeart_option( [
				'scrolltop' => Admin::get_defaults()
			] );
		}
	}

	/**
	 * Check if compatible
	 *
	 * @since    1.0.0
	 */
	public static function if_compatible() {
		$checks = [
			'theme'	=> function_exists( 'wecodeart' ),
		];

		$errors = [
			'theme'	=> __( 'This extension requires WeCodeArt Framework (or a skin) installed and active.', 'wca-scrolltop' ),
		];

		$checks = array_filter( $checks, function( $value ) {
			return (boolean) $value === false;
		} );

		return array_intersect_key( $errors, $checks );	
	}
}
