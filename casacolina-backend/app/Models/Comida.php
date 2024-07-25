<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comida extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'imagen', 'precio', 'descripcion', 'categoria_id'];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function pedidoProductos()
    {
        return $this->hasMany(PedidoProducto::class);
    }
}