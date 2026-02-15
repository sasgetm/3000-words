<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Word;

class WordController extends Controller
{
    public function getByIds(Request $request)
    {
        $ids = $request->input('ids', []);

        return Word::whereIn('id', $ids)->get();
    }
}
