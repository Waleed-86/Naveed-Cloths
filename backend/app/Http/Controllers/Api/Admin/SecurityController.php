<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\LoginAttempt;
use Illuminate\Http\Request;

class SecurityController extends Controller
{
    public function loginAttempts(Request $request)
    {
        $query = LoginAttempt::query()->latest('created_at');

        if ($request->filled('email')) {
            $query->where('email', 'like', '%'.strtolower($request->string('email')).'%');
        }

        if ($request->filled('status')) {
            $query->where('successful', $request->string('status') === 'success');
        }

        $attempts = $query->paginate($request->integer('per_page', 30));

        $recentFailedEmails = LoginAttempt::where('successful', false)
            ->where('created_at', '>=', now()->subMinutes(LoginAttempt::LOCKOUT_MINUTES))
            ->distinct()
            ->pluck('email');

        $currentlyLocked = $recentFailedEmails->filter(
            fn ($email) => LoginAttempt::lockoutMinutesRemaining($email) !== null
        )->values();

        return response()->json([
            'data' => $attempts,
            'currently_locked' => $currentlyLocked,
        ]);
    }
}