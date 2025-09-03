import React from 'react';
import {
    Wifi,
    Car,
    Speaker,
    Flower2,
    Snowflake,
    CookingPot,
    Umbrella,
    Zap,
    Accessibility,
    LampCeiling,
    ToyBrick,
    WavesLadder,
    Utensils,
    Sofa,
    Projector,
    GlassWater,
    UserCog,
    ShieldCheck,
    Shirt,
    Building2,
} from 'lucide-react';

const getAmenityIcon = (amenity: string): React.ReactElement | null => {
    switch (amenity.toLowerCase()) {
        case 'pista de dança':
            return <Speaker className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Pista de dança" />;
        case 'salão de eventos':
            return <Building2 className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Salão de eventos" />;
        case 'jardim':
            return <Flower2 className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Jardim" />;
        case 'estacionamento':
            return <Car className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Estacionamento" />;
        case 'ar condicionado':
            return <Snowflake className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Ar condicionado" />;
        case 'wi-fi':
            return <Wifi className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Wi-Fi" />;
        case 'cozinha equipada':
            return <CookingPot className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Cozinha equipada" />;
        case 'área externa coberta':
            return <Umbrella className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Área externa coberta" />;
        case 'gerador de energia':
            return <Zap className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Gerador de energia" />;
        case 'acessibilidade':
            return <Accessibility className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Acessibilidade" />;
        case 'iluminação especial':
            return <LampCeiling className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Iluminação especial" />;
        case 'espaço kids':
            return <ToyBrick className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Espaço Kids" />;
        case 'piscina':
            return <WavesLadder className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Piscina" />;
        case 'mobiliário disponível':
            return <Sofa className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Mobiliário disponível" />;
        case 'sistema de som':
            return <Speaker className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Sistema de som" />;
        case 'projetor / telão':
            return <Projector className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Projetor/Telão" />;
        case 'bar / copa':
            return <GlassWater className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Bar/Copa" />;
        case 'camarim':
            return <UserCog className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Camarim" />;
        case 'segurança':
            return <ShieldCheck className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Segurança" />;
        case 'vestiário':
            return <Shirt className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Vestiário" />;
        default:
            return null;
    }
};

export default getAmenityIcon;
