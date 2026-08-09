<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // This is an API backend serving a separate React SPA — password
        // reset emails must link to the frontend's reset page (which then
        // calls our API), not a Laravel Blade route that doesn't exist here.
        ResetPassword::createUrlUsing(function ($user, string $token) {
            $frontendUrl = rtrim(config('app.frontend_url', config('app.url')), '/');

            return "{$frontendUrl}/reset-password?token={$token}&email=".urlencode($user->email);
        });

        // Login/register: keyed by IP, since the attacker doesn't have a
        // valid account yet to key by user. Generous enough for real users
        // who mistype a password a couple times, tight enough to blunt
        // brute-force/credential-stuffing attempts.
        RateLimiter::for('auth', function ($request) {
            return Limit::perMinute(6)->by($request->ip());
        });

        // Checkout: prevents a script from hammering the order endpoint to
        // exhaust stock or spam fake orders. Keyed by IP since guest
        // checkout means there's no authenticated user to key by.
        RateLimiter::for('checkout', function ($request) {
            return Limit::perMinute(10)->by($request->ip());
        });

        // General authenticated write actions (reviews, coupon validation,
        // contact form) — looser than auth/checkout, just enough to stop
        // obvious scripted abuse without getting in a real user's way.
        RateLimiter::for('write', function ($request) {
            return Limit::perMinute(30)->by($request->user()?->id ?: $request->ip());
        });
    }
}