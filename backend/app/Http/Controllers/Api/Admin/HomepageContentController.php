<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomepageContent;
use Illuminate\Http\Request;

class HomepageContentController extends Controller
{
    public function show()
    {
        return response()->json(['data' => HomepageContent::current()]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'announcement_text' => ['nullable', 'string', 'max:255'],
            'hero_eyebrow' => ['nullable', 'string', 'max:100'],
            'hero_headline' => ['nullable', 'string', 'max:255'],
            'hero_subheadline' => ['nullable', 'string', 'max:500'],
            'hero_cta_primary_label' => ['nullable', 'string', 'max:50'],
            'hero_cta_primary_link' => ['nullable', 'string', 'max:255'],
            'hero_cta_secondary_label' => ['nullable', 'string', 'max:50'],
            'hero_cta_secondary_link' => ['nullable', 'string', 'max:255'],
            'hero_featured_label' => ['nullable', 'string', 'max:100'],
        ]);

        $content = HomepageContent::current();
        $content->update($validated);

        return response()->json(['data' => $content->fresh()]);
    }
}