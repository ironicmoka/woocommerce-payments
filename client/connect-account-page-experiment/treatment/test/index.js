/** @format */
/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import user from '@testing-library/user-event';
import ConnectAccountPageExperiment from '..';

describe( 'ConnectAccountPageExperimentExperiment', () => {
	beforeEach( () => {
		window.location.assign = jest.fn();
		global.wcpaySettings = {
			connectUrl: '/wcpay-connect-url',
			connect: {
				country: 'US',
				availableCountries: { US: 'United States (US)' },
			},
		};
	} );

	test( 'should render correctly', () => {
		const { container: page } = render( <ConnectAccountPageExperiment /> );
		expect( page ).toMatchSnapshot();
	} );

	test( 'should render correctly when on-boarding disabled', () => {
		global.wcpaySettings.onBoardingDisabled = true;
		const { container: page } = render( <ConnectAccountPageExperiment /> );
		expect( page ).toMatchSnapshot();
	} );

	test( 'should prompt unsupported countries', () => {
		global.wcpaySettings = {
			connectUrl: '/wcpay-connect-url',
			connect: {
				country: 'CA',
				availableCountries: {
					GB: 'United Kingdom (UK)',
					US: 'United States (US)',
				},
			},
		};

		render( <ConnectAccountPageExperiment /> );
		user.click( screen.getByRole( 'link', { name: /Get started/ } ) );

		const modalSelector =
			'.woocommerce-payments__onboarding_location_check-modal';
		expect( document.body.querySelector( modalSelector ) ).not.toBeNull();
	} );
} );
