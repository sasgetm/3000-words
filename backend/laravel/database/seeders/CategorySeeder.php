<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        // Root category: hundreds
        $hundreds = Category::create([
            'name' => 'Hundreds',
            'slug' => 'hundreds',
            'parent_id' => null,
        ]);

        // Subcategories: 1..27
        for ($i = 1; $i <= 28; $i++) {
            Category::create([
                'name' => (string) $i,
                'slug' => 'hundreds-' . $i,
                'parent_id' => $hundreds->id,
            ]);
        }
    }
}
