<?php

namespace App\Services\Payment;

use App\Models\Order;

class CashOnDeliveryGateway implements PaymentGatewayInterface
{
    public function charge(Order $order): PaymentResult
    {
        return PaymentResult::awaitingManualConfirmation(
            'Payment will be collected in cash upon delivery.'
        );
    }

    public function identifier(): string
    {
        return 'cod';
    }
}