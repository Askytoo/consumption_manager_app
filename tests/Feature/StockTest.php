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
            'user_id' => 'different_id',
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

    /**
     * Stockの作成の成功テスト
     *
     * @test
     */
    public function test_can_save_stock(): void
    {
        Schema::disableForeignKeyConstraints();

        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->withSession(['banned' => false])
            ->post(route('stocks.store'), [
                'category' => 1,
                'name' => 'pumpkin',
                'quantity' => 2,
                'unit_name' => 'pcs',
            ])
            ->assertInertia(fn (Assert $page) => $page
                ->component('Stocks/Index')
                ->has('stocks', 1, fn(Assert $page) => $page
                    ->where('caregory', 1)
                    ->where('name', 'pumpkin')
                    ->where('quantity', 1)
                    ->where('unit_name', 'pcs')
                    ->where('is_regular', false)    // default is false
                    ->where('regular_quantity', 0)  // default is 0
                    ->where('user_id', $user_id)
                )
            );

        Schema::enableForeignKeyConstraints();
    }
}
