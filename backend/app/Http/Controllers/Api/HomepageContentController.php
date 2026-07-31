<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HomepageContent;

class HomepageContentController extends Controller
{
    public function show()
    {
        return response()->json(['data' => HomepageContent::current()]);
    }
}