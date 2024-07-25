<?php

namespace App\Http\Controllers;
use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    public function index()
    {
        return response()->json(Categoria::all(), 200);
    }

    public function store(Request $request)
    {
        $categoria = Categoria::create($request->all());
        return response()->json($categoria, 201);
    }

    public function show($id)
    {
        $categoria = Categoria::find($id);
        if ($categoria) {
            return response()->json($categoria, 200);
        }
        return response()->json(['error' => 'Not Found'], 404);
    }

    public function update(Request $request, $id)
    {
        $categoria = Categoria::find($id);
        if ($categoria) {
            $categoria->update($request->all());
            return response()->json($categoria, 200);
        }
        return response()->json(['error' => 'Not Found'], 404);
    }

    public function destroy($id)
    {
        $categoria = Categoria::find($id);
        if ($categoria) {
            $categoria->delete();
            return response()->json(['message' => 'Deleted'], 200);
        }
        return response()->json(['error' => 'Not Found'], 404);
    }
}