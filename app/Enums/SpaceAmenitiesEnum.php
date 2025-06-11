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
    case AUDIOVISUAL = 'Audiovisual';
    case BAR = 'Bar';
    case COZINHA_EQUIPADA = 'Cozinha equipada';
    case PISCINA = 'piscina';
    case OUTRO = 'Outro';

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
