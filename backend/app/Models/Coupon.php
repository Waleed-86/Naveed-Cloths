<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $fillable = [
        'code', 'type', 'value', 'min_order_amount',
        'usage_limit', 'times_used', 'expires_at', 'is_active',
    ];

    protected $casts = [
        'value' => 'decimal:2',
        'min_order_amount' => 'decimal:2',
        'expires_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    /**
     * Returns null if valid, or a human-readable reason if not — lets the
     * controller respond with a specific, useful error message.
     */
    public function invalidReason(float $subtotal): ?string
    {
        if (! $this->is_active) {
            return 'This coupon is no longer active.';
        }

        if ($this->expires_at && $this->expires_at->isPast()) {
            return 'This coupon has expired.';
        }

        if ($this->usage_limit !== null && $this->times_used >= $this->usage_limit) {
            return 'This coupon has reached its usage limit.';
        }

        if ($this->min_order_amount && $subtotal < $this->min_order_amount) {
            return 'Add Rs. '.number_format($this->min_order_amount - $subtotal).' more to use this coupon.';
        }

        return null;
    }

    public function calculateDiscount(float $subtotal): float
    {
        if ($this->type === 'percent') {
            return round($subtotal * ((float) $this->value / 100), 2);
        }

        return min((float) $this->value, $subtotal);
    }
}
