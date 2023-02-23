<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Stock extends Model
{
    use HasFactory;

    protected  $fillable = [
        'name',
        'category',
        'quantity',
        'unit_name',
        'is_regular',
        'stndard_quantity',
    ];

    /**
     * categoryの定義
     *
     * @var array  
     */
    const CATEGORY = [
        0 => 'その他',
        1 => '食料品',
        2 => '台所用品',
        3 => 'トイレ用品',
        4 => '風呂場用品',
        5 => '事務用品',
        6 => '催事用品',
        7 => '雑貨',
        8 => '贈り物',
    ];

    public function category(): Attribute
    {
        return new Attribute(
            get: function ($value) {
                if (!isset(self::CATEGORY[$value])) {
                    return 'その他';
                }
                return self::CATEGORY[$value];
            },

            set: function ($value) {
                $key = array_search($value, self::CATEGORY);
                if (!$key) {
                    return 0;
                }
                return $key;
            },
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
