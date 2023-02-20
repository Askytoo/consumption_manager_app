<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    private $fillable = [
        'name',
        'quantity',
        'unit_name',
        'is_regular',
        'stndard_quantity',
    ];
     
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
