<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ComidaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $food_list = [
            [
                'id' => "1",
                'nombre' => "Bacon Cheeseburger",
                'imagen' => 'food_1',
                'precio' => 15,
                'descripcion' => "Jugosa hamburguesa con crujiente tocino y queso derretido en un pan tostado.",
                'categoria' => "Hamburguesas"
            ],
            [
                'id' => "2",
                'nombre' => "Classic Burger",
                'imagen' => 'food_2',
                'precio' => 12,
                'descripcion' => "La clásica hamburguesa con lechuga fresca, tomate y una jugosa hamburguesa de carne.",
                'categoria' => "Hamburguesas"
            ],
            [
                'id' => "3",
                'nombre' => "Chicken Burger",
                'imagen' => 'food_3',
                'precio' => 14,
                'descripcion' => "Filete de pollo crujiente cubierto con mayonesa y vegetales frescos, todo dentro de un pan suave.",
                'categoria' => "Hamburguesas"
            ],
            [
                'id' => "4",
                'nombre' => "Double Burger",
                'imagen' => 'food_4',
                'precio' => 18,
                'descripcion' => "Doble carne, doble sabor. Dos hamburguesas de carne apiladas con queso, cebolla y pepinillos.",
                'categoria' => "Hamburguesas"
            ],
            [
                'id' => "5",
                'nombre' => "Colina Meal Burger",
                'imagen' => 'food_5',
                'precio' => 20,
                'descripcion' => "La Hamburguesa Colina Meal, nuestra oferta estrella, cuenta con una jugosa hamburguesa de carne, cebollas caramelizadas y una salsa secreta hecha con finas hierbas.",
                'categoria' => "Hamburguesas"
            ],
            [
                'id' => "6",
                'nombre' => "Bife Ancho",
                'imagen' => 'food_6',
                'precio' => 12,
                'descripcion' => "Pieza proveniente del lomo de la res. Suave y con una marcada infiltración de grasa intramuscular.",
                'categoria' => "Cortes a la Parrilla"
            ],
            [
                'id' => "7",
                'nombre' => "Bife Angosto",
                'imagen' => 'food_7',
                'precio' => 18,
                'descripcion' => "Continuación del Bife Ancho. Un corte que se caracteriza por una capa de grasa marcada en su parte superior que aporta sabores naturales a la parrilla.",
                'categoria' => "Cortes a la Parrilla"
            ],
            [
                'id' => "8",
                'nombre' => "Lomo Fino",
                'imagen' => 'food_8',
                'precio' => 18,
                'descripcion' => "Proveniente de la zona interna del churrasco. Un músculo bastante suave con mucho sabor, todo en nuestra parrilla.",
                'categoria' => "Cortes a la Parrilla"
            ],
            [
                'id' => "9",
                'nombre' => "Picanha",
                'imagen' => 'food_9',
                'precio' => 18,
                'descripcion' => "Pieza extraída de la Cadera de la Res. Caracterizada por contar con una capa de grasa que aportará jugosidad y sabor en nuestra parrilla.",
                'categoria' => "Cortes a la Parrilla"
            ],
            [
                'id' => "10",
                'nombre' => "Tomahawk Steak",
                'imagen' => 'food_10',
                'precio' => 18,
                'descripcion' => "Corte especial. Extraído de la combinación del Churrasco y el Costillar de res. Imponente corte que desprenderá sabores únicos debido a la presencia del hueso.",
                'categoria' => "Cortes a la Parrilla"
            ],
            [
                'id' => "11",
                'nombre' => "Entraña Fina",
                'imagen' => 'food_11',
                'precio' => 18,
                'descripcion' => "Corte extraído de la zona interna del costillar de res. Suave, sabroso y caracterizado por su peculiar tejido muscular que generará una experiencia única a la parrilla.",
                'categoria' => "Cortes a la Parrilla"
            ],
            [
                'id' => "12",
                'nombre' => "Fetuccini Salsa Blanca Pollo",
                'imagen' => 'food_12',
                'precio' => 49,
                'descripcion' => "Fetuccini en salsa blanca con pechuga de pollo en filete",
                'categoria' => "Pasta"
            ],
            [
                'id' => "13",
                'nombre' => "Fetucccini con langostinos",
                'imagen' => 'food_13',
                'precio' => 55,
                'descripcion' => "Fetuccini con langostinos en salsa de mantequilla y ajo",
                'categoria' => "Pasta"
            ],
            [
                'id' => "14",
                'nombre' => "Fetuccini Rojo",
                'imagen' => 'food_14',
                'precio' => 50,
                'descripcion' => "Clásico fetuccini peruano en salsa roja tomate",
                'categoria' => "Pasta"
            ],
            [
                'id' => "15",
                'nombre' => "Fetuccini en pasta verde",
                'imagen' => 'food_15',
                'precio' => 52,
                'descripcion' => "Fetuccini en pasta verde especialidad de la casa preparado a fuego lento",
                'categoria' => "Pasta"
            ],
            [
                'id' => "16",
                'nombre' => "Malbec Reserva",
                'imagen' => 'food_16',
                'precio' => 35,
                'descripcion' => "Un exquisito Malbec Reserva con notas de frutos negros y suaves taninos, perfecto para acompañar carnes a la parrilla.",
                'categoria' => "Vinos"
            ],
            [
                'id' => "17",
                'nombre' => "Chardonnay Gran Selección",
                'imagen' => 'food_17',
                'precio' => 40,
                'descripcion' => "Un Chardonnay Gran Selección con elegantes notas de vainilla y frutas tropicales, ideal para maridar con pescados y mariscos.",
                'categoria' => "Vinos"
            ],
            [
                'id' => "18",
                'nombre' => "Cabernet Sauvignon Reserva",
                'imagen' => 'food_18',
                'precio' => 38,
                'descripcion' => "Un Cabernet Sauvignon Reserva de intensidad y estructura, con aromas a cassis y matices de cedro, perfecto para carnes rojas.",
                'categoria' => "Vinos"
            ],
            [
                'id' => "19",
                'nombre' => "Sauvignon Blanc",
                'imagen' => 'food_19',
                'precio' => 30,
                'descripcion' => "Un Sauvignon Blanc refrescante con notas cítricas y herbáceas, excelente para acompañar ensaladas y mariscos frescos.",
                'categoria' => "Vinos"
            ],
            [
                'id' => "20",
                'nombre' => "Merlot Reserva Especial",
                'imagen' => 'food_20',
                'precio' => 42,
                'descripcion' => "Un Merlot Reserva Especial con aromas a frutas rojas maduras y suave paso por roble, ideal para disfrutar junto a quesos maduros.",
                'categoria' => "Vinos"
            ],
            [
                'id' => "21",
                'nombre' => "Ajiaco Costeño",
                'imagen' => 'food_21',
                'precio' => 25,
                'descripcion' => "Un delicioso ajiaco costeño, con una mezcla de carne de res, pollo, cerdo, yuca, plátano y maíz, cocinado a fuego lento con especias tradicionales.",
                'categoria' => "Comidas criollas"
            ],
            [
                'id' => "22",
                'nombre' => "Sancocho Dominicano",
                'imagen' => 'food_22',
                'precio' => 20,
                'descripcion' => "Un reconfortante sancocho dominicano, lleno de sabor con una variedad de carnes como pollo, cerdo y res, acompañado de yuca, plátano y maíz.",
                'categoria' => "Comidas criollas"
            ],
            [
                'id' => "23",
                'nombre' => "Pabellón Criollo",
                'imagen' => 'food_23',
                'precio' => 22,
                'descripcion' => "El clásico pabellón criollo, con arroz blanco, caraotas negras, carne mechada y tajadas de plátano maduro, una combinación perfecta de sabores.",
                'categoria' => "Comidas criollas"
            ],
            [
                'id' => "24",
                'nombre' => "Mofongo Puertorriqueño",
                'imagen' => 'food_24',
                'precio' => 18,
                'descripcion' => "El auténtico mofongo puertorriqueño, preparado con plátanos verdes fritos y machacados, relleno de chicharrón de cerdo.",
                'categoria' => "Comidas criollas"
            ],
            [
                'id' => "25",
                'nombre' => "Arroz con Pollo Peruano",
                'imagen' => 'food_25',
                'precio' => 21,
                'descripcion' => "Un reconfortante plato de arroz con pollo peruano, cocinado con ají amarillo, cilantro, cerveza y especias, acompañado de verduras.",
                'categoria' => "Comidas criollas"
            ],
            [
                'id' => "26",
                'nombre' => "Chips de Yuca",
                'imagen' => 'food_26',
                'precio' => 8,
                'descripcion' => "Crujientes chips de yuca, sazonados con sal marina y un toque de limón, una opción deliciosa y saludable para disfrutar en cualquier momento del día.",
                'categoria' => "Piqueos"
            ],
            [
                'id' => "27",
                'nombre' => "Palomitas de Maíz Gourmet",
                'imagen' => 'food_27',
                'precio' => 6,
                'descripcion' => "Deliciosas palomitas de maíz gourmet, preparadas con maíz orgánico y aceite de oliva virgen extra, sazonadas con hierbas frescas.",
                'categoria' => "Piqueos"
            ],
            [
                'id' => "28",
                'nombre' => "Barritas de Granola",
                'imagen' => 'food_28',
                'precio' => 5,
                'descripcion' => "Barritas de granola caseras, hechas con avena integral, miel orgánica, frutos secos y semillas, una opción energética.",
                'categoria' => "Piqueos"
            ],
            [
                'id' => "29",
                'nombre' => "Frutas Deshidratadas",
                'imagen' => 'food_29',
                'precio' => 7,
                'descripcion' => "Mezcla de frutas deshidratadas, incluyendo mango, piña, plátano y manzana, sin adición de azúcares ni conservantes.",
                'categoria' => "Piqueos"
            ],
            [
                'id' => "30",
                'nombre' => "Nueces Glaseadas",
                'imagen' => 'food_30',
                'precio' => 9,
                'descripcion' => "Nueces glaseadas con miel y canela, tostadas hasta obtener un ligero dorado y luego enfriadas para un crujido perfecto.",
                'categoria' => "Piqueos"
            ]
        ];
        foreach ($food_list as $food) {
            // Busca el ID de la categoría utilizando el nombre de la categoría
            $categoriaId = DB::table('categorias')->where('nombre', $food['categoria'])->value('id');

            // Inserta la comida con el ID de la categoría
            DB::table('comidas')->insert([
                'nombre' => $food['nombre'],
                'imagen' => $food['imagen'],
                'precio' => $food['precio'],
                'descripcion' => $food['descripcion'],
                'categoria_id' => $categoriaId, // Utiliza el ID de la categoría
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}