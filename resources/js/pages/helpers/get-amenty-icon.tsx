import React from 'react';
import { Wifi, Car, Utensils, Speaker, PartyPopper, Flower2, Snowflake, CookingPot, Bed, Church, Umbrella, Zap, Accessibility, LampCeiling, ToyBrick, WavesLadder } from 'lucide-react';

const getAmenityIcon = (amenity: string): React.ReactElement | null => {
  switch (amenity.toLowerCase()) {
    case 'pista de dança':
      return <Speaker className="h-3 w-3" aria-label="Pista de Dança" />;
    case 'salão de festas':
      return <PartyPopper className="h-3 w-3" aria-label="Salão de Festas" />;
    case 'jardin':
      return <Flower2 className="h-3 w-3" aria-label="Jardim" />;
    case 'estacionamento':
      return <Car className="h-3 w-3" aria-label="Estacionamento" />;
    case 'ar condicionado':
      return <Snowflake className="h-3 w-3" aria-label="Ar Condicionado" />;
    case 'wi-fi':
      return <Wifi className="h-3 w-3" aria-label="Wi-Fi" />;
    case 'cozinha equipada':
      return <CookingPot className="h-3 w-3" aria-label="Cozinha Equipada" />;
    case 'suíte da noiva':
      return <Bed className="h-3 w-3" aria-label="Suíte da Noiva" />;
    case 'capela':
      return <Church className="h-3 w-3" aria-label="Capela" />;
    case 'área externa coberta':
      return <Umbrella className="h-3 w-3" aria-label="Área Externa Coberta" />;
    case 'gerador de energia':
      return <Zap className="h-3 w-3" aria-label="Gerador de Energia" />;
    case 'acessibilidade':
      return < Accessibility className="h-3 w-3" aria-label="Acessibilidade" />;
    case 'iluminação decorativa':
      return <LampCeiling className="h-3 w-3" aria-label="Iluminação Decorativa" />;
    case 'espaço kids':
      return <ToyBrick className="h-3 w-3" aria-label="Espaço Kids" />;
    case 'piscina':
      return <WavesLadder className="h-3 w-3" aria-label="Piscina" />;
    default:
      return null;
  }
};

export default getAmenityIcon;