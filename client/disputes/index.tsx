/** @format **/

/**
 * External dependencies
 */
import React from 'react';
import wcpayTracks from 'tracks';
import { dateI18n } from '@wordpress/date';
import { _n, __ } from '@wordpress/i18n';
import moment from 'moment';
import { TableCard } from '@woocommerce/components';
import { onQueryChange, getQuery } from '@woocommerce/navigation';
import {
	downloadCSVFile,
	generateCSVDataFromTable,
	generateCSVFileName,
} from '@woocommerce/csv-export';

/**
 * Internal dependencies.
 */
import { useDisputes, useDisputesSummary } from 'data/index';
import OrderLink from 'components/order-link';
import DisputeStatusChip from 'components/dispute-status-chip';
import ClickableCell from 'components/clickable-cell';
import DetailsLink, { getDetailsURL } from 'components/details-link';
import Page from 'components/page';
import { TestModeNotice, topics } from 'components/test-mode-notice';
import { reasons } from './strings';
import { formatStringValue } from 'utils';
import { formatExplicitCurrency } from 'utils/currency';
import DownloadButton from 'components/download-button';
import disputeStatusMapping from 'components/dispute-status-chip/mappings';
import { DisputesTableHeader } from 'wcpay/types/disputes';

import './style.scss';

const headers: DisputesTableHeader[] = [
	{
		key: 'details',
		label: '',
		required: true,
		cellClassName: 'info-button',
		isLeftAligned: true,
	},
	{
		key: 'amount',
		label: __( 'Amount', 'woocommerce-payments' ),
		required: true,
	},
	{
		key: 'status',
		label: __( 'Status', 'woocommerce-payments' ),
		required: true,
		isLeftAligned: true,
	},
	{
		key: 'reason',
		label: __( 'Reason', 'woocommerce-payments' ),
		required: true,
		isLeftAligned: true,
	},
	{
		key: 'source',
		label: __( 'Source', 'woocommerce-payments' ),
		required: true,
		cellClassName: 'is-center-aligned',
	},
	{
		key: 'order',
		label: __( 'Order #', 'woocommerce-payments' ),
		required: true,
	},
	{
		key: 'customer',
		label: __( 'Customer', 'woocommerce-payments' ),
		isLeftAligned: true,
	},
	{
		key: 'email',
		label: __( 'Email', 'woocommerce-payments' ),
		visible: false,
		isLeftAligned: true,
	},
	{
		key: 'country',
		label: __( 'Country', 'woocommerce-payments' ),
		visible: false,
		isLeftAligned: true,
	},
	{
		key: 'created',
		label: __( 'Disputed on', 'woocommerce-payments' ),
		required: true,
		isLeftAligned: true,
	},
	{
		key: 'dueBy',
		label: __( 'Respond by', 'woocommerce-payments' ),
		required: true,
		isLeftAligned: true,
	},
];

export const DisputesList = (): JSX.Element => {
	const { disputes, isLoading } = useDisputes( getQuery() );

	const {
		disputesSummary,
		isLoading: isSummaryLoading,
	} = useDisputesSummary();

	const rows = disputes.map( ( dispute ) => {
		const {
			amount = 0,
			currency,
			charge,
			created,
			id: disputeId,
			evidence_details: evidenceDetails,
			order: disputeOrder,
			reason,
			status,
		} = dispute;

		const order = {
			value: disputeOrder ? disputeOrder.number : '',
			display: <OrderLink order={ disputeOrder } />,
		};

		const clickable = ( children: React.ReactNode ): JSX.Element => (
			<ClickableCell href={ getDetailsURL( disputeId, 'disputes' ) }>
				{ children }
			</ClickableCell>
		);

		const detailsLink = (
			<DetailsLink id={ disputeId } parentSegment="disputes" />
		);

		const source = charge?.payment_method_details?.card?.brand;
		const name = charge?.billing_details?.name;
		const email = charge?.billing_details?.email;
		const country = charge?.billing_details?.address?.country;

		const reasonMapping = reasons[ reason ];
		const reasonDisplay = reasonMapping
			? reasonMapping.display
			: formatStringValue( reason );

		const data = {
			amount: {
				value: amount / 100,
				display: clickable(
					formatExplicitCurrency( amount, currency )
				),
			},
			status: {
				value: status,
				display: clickable( <DisputeStatusChip status={ status } /> ),
			},
			reason: {
				value: reason,
				display: clickable( reasonDisplay ),
			},
			source: {
				value: source,
				display: clickable(
					<span
						className={ `payment-method__brand payment-method__brand--${ source }` }
					/>
				),
			},
			created: {
				value: created * 1000,
				display: clickable(
					dateI18n( 'M j, Y', moment( created * 1000 ).toISOString() )
				),
			},
			dueBy: {
				value: ( evidenceDetails?.due_by || 0 ) * 1000,
				display: clickable(
					dateI18n(
						'M j, Y / g:iA',
						moment(
							( evidenceDetails?.due_by || 0 ) * 1000
						).toISOString()
					)
				),
			},
			order,
			customer: {
				value: name,
				display: clickable( name ),
			},
			email: {
				value: email,
				display: clickable( email ),
			},
			country: {
				value: country,
				display: clickable( country ),
			},
			details: { value: disputeId, display: detailsLink },
		};
		return headers.map( ( { key } ) => data[ key ] || { display: null } );
	} );

	const downloadable = !! rows.length;

	function onDownload() {
		const title = __( 'Disputes', 'woocommerce-payments' );

		const csvColumns = [
			{
				...headers[ 0 ],
				label: __( 'Dispute Id', 'woocommerce-payments' ),
			},
			...headers.slice( 1 ),
		];

		const csvRows = rows.map( ( row ) => {
			return [
				...row.slice( 0, 2 ),
				{
					...row[ 2 ],
					value: disputeStatusMapping[ row[ 2 ].value ?? '' ].message,
				},
				{
					...row[ 3 ],
					value:
						typeof row[ 3 ].value === 'string'
							? formatStringValue( row[ 3 ].value )
							: '',
				},
				...row.slice( 4, 9 ),
				{
					...row[ 9 ],
					value: dateI18n(
						'Y-m-d',
						moment( row[ 9 ].value ).toISOString()
					),
				},
				{
					...row[ 10 ],
					value: dateI18n(
						'Y-m-d / g:iA',
						moment( row[ 10 ].value ).toISOString()
					),
				},
			];
		} );

		downloadCSVFile(
			generateCSVFileName( title, getQuery() ),
			generateCSVDataFromTable( csvColumns, csvRows )
		);

		wcpayTracks.recordEvent( 'wcpay_disputes_download', {
			exported_disputes: csvRows.length,
			total_disputes: disputesSummary.count,
		} );
	}

	let summary;
	const isDisputesSummaryDataLoaded =
		disputesSummary.count !== undefined && false === isSummaryLoading;
	if ( isDisputesSummaryDataLoaded ) {
		summary = [
			{
				label: _n(
					'dispute',
					'disputes',
					disputesSummary.count ?? 0,
					'woocommerce-payments'
				),
				value: `${ disputesSummary.count }`,
			},
		];
	}

	return (
		<Page>
			<TestModeNotice topic={ topics.disputes } />
			<TableCard
				className="wcpay-disputes-list"
				title={ __( 'Disputes', 'woocommerce-payments' ) }
				isLoading={ isLoading }
				rowsPerPage={ parseInt( getQuery().per_page ?? '', 10 ) || 25 }
				totalRows={ disputesSummary.count || 0 }
				headers={ headers }
				rows={ rows }
				summary={ summary }
				query={ getQuery() }
				onQueryChange={ onQueryChange }
				actions={ [
					downloadable && (
						<DownloadButton
							key="download"
							isDisabled={ isLoading }
							onClick={ onDownload }
						/>
					),
				] }
			/>
		</Page>
	);
};

export default DisputesList;
