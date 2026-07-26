<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductImageController extends Controller
{
    public function store(Request $request, Product $product)
    {
        $validated = $request->validate([
            'image' => ['required', 'image', 'max:4096'],
            'alt_text' => ['nullable', 'string', 'max:255'],
        ]);

        $path = $request->file('image')->store('products', 'public');

        $isFirstImage = $product->images()->count() === 0;

        $image = $product->images()->create([
            'image_path' => url(Storage::url($path)),
            'alt_text' => $validated['alt_text'] ?? $product->name,
            'is_primary' => $isFirstImage,
            'sort_order' => $product->images()->count(),
        ]);

        return response()->json(['data' => $image], 201);
    }

    public function setPrimary(Product $product, ProductImage $image)
    {
        if ($image->product_id !== $product->id) {
            abort(404);
        }

        $product->images()->update(['is_primary' => false]);
        $image->update(['is_primary' => true]);

        return response()->json(['data' => $product->images()->get()]);
    }

    public function destroy(Product $product, ProductImage $image)
    {
        if ($image->product_id !== $product->id) {
            abort(404);
        }

        // image_path is now a full absolute URL (e.g. https://host/storage/products/x.jpg)
        // — extract everything after '/storage/' to get the actual disk-relative path.
        $relativePath = preg_replace('#^.*/storage/#', '', $image->image_path);
        Storage::disk('public')->delete($relativePath);

        $wasPrimary = $image->is_primary;
        $image->delete();

        if ($wasPrimary) {
            $product->images()->first()?->update(['is_primary' => true]);
        }

        return response()->json(['message' => 'Image deleted.']);
    }
}
