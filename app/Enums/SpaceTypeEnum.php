<?php

namespace App\Enums;

enum SpaceTypeEnum: string
{
    case CHACARA = 'Chácara';
    case SITIO = 'Sítio';
    case FAZENDA = 'Fazenda';
    case CASA = 'Casa/Residência';
    case SALAO_DE_FESTAS = 'Salão de festas';
    case ESPACO_GOURMET = 'Espaço gourmet';
    case HOTEL = 'Hotel';
    case POUSADA = 'Pousada';
    case RESTAURANTE = 'Restaurante';
    case CLUBE = 'Clube';
    case AUDITORIO = 'Auditório';
    case CENTRO_CONVENCOES = 'Centro de convenções';
    case ESPACO_MULTIUSO = 'Espaço multiuso';
    case COBERTURA = 'Cobertura';
    case GALPAO = 'Galpão/Loft';
    case PRAIA = 'Espaço na praia';
    case CAPELA = 'Capela';
    case OUTRO = 'Outro';

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
