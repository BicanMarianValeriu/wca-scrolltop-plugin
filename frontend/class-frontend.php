<?php
/**
 * The frontend-specific functionality of the plugin.
 *
 * @link       https://www.wecodeart.com/
 * @since      1.0.0
 *
 * @package    WCA\EXT\ScrollTop
 * @subpackage WCA\EXT\ScrollTop\Frontend
 */

namespace WCA\EXT\ScrollTop;

use WCA\EXT\ScrollTop\Admin;
use WeCodeArt\Config\Traits\Asset;
use function WeCodeArt\Functions\get_prop;

/**
 * The frontend-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the frontend-specific stylesheet and JavaScript.
 *
 * @package    WCA\EXT\ScrollTop
 * @subpackage WCA\EXT\ScrollTop\Frontend
 * @author     Bican Marian Valeriu <marianvaleriubican@gmail.com>
 */
class Frontend {

	use Asset;

	const CONTEXT = 'wca-scrolltop';

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since	1.0.0
	 * @access	private
	 * @var		string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * The config of this plugin.
	 *
	 * @since	1.0.0
	 * @access	private
	 * @var		mixed    $config    The config of this plugin.
	 */
	private $config;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since	1.0.0
	 * @param	string    $plugin_name	The name of this plugin.
	 * @param	string    $version		The version of this plugin.
	 */
	public function __construct( $plugin_name, $version, $config ) {
		$this->plugin_name	= $plugin_name;
		$this->version 		= $version;
		$this->config 		= $config;
	}

	/**
	 * Assets
	 *
	 * @since 	1.0.0
	 * @version	1.0.0
	 *
	 * @return 	void
	 */
	public function assets() {
		// Utilities classes
		$classes = get_prop( $this->config, 'classes', '' );
		if( $classes ) {
			wecodeart( 'styles' )->Utilities->load( explode( ' ', $classes ) );
		}

		// Styles
		$styles = get_prop( $this->config, 'style', [] );

		// Misc
		\WP_Style_Engine::store_css_rule( self::CONTEXT, '.wp-element-button--scrolltop', [
			'--wp--opacity'		=> get_prop( $styles, 'opacity', 100 ) / 100,
			'--wp--transition'	=> 'opacity .3s ease-in-out',
			'position' 			=> 'fixed',
			'opacity' 			=> 0,
			'z-index'			=> 5,
			'pointer-events' 	=> 'none',
		] );

		// Position
		$positions = wp_array_slice_assoc( $styles, [ 'top', 'bottom', 'left', 'right' ] );
		$positions = array_map( fn( $i ) => $i . 'px', $positions );
		unset( $positions[ get_prop( $this->config, 'position', 'right' ) === 'left' ? 'right' : 'left' ] );
		\WP_Style_Engine::store_css_rule( self::CONTEXT, '.wp-element-button--scrolltop', $positions );

		// Dimensions
		$dimensions = wp_array_slice_assoc( $styles, [ 'width', 'height' ] );
		$dimensions = array_map( fn( $i ) => $i . 'px', $dimensions );
		\WP_Style_Engine::store_css_rule( self::CONTEXT, '.wp-element-button--scrolltop', $dimensions );

		// Colors
		$colors = wp_array_slice_assoc( $styles, [ 'backgroundColor', 'color' ] );
		$rules['color'] = [
			'background' 	=> get_prop( $styles, 'backgroundColor' ),
			'text'			=> get_prop( $styles, 'color' )
		];

		// Border
		$rules['border'] = wp_parse_args( [
			'radius' => get_prop( $styles, 'borderRadius', '0' ) . 'px'
		], get_prop( $styles, 'border' ) );

		// Spacing
		$rules['spacing']['padding'] = get_prop( $styles, 'padding', '0' ) . 'px';

		// SVG Fix
		\WP_Style_Engine::store_css_rule( self::CONTEXT, '.wp-element-button--scrolltop svg', [
			'height' => 'initial'
		] );

		// Hover
		\WP_Style_Engine::store_css_rule( self::CONTEXT, '.wp-element-button--scrolltop:is(:hover,:active,:focus)', [
			'--wp--opacity' => 1
		] );

		// Load Styles
		wp_style_engine_get_styles( $rules, [
			'selector' 	=> '.wp-element-button--scrolltop',
			'context'	=> self::CONTEXT
		] );
	}
	
	/**
	 * Markup
	 *
	 * @since 	1.0.0
	 * @version	1.0.4
	 *
	 * @return 	void
	 */
	public function markup() {
		$scrollOffset	= get_prop( $this->config, [ 'scroll', 'offset' ], 0 );
		$scrollDuration	= get_prop( $this->config, [ 'scroll', 'duration' ], 100 );
		$elSelector		= get_prop( $this->config, [ 'element', 'selector' ], 'html' );
		$elOffset		= get_prop( $this->config, [ 'element', 'offset' ], 0 );

		wecodeart( 'markup' )->SVG::add( 'scrolltop', get_prop( $this->config, 'icon' ) );

		$classes = wp_parse_args(
			explode( ' ', get_prop( $this->config, 'classes', '' ) ),
			[ 'wp-element-button', 'wp-element-button--scrolltop' ]
		);

		$inline_css = 'transition:var(--wp--transition);';
		$inline_css .= 'opacity:' . ( $scrollOffset === 0 ? '1' : '0' ) . ';';
		$inline_css .= 'pointer-events:' . ( $scrollOffset === 0 ? 'all' : 'none' );
		
		wecodeart_input( 'button', [
			'label' => wecodeart( 'markup' )->SVG::compile( 'scrolltop' ),
			'attrs' => [
				'class'			=> join( ' ', array_filter( $classes ) ), // Escaped in the WeCodeArt API
				'type'			=> 'button',
				'style'			=> $inline_css,
				'aria-label' 	=> esc_html__( 'Scroll to top', 'wca-scrolltop' ),
			]
		] );

		$inline_js = <<<JS
			const ScrollTop = {
				el: document.querySelector('.wp-element-button--scrolltop'),
				target: document.querySelector('$elSelector'),
				to: 0,
				fps: 60,
				start: 0,
				change: 0,
				duration: 0,
				elapsedTime: 0,

				init: function() {
					const scrollListener = () => window.scrollY >= $scrollOffset ? this.fade(true) : this.fade();
					const clickListener = () => this.animate((this.target ? this.target.offsetTop : 0) - $elOffset, $scrollDuration);

					scrollListener();

					window.addEventListener('scroll', scrollListener);

					this.el.addEventListener('click', clickListener, true);
				},

				animate: function(to, duration) {
					this.to = to;
					this.duration = duration;
					this.start = document.documentElement.scrollTop || document.body.scrollTop;
					this.change = this.to - this.start;
					this.startTime = performance.now();

					return window.requestAnimationFrame(this.loop.bind(this));
				},

				loop: function(timestamp) {
					const elapsedTime = timestamp - this.startTime;
					const position = this.easing(elapsedTime, this.start, this.change, this.duration);

					document.documentElement.scrollTop = position;
					document.body.scrollTop = position;

					if (elapsedTime < this.duration) {
						window.requestAnimationFrame(this.loop.bind(this));
					}
				},

				easing: function(currentTime, start, change, duration) {
					currentTime /= duration;
					return -change * currentTime * (currentTime - 2) + start;
				},

				fade: function(dir) {
					this.el.classList[dir ? 'add' : 'remove']('wp-element-button--appear');
					this.el.style.opacity = dir ? 'var(--wp--opacity)' : 0;
					this.el.style.pointerEvents = dir ? 'all' : 'none';
				}
			};

			ScrollTop.init();
		JS;
		
		printf( '<script id="wecodeart-scrolltop-js">%s</script>', $inline_js );
	}
}
