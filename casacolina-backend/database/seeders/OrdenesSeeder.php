<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrdenesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Insertar algunas órdenes de ejemplo
        DB::table('ordenes')->insert([
            'user_id' => 1, // Aquí debes especificar el ID de un usuario existente en tu base de datos
            'estado' => 'en curso',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        DB::table('ordenes')->insert([
            'user_id' => 2, // Aquí debes especificar el ID de otro usuario existente en tu base de datos
            'estado' => 'en cola',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        // Agrega más órdenes según sea necesario
    }
}