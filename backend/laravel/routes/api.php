<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\WordController;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;

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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});