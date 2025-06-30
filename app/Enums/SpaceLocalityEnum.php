<?php

namespace App\Enums;

enum SpaceLocalityEnum: string
{
    case URBANO = 'Urbano';
    case RURAL = 'Rural';
    case PRAIA = 'Praia';
    case MONTANHA = 'Montanha';
    case LITORANEO = 'Litorâneo';
    case INTERIOR = 'Interior';
    case OUTRO = 'Outro';

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}