<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryInfo extends Model
{
    use HasFactory;
    protected $table = 'delivery_info';

    protected $fillable = [
        'user_id', 'street', 'city', 'state', 'zipcode', 'country', 'phone'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}