<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomepageContent extends Model
{
    protected $fillable = [
        'announcement_text',
        'hero_eyebrow',
        'hero_headline',
        'hero_subheadline',
        'hero_cta_primary_label',
        'hero_cta_primary_link',
        'hero_cta_secondary_label',
        'hero_cta_secondary_link',
        'hero_featured_label',
    ];

    /**
     * This table only ever has one row. Always fetch/update through this
     * method rather than querying the model directly, so there's a single
     * source of truth and sensible defaults if it hasn't been seeded yet.
     */
    public static function current(): self
    {
        return static::firstOrCreate([], [
            'announcement_text' => 'Free delivery on orders over Rs. 5,000 — nationwide',
            'hero_eyebrow' => 'Trusted Since 2017',
            'hero_headline' => 'Quality you can trust.',
            'hero_subheadline' => "Premium readymade suits for men and women, sourced from Pakistan's finest fabric mills — delivered nationwide from our store in Mansehra.",
            'hero_cta_primary_label' => 'Shop Women',
            'hero_cta_primary_link' => '/women',
            'hero_cta_secondary_label' => 'Shop Men',
            'hero_cta_secondary_link' => '/men',
            'hero_featured_label' => 'A Decade of Trust',
        ]);
    }
}