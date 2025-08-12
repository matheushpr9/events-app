import React from 'react';
import { Wifi, Car, Speaker, Flower2, Snowflake, CookingPot, Bed, Church, Umbrella, Zap, Accessibility, LampCeiling, ToyBrick, WavesLadder, Utensils } from 'lucide-react';

const getAmenityIcon = (amenity: string): React.ReactElement | null => {
  switch (amenity.toLowerCase()) {
    case 'pista de dança':
      return <Speaker className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Pista de Dança" />;
    case 'salão de jantar':
      return <Utensils className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Salão de Festas" />;
    case 'jardim':
      return <Flower2 className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Jardim" />;
    case 'estacionamento':
      return <Car className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Estacionamento" />;
    case 'ar condicionado':
      return <Snowflake className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Ar Condicionado" />;
    case 'wi-fi':
      return <Wifi className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Wi-Fi" />;
    case 'cozinha equipada':
      return <CookingPot className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Cozinha Equipada" />;
    case 'suíte da noiva':
      return <Bed className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Suíte da Noiva" />;
    case 'capela':
      return <Church className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Capela" />;
    case 'área externa coberta':
      return <Umbrella className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Área Externa Coberta" />;
    case 'gerador de energia':
      return <Zap className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Gerador de Energia" />;
    case 'acessibilidade':
      return < Accessibility className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Acessibilidade" />;
    case 'iluminação decorativa':
      return <LampCeiling className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Iluminação Decorativa" />;
    case 'espaço kids':
      return <ToyBrick className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Espaço Kids" />;
    case 'piscina':
      return <WavesLadder className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Piscina" />;
    default:
      return null;
  }
};

export default getAmenityIcon;
