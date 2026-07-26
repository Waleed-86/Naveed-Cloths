<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->unique()->word();

        return [
            'name' => ucfirst($name),
            'slug' => Str::slug($name).'-'.fake()->unique()->numberBetween(1, 99999),
            'type' => fake()->randomElement(['men', 'women', 'general']),
            'is_active' => true,
            'sort_order' => 0,
        ];
    }

    public function men(): static
    {
        return $this->state(['type' => 'men']);
    }

    public function women(): static
    {
        return $this->state(['type' => 'women']);
    }
}
