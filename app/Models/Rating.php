<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    protected $fillable = [
        'space_id',
        'rating',
        'review',
        'name',
        'email',
    ];

    public function space()
    {
        return $this->belongsTo(Space::class);
    }
}
