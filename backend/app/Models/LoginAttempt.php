<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoginAttempt extends Model
{
    public $timestamps = false;

    protected $fillable = ['email', 'ip_address', 'user_agent', 'successful', 'created_at'];

    protected $casts = [
        'successful' => 'boolean',
        'created_at' => 'datetime',
    ];

    public const MAX_ATTEMPTS = 5;
    public const LOCKOUT_MINUTES = 15;

    public static function record(string $email, string $ip, ?string $userAgent, bool $successful): void
    {
        static::create([
            'email' => strtolower($email),
            'ip_address' => $ip,
            'user_agent' => $userAgent,
            'successful' => $successful,
            'created_at' => now(),
        ]);
    }

    /**
     * Returns minutes remaining if locked, or null if the account isn't
     * currently locked. Locked out after MAX_ATTEMPTS consecutive failures
     * within the lockout window — a single successful login anywhere in
     * that window clears the count, since it means the real owner logged in.
     */
    public static function lockoutMinutesRemaining(string $email): ?int
    {
        $windowStart = now()->subMinutes(self::LOCKOUT_MINUTES);

        $recentAttempts = static::where('email', strtolower($email))
            ->where('created_at', '>=', $windowStart)
            ->orderByDesc('created_at')
            ->get();

        $consecutiveFailures = 0;
        foreach ($recentAttempts as $attempt) {
            if ($attempt->successful) {
                break;
            }
            $consecutiveFailures++;
        }

        if ($consecutiveFailures < self::MAX_ATTEMPTS) {
            return null;
        }

        $oldestRelevantFailure = $recentAttempts->take($consecutiveFailures)->last();
        $unlocksAt = $oldestRelevantFailure->created_at->addMinutes(self::LOCKOUT_MINUTES);

        return $unlocksAt->isFuture() ? now()->diffInMinutes($unlocksAt) + 1 : null;
    }
}