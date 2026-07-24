<?php

namespace App\Services\Payment;

class PaymentResult
{
    private function __construct(
        public readonly bool $successful,
        public readonly string $paymentStatus, // maps directly to orders.payment_status
        public readonly ?string $transactionReference = null,
        public readonly ?string $message = null,
        public readonly ?string $redirectUrl = null, // for gateways needing an off-site redirect
    ) {}

    public static function success(?string $transactionReference = null, ?string $message = null): self
    {
        return new self(true, 'paid', $transactionReference, $message);
    }

    /**
     * For methods like COD or bank transfer where no money has moved yet —
     * the order is valid and confirmed, payment is just collected later.
     */
    public static function awaitingManualConfirmation(?string $message = null): self
    {
        return new self(true, 'pending', null, $message);
    }

    /**
     * For gateways that need the customer redirected off-site to complete
     * payment (e.g. Stripe Checkout, PayFast) before we know the outcome.
     */
    public static function pendingRedirect(string $redirectUrl, ?string $transactionReference = null): self
    {
        return new self(true, 'pending', $transactionReference, null, $redirectUrl);
    }

    public static function failed(string $message): self
    {
        return new self(false, 'failed', null, $message);
    }
}