<?php

namespace App\Services\Payment;

use InvalidArgumentException;

class PaymentGatewayFactory
{
    /**
     * Add new gateways here only — nowhere else in the app should reference
     * a specific provider class or branch on payment_method strings.
     */
    public static function make(string $method): PaymentGatewayInterface
    {
        return match ($method) {
            'cod' => new CashOnDeliveryGateway,
            'bank_transfer' => new BankTransferGateway,
            'stripe' => new StripeGateway,
            'jazzcash' => new JazzCashGateway,
            'easypaisa' => new EasypaisaGateway,
            'payfast' => new PayFastGateway,
            default => throw new InvalidArgumentException("Unknown payment method '{$method}'."),
        };
    }
}