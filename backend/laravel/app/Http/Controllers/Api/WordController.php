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

        $query = Word::whereIn('id', $ids);

        if ($user = $request->user()) {
            $query->whereDoesntHave('hiddenByUsers', function ($q) use ($user) {
                $q->where('users.id', $user->id);
            });
        }

        return $query->get();
    }
}
