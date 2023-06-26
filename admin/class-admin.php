<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://www.wecodeart.com/
 * @since      1.0.0
 *
 * @package    WCA\EXT\ScrollTop
 * @subpackage WCA\EXT\ScrollTop\Admin
 */

namespace WCA\EXT\ScrollTop;

use WeCodeArt\Config\Traits\Asset;
use WeCodeArt\Admin\Request;
use WeCodeArt\Admin\Notifications;
use WeCodeArt\Admin\Notifications\Notification;
use function WeCodeArt\Functions\get_prop;

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    WCA\EXT\ScrollTop
 * @subpackage WCA\EXT\ScrollTop\Admin
 * @author     Bican Marian Valeriu <marianvaleriubican@gmail.com>
 */
class Admin {

	use Asset;

	const NOTICE_ID 	= 'wecodeart/plugin/scrolltop/notice';
	const UPDATE_ID		= 'wecodeart/plugin/scrolltop/update';
	const REPOSITORY 	= 'BicanMarianValeriu/wca-scrolltop';

	/**
	 * The ID of this plugin.
	 *
	 * @since 	1.0.0
	 * @version	1.0.0
	 *
	 * @var		string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since	1.0.0
	 * @version	1.0.0
	 *
	 * @var		string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * The config of this plugin.
	 *
	 * @since 	1.0.0
	 * @version	1.0.0
	 *
	 * @var		mixed    $config    The config of this plugin.
	 */
	private $config;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since 	1.0.0
	 * @version	1.0.0
	 *
	 * @param	string    $plugin_name	The name of this plugin.
	 * @param	string    $version    	The version of this plugin.
	 */
	public function __construct( $plugin_name, $version, $config ) {
		$this->plugin_name	= $plugin_name;
		$this->version 		= $version;
		$this->config 		= $config;
	}
    
    /**
	 * Check if active
	 *
	 * @since 	1.0.0
	 * @version	1.0.0
	 */
	public function if_active() {
		$notification = new Notification(
			sprintf(
				'<h3 class="notice__heading" style="margin-bottom:0px">%1$s</h3>
				<div class="notice__content">
					<p>%2$s</p>
					<p><a href="%3$s" class="button button-primary">%4$s</a></p>
				</div>',
				esc_html__( 'Awesome, WCA: ScrollTop extension is activated!', 'wca-scrolltop' ),
				esc_html__( 'Go to Theme Options in order to setup your preferences.', 'wca-scrolltop' ),
				esc_url( admin_url( '/themes.php?page=wecodeart&tab=plugins#wca-scrolltop' ) ),
				esc_html__( 'Show me the options!', 'wca-scrolltop' )
			),
			[
				'id'			=> self::NOTICE_ID,
				'type'     		=> Notification::INFO,
				'priority' 		=> 1,
				'class'			=> 'notice is-dismissible',
				'capabilities' 	=> 'activate_plugins',
			]
		);

		if( get_user_option( self::NOTICE_ID ) === 'seen' ) {
			Notifications::get_instance()->remove_notification( $notification );
			set_transient( self::NOTICE_ID, true, WEEK_IN_SECONDS );
			return;
		}
		
		if( get_transient( self::NOTICE_ID ) === false ) {
			Notifications::get_instance()->add_notification( $notification );
		}
	}

	/**
	 * Admin Assets
	 *
	 * @since 	1.0.0
	 * @version	1.0.0
	 */
	public function assets() {
		if( ! current_user_can( 'activate_plugins' ) ) return;

		$path = wecodeart_if( 'is_dev_mode' ) ? 'unminified' : 'minified';
		$name = wecodeart_if( 'is_dev_mode' ) ? 'admin' : 'admin.min';
		$data = [
			'version' 		=> $this->version,
			'dependencies'	=> [ 'wecodeart-admin', 'wp-block-editor' ],
		];

		wp_register_script( 
			$this->make_handle(),
			sprintf( '%s/assets/%s/js/%s.js', untrailingslashit( WCA_SCROLLTOP_EXT_URL ), $path, $name ),
			$data['dependencies'], 
			$data['version'], 
			true 
		);

		wp_enqueue_script( $this->make_handle() );

		wp_set_script_translations( $this->make_handle(), 'wca-scrolltop', untrailingslashit( WCA_SCROLLTOP_EXT_DIR ) . '/languages' );
	}

	/**
	 * Update
	 *
	 * @since 	1.0.0
	 * @version	1.0.0
	 */
	public function update( $transient ) {
		if ( empty( $transient->checked ) ) {
			return $transient;
		}
		
		$latest 	= self::get_github_data();
		$tag_name 	= get_prop( $latest, 'tag_name', 'v1.0.0' );
		$version 	= str_replace( 'v', '', $tag_name );

		if ( 1 === version_compare( $version, $this->version ) ) {
			$response 				= new \stdClass;
			$response->new_version 	= $version;
			$response->slug 		= dirname( WCA_SCROLLTOP_EXT_BASE );
			$response->url 			= sprintf( 'https://github.com/%s', self::REPOSITORY );
			$response->package 		= sprintf( 'https://api.github.com/repos/%s/zipball/%s', self::REPOSITORY, $tag_name );
			// $response->package	= sprintf( 'https://github.com/BicanMarianValeriu/wca-contact-form-7/archive/refs/tags/%s.zip', $tag_name );
			// $response->upgrade_notice	= '';

			$transient->response[ WCA_SCROLLTOP_EXT_BASE ] = $response;
		}
		
		return $transient;
	}

	/**
	 * Upgrader/Updater
	 *
	 * @since 	1.0.0
	 * @version	1.0.0
	 *
	 * @param 	boolean $true       always true
	 * @param 	mixed   $hook_extra not used
	 * @param 	array   $result     the result of the move
	 *
	 * @return 	array 	$result the result of the move
	 */
	public function install( $true, $hook_extra, $result ) {
		global $wp_filesystem;

		// Move & Activate
		$wp_filesystem->move( $result['destination'], WCA_SCROLLTOP_EXT_DIR );
		$result['destination'] 	= WCA_SCROLLTOP_EXT_DIR;
		$activate 				= activate_plugin( WCA_SCROLLTOP_EXT_BASE );

		// Output the update message
		echo is_wp_error( $activate ) ?
			esc_html__( 'The plugin has been updated, but could not be reactivated. Please reactivate it manually.', 'wca-scrolltop' ) :
			esc_html__( 'Plugin reactivated successfully.', 'wca-scrolltop' );

		return $result;
	}

	/**
	 * Get Plugin info
	 *
	 * @since 	1.0.0
	 * @version	1.0.0
	 *
	 * @param 	bool    $false  always false
	 * @param 	string  $action the API function being performed
	 * @param 	object  $args   plugin arguments
	 *
	 * @return 	object $response the plugin info
	 */
	public function info( $false, $action, $response ) {
		// Check if this call API is for the right plugin
		if ( ! isset( $response->slug ) || $response->slug !== dirname( WCA_SCROLLTOP_EXT_BASE ) ) {
			return false;
		}

		$plugin		= self::get_plugin_data();
		$latest 	= self::get_github_data();
		$tag_name 	= get_prop( $latest, 'tag_name', 'v1.0.0' );
		$published  = get_prop( $latest, 'published_at' );

		$response->slug 		= dirname( WCA_SCROLLTOP_EXT_BASE );
		$response->version 		= str_replace( 'v', '', $tag_name );
		$response->plugin_name 	= $plugin['Name'];
		$response->author 		= $plugin['Author'];
		$response->homepage		= $plugin['PluginURI'];
		$response->requires 	= $plugin['RequiresWP'];
		$response->requires_php	= $plugin['RequiresPHP'];
		$response->downloaded   = 0;
		$response->last_updated = date( 'Y-m-d', strtotime( $published ) );
		$response->sections		= [
			'changelog' 	=> sprintf(
				__( 'To read the change history for the latest plugin release, please go to the %s.', 'wca-scrolltop' ),
				sprintf(
					'<a href="%s" target="_blank">%s</a>',
					esc_url( sprintf( 'https://github.com/%s/releases/latest', self::REPOSITORY ) ),
					esc_html__( 'release page', 'wca-scrolltop' )
				)
			),
			'description' 	=> $plugin['Description'],
		];
		$response->donate_link 		= 'https://www.paypal.com/donate?hosted_button_id=PV9A4JDX84Z3W';
		$response->download_link 	= sprintf( 'https://api.github.com/repos/%s/zipball/%s', self::REPOSITORY, $tag_name );

		return $response;
	}

	/**
	 * Meta
	 *
	 * @since	1.0.0
	 * @version	1.0.0
	 */
	public function meta( $links, $file ) {
		// If we are not on the correct plugin, abort.
		if( WCA_SCROLLTOP_EXT_BASE !== $file) {
			return $links;
		}

		$review  = '<a href="' . esc_url( sprintf( 'https://github.com/%s', self::REPOSITORY ) ) . '" aria-label="' . esc_attr__( 'Give it a star on GitHub', 'wca-scrolltop' ) . '" target="_blank">';
		$review .= esc_html__( 'Star on GitHub', 'wca-scrolltop' );
		$review .= '</a>';

		return array_merge( $links, [
			'review' => $review,
		] );
	}

	/**
	 * Links
	 *
	 * @since	1.0.0
	 * @version	1.0.0
	 */
	public function links( $links, $file ) {
		// If we are not on the correct plugin, abort.
		if ( WCA_SCROLLTOP_EXT_BASE !== $file ) {
			return $links;
		}

		$settings  = '<a href="' . esc_url( admin_url( '/themes.php?page=wecodeart&tab=plugins#wca-scrolltop' ) ) . '" aria-label="' . esc_attr__( 'Navigate to the extension settings.', 'wca-scrolltop' ) . '">';
		$settings .= esc_html__( 'Settings', 'wca-scrolltop' );
		$settings .= '</a>';

		array_unshift( $links, $settings );

		return $links;
	}

	/**
	 * Get Github Data
	 *
	 * @since	1.0.0
	 * @version	1.0.0
	 *
	 * @return 	array
	 */
	public static function get_github_data() {
		$api_url	= sprintf( 'https://api.github.com/repos/%s/releases/latest', self::REPOSITORY );

		if ( false === ( $response = get_transient( self::UPDATE_ID ) ) ) {
			$request	= new Request( $api_url, [] );
			$request->send( $request::METHOD_GET );
			$response = $request->get_response_body( true );
			set_transient( self::UPDATE_ID, $response, 12 * HOUR_IN_SECONDS );
		}

		return $response;			
	}

	/**
	 * Get Plugin data
	 *
	 * @since 	1.0.0
	 * @version	1.0.0
	 *
	 * @return 	object $data the data
	 */
	public static function get_plugin_data() {
		include_once ABSPATH . '/wp-admin/includes/plugin.php';

		return get_plugin_data( WP_PLUGIN_DIR . '/' . WCA_SCROLLTOP_EXT_BASE );
	}

	/**
	 * Get Defaults options
	 *
	 * @since 	1.0.0
	 * @version	1.0.0
	 *
	 * @return 	array
	 */
	public static function get_defaults(): array {
		return [
			'position' 	=> 'right',
			'action'	=> 'top',
			'icon'		=> [
				'viewBox' 	=> '0 0 16 16',
				'paths'		=> [
					'M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z'
				]
			],
			'scroll'	=> [
				'offset' 	=> 100,
				'duration'	=> 400,
			],
			'style'	=> [
				'left'		=> 30,
				'right'		=> 30,
				'bottom'	=> 20,
				'width'		=> 45,
				'height'	=> 45,
				'padding'	=> 3,
				'opacity'	=> 100,
				'color'		=> '#ffffff',
				'borderRadius'		=> 7,
				'backgroundColor'	=> '#0a86ff',
			]
		];
	}
}
