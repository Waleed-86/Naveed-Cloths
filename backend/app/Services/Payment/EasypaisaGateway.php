<?php

namespace App\Services\Payment;

use App\Models\Order;

/**
 * STUB — Easypaisa requires a merchant account (Store ID, Hash Key) from
 * Telenor Microfinance Bank's business onboarding. Once you have sandbox
 * credentials, implement charge() using their Easypaisa Open API /
 * Instant Payment Gateway: https://easypaisa.com.pk/business/ — requests
 * are signed with the Hash Key; follow their signature spec exactly.
 */
class EasypaisaGateway implements PaymentGatewayInterface
{
    public function charge(Order $order): PaymentResult
    {
        return PaymentResult::failed(
            'Easypaisa payments are not yet available. Please choose Cash on Delivery or Bank Transfer.'
        );
    }

    public function identifier(): string
    {
        return 'easypaisa';
    }
}