<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Stock;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;

class StockTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Stockの一覧の表示テスト
     *
     * @test
     */
    public function test_can_view_stocks(): void
    {
        Schema::disableForeignKeyConstraints();

        $user = User::factory()->create();

        Stock::factory(5)->create([
            'user_id' => $user->id,
        ]);

        Stock::factory(3)->create([
            'user_id' => fake()->uuid(),
        ]);

        $response = $this->actingAs($user)
            ->withSession(['banned' => false])
            ->get(route('stocks.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Stocks/Index')
                ->has('stocks', 5)
            );

        Schema::enableForeignKeyConstraints();
    }
}
