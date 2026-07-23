<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $query = Review::query()->with(['product:id,name,slug', 'user:id,name']);

        if ($request->filled('status')) {
            $query->where('is_approved', $request->string('status') === 'approved');
        }

        return response()->json($query->latest()->paginate($request->integer('per_page', 20)));
    }

    public function approve(Review $review)
    {
        $review->update(['is_approved' => true]);

        return response()->json(['data' => $review]);
    }

    public function reject(Review $review)
    {
        $review->update(['is_approved' => false]);

        return response()->json(['data' => $review]);
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return response()->json(['message' => 'Review deleted.']);
    }
}