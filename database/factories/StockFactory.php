<?php

namespace Database\Factories;

use App\Models\Stock;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Stock>
 */
class StockFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user_id =  DB::table('users')->first()->id;

        return [
            'id' => fake()->uuid(),
            'user_id' => $user_id,
            'name' => fake()->word(),
            'category' => Stock::CATEGORY[mt_rand(0, 5)],
            'quantity' => 1,
            'unit_name' => '個',
            'is_regular' => Stock::IS_REGULAR[mt_rand(0, 1)],
            'regular_quantity' => 0,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
