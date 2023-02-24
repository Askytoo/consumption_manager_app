<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Stock;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
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
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->withSession(['banned' => false])
            ->post(route('stocks.store'), [
                'category' => '食料品',
                'name' => 'かぼちゃ',
                'quantity' => 2,
                'unit_name' => '個',
                'is_regular' => '設定',
                'regular_quantity' => 2,
            ])
            ->assertStatus(302)
            ->assertRedirect(route('stocks.index'));

        $response = $this->actingAs($user)
            ->withSession(['banned' => false])
            ->get(route('stocks.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Stocks/Index')
                ->has('stocks.0', fn(Assert $page) => $page
                    ->where('category', '食料品')
                    ->where('name', 'かぼちゃ')
                    ->where('quantity', 2)
                    ->where('unit_name', '個')
                    ->where('is_regular', '設定')
                    ->where('regular_quantity', 2)
                    ->where('user_id', $user->id)
                    ->has('id')
                    ->has('created_at')
                    ->has('updated_at')
                )
            );
    }

    /**
     * Stockの作成の失敗テスト
     *
     * @test
     */
    public function test_can_not_save_stock(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->withSession(['banned' => false])
            ->post(route('stocks.store'), [
                'category' => 'none',   // 選択肢にないデータ
                'name' => 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',    // 文字数が50以上
                'quantity' => 1000, // 0~999以外
                'unit_name' => '個',    // 正常なデータ
                'is_regular' => 'none', // 選択肢にないデータ
                'regular_quantity' => -1, // 0~999以外
            ])
            ->assertSessionHasErrors([
            'name' => '商品名は、50文字以下で指定してください。',
            'category' => '選択されたカテゴリーは正しくありません。',
            'quantity' => '数量は、0から999の間で指定してください。',
            'is_regular' => '選択された常備品は正しくありません。',
            'regular_quantity' => '常備数量は、0から999の間で指定してください。',
        ]);
    }
}
