<?php

namespace App\Services\Payment;

use App\Models\Order;

interface PaymentGatewayInterface
{
    /**
     * Attempt to charge/initiate payment for the given order.
     * Implementations must never throw for expected failures (declined card,
     * gateway timeout, etc.) — return a failed PaymentResult instead, so the
     * order can still be created with a clear payment_status.
     */
    public function charge(Order $order): PaymentResult;

    /**
     * Machine-readable identifier matching the `payment_method` enum on the
     * orders table (e.g. 'cod', 'jazzcash', 'stripe').
     */
    public function identifier(): string;
}