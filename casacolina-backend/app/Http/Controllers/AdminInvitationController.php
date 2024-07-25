<?php

// app/Http/Controllers/AdminInvitationController.php

namespace App\Http\Controllers;

use App\Mail\AdminInvitationMail;
use App\Models\User;
use App\Models\AdminInvitation;
use App\Models\InvitationToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Carbon\Carbon;

class AdminInvitationController extends Controller
{
    public function invite(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $token = Str::random(60);
        InvitationToken::create([
            'email' => $request->email,
            'token' => $token,
            'expires_at' => Carbon::now()->addHours(5),
        ]);

        $url = ('http://localhost:5173/register-admin/' . $token);

        Mail::send('emails.invite', ['url' => $url], function ($message) use ($request) {
            $message->to($request->email)
                ->subject('Invitation to become an Admin');
        });

        return response()->json(['message' => 'Invitation sent successfully']);
    }

    public function register($token, Request $request)
    {
        $invitation = InvitationToken::where('token', $token)->first();

        if (!$invitation || Carbon::now()->greaterThan($invitation->expires_at)) {
            return response()->json(['message' => 'Invalid or expired token'], 400);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $invitation->email,
            'password' => bcrypt($request->password),
            'is_admin' => 1,
        ]);

        $invitation->delete();

        return response()->json(['message' => 'Admin registered successfully']);
    }
}
