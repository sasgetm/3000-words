<?php

namespace App\Http\Controllers;

use App\Models\User; // Eloquent модель пользователя (работа с таблицей users)
use Illuminate\Http\Request; // Класс HTTP‑запроса Laravel
use Illuminate\Support\Facades\Auth; // Facade для системы аутентификации
use Illuminate\Support\Facades\Hash; // Используется для безопасного хеширования паролей
use Illuminate\Validation\ValidationException; // Исключение для ошибок валидации

class AuthController extends Controller
{
    // Регистрация пользователя
    public function register(Request $request)
    {
        // Валидация входящих данных.
        // Laravel автоматически вернёт 422 и описание ошибок если правила не выполнены.
        $validated = $request->validate([
            'login' => 'required|string|max:255',
            // 'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        // Создание пользователя через Eloquent ORM.
        $user = User::create([
            'login' => $validated['login'],
            // 'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        // Возвращаем JSON‑ответ API.
        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    // Логин пользователя
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'login' => 'required|string',
            'password' => 'required',
        ]);

        // Auth::attempt() — пытается аутентифицировать пользователя.
        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'login' => ['Неверный логин или пароль'],
            ]);
        }

        $user = Auth::user();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    // Получение текущего пользователя
    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    // Logout пользователя
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}