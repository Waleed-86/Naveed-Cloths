<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(Coupon::latest()->paginate($request->integer('per_page', 20)));
    }

    public function store(Request $request)
    {
        $validated = $this->validated($request);
        $validated['code'] = strtoupper($validated['code']);

        $coupon = Coupon::create($validated);

        return response()->json(['data' => $coupon], 201);
    }

    public function update(Request $request, Coupon $coupon)
    {
        $validated = $this->validated($request, $coupon->id);
        $validated['code'] = strtoupper($validated['code']);

        $coupon->update($validated);

        return response()->json(['data' => $coupon->fresh()]);
    }

    public function destroy(Coupon $coupon)
    {
        $coupon->delete();

        return response()->json(['message' => 'Coupon deleted.']);
    }

    private function validated(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'code' => ['required', 'string', 'max:50', 'unique:coupons,code,'.($ignoreId ?? 'NULL').',id'],
            'type' => ['required', 'in:percent,fixed'],
            'value' => ['required', 'numeric', 'min:0'],
            'min_order_amount' => ['nullable', 'numeric', 'min:0'],
            'usage_limit' => ['nullable', 'integer', 'min:1'],
            'expires_at' => ['nullable', 'date'],
            'is_active' => ['boolean'],
        ]);
    }
}