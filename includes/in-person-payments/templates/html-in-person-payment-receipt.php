<?php
/**
 * In Person Payments Print Receipt Template
 *
 * @package WooCommerce\Payments
 */

/**
 * Doc format_price_helper
 *
 * @param  mixed $product the product.
 * @param  mixed $currency the currency.
 * @return mixed
 */
function format_price_helper( $product, $currency ) {
	$active_price  = $product['price'];
	$regular_price = $product['regular_price'];
	$has_discount  = $active_price !== $regular_price;

	if ( $has_discount ) {
		return '<s>' . wc_price( $regular_price, [ 'currency' => $currency ] ) . '</s> ' . wc_price( $active_price, [ 'currency' => $currency ] );
	}

	return wc_price( $active_price, [ 'currency' => $currency ] );
}

?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Print Receipt</title>
	<style>
		body {
			margin: 0;
			padding: 0;
			border: 0;
		}

		.align-left {
			text-align: left;
		}

		.align-right {
			text-align: right;
		}
		.align-top {
			vertical-align: top;
		}

		.receipt {
			min-width: 130px;
			max-width: 300px;
			padding-left: 16px;
			padding-right: 16px;
			margin: 0 auto;
			text-align: center;
			font-family: SF Pro Text, sans-serif;
			font-size: 8px;

		}

		.receipt-table {
			width: 100%;
			border-collapse: separate;
			border-spacing: 0 2px;
		}

		.receipt__header .title {
			font-size: 14px;
			line-height: 17px;
			margin-bottom: 12px;
			font-weight: 700;
		}

		.receipt__header .store {
			padding: 0 12px;
		}

		.receipt__header .store__address {
			margin-top: 12px;
			line-height: 2px;
		}

		.receipt__header .store__contact {
			margin-top: 4px;
		}

		.receipt__header .order__title {
			font-weight: 800;
		}

		.receipt__transaction {
			line-height: 2px;
		}

	</style>
</head>
<body>
	<div class="receipt">
		<div class="receipt__header">
			<h1 class="title"><?php echo esc_html( $business_name ); ?></h1>
			<hr />
			<div class="store">
				<?php if ( $support_address ) { ?>
				<div class="store__address">
					<p><?php echo esc_html( $support_address['line1'] ); ?></p>
					<p><?php echo esc_html( $support_address['line2'] ); ?></p>
					<p><?php echo esc_html( sprintf( '%s, %s %s %s', $support_address['city'], $support_address['state'], $support_address['postal_code'], $support_address['country'] ) ); ?></p>
					<?php echo esc_html( gmdate( 'Y/m/d - H:iA' ) ); ?>
				</div>
				<?php } ?>
				<p class="store__contact">
					<?php echo esc_html( sprintf( '%s %s', $support_phone, $support_email ) ); ?>
				</p>
			</div>
			<div class="order">
				<p class="order__title"><?php echo esc_html( __( 'Order ', 'woocommerce-payments' ) . $order['id'] ); ?></p>
			</div>
		</div>
		<hr />
		<div class="receipt__products">
			<table class="receipt-table">
				<?php foreach ( $order['line_items'] as $item ) { ?>
				<tr>
					<td class="align-left">
						<div><?php echo esc_html( $item['name'] ); ?></div>
						<div><?php echo esc_html( $item['quantity'] ); ?> @ <?php echo wp_kses( format_price_helper( $item['product'], $order['currency'] ), 'post' ); ?></div> <!-- TODO discounts -->
						<div><?php echo sprintf( '%s: %s', esc_html( __( 'SKU', 'woocommerce-payments' ) ), esc_html( $item['product']['id'] ) ); ?></div> <!-- TODO SKU or ID? -->
					</td>
					<td class="align-right align-top"><?php echo wp_kses( wc_price( $item['subtotal'], [ 'currency' => $order['currency'] ] ), 'post' ); ?></td>
				</tr>
				<?php } ?>
			</table>
		</div>
		<hr />
		<div class="receipt__subtotal">
			<table class="receipt-table">
				<tr>
					<td class="align-left"><b><?php echo esc_html( __( 'SUBTOTAL', 'woocommerce-payments' ) ); ?></b></td>
					<td class="align-right"><b><?php echo wp_kses( wc_price( $order['subtotal'], [ 'currency' => $order['currency'] ] ), 'post' ); ?></b></td>
				</tr>
				<?php foreach ( $order['coupon_lines'] as $order_coupon ) { ?>
				<tr>
					<td class="align-left">
						<div><?php echo sprintf( '%s: %s', esc_html( 'Discount' ), esc_html( $order_coupon['code'] ) ); ?></div>
						<div><?php echo esc_html( $order_coupon['description'] ); ?></div>
					</td>
					<td class="align-right align-top">-<?php echo wp_kses( wc_price( $order_coupon['discount'], [ 'currency' => $order['currency'] ] ), 'post' ); ?></td>
				</tr>
				<?php } ?>
				<?php foreach ( $order['tax_lines'] as $tax_line ) { ?>
				<tr>
					<td class="align-left">
						<div><?php echo esc_html( __( 'Tax', 'woocommerce-payments' ) ); ?></div>
						<div><?php echo esc_html( wc_round_tax_total( $tax_line['rate_percent'] ) ); ?>%</div>
					</td>
					<td class="align-right align-top"><?php echo wp_kses( wc_price( $tax_line['tax_total'], [ 'currency' => $order['currency'] ] ), 'post' ); ?></td>
				</tr>
				<?php } ?>
				<tr>
					<td colspan="2" class="align-left"></td>
				</tr>
				<tr>
					<td class="align-left"><b><?php echo esc_html( __( 'TOTAL', 'woocommerce-payments' ) ); ?></b></td>
					<td class="align-right"><b><?php echo wp_kses( wc_price( $order['total'], [ 'currency' => $order['currency'] ] ), 'post' ); ?></b></td>
				</tr>
			</table>
		</div>
		<hr />
		<div class="receipt__amount-paid">
			<table class="receipt-table">
				<tr>
					<td class="align-left"><b><?php echo esc_html( __( 'AMOUNT PAID', 'woocommerce-payments' ) ); ?></b>:</td>
					<td class="align-right"><b><?php echo wp_kses( wc_price( $charge['amount_captured'], [ 'currency' => $order['currency'] ] ), 'post' ); ?></b></td>
				</tr>
				<tr>
					<td colspan="2" class="align-left"><?php echo esc_html( ucfirst( $charge['payment_method_details']['brand'] ) . ' - ' . $charge['payment_method_details']['last4'] ); ?></td>
				</tr>
			</table>
		</div>
		<hr />
		<div class="receipt__transaction">
			<p><?php echo sprintf( '%s: %s', esc_html( __( 'Application name', 'woocommerce-payments' ) ), esc_html( ucfirst( $charge['payment_method_details']['application_preferred_name'] ) ) ); ?></p>
			<p><?php echo sprintf( '%s: %s', esc_html( __( 'AID', 'woocommerce-payments' ) ), esc_html( ucfirst( $charge['payment_method_details']['dedicated_file_name'] ) ) ); ?></p>
			<p><?php echo sprintf( '%s: %s', esc_html( __( 'Account Type', 'woocommerce-payments' ) ), esc_html( ucfirst( $charge['payment_method_details']['account_type'] ) ) ); ?></p>
		</div>
	</div>
</body>
</html>
