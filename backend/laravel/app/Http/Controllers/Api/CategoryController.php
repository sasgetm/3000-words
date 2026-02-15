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
    
    public function words(Category $category)
    {
        return $category->words()->get();
    }
}
