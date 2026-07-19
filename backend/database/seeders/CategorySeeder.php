<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::updateOrCreate(
            ['slug' => 'men'],
            ['name' => 'Men', 'type' => 'men', 'sort_order' => 1, 'is_active' => true]
        );

        Category::updateOrCreate(
            ['slug' => 'women'],
            ['name' => 'Women', 'type' => 'women', 'sort_order' => 2, 'is_active' => true]
        );
    }
}