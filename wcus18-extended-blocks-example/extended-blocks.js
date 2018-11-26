/* eslint no-magic-numbers: [ "error", { "ignore": [ 100 ] } ] */

var wcus18EditorBlocks = ( function() { // eslint-disable-line no-unused-vars
	var component, __;

	__ = wp.i18n.__;

	component = {};

	/**
	 * Add filters.
	 */
	component.boot = function boot() {
		// Lets filter the moment when the block type gets registered.
		wp.hooks.addFilter( 'blocks.registerBlockType', 'wcus18/registerBlockType', component.addAttributes );

		// Lets filter what's visible in the editor.
		wp.hooks.addFilter( 'editor.BlockEdit', 'wcus18/BlockEdit', component.filterBlocksEdit );

		// Lets filter the attributes that get saved to the database.
		wp.hooks.addFilter( 'blocks.getSaveContent.extraProps', 'wcus18/addExtraProps', component.addExtraProps );
	};

	/**
	 * Add extra attributes to save to DB.
	 *
	 * @param {Object} props Properties.
	 * @param {Object} blockType Block type.
	 * @param {Object} attributes Attributes.
	 * @return {Object} Props.
	 */
	component.addExtraProps = function addExtraProps( props, blockType, attributes ) {
		var atts = {};

		// Check if the block we're adding extra properties to is image block.
		if ( 'core/image' !== blockType.name ) {
			return props;
		}

		if ( attributes.opacity ) {
			// Lets add the opacity as inline attribute style.
			// Note that we are not checking here if style already existed, perhaps a better way to do it would be via assigning a custom class and then styling.
			atts.style = 'opacity: ' + ( parseInt( attributes.opacity, 10 ) / 100 );
		}

		return _.extend( atts, props );
	};

	/**
	 * Register our opacity setting.
	 *
	 * @param {Object} settings Settings.
	 * @param {string} name Block name.
	 * @return {Object} Settings.
	 */
	component.addAttributes = function addAMPAttributes( settings, name ) {
		if ( 'core/image' === name ) {
			if ( ! settings.attributes ) {
				settings.attributes = {};
			}
			settings.attributes.opacity = {};
		}
		return settings;
	};

	/**
	 * Filters the edit to add opacity control.
	 *
	 * @param {Function} BlockEdit Edit function.
	 * @return {Function} Edit function.
	 */
	component.filterBlocksEdit = function filterBlocksEdit( BlockEdit ) {
		var el = wp.element.createElement;

		return function( props ) {
			var attributes = props.attributes,
				inspectorControls;

			// Lets return the original if it's not an image block.
			if ( 'core/image' !== props.name ) {
				return BlockEdit;
			}

			// Lets create our custom control.
			inspectorControls = el( wp.editor.InspectorControls, { key: 'inspector' },
				el( wp.components.RangeControl, {
					key: 'opacity',
					label: __( 'My custom opacity' ),
					value: attributes.opacity,
					min: 0,
					max: 100,
					onChange: function( value ) {
						props.setAttributes( { opacity: value } );
					}
				} )
			);

			// Lets return our custom opacity and the original.
			return [
				el( BlockEdit, _.extend( {
					key: 'original'
				}, props ) ),
				inspectorControls
			];
		};
	};

	return component;
}() );
