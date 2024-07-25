<?php

use Illuminate\Http\Request;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ComidaController;
use App\Http\Controllers\DeliveryInfoController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;


Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/delivery-info', DeliveryInfoController::class);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('delivery-info/user/{user_id}', [DeliveryInfoController::class, 'showByUserId']);
    Route::get('pedidos/user/{userId}', [PedidoController::class, 'getPedidosByUserId']);
    Route::get('/pedidos', [PedidoController::class, 'index']);
    Route::post('/pedidos', [PedidoController::class, 'store']);
    Route::get('/pedidos/{id}', [PedidoController::class, 'show']);
    Route::put('/pedidos/{id}', [PedidoController::class, 'update']);
    Route::delete('/pedidos/{id}', [PedidoController::class, 'destroy']);
    Route::get('/pedidos/user/{userId}', [PedidoController::class, 'getPedidosByUserId']);


    // Rutas para Categorias
    Route::get('/admin/categorias', [AdminController::class, 'indexCategorias']);
    Route::post('/admin/categorias', [AdminController::class, 'storeCategoria']);
    Route::get('/admin/categorias/{id}', [AdminController::class, 'showCategoria']);
    Route::put('/admin/categorias/{id}', [AdminController::class, 'updateCategoria']);
    Route::delete('/admin/categorias/{id}', [AdminController::class, 'deleteCategoria']);

    // Rutas para Comidas
    Route::get('/admin/comidas', [AdminController::class, 'indexComidas']);
    Route::post('/admin/comidas', [AdminController::class, 'storeComida']);
    Route::get('/admin/comidas/{id}', [AdminController::class, 'showComida']);
    Route::put('/admin/comidas/{id}', [AdminController::class, 'updateComida']);
    Route::delete('/admin/comidas/{id}', [AdminController::class, 'deleteComida']);

    // Rutas para Pedidos
    Route::get('/admin/pedidos', [AdminController::class, 'indexPedidos']);
    Route::post('/admin/pedidos', [AdminController::class, 'storePedido']);
    Route::get('/admin/pedidos/{id}', [AdminController::class, 'showPedido']);
    Route::put('/admin/pedidos/{id}', [AdminController::class, 'updatePedido']);
    Route::delete('/admin/pedidos/{id}', [AdminController::class, 'deletePedido']);


        Route::post('/admin/usuarios', [AdminController::class, 'storeUsuario']);
        Route::get('/admin/usuarios/{id}', [AdminController::class, 'showUsuario']);
        Route::put('/admin/usuarios/{id}', [AdminController::class, 'updateUsuario']);
        Route::delete('/admin/usuarios/{id}', [AdminController::class, 'deleteUsuario']);

});

//ROUTES USER
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
        Route::get('/admin/usuarios', [AdminController::class, 'indexUsuarios']);
//ROUTES PUBLIC FOOD
Route::get('/categorias', [CategoriaController::class, 'index']);
Route::get('/comidas', [ComidaController::class, 'index']);

Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'getUser']);

use App\Http\Controllers\AdminInvitationController;

Route::post('/admin/invite', [AdminInvitationController::class, 'invite']);
Route::post('/register-admin/{token}', [AdminInvitationController::class, 'register']);




Route::middleware('auth:sanctum')->group(function () {
    Route::post('/reservations', [ReservationController::class, 'store']);
    Route::get('/reservations', [ReservationController::class, 'index']); // Cambiado aquí
    Route::put('/reservations/{id}', [ReservationController::class, 'update']);
});