<?php
namespace App\Enums;
enum SpaceServicesEnum: string
{
    case MUSICA = 'Música';
    case RECEPCAO = 'Recepção';
    case BUFFET = 'Buffet';
    case MESAS = 'Mesas';
    case CADEIRAS = 'Cadeiras';
    case DECORACAO = 'Decoração';
    case SEGURANCA = 'Segurança';
    case LIMPEZA = 'Limpeza';
    case ESTACIONAMENTO = 'Estacionamento';
    case OUTRO = 'Outro';

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
