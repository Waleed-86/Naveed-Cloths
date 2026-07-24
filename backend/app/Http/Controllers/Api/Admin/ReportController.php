<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function sales(Request $request)
    {
        $days = $request->integer('days', 30);
        $from = now()->subDays($days)->startOfDay();

        $revenueByDay = Order::where('created_at', '>=', $from)
            ->where('payment_status', 'paid')
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(total) as revenue'), DB::raw('COUNT(*) as orders'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $topProducts = OrderItem::join('orders', 'orders.id', '=', 'order_items.order_id')
            ->where('orders.created_at', '>=', $from)
            ->select('order_items.product_name', DB::raw('SUM(order_items.quantity) as units_sold'), DB::raw('SUM(order_items.line_total) as revenue'))
            ->groupBy('order_items.product_name')
            ->orderByDesc('units_sold')
            ->limit(10)
            ->get();

        return response()->json([
            'data' => [
                'period_days' => $days,
                'revenue_by_day' => $revenueByDay,
                'top_products' => $topProducts,
                'total_revenue' => (float) $revenueByDay->sum('revenue'),
                'total_orders' => (int) $revenueByDay->sum('orders'),
            ],
        ]);
    }

    public function inventory()
    {
        $lowStock = Product::whereColumn('stock', '<=', 'low_stock_threshold')
            ->where('stock', '>', 0)
            ->orderBy('stock')
            ->get(['id', 'name', 'sku', 'stock', 'low_stock_threshold']);

        $outOfStock = Product::where('stock', 0)->get(['id', 'name', 'sku']);

        return response()->json([
            'data' => [
                'low_stock' => $lowStock,
                'out_of_stock' => $outOfStock,
                'total_active_products' => Product::where('is_active', true)->count(),
                'total_stock_units' => (int) Product::sum('stock'),
            ],
        ]);
    }
}