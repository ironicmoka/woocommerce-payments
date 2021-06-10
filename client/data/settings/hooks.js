/** @format */

/**
 * External dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_NAME } from '../constants';

export const useEnabledPaymentMethodIds = () => {
	const { updateEnabledPaymentMethodIds } = useDispatch( STORE_NAME );

	return useSelect(
		( select ) => {
			const { getEnabledPaymentMethodIds } = select( STORE_NAME );

			return [
				getEnabledPaymentMethodIds(),
				updateEnabledPaymentMethodIds,
			];
		},
		[ updateEnabledPaymentMethodIds ]
	);
};

export const useDebugLog = () => {
	const { updateIsDebugLogEnabled } = useDispatch( STORE_NAME );

	return useSelect(
		( select ) => {
			const { getIsDebugLogEnabled } = select( STORE_NAME );

			return [ getIsDebugLogEnabled(), updateIsDebugLogEnabled ];
		},
		[ updateIsDebugLogEnabled ]
	);
};

export const useTestMode = () => {
	const { updateIsTestModeEnabled } = useDispatch( STORE_NAME );

	return useSelect(
		( select ) => {
			const { getIsTestModeEnabled } = select( STORE_NAME );

			return [ getIsTestModeEnabled(), updateIsTestModeEnabled ];
		},
		[ updateIsTestModeEnabled ]
	);
};

export const useDevMode = () => {
	return useSelect( ( select ) => {
		const { getIsDevModeEnabled } = select( STORE_NAME );

		return getIsDevModeEnabled();
	}, [] );
};

export const useAccountStatementDescriptor = () => {
	const { updateAccountStatementDescriptor } = useDispatch( STORE_NAME );

	return useSelect(
		( select ) => {
			const { getAccountStatementDescriptor } = select( STORE_NAME );

			return [
				getAccountStatementDescriptor(),
				updateAccountStatementDescriptor,
			];
		},
		[ updateAccountStatementDescriptor ]
	);
};

export const useManualCapture = () => {
	const { updateIsManualCaptureEnabled } = useDispatch( STORE_NAME );

	return useSelect(
		( select ) => {
			const { getIsManualCaptureEnabled } = select( STORE_NAME );

			return [
				getIsManualCaptureEnabled(),
				updateIsManualCaptureEnabled,
			];
		},
		[ updateIsManualCaptureEnabled ]
	);
};

export const useIsWCPayEnabled = () => {
	const { updateIsWCPayEnabled } = useDispatch( STORE_NAME );

	return useSelect(
		( select ) => {
			const { getIsWCPayEnabled } = select( STORE_NAME );

			return [ getIsWCPayEnabled(), updateIsWCPayEnabled ];
		},
		[ updateIsWCPayEnabled ]
	);
};

export const useTitle = () => {
	const { updateTitle } = useDispatch( STORE_NAME );

	return useSelect(
		( select ) => {
			const { getTitle } = select( STORE_NAME );

			return [ getTitle(), updateTitle ];
		},
		[ updateTitle ]
	);
};

export const useDescription = () => {
	const { updateDescription } = useDispatch( STORE_NAME );

	return useSelect(
		( select ) => {
			const { getDescription } = select( STORE_NAME );

			return [ getDescription(), updateDescription ];
		},
		[ updateDescription ]
	);
};

export const useGetAvailablePaymentMethodIds = () =>
	useSelect( ( select ) => {
		const { getAvailablePaymentMethodIds } = select( STORE_NAME );

		return getAvailablePaymentMethodIds();
	} );

export const useSettings = () => {
	const { saveSettings } = useDispatch( STORE_NAME );

	return useSelect(
		( select ) => {
			const {
				getSettings,
				hasFinishedResolution,
				isResolving,
				isSavingSettings,
			} = select( STORE_NAME );

			const isLoading =
				isResolving( 'getSettings' ) ||
				! hasFinishedResolution( 'getSettings' );

			return {
				settings: getSettings(),
				isLoading,
				saveSettings,
				isSaving: isSavingSettings(),
			};
		},
		[ saveSettings ]
	);
};

export const useDigitalWalletsEnabledSettings = () => {
	const { updateIsDigitalWalletsEnabled } = useDispatch( STORE_NAME );

	return useSelect( ( select ) => {
		const { getIsDigitalWalletsEnabled } = select( STORE_NAME );

		return [ getIsDigitalWalletsEnabled(), updateIsDigitalWalletsEnabled ];
	} );
};

export const useDigitalWalletsLocations = () => {
	const { updateDigitalWalletsLocations } = useDispatch( STORE_NAME );

	return useSelect( ( select ) => {
		const { getDigitalWalletsLocations } = select( STORE_NAME );

		return [ getDigitalWalletsLocations(), updateDigitalWalletsLocations ];
	} );
};

export const useDigitalWalletsButtonType = () => {
	const { updateDigitalWalletsButtonType } = useDispatch( STORE_NAME );

	return useSelect( ( select ) => {
		const { getDigitalWalletsButtonType } = select( STORE_NAME );

		return [
			getDigitalWalletsButtonType(),
			updateDigitalWalletsButtonType,
		];
	} );
};

export const useDigitalWalletsButtonSize = () => {
	const { updateDigitalWalletsButtonSize } = useDispatch( STORE_NAME );

	return useSelect( ( select ) => {
		const { getDigitalWalletsButtonSize } = select( STORE_NAME );

		return [
			getDigitalWalletsButtonSize(),
			updateDigitalWalletsButtonSize,
		];
	} );
};

export const useDigitalWalletsButtonTheme = () => {
	const { updateDigitalWalletsButtonTheme } = useDispatch( STORE_NAME );

	return useSelect( ( select ) => {
		const { getDigitalWalletsButtonTheme } = select( STORE_NAME );

		return [
			getDigitalWalletsButtonTheme(),
			updateDigitalWalletsButtonTheme,
		];
	} );
};
