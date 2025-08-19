<?php

namespace App\Enums;

enum SpaceAmenitiesEnum: string
{
    case PISTA_DE_DANCA = 'Pista de dança';
    case SALAO_DE_EVENTOS = 'Salão de eventos';
    case JARDIM = 'Jardim';
    case ESTACIONAMENTO = 'Estacionamento';
    case AR_CONDICIONADO = 'Ar condicionado';
    case WIFI = 'Wi-Fi';
    case COZINHA_EQUIPADA = 'Cozinha equipada';
    case AREA_EXTERNA_COBERTA = 'Área externa coberta';
    case GERADOR = 'Gerador de energia';
    case ACESSIBILIDADE = 'Acessibilidade';
    case ILUMINACAO = 'Iluminação especial';
    case ESPACO_KIDS = 'Espaço Kids';
    case PISCINA = 'Piscina';
    case MOBILIARIO = 'Mobiliário disponível';
    case SOM = 'Sistema de som';
    case PROJETOR = 'Projetor/Telão';
    case BAR = 'Bar/Copa';
    case CAMARIM = 'Camarim';
    case SEGURANCA = 'Segurança';
    case VESTIARIO = 'Vestiário';

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
