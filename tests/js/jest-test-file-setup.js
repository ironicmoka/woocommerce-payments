/** @format */

/**
 * External dependencies
 */
import { setLocaleData } from '@wordpress/i18n';

// Set up `wp.*` aliases.  Doing this because any tests importing wp stuff will
// likely run into this.
global.wp = {
	shortcode: {
		next() {},
		regexp: jest.fn().mockReturnValue( new RegExp() ),
	},
};

global.wc = {};

const wordPressPackages = [ 'element', 'date' ];

const wooCommercePackages = [
	'components',
	'csv',
	'currency',
	'date',
	'navigation',
	'number',
];

global.window.wcTracks = {
	recordEvent: () => null,
};

wordPressPackages.forEach( ( lib ) => {
	Object.defineProperty( global.wp, lib, {
		get: () => require( `@wordpress/${ lib }` ),
	} );
} );

wooCommercePackages.forEach( ( lib ) => {
	Object.defineProperty( global.wc, lib, {
		get: () => require( `@woocommerce/${ lib }` ),
	} );
} );

global.wcSettings = {
	// adminUrl: 'https://vagrant.local/wp/wp-admin/',
	// locale: 'en-US',
	// currency: { code: 'USD', precision: 2, symbol: '$' },
	// date: {
	// 	dow: 0,
	// },
	orderStatuses: {
		pending: 'Pending payment',
		processing: 'Processing',
		'on-hold': 'On hold',
		completed: 'Completed',
		cancelled: 'Cancelled',
		refunded: 'Refunded',
		failed: 'Failed',
		paid: 'Paid',
	},
	l10n: {
		userLocale: 'en_US',
		weekdaysShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
	},
	// wcAdminSettings: {
	// 	woocommerce_actionable_order_statuses: [],
	// 	woocommerce_excluded_report_order_statuses: [],
	// },
};

global.wpApiSettings = {
	root: 'https://site.com/wp-json/',
	nonce: 'random_wp_rest_nonce',
};

// const config = require( '../../config/development.json' );
// window.wcAdminFeatures = config && config.features ? config.features : {};

setLocaleData(
	{ '': { domain: 'woocommerce-payments', lang: 'en_US' } },
	'woocommerce-payments'
);
