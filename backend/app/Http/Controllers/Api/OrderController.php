<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'email' => ['required', 'email'],
            'province' => ['required', 'string'],
            'city' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string'],
            'postal_code' => ['required', 'string', 'max:20'],
            'notes' => ['nullable', 'string'],
            'payment_method' => ['required', 'in:cod,jazzcash,easypaisa,bank_transfer,payfast,stripe'],
            'coupon_code' => ['nullable', 'string'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'integer', 'exists:products,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'items.*.size' => ['nullable', 'string'],
            'items.*.color' => ['nullable', 'string'],
        ]);

        $order = DB::transaction(function () use ($validated, $request) {
            // Lock the rows we're about to sell against, so two simultaneous
            // checkouts can't both oversell the same last-few units of stock.
            $productIds = collect($validated['items'])->pluck('product_id');
            $products = Product::whereIn('id', $productIds)->lockForUpdate()->get()->keyBy('id');

            $subtotal = 0;
            $lineItems = [];

            foreach ($validated['items'] as $item) {
                $product = $products->get($item['product_id']);

                if (! $product || ! $product->is_active) {
                    throw ValidationException::withMessages(['items' => 'A product in your cart is no longer available.']);
                }

                if ($product->stock < $item['quantity']) {
                    throw ValidationException::withMessages([
                        'items' => "Only {$product->stock} left of \"{$product->name}\" — please adjust the quantity in your cart.",
                    ]);
                }

                $unitPrice = $product->discount_price ?? $product->price;
                $lineTotal = $unitPrice * $item['quantity'];
                $subtotal += $lineTotal;

                $lineItems[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'unit_price' => $unitPrice,
                    'size' => $item['size'] ?? null,
                    'color' => $item['color'] ?? null,
                    'quantity' => $item['quantity'],
                    'line_total' => $lineTotal,
                ];

                // Reduce stock now that we've validated availability under lock
                $product->decrement('stock', $item['quantity']);
            }

            // TODO: real coupon validation against a coupons table once it exists
            $discount = 0;
            $shipping = $subtotal >= 5000 ? 0 : 200;
            $total = $subtotal - $discount + $shipping;

            $order = Order::create([
                'order_number' => Order::generateOrderNumber(),
                'user_id' => $request->user()?->id,
                'full_name' => $validated['full_name'],
                'phone' => $validated['phone'],
                'email' => $validated['email'],
                'province' => $validated['province'],
                'city' => $validated['city'],
                'address' => $validated['address'],
                'postal_code' => $validated['postal_code'],
                'notes' => $validated['notes'] ?? null,
                'payment_method' => $validated['payment_method'],
                'payment_status' => 'pending',
                'status' => 'pending',
                'coupon_code' => $validated['coupon_code'] ?? null,
                'subtotal' => $subtotal,
                'discount' => $discount,
                'shipping_charge' => $shipping,
                'total' => $total,
            ]);

            foreach ($lineItems as $line) {
                $order->items()->create($line);
            }

            return $order;
        });

        return response()->json(['data' => $order->load('items')], 201);
    }

    public function index(Request $request)
    {
        $orders = $request->user()
            ->orders()
            ->with('items')
            ->latest()
            ->paginate(10);

        return response()->json($orders);
    }

    public function show(Request $request, string $orderNumber)
    {
        $request->validate([
            'email' => ['nullable', 'email'],
        ]);

        if (! $request->user() && ! $request->filled('email')) {
            abort(422, 'Email is required to look up an order.');
        }

        $order = Order::where('order_number', $orderNumber)
            ->where(function ($q) use ($request) {
                // Logged-in owner can view without extra proof; anyone else
                // (guest tracking) must supply the exact email the order was
                // placed under, passed explicitly as ?email=
                if ($request->user()) {
                    $q->where('user_id', $request->user()->id);
                }
                if ($request->filled('email')) {
                    $q->orWhere('email', $request->string('email'));
                }
            })
            ->with('items')
            ->firstOrFail();

        return response()->json(['data' => $order]);
    }
}