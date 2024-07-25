<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\PedidoProducto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PedidoController extends Controller
{
    public function index()
    {
        return response()->json(Pedido::with('pedidoProductos.comida')->get(), 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'total' => 'required|numeric',
            'estado' => 'required|string',
            'productos' => 'required|array',
            'productos.*.comida_id' => 'required|exists:comidas,id',
            'productos.*.cantidad' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $pedido = Pedido::create($request->only(['user_id', 'total', 'estado']));

        foreach ($request->productos as $producto) {
            PedidoProducto::create([
                'pedido_id' => $pedido->id,
                'comida_id' => $producto['comida_id'],
                'cantidad' => $producto['cantidad']
            ]);
        }

        return response()->json($pedido->load('pedidoProductos.comida'), 201);
    }

    public function show($id)
    {
        $pedido = Pedido::with('pedidoProductos.comida')->find($id);
        if ($pedido) {
            return response()->json($pedido, 200);
        }
        return response()->json(['error' => 'Not Found'], 404);
    }

    public function update(Request $request, $id)
{
    $validator = Validator::make($request->all(), [
        'total' => 'numeric',
        'estado' => 'string',
        'productos' => 'array',
        'productos.*.comida_id' => 'exists:comidas,id',
        'productos.*.cantidad' => 'integer|min:1'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 400);
    }

    $pedido = Pedido::find($id);
    if (!$pedido) {
        return response()->json(['error' => 'Not Found'], 404);
    }

    $pedido->update($request->only(['total', 'estado']));

    if ($request->has('productos')) {
        $pedido->pedidoProductos()->delete();

        foreach ($request->productos as $producto) {
            PedidoProducto::create([
                'pedido_id' => $pedido->id,
                'comida_id' => $producto['comida_id'],
                'cantidad' => $producto['cantidad']
            ]);
        }
    }

    return response()->json($pedido->load('pedidoProductos.comida'), 200);
}


    public function destroy($id)
    {
        $pedido = Pedido::find($id);
        if ($pedido) {
            $pedido->pedidoProductos()->delete();
            $pedido->delete();
            return response()->json(['message' => 'Deleted'], 200);
        }
        return response()->json(['error' => 'Not Found'], 404);
    }

    public function getPedidosByUserId($userId)
    {
        $pedidos = Pedido::where('user_id', $userId)
            ->with('pedidoProductos.comida')
            ->get();

        if ($pedidos->isEmpty()) {
            return response()->json(['error' => 'No orders found for this user'], 404);
        }

        return response()->json($pedidos, 200);
    }
}
