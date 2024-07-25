<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class InvitationToken extends Model
{
    use HasFactory;

    protected $fillable = [
        'email', 'token', 'expires_at'
    ];

    protected $dates = [
        'expires_at',
    ];

    public function isExpired()
    {
        return $this->expires_at->isPast();
    }
}