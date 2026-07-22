<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query()->with('category');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%'.$request->string('search').'%');
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->integer('category_id'));
        }

        return response()->json($query->latest()->paginate($request->integer('per_page', 20)));
    }

    public function store(Request $request)
    {
        $validated = $this->validated($request);
        $validated['slug'] = $this->uniqueSlug($validated['name']);

        $product = Product::create($validated);

        return response()->json(['data' => $product->load('category')], 201);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $this->validated($request, $product->id);

        // Only regenerate the slug if the name actually changed, so existing
        // product URLs (already shared/bookmarked) don't silently break.
        if ($validated['name'] !== $product->name) {
            $validated['slug'] = $this->uniqueSlug($validated['name'], $product->id);
        }

        $product->update($validated);

        return response()->json(['data' => $product->fresh('category')]);
    }

    public function destroy(Product $product)
    {
        $product->delete(); // soft delete — product model uses SoftDeletes

        return response()->json(['message' => 'Product deleted.']);
    }

    private function validated(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'sku' => ['required', 'string', 'max:100', 'unique:products,sku,'.($ignoreId ?? 'NULL').',id'],
            'description' => ['nullable', 'string'],
            'fabric' => ['nullable', 'string', 'max:255'],
            'care_instructions' => ['nullable', 'string'],
            'quality' => ['nullable', 'in:premium,medium,budget'],
            'pieces' => ['nullable', 'in:2_piece,3_piece'],
            'stitching' => ['nullable', 'in:stitched,unstitched'],
            'work_type' => ['nullable', 'in:simple_printed,embroidered'],
            'price' => ['required', 'numeric', 'min:0'],
            'discount_price' => ['nullable', 'numeric', 'min:0', 'lt:price'],
            'stock' => ['required', 'integer', 'min:0'],
            'low_stock_threshold' => ['nullable', 'integer', 'min:0'],
            'sizes' => ['nullable', 'array'],
            'colors' => ['nullable', 'array'],
            'is_new' => ['boolean'],
            'is_best_seller' => ['boolean'],
            'is_active' => ['boolean'],
        ]);
    }

    private function uniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $i = 1;

        while (Product::where('slug', $slug)->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))->exists()) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }
}