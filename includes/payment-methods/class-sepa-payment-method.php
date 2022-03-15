<?php
/**
 * Class Sepa_Payment_Method
 *
 * @package WCPay\Payment_Methods
 */

namespace WCPay\Payment_Methods;

use WC_Payments_Token_Service;

/**
 * Sepa Payment Method class extending UPE base class
 */
class Sepa_Payment_Method extends UPE_Payment_Method {

	/**
	 * Constructor for Sepa payment method
	 *
	 * @param WC_Payments_Token_Service $token_service Token class instance.
	 */
	public function __construct( $token_service ) {
		parent::__construct( $token_service );
		$this->stripe_id   = 'sepa_debit';
		$this->title       = 'SEPA Direct Debit';
		$this->is_reusable = true;
		$this->currencies  = [ 'EUR' ];
	}

	/**
	 * Returns testing credentials to be printed at checkout in test mode.
	 *
	 * @return string|bool
	 */
	public function get_testing_instructions() {
		return __( '<strong>Test mode:</strong> use the test account number AT611904300234573201. Other payment methods may redirect to a Stripe test page to authorize payment. More test card numbers are listed <a>here</a>.', 'woocommerce-payments' );
	}
}
