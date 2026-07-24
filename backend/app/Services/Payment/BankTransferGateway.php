<?php

namespace App\Services\Payment;

use App\Models\Order;

class BankTransferGateway implements PaymentGatewayInterface
{
    public function charge(Order $order): PaymentResult
    {
        return PaymentResult::awaitingManualConfirmation(
            'Please transfer the order total to our bank account and share the receipt. '
            .'Your order will be confirmed once payment is verified.'
        );
    }

    public function identifier(): string
    {
        return 'bank_transfer';
    }
}