/** @format **/

/**
 * External dependencies
 */
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Flex,
	FlexBlock,
	FlexItem,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import AccountFees from './account-fees';
import AccountStatusItem from './account-status-item';
import DepositsStatus from 'components/deposits-status';
import PaymentsStatus from 'components/payments-status';
import StatusChip from './status-chip';
import './style.scss';
import './shared.scss';

const AccountStatusCard = ( props ) => {
	const { title, children, value } = props;
	return (
		<Card isMedium>
			<CardHeader
				className={ 'woocommerce-account-status__header' }
				direction={ 'row' }
				align={ 'center' }
				justify={ 'left' }
				gap={ 3 }
				expanded
			>
				{ title }
			</CardHeader>
			<CardBody>{ children || value || null }</CardBody>
		</Card>
	);
};

const AccountStatusError = () => {
	const cardTitle = __( 'Account details', 'woocommerce-payments' );
	return (
		<AccountStatusCard title={ cardTitle }>
			{ __(
				'Error determining the connection status.',
				'woocommerce-payments'
			) }
		</AccountStatusCard>
	);
};

const AccountStatusDetails = ( props ) => {
	const { accountStatus, accountFees } = props;

	const cardTitle = (
		<>
			<div className="wcpay-account-details-header-info">
				<div className="account-details">
					<div className="account-details__heading">
						{ __( 'Account details', 'woocommerce-payments' ) }
					</div>
					<div className="account-details__info-label">
						<StatusChip accountStatus={ accountStatus.status } />
					</div>
				</div>
				<div className="edit-details">
					<Button isLink href={ accountStatus.accountLink }>
						{ __( 'Edit details', 'woocommerce-payments' ) }
					</Button>
				</div>
			</div>
		</>
	);

	return (
		<AccountStatusCard title={ cardTitle }>
			{ accountStatus.email && (
				<AccountStatusItem
					label={ __( 'Connected email:', 'woocommerce-payments' ) }
				>
					{ accountStatus.email }
				</AccountStatusItem>
			) }
			<AccountStatusItem
				label={ __( 'Payments:', 'woocommerce-payments' ) }
			>
				<PaymentsStatus
					paymentsEnabled={ accountStatus.paymentsEnabled }
				/>
			</AccountStatusItem>
			<AccountStatusItem
				label={ __( 'Deposits:', 'woocommerce-payments' ) }
			>
				<DepositsStatus
					depositsStatus={ accountStatus.depositsStatus }
				/>
			</AccountStatusItem>
			<AccountStatusItem
				align={ 'flex-start' }
				label={ __( 'BaseFee:', 'woocommerce-payments' ) }
			>
				<AccountFees accountFees={ accountFees } />
			</AccountStatusItem>
		</AccountStatusCard>
	);
};

const AccountStatus = ( props ) => {
	const { accountStatus } = props;

	return accountStatus.error ? (
		<AccountStatusError />
	) : (
		<AccountStatusDetails { ...props } />
	);
};

export default AccountStatus;
