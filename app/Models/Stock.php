<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Stock extends Model
{
    use HasFactory, HasUuids;

    protected  $fillable = [
        'name',
        'category',
        'quantity',
        'unit_name',
        'is_regular',
        'regular_quantity',
    ];

    /**
     * categoryの定義
     *
     * @var array  
     */
    const CATEGORY = [
        1 => '食料品',
        2 => '台所用品',
        3 => 'トイレ用品',
        4 => '風呂場用品',
        5 => '洗濯用品',
        6 => '事務用品',
        7 => '催事用品',
        8 => '雑貨',
        9 => '贈り物',
        0 => 'その他',
    ];

    /**
     *
     * is_regularの定義
     *  @var array
     */
    const IS_REGULAR = [
        0 => '未設定',
        1 => '設定',
    ];

    /**
     * categoryのアクセサとミューテタの実装
     *
     * @return Illuminate\Database\Eloquent\Casts\Attribute
     */
    public function category(): Attribute
    {
        return new Attribute(
            get: function ($value) {
                return self::CATEGORY[$value] ?? 'その他';
            },

            set: function ($value) {
                return array_search($value, self::CATEGORY) ?: 0;
            },
        );
    }

    /**
     * is_regularのアクセサとミューテタの実装
     *
     * @return Illuminate\Database\Eloquent\Casts\Attribute
     */
    public function isRegular(): Attribute
    {
        return new Attribute(
            get: function ($value) {
                return self::IS_REGULAR[$value] ?? '未設定';
            },

            set: function ($value) {
                return array_search($value, self::IS_REGULAR) || 0;
            }
        );
    }
     
    /**
     * Get the user that wrote the stock.
     *
     * @return  Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
