<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Product $product)
    {
        $reviews = $product->reviews()
            ->approved()
            ->with('user:id,name')
            ->latest()
            ->get()
            ->map(fn ($r) => [
                'id' => $r->id,
                'rating' => $r->rating,
                'comment' => $r->comment,
                'name' => $r->user->name,
                'created_at' => $r->created_at->toIso8601String(),
            ]);

        return response()->json([
            'data' => $reviews,
            'average_rating' => round($reviews->avg('rating') ?? 0, 1),
            'count' => $reviews->count(),
        ]);
    }

    public function store(Request $request, Product $product)
    {
        $validated = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string', 'max:2000'],
        ]);

        $existing = Review::where('product_id', $product->id)
            ->where('user_id', $request->user()->id)
            ->first();

        if ($existing) {
            abort(422, 'You have already reviewed this product.');
        }

        // TODO: once order history is easy to check here, restrict reviews to
        // customers who've actually purchased this product (verified-buyer pattern).
        $review = Review::create([
            'product_id' => $product->id,
            'user_id' => $request->user()->id,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'] ?? null,
            'is_approved' => false,
        ]);

        return response()->json([
            'data' => $review,
            'message' => 'Thanks! Your review will appear once approved.',
        ], 201);
    }
}