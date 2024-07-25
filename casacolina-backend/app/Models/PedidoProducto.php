<?php
// app/Models/PedidoProducto.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidoProducto extends Model
{
    use HasFactory;

    protected $fillable = ['pedido_id', 'comida_id', 'cantidad'];

    public function pedido()
    {
        return $this->belongsTo(Pedido::class);
    }

    public function comida()
    {
        return $this->belongsTo(Comida::class);
    }
}