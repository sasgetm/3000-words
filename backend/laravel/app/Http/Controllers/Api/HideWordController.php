<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class HideWordController extends Controller
{
    public function hide(Request $request, int $wordId): JsonResponse
    {
        $request->user()
            ->hiddenWords()
            ->syncWithoutDetaching([$wordId]);

        return response()->json([
            'success' => true,
        ]);
    }

    public function unhide(Request $request, int $wordId): JsonResponse
    {
        $request->user()
            ->hiddenWords()
            ->detach($wordId);

        return response()->json([
            'success' => true,
        ]);
    }
}
