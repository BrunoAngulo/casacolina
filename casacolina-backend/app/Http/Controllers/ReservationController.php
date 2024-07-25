<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $reservations = Reservation::where('user_id', $user->id)->get();
        return response()->json($reservations, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'number_of_people' => 'required|integer|min:1',
        ]);

        $user = Auth::user();

        // Verificar si el usuario ya tiene una reserva en la misma fecha
        $existingReservation = Reservation::where('user_id', $user->id)
            ->where('date', $request->date)
            ->first();

        if ($existingReservation) {
            return response()->json(['error' => 'Ya tienes una reserva para esta fecha.'], 400);
        }

        $reservation = new Reservation([
            'user_id' => $user->id,
            'date' => $request->date,
            'time' => $request->time,
            'number_of_people' => $request->number_of_people,
        ]);

        $reservation->save();

        return response()->json([
            'message' => 'Reserva creada con éxito.',
            'reservation' => $reservation
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'number_of_people' => 'required|integer|min:1',
        ]);

        $reservation = Reservation::findOrFail($id);
        $user = Auth::user();

        if ($reservation->user_id != $user->id) {
            return response()->json(['error' => 'No puedes actualizar esta reserva.'], 403);
        }

        $reservation->update([
            'date' => $request->date,
            'time' => $request->time,
            'number_of_people' => $request->number_of_people,
        ]);

        return response()->json([
            'message' => 'Reserva actualizada con éxito.',
            'reservation' => $reservation
        ], 200);
    }
}