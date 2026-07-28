<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Creates (or updates) the store's admin login.
     *
     * IMPORTANT: set ADMIN_EMAIL / ADMIN_PASSWORD in your .env before
     * running this in production — do not ship with the defaults live.
     * After first login, use the account dashboard's Change Password page
     * to set a permanent password only you and your client know.
     */
    public function run(): void
    {
        $email = env('ADMIN_EMAIL', 'admin@sila.pk');
        $password = env('ADMIN_PASSWORD', 'ChangeMe123!');

        User::updateOrCreate(
            ['email' => $email],
            [
                'name' => 'Store Admin',
                'password' => Hash::make($password),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        $this->command->info("Admin account ready — email: {$email}");
        if (! env('ADMIN_PASSWORD')) {
            $this->command->warn('Using the DEFAULT password (ChangeMe123!). Set ADMIN_PASSWORD in .env before deploying, or change it immediately after first login.');
        }
    }
}