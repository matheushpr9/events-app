<?php
namespace App\Enums;

enum SpaceTypeEnum: string
{
    case CHACARA = 'Chácara';
    case SITIO = 'Sítio';
    case CASA = 'Casa';
    case SALAO_DE_FESTAS = 'Salão de festas';
    case VILLA = 'Villa';
    case CAPELA = 'Capela';
    case ESPACO_GOURMET = 'Espaço gourmet';
    case FAZENDA = 'Fazenda';
    case HOTEL = 'Hotel';
    case POUSADA = 'Pousada';
    case RESTAURANTE = 'Restaurante';
    case CLUBE = 'Clube';
    case OUTRO = 'Outro';

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}