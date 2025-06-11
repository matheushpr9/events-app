<?php

namespace App\Models;

use App\Enums\SpaceLocalityEnum;
use App\Enums\SpaceTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Space extends Model
{
    use HasFactory;

    protected $fillable = [
        'people_capacity',
        'cep',
        'price_per_person_buffet',
        'events_count',
        'type',
        'locality',
        'amenities',
        'services',
        'description',
    ];
    protected $casts = [
        'type'=> SpaceTypeEnum::class,
        'locality' => SpaceLocalityEnum::class,
        'amenities' => 'array',
        'services' => 'array',
    ];

    public function images()
    {
        return $this->hasMany(SpaceImage::class);
    }

}
