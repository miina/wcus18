<?php
/**
 * Plugin Name: WCUS 2018: Example of Extended Core Blocks.
 * Description: Example plugin for using extended blocks, not meant for production. This plugin adds a custom Opacity Range Control for Image block.
 * Plugin URI: https://github.com/miina/wcus
 * Author: Miina Sikk
 * Author URI: https://github.com/miina
 * Version: 0.1
 * Text Domain: wcus18_ebe
 * License: GPLv2 or later
 *
 * @package WCUS18
 */

/**
 * Enqueue editor assets.
 */
function wcus18_ebe_enqueue_block_editor_assets() {
	wp_enqueue_script(
		'wcus18-extended-blocks',
		plugin_dir_url( __FILE__ ) . '/extended-blocks.js',
		array( 'wp-editor', 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components' )
	);

	wp_add_inline_script(
		'wcus18-extended-blocks',
		'wcus18EditorBlocks.boot();'
	);
}
add_action( 'enqueue_block_editor_assets', 'wcus18_ebe_enqueue_block_editor_assets' );
