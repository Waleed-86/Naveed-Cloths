<?php

namespace App\Services\Payment;

use App\Models\Order;

/**
 * STUB — PayFast (Pakistan) requires a merchant account (Merchant ID,
 * Secured Key) from their onboarding process. Once you have sandbox
 * credentials, implement charge() using their Transaction API — typically
 * a signed redirect similar to the Stripe Checkout Session flow above.
 */
class PayFastGateway implements PaymentGatewayInterface
{
    public function charge(Order $order): PaymentResult
    {
        return PaymentResult::failed(
            'PayFast payments are not yet available. Please choose Cash on Delivery or Bank Transfer.'
        );
    }

    public function identifier(): string
    {
        return 'payfast';
    }
}