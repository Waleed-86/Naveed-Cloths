<?php

namespace App\Services\Payment;

use App\Models\Order;

/**
 * STUB — JazzCash requires a Pakistani merchant account (merchant ID,
 * password, integrity salt) obtained through their business onboarding
 * process. Once you have sandbox credentials from JazzCash, implement the
 * charge() method here using their Mobile Wallet / Page Redirect API:
 * https://developer.jazzcash.com.pk — the request needs an HMAC-SHA256
 * secure hash built from the integrity salt; do not skip that step.
 */
class JazzCashGateway implements PaymentGatewayInterface
{
    public function charge(Order $order): PaymentResult
    {
        return PaymentResult::failed(
            'JazzCash payments are not yet available. Please choose Cash on Delivery or Bank Transfer.'
        );
    }

    public function identifier(): string
    {
        return 'jazzcash';
    }
}