<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'category_id', 'name', 'slug', 'sku', 'description', 'fabric', 'care_instructions',
        'quality', 'pieces', 'stitching', 'work_type',
        'price', 'discount_price', 'stock', 'low_stock_threshold',
        'sizes', 'colors', 'is_new', 'is_best_seller', 'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'discount_price' => 'decimal:2',
        'sizes' => 'array',
        'colors' => 'array',
        'is_new' => 'boolean',
        'is_best_seller' => 'boolean',
        'is_active' => 'boolean',
        'stock' => 'integer',
    ];

    protected $appends = ['is_low_stock', 'is_in_stock'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class)->orderBy('sort_order');
    }

    public function getIsLowStockAttribute(): bool
    {
        return $this->stock > 0 && $this->stock <= $this->low_stock_threshold;
    }

    public function getIsInStockAttribute(): bool
    {
        return $this->stock > 0;
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeForCategory($query, string $type)
    {
        return $query->whereHas('category', fn ($q) => $q->where('type', $type));
    }

    public function scopeQuality($query, string $quality)
    {
        return $query->where('quality', $quality);
    }

    // Women's guided flow: pieces -> stitching -> work_type
    public function scopeMatchingWomensFlow($query, string $pieces, string $stitching, string $workType)
    {
        return $query->where('pieces', $pieces)
            ->where('stitching', $stitching)
            ->where('work_type', $workType);
    }

    public function scopeNewArrivals($query)
    {
        return $query->where('is_new', true);
    }

    public function scopeBestSellers($query)
    {
        return $query->where('is_best_seller', true);
    }

    public function scopeOnSale($query)
    {
        return $query->whereNotNull('discount_price');
    }
}