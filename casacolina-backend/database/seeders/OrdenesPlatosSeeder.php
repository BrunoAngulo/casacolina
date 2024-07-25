<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrdenesPlatosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Insertar órdenes de platos de ejemplo
        DB::table('ordenes_platos')->insert([
            'orden_id' => 5, // ID de la orden existente en tu base de datos
            'comida_id' => 1, // ID del plato existente en tu base de datos
            'cantidad' => 2, // Cantidad de platos
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('ordenes_platos')->insert([
            'orden_id' => 5,
            'comida_id' => 2,
            'cantidad' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        // Agrega más órdenes de platos según sea necesario
    }
}