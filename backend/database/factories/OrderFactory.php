<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    public function definition(): array
    {
        return [
            'order_number' => 'NC-'.fake()->unique()->numerify('######'),
            'full_name' => fake()->name(),
            'phone' => '0300'.fake()->numerify('#######'),
            'email' => fake()->safeEmail(),
            'province' => 'Punjab',
            'city' => 'Lahore',
            'address' => fake()->streetAddress(),
            'postal_code' => '54000',
            'payment_method' => 'cod',
            'payment_status' => 'pending',
            'status' => 'pending',
            'subtotal' => 5000,
            'discount' => 0,
            'shipping_charge' => 200,
            'total' => 5200,
        ];
    }
}