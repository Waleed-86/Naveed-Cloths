<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();

            // Customer details snapshot (spec: checkout collects these directly)
            $table->string('full_name');
            $table->string('phone');
            $table->string('email');
            $table->string('province');
            $table->string('city');
            $table->text('address');
            $table->string('postal_code');
            $table->text('notes')->nullable();

            // Payment — gateway integration lives behind a service layer;
            // this just records which method was chosen and its status.
            $table->enum('payment_method', ['cod', 'jazzcash', 'easypaisa', 'bank_transfer', 'payfast', 'stripe']);
            $table->enum('payment_status', ['pending', 'paid', 'failed', 'refunded'])->default('pending');

            // Spec's order status lifecycle
            $table->enum('status', ['pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled', 'returned'])
                ->default('pending');

            $table->string('coupon_code')->nullable();
            $table->decimal('subtotal', 10, 2);
            $table->decimal('discount', 10, 2)->default(0);
            $table->decimal('shipping_charge', 10, 2)->default(0);
            $table->decimal('total', 10, 2);

            $table->timestamps();

            $table->index('status');
            $table->index(['email', 'order_number']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
