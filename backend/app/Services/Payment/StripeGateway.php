<?php

namespace App\Services\Payment;

use App\Models\Order;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class StripeGateway implements PaymentGatewayInterface
{
    public function charge(Order $order): PaymentResult
    {
        $secretKey = config('services.stripe.secret');

        if (! $secretKey) {
            return PaymentResult::failed(
                'Card payments are not yet available. Please choose Cash on Delivery or Bank Transfer.'
            );
        }

        // Uses Stripe's Checkout Sessions REST API directly (no SDK
        // dependency) — customer is redirected to Stripe's hosted page to
        // enter card details, then back to our order-confirmation page.
        $response = Http::withToken($secretKey)->asForm()->post('https://api.stripe.com/v1/checkout/sessions', [
            'mode' => 'payment',
            'success_url' => config('app.frontend_url').'/order-confirmation/'.$order->order_number,
            'cancel_url' => config('app.frontend_url').'/checkout',
            'client_reference_id' => $order->order_number,
            'customer_email' => $order->email,
            'line_items' => [[
                'price_data' => [
                    'currency' => 'pkr',
                    'product_data' => ['name' => "Order {$order->order_number}"],
                    'unit_amount' => (int) round($order->total * 100),
                ],
                'quantity' => 1,
            ]],
        ]);

        if ($response->failed()) {
            Log::error('Stripe checkout session creation failed', ['response' => $response->json()]);

            return PaymentResult::failed('Could not start the card payment. Please try again or choose another method.');
        }

        $session = $response->json();

        return PaymentResult::pendingRedirect($session['url'], $session['id']);
    }

    public function identifier(): string
    {
        return 'stripe';
    }
}
