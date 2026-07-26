<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->unique()->words(3, true);

        return [
            'category_id' => Category::factory(),
            'name' => ucfirst($name),
            'slug' => Str::slug($name).'-'.fake()->unique()->numberBetween(1, 99999),
            'sku' => strtoupper(fake()->bothify('SKU-####??')),
            'fabric' => fake()->randomElement(['Cotton', 'Silk', 'Lawn', 'Chiffon', 'Linen']),
            'price' => fake()->numberBetween(1500, 25000),
            'discount_price' => null,
            'stock' => fake()->numberBetween(10, 100),
            'low_stock_threshold' => 10,
            'sizes' => ['S', 'M', 'L', 'XL'],
            'colors' => ['#0F3D2E', '#1C1A1E'],
            'is_new' => false,
            'is_best_seller' => false,
            'is_active' => true,
        ];
    }

    public function outOfStock(): static
    {
        return $this->state(['stock' => 0]);
    }

    public function lowStock(): static
    {
        return $this->state(['stock' => 3, 'low_stock_threshold' => 10]);
    }
}
