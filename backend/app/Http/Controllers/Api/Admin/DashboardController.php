<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $totalRevenue = Order::where('payment_status', 'paid')->sum('total');
        $pendingOrdersCount = Order::where('status', 'pending')->count();

        return response()->json([
            'data' => [
                'total_orders' => Order::count(),
                'pending_orders' => $pendingOrdersCount,
                'total_revenue' => (float) $totalRevenue,
                'total_products' => Product::count(),
                'total_customers' => User::where('role', 'customer')->count(),
                'low_stock_products' => Product::whereColumn('stock', '<=', 'low_stock_threshold')
                    ->where('stock', '>', 0)
                    ->count(),
                'out_of_stock_products' => Product::where('stock', 0)->count(),
                'recent_orders' => Order::latest()->limit(5)->get([
                    'id', 'order_number', 'full_name', 'status', 'total', 'created_at',
                ]),
                'orders_by_status' => Order::select('status', DB::raw('count(*) as count'))
                    ->groupBy('status')
                    ->pluck('count', 'status'),
            ],
        ]);
    }
}