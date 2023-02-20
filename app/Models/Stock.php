<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Stock extends Model
{
    use HasFactory;

    protected  $fillable = [
        'name',
        'quantity',
        'unit_name',
        'is_regular',
        'stndard_quantity',
    ];
     
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
