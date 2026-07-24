<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function validateCode(Request $request)
    {
        $validated = $request->validate([
            'code' => ['required', 'string'],
            'subtotal' => ['required', 'numeric', 'min:0'],
        ]);

        $coupon = Coupon::where('code', strtoupper($validated['code']))->first();

        if (! $coupon) {
            return response()->json(['message' => 'Invalid coupon code.'], 422);
        }

        $reason = $coupon->invalidReason((float) $validated['subtotal']);
        if ($reason) {
            return response()->json(['message' => $reason], 422);
        }

        $discount = $coupon->calculateDiscount((float) $validated['subtotal']);

        return response()->json([
            'data' => [
                'code' => $coupon->code,
                'type' => $coupon->type,
                'value' => (float) $coupon->value,
                'discount' => $discount,
            ],
        ]);
    }
}