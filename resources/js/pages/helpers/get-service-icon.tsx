import React from 'react';
import {
    Music,
    PartyPopper,
    Sparkles,
    Utensils,
    Cake,
    Beer,
    Camera,
    Film,
    Lightbulb,
    Smile,
    CarFront,
    Zap,
    Shield,
    Sparkle,
    User,
    BedDouble,
    Bus,
} from 'lucide-react';

const getServiceIcon = (service: string): React.ReactElement | null => {
    switch (service.toLowerCase()) {
        case 'música ao vivo/dj':
            return <Music className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Música ao vivo/DJ" />;
        case 'cerimonial/assessoria':
            return <PartyPopper className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Cerimonial/Assessoria" />;
        case 'decoração e ambientação':
            return <Sparkles className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Decoração e ambientação" />;
        case 'buffet completo':
            return <Utensils className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Buffet completo" />;
        case 'doces e bolos':
            return <Cake className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Doces e bolos" />;
        case 'bar/open bar':
            return <Beer className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Bar/Open bar" />;
        case 'fotografia':
            return <Camera className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Fotografia" />;
        case 'filmagem':
            return <Film className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Filmagem" />;
        case 'iluminação cênica':
            return <Lightbulb className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Iluminação cênica" />;
        case 'espaço kids/monitores':
            return <Smile className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Espaço Kids/Monitores" />;
        case 'transporte/transfer para convidados':
            return <Bus className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Transporte/Transfer para convidados" />;
        case 'valet/manobrista':
            return <CarFront className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Valet/Manobrista" />;
        case 'gerador de energia':
            return <Zap className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Gerador de energia" />;
        case 'segurança':
            return <Shield className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Segurança" />;
        case 'limpeza':
            return <Sparkle className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Limpeza" />;
        case 'recepcionista':
            return <User className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Recepcionista" />;
        case 'hospedagem':
            return <BedDouble className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Hospedagem" />;
        default:
            return null;
    }
};

export default getServiceIcon;
