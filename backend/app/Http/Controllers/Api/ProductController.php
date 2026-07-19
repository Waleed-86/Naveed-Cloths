<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query()->active()->with(['category', 'images']);

        // /api/products?category=men | women
        if ($request->filled('category')) {
            $query->forCategory($request->string('category'));
        }

        // Men's collection tiers: /api/products?quality=premium
        if ($request->filled('quality')) {
            $query->quality($request->string('quality'));
        }

        // Women's guided flow: /api/products?pieces=3_piece&stitching=stitched&work_type=embroidered
        if ($request->filled(['pieces', 'stitching', 'work_type'])) {
            $query->matchingWomensFlow(
                $request->string('pieces'),
                $request->string('stitching'),
                $request->string('work_type')
            );
        }

        if ($request->boolean('is_new')) {
            $query->newArrivals();
        }

        if ($request->boolean('best_sellers')) {
            $query->bestSellers();
        }

        if ($request->boolean('on_sale')) {
            $query->onSale();
        }

        if ($request->filled('search')) {
            $term = '%'.$request->string('search').'%';
            $query->where(fn ($q) => $q->where('name', 'like', $term)->orWhere('fabric', 'like', $term));
        }

        // Basic price range filter: ?min_price=1000&max_price=10000
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->float('min_price'));
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->float('max_price'));
        }

        $sort = $request->string('sort', 'newest');
        match ((string) $sort) {
            'price_asc' => $query->orderBy('price', 'asc'),
            'price_desc' => $query->orderBy('price', 'desc'),
            default => $query->latest(),
        };

        $products = $query->paginate($request->integer('per_page', 12));

        return ProductResource::collection($products);
    }

    public function show(string $slug)
    {
        $product = Product::where('slug', $slug)
            ->active()
            ->with(['category', 'images'])
            ->firstOrFail();

        return new ProductResource($product);
    }
}