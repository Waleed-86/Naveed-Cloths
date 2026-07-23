<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query()
            ->where('role', 'customer')
            ->withCount('orders')
            ->withSum('orders as total_spent', 'total');

        if ($request->filled('search')) {
            $term = '%'.$request->string('search').'%';
            $query->where(fn ($q) => $q->where('name', 'like', $term)->orWhere('email', 'like', $term));
        }

        return response()->json($query->latest()->paginate($request->integer('per_page', 20)));
    }

    public function show(User $user)
    {
        if ($user->role !== 'customer') {
            abort(404);
        }

        $user->load(['orders' => fn ($q) => $q->latest()->with('items')]);

        return response()->json(['data' => $user]);
    }
}