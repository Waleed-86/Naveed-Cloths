<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $men = Category::where('slug', 'men')->firstOrFail();
        $women = Category::where('slug', 'women')->firstOrFail();

        // Mirrors frontend/src/data/mockProducts.js — keep these in sync until
        // that mock file is deleted in favour of real API calls.
        $products = [
            [
                'category_id' => $men->id,
                'name' => 'Emerald Silk Kurta',
                'slug' => 'emerald-silk-kurta',
                'sku' => 'SILA-MEN-001',
                'fabric' => 'Pure Silk',
                'quality' => 'premium',
                'price' => 8500,
                'discount_price' => 6800,
                'colors' => ['#0F3D2E', '#1C1A1E'],
                'sizes' => ['S', 'M', 'L', 'XL'],
                'stock' => 12,
                'is_new' => true,
            ],
            [
                'category_id' => $men->id,
                'name' => 'Classic Cotton Shalwar Kameez',
                'slug' => 'classic-cotton-shalwar-kameez',
                'sku' => 'SILA-MEN-002',
                'fabric' => 'Cotton Blend',
                'quality' => 'medium',
                'price' => 4200,
                'discount_price' => null,
                'colors' => ['#8A8378', '#1C1A1E'],
                'sizes' => ['S', 'M', 'L', 'XL', 'XXL'],
                'stock' => 30,
                'is_new' => false,
                'is_best_seller' => true,
            ],
            [
                'category_id' => $men->id,
                'name' => 'Everyday Linen Kurta',
                'slug' => 'everyday-linen-kurta',
                'sku' => 'SILA-MEN-003',
                'fabric' => 'Linen',
                'quality' => 'budget',
                'price' => 2600,
                'discount_price' => 2100,
                'colors' => ['#C4BEB2'],
                'sizes' => ['M', 'L', 'XL'],
                'stock' => 45,
                'is_new' => false,
            ],
            [
                'category_id' => $women->id,
                'name' => 'Zardozi Embroidered 3 Piece',
                'slug' => 'zardozi-embroidered-3-piece',
                'sku' => 'SILA-WMN-001',
                'fabric' => 'Chiffon',
                'pieces' => '3_piece',
                'stitching' => 'stitched',
                'work_type' => 'embroidered',
                'price' => 15500,
                'discount_price' => 12400,
                'colors' => ['#7A1F3D', '#B8925A'],
                'sizes' => ['S', 'M', 'L'],
                'stock' => 8,
                'is_new' => true,
            ],
            [
                'category_id' => $women->id,
                'name' => 'Printed Lawn 2 Piece (Unstitched)',
                'slug' => 'printed-lawn-2-piece-unstitched',
                'sku' => 'SILA-WMN-002',
                'fabric' => 'Lawn',
                'pieces' => '2_piece',
                'stitching' => 'unstitched',
                'work_type' => 'simple_printed',
                'price' => 3800,
                'discount_price' => null,
                'colors' => ['#B8925A', '#FAF6F0'],
                'sizes' => ['Unstitched'],
                'stock' => 60,
                'is_new' => false,
            ],
            [
                'category_id' => $women->id,
                'name' => 'Formal Embroidered 3 Piece (Stitched)',
                'slug' => 'formal-embroidered-3-piece-stitched',
                'sku' => 'SILA-WMN-003',
                'fabric' => 'Organza',
                'pieces' => '3_piece',
                'stitching' => 'stitched',
                'work_type' => 'embroidered',
                'price' => 22000,
                'discount_price' => 18700,
                'colors' => ['#0F3D2E', '#7A1F3D'],
                'sizes' => ['S', 'M', 'L', 'XL'],
                'stock' => 5,
                'is_new' => false,
                'is_best_seller' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(['slug' => $product['slug']], $product);
        }
    }
}