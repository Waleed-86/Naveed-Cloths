<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'sku' => $this->sku,
            'description' => $this->description,
            'fabric' => $this->fabric,
            'care_instructions' => $this->care_instructions,

            'quality' => $this->quality,
            'pieces' => $this->pieces,
            'stitching' => $this->stitching,
            'work_type' => $this->work_type,

            'price' => (float) $this->price,
            'discount_price' => $this->discount_price ? (float) $this->discount_price : null,
            'stock' => $this->stock,
            'is_in_stock' => $this->is_in_stock,
            'is_low_stock' => $this->is_low_stock,

            'sizes' => $this->sizes ?? [],
            'colors' => $this->colors ?? [],

            'is_new' => $this->is_new,
            'is_best_seller' => $this->is_best_seller,
            'on_sale' => (bool) $this->discount_price,

            'category' => new CategoryResource($this->whenLoaded('category')),
            'images' => $this->whenLoaded('images', fn () => $this->images->map(fn ($img) => [
                'id' => $img->id,
                'url' => $img->image_path,
                'alt_text' => $img->alt_text,
                'is_primary' => $img->is_primary,
            ])),

            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}