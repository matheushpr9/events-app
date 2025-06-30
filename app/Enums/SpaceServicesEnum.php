<?php
namespace App\Enums;
enum SpaceServicesEnum: string
{
    case MUSICA = 'Música';
    case DJ = 'DJ';
    case BANDA = 'Banda';
    case CERIMONIAL = 'Cerimonial';
    case DECORACAO = 'Decoração';
    case DECORACAO_FLORAL = 'Decoração floral';
    case BUFFET = 'Buffet';
    case BUFFET_DOCES = 'Buffet de doces';
    case BOLO_CASAMENTO = 'Bolo de casamento';
    case BAR = 'Bar';
    case OPEN_BAR = 'Open bar';
    case FOTOGRAFIA = 'Fotografia';
    case FILMAGEM = 'Filmagem';
    case ILUMINACAO_CENICA = 'Iluminação cênica';
    case ESPACO_KIDS_MONITORES = 'Espaço Kids com monitores';
    case TRANSPORTE_CONVIDADOS = 'Transporte para convidados';
    case VALET = 'Valet';
    case GERADOR = 'Gerador de energia';
    case SEGURANCA = 'Segurança';
    case LIMPEZA = 'Limpeza';

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}