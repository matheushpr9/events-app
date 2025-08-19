<?php

namespace App\Enums;

enum SpaceLocalityEnum: string
{
    case URBANO = 'Urbano';
    case RURAL = 'Rural';
    case PRAIA = 'Praia/Litorâneo';
    case MONTANHA = 'Montanha';
    case INTERIOR = 'Interior';
    case LAGO = 'Beira de lago/represa';
    case OUTRO = 'Outro';

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
