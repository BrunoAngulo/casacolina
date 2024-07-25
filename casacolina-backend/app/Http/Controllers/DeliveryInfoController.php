<?php
namespace App\Http\Controllers;

use App\Models\DeliveryInfo;
use Illuminate\Http\Request;

class DeliveryInfoController extends Controller
{
    public function index()
    {
        return response()->json(DeliveryInfo::all(), 200);
    }

    public function store(Request $request)
    {
        $deliveryInfo = DeliveryInfo::create($request->all());
        return response()->json($deliveryInfo, 201);
    }

    public function show($id)
    {
        $deliveryInfo = DeliveryInfo::find($id);
        if ($deliveryInfo) {
            return response()->json($deliveryInfo, 200);
        }
        return response()->json(['error' => 'Not Found'], 404);
    }

    public function update(Request $request, $id)
    {
        $deliveryInfo = DeliveryInfo::find($id);
        if ($deliveryInfo) {
            $deliveryInfo->update($request->all());
            return response()->json($deliveryInfo, 200);
        }
        return response()->json(['error' => 'Not Found'], 404);
    }

    public function destroy($id)
    {
        $deliveryInfo = DeliveryInfo::find($id);
        if ($deliveryInfo) {
            $deliveryInfo->delete();
            return response()->json(['message' => 'Deleted'], 200);
        }
        return response()->json(['error' => 'Not Found'], 404);
    }

    // Nuevo método para obtener información de entrega según el user_id
    public function showByUserId($user_id)
    {
        $deliveryInfo = DeliveryInfo::where('user_id', $user_id)->first();
        if ($deliveryInfo) {
            return response()->json($deliveryInfo, 200);
        }
        return response()->json(['error' => 'Not Found'], 404);
    }
}