<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::query()->with('items')->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        if ($request->filled('payment_status')) {
            $query->where('payment_status', $request->string('payment_status'));
        }

        if ($request->filled('search')) {
            $term = '%'.$request->string('search').'%';
            $query->where(fn ($q) => $q->where('order_number', 'like', $term)
                ->orWhere('full_name', 'like', $term)
                ->orWhere('email', 'like', $term));
        }

        return response()->json($query->paginate($request->integer('per_page', 20)));
    }

    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,confirmed,packed,shipped,delivered,cancelled,returned'],
        ]);

        $order->update(['status' => $validated['status']]);

        return response()->json(['data' => $order->fresh('items')]);
    }

    public function updatePaymentStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'payment_status' => ['required', 'in:pending,paid,failed,refunded'],
        ]);

        $order->update(['payment_status' => $validated['payment_status']]);

        return response()->json(['data' => $order->fresh('items')]);
    }
}