<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Word;

class CategoryWordSeeder extends Seeder
{
    public function run(): void
    {
        // Получаем подкатегории 1..27
        $subCategories = Category::whereNotNull('parent_id')->get();

        foreach ($subCategories as $index => $category) {
            $from = $index * 100 + 1;
            $to   = $from + 99;

            $wordIds = Word::whereBetween('id', [$from, $to])
                ->pluck('id');

            $category->words()->attach($wordIds);
        }
    }
}
