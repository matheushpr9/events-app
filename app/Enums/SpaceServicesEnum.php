<?php

namespace App\Enums;

enum SpaceServicesEnum: string
{
    case MUSICA = 'Música ao vivo / DJ';
    case CERIMONIAL = 'Cerimonial / Assessoria';
    case DECORACAO = 'Decoração e ambientação';
    case BUFFET = 'Buffet completo';
    case DOCES_BOLOS = 'Doces e bolos';
    case BAR = 'Bar / Open bar';
    case FOTOGRAFIA = 'Fotografia';
    case FILMAGEM = 'Filmagem';
    case ILUMINACAO = 'Iluminação cênica';
    case ESPACO_KIDS = 'Espaço Kids / Monitores';
    case TRANSPORTE = 'Transporte / Transfer para convidados';
    case VALET = 'Valet / Manobrista';
    case GERADOR = 'Gerador de energia';
    case SEGURANCA = 'Segurança';
    case LIMPEZA = 'Limpeza';
    case RECEPCIONISTA = 'Recepcionista';
    case HOSPEDAGEM = 'Hospedagem';

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
