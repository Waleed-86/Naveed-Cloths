<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('sku')->unique();
            $table->text('description')->nullable();
            $table->string('fabric')->nullable();
            $table->text('care_instructions')->nullable();

            // Men's collection: tiered by quality (spec: Premium / Medium / Budget)
            $table->enum('quality', ['premium', 'medium', 'budget'])->nullable();

            // Women's collection: guided 3-step flow (spec: pieces -> stitching -> work)
            $table->enum('pieces', ['2_piece', '3_piece'])->nullable();
            $table->enum('stitching', ['stitched', 'unstitched'])->nullable();
            $table->enum('work_type', ['simple_printed', 'embroidered'])->nullable();

            $table->decimal('price', 10, 2);
            $table->decimal('discount_price', 10, 2)->nullable();
            $table->unsignedInteger('stock')->default(0);
            $table->unsignedInteger('low_stock_threshold')->default(10);

            $table->json('sizes')->nullable();   // e.g. ["S","M","L","XL"]
            $table->json('colors')->nullable();  // e.g. ["#0F3D2E","#1C1A1E"]

            $table->boolean('is_new')->default(false);
            $table->boolean('is_best_seller')->default(false);
            $table->boolean('is_active')->default(true);

            $table->timestamps();
            $table->softDeletes();

            $table->index(['category_id', 'is_active']);
            $table->index('quality');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};