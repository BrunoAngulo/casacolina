<?php

namespace App\Http\Controllers;

use App\Models\Comida;
use Illuminate\Http\Request;

class ComidaController extends Controller
{
    public function index()
    {
        return response()->json(Comida::all(), 200);
    }

    public function store(Request $request)
    {
        $comida = Comida::create($request->all());
        return response()->json($comida, 201);
    }

    public function show($id)
    {
        $comida = Comida::find($id);
        if ($comida) {
            return response()->json($comida, 200);
        }
        return response()->json(['error' => 'Not Found'], 404);
    }

    public function update(Request $request, $id)
    {
        $comida = Comida::find($id);
        if ($comida) {
            $comida->update($request->all());
            return response()->json($comida, 200);
        }
        return response()->json(['error' => 'Not Found'], 404);
    }

    public function destroy($id)
    {
        $comida = Comida::find($id);
        if ($comida) {
            $comida->delete();
            return response()->json(['message' => 'Deleted'], 200);
        }
        return response()->json(['error' => 'Not Found'], 404);
    }
}