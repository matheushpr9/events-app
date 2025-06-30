<?php
namespace App\Enums;
enum SpaceAmenitiesEnum: string
{
    case PISTA_DE_DANCA = 'Pista de dança';
    case SALAO_DE_JANTAR = 'Salão de jantar';
    case JARDIM = 'Jardim';
    case ESTACIONAMENTO = 'Estacionamento';
    case AR_CONDICIONADO = 'Ar condicionado';
    case WIFI = 'Wi-Fi';
    case COZINHA_EQUIPADA = 'Cozinha equipada';
    case SUITE_DA_NOIVA = 'Suíte da noiva';
    case CAPELA = 'Capela';
    case AREA_EXTERNA_COBERTA = 'Área externa coberta';
    case GERADOR = 'Gerador de energia';
    case ACESSIBILIDADE = 'Acessibilidade';
    case ILUMINACAO_DECORATIVA = 'Iluminação decorativa';
    case ESPACO_KIDS = 'Espaço Kids';
    case PISCINA = 'Piscina';

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}