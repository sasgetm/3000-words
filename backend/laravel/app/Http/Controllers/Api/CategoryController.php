<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        return Category::whereNull('parent_id')
            ->with('children')
            ->get();
    }
    
    public function words(Request $request, Category $category)
    {
        $query = $category->words();

        if ($user = $request->user()) {
            $query->whereDoesntHave('hiddenByUsers', function ($q) use ($user) {
                $q->where('users.id', $user->id);
            });
        }

        return $query->get();
    }
}
