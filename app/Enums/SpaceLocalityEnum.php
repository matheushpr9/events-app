<?php

namespace App\Enums;

enum SpaceLocalityEnum: string
{
    case URBANO = 'Urbano';
    case RURAL = 'Rural';
    case OUTRO = 'Outro';

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
