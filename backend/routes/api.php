<?php

use App\Http\Controllers\Api\V1\Customer\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — v1
|--------------------------------------------------------------------------
| All customer-facing routes live under /api/v1/. Admin routes will be
| added under /api/v1/admin/ (with an 'admin' middleware gate) in the
| Admin Dashboard step. This file grows feature-by-feature — do not
| dump unrelated future routes here ahead of their step.
*/

Route::prefix('v1')->group(function () {

    // --- Auth (public) ---
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // --- Auth (requires an authenticated session) ---
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });

    // Future groups will be added here in their own steps:
    // Route::apiResource('products', ProductController::class)->only(['index','show']);
    // Route::prefix('admin')->middleware(['auth:sanctum','admin'])->group(function () { ... });
});