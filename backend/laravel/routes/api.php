<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\WordController;

Route::get('/test', function () {
    return [
        'status' => 'ok',
        'source' => 'api.php',
        'time' => now()->toDateTimeString(),
    ];
});

Route::get(
    '/categories', 
    [CategoryController::class, 'index']
);

Route::get(
    '/categories/{category}/words',
    [CategoryController::class, 'words']
);

Route::post(
    '/words/by-ids',
    [WordController::class, 'getByIds']
);