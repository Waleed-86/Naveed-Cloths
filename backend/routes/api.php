<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Api\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Api\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Api\Admin\ProductImageController as AdminProductImageController;
use App\Http\Controllers\Api\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Api\Admin\CustomerController as AdminCustomerController;
use App\Http\Controllers\Api\Admin\ReviewController as AdminReviewController;
use App\Http\Controllers\Api\Admin\ReportController as AdminReportController;
use App\Http\Controllers\Api\Admin\SecurityController as AdminSecurityController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\HomepageContentController;
use App\Http\Controllers\Api\Admin\HomepageContentController as AdminHomepageContentController;
use App\Http\Controllers\Api\Admin\CouponController as AdminCouponController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReviewController;
use Illuminate\Support\Facades\Route;

Route::middleware('throttle:auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::post('/orders', [OrderController::class, 'store'])->middleware('throttle:checkout');
Route::get('/orders/{orderNumber}', [OrderController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/me/password', [AuthController::class, 'updatePassword'])->middleware('throttle:auth');
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/products/{product}/reviews', [ReviewController::class, 'store'])->middleware('throttle:write');
});

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index']);
    Route::get('/orders', [AdminOrderController::class, 'index']);
    Route::patch('/orders/{order}/status', [AdminOrderController::class, 'updateStatus']);
    Route::patch('/orders/{order}/payment-status', [AdminOrderController::class, 'updatePaymentStatus']);

    Route::apiResource('products', AdminProductController::class);
    Route::post('/products/{product}/images', [AdminProductImageController::class, 'store']);
    Route::patch('/products/{product}/images/{image}/primary', [AdminProductImageController::class, 'setPrimary']);
    Route::delete('/products/{product}/images/{image}', [AdminProductImageController::class, 'destroy']);
    Route::apiResource('categories', AdminCategoryController::class)->except(['show']);
    Route::get('/customers', [AdminCustomerController::class, 'index']);
    Route::get('/customers/{user}', [AdminCustomerController::class, 'show']);
    Route::get('/reviews', [AdminReviewController::class, 'index']);
    Route::patch('/reviews/{review}/approve', [AdminReviewController::class, 'approve']);
    Route::patch('/reviews/{review}/reject', [AdminReviewController::class, 'reject']);
    Route::delete('/reviews/{review}', [AdminReviewController::class, 'destroy']);
    Route::apiResource('coupons', AdminCouponController::class)->except(['show']);
    Route::get('/reports/sales', [AdminReportController::class, 'sales']);
    Route::get('/reports/inventory', [AdminReportController::class, 'inventory']);
    Route::get('/homepage-content', [AdminHomepageContentController::class, 'show']);
    Route::put('/homepage-content', [AdminHomepageContentController::class, 'update']);
    Route::get('/security/login-attempts', [AdminSecurityController::class, 'loginAttempts']);
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);
Route::get('/products/{product}/reviews', [ReviewController::class, 'index']);

Route::post('/coupons/validate', [CouponController::class, 'validateCode'])->middleware('throttle:write');
Route::get('/homepage-content', [HomepageContentController::class, 'show']);

Route::get('/categories', [CategoryController::class, 'index']);