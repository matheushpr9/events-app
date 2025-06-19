<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    protected $fillable = [
        'street',
        'neighborhood',
        'number',
        'complement',
        'city',
        'state',
        'postal_code',
        'country',
    ];
    protected $casts = [

        'street' => 'string',
        'city' => 'string',
        'state' => 'string',
        'postal_code' => 'string',
        'country' => 'string',
    ];
    public function space()
    {
        return $this->belongsTo(Space::class);
    }
}
