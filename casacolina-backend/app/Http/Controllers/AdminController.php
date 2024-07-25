<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Comida;
use App\Models\Pedido;
use App\Models\PedidoProducto;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    // Categorias CRUD

    public function indexCategorias()
    {
        $categorias = Categoria::all();
        return response()->json($categorias);
    }

    public function storeCategoria(Request $request)
{
    $data = $request->all();

    if ($request->hasFile('icono')) {
        $data['icono'] = $request->file('icono')->store('iconos', 'public');
    }

    $categoria = Categoria::create($data);
    return response()->json($categoria, 201);
}



    public function showCategoria($id)
    {
        $categoria = Categoria::find($id);
        if (!$categoria) {
            return response()->json(['message' => 'Categoria no encontrada'], 404);
        }
        return response()->json($categoria);
    }

    public function updateCategoria(Request $request, $id)
    {
        $categoria = Categoria::find($id);
        if (!$categoria) {
            return response()->json(['message' => 'Categoria no encontrada'], 404);
        }

        $data = $request->all();

        if ($request->hasFile('icono')) {
            if ($categoria->icono) {
                Storage::disk('public')->delete($categoria->icono);
            }
            $data['icono'] = $request->file('icono')->store('iconos', 'public');
        }

        $categoria->update($data);
        return response()->json($categoria);
    }

    public function deleteCategoria($id)
    {
        $categoria = Categoria::find($id);
        if (!$categoria) {
            return response()->json(['message' => 'Categoria no encontrada'], 404);
        }
        $categoria->delete();
        return response()->json(['message' => 'Categoria eliminada']);
    }

    // Comidas CRUD

    public function indexComidas()
    {
        $comidas = Comida::all();
        return response()->json($comidas);
    }

    public function storeComida(Request $request)
{
    $validated = $request->validate([
        'nombre' => 'required|string|max:255',
        'precio' => 'required|numeric',
        'descripcion' => 'required|string',
        'categoria_id' => 'required|exists:categorias,id',
        'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    if ($request->hasFile('imagen')) {
        $path = $request->file('imagen')->store('images', 'public');
        $validated['imagen'] = $path;
    }

    $comida = Comida::create($validated);
    return response()->json($comida, 201);
}


    public function showComida($id)
    {
        $comida = Comida::find($id);
        if (!$comida) {
            return response()->json(['message' => 'Comida no encontrada'], 404);
        }
        return response()->json($comida);
    }


public function updateComida(Request $request, $id)
{
    $comida = Comida::find($id);
    if (!$comida) {
        return response()->json(['message' => 'Comida no encontrada'], 404);
    }

    $validated = $request->validate([
        'nombre' => 'sometimes|required|string|max:255',
        'precio' => 'sometimes|required|numeric',
        'descripcion' => 'sometimes|required|string',
        'categoria_id' => 'sometimes|required|exists:categorias,id',
        'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    if ($request->hasFile('imagen')) {
        // Borrar la imagen anterior si existe
        if ($comida->imagen) {
            Storage::disk('public')->delete($comida->imagen);
        }
        $path = $request->file('imagen')->store('images', 'public');
        $validated['imagen'] = $path;
    }

    $comida->update($validated);
    return response()->json($comida);
}

    public function deleteComida($id)
    {
        $comida = Comida::find($id);
        if (!$comida) {
            return response()->json(['message' => 'Comida no encontrada'], 404);
        }
        $comida->delete();
        return response()->json(['message' => 'Comida eliminada']);
    }

    // Pedidos CRUD

    public function indexPedidos()
    {
        $pedidos = Pedido::all();
        return response()->json($pedidos);
    }

    public function storePedido(Request $request)
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

    public function showPedido($id)
    {
        $pedido = Pedido::find($id);
        if (!$pedido) {
            return response()->json(['message' => 'Pedido no encontrado'], 404);
        }
        return response()->json($pedido);
    }

    public function updatePedido(Request $request, $id)
    {
        $pedido = Pedido::find($id);
        if (!$pedido) {
            return response()->json(['message' => 'Pedido no encontrado'], 404);
        }
        $pedido->update($request->all());
        return response()->json($pedido);
    }

    public function deletePedido($id)
    {
        $pedido = Pedido::find($id);
        if (!$pedido) {
            return response()->json(['message' => 'Pedido no encontrado'], 404);
        }
        $pedido->delete();
        return response()->json(['message' => 'Pedido eliminado']);
    }

    // Obtener todos los usuarios que son administradores
    public function indexUsuarios()
    {
        $usuarios = User::where('is_admin', true)->get();
        return response()->json($usuarios, 200);
    }

    // Almacenar un nuevo usuario administrador
    public function storeUsuario(Request $request)
    {
        // Validación de datos de entrada (puedes agregar la validación necesaria según tus requisitos)

        // Asegurar que el nuevo usuario sea administrador
        $usuario = new User();
        $usuario->fill($request->all());
        $usuario->is_admin = true; // Marcar como administrador
        $usuario->save();

        return response()->json($usuario, 201);
    }

    // Mostrar un usuario administrador específico por ID
    public function showUsuario($id)
    {
        $usuario = User::where('is_admin', true)->findOrFail($id);
        return response()->json($usuario, 200);
    }

    // Actualizar un usuario administrador específico por ID
    public function updateUsuario(Request $request, $id)
    {
        $usuario = User::where('is_admin', true)->findOrFail($id);
        $usuario->update($request->all());
        return response()->json($usuario, 200);
    }

    // Eliminar un usuario administrador específico por ID
    public function deleteUsuario($id)
    {
        $usuario = User::where('is_admin', true)->findOrFail($id);
        $usuario->delete();
        return response()->json(null, 204);
    }
}