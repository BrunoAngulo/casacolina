<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users|max:255',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);

        // Eliminar tokens anteriores del usuario
        $user->tokens()->delete();

        // Generar un nuevo token para el usuario registrado
        $token = $user->createToken('AuthToken')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token], 201);
    }


    public function login(Request $request)
{
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        $user = Auth::user();

        // Eliminar tokens anteriores del usuario
        $user->tokens()->delete();

        // Generar un nuevo token para el usuario
        $token = $user->createToken('AuthToken')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token], 200);
    }

    throw ValidationException::withMessages([
        'email' => ['The provided credentials are incorrect.'],
    ]);
}



    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }

    public function getUser(Request $request)
    {
        // Accede al usuario autenticado
        $user = $request->user();

        // Retorna la información del usuario en una respuesta JSON
        return response()->json([
            'user' => $user
        ]);
    }
    
}