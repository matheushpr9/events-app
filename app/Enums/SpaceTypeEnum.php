<?php
namespace App\Enums;

enum SpaceTypeEnum: string
{
    case CHACARA = 'Chácara';
    case CAPELA = 'Capela';
    case SITIO = 'Sítio';
    case CASA = 'Casa';
    case OUTRO = 'Outro';

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
