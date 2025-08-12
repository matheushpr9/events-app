import React from 'react';
import {  Car, PartyPopper, Flower2, Zap, Utensils, Music, Headphones, Guitar, Cake, Sparkle, Sparkles, CandyCane, Beer, CupSoda, Camera, Film, Lightbulb, Smile, CarFront, Shield } from 'lucide-react';

const getServiceIcon = (service: string): React.ReactElement | null => {
  switch (service.toLowerCase()) {
    case 'música':
      return <Music className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Música" />;
    case 'dj':
      return <Headphones className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="DJ" />;
    case 'banda':
      return <Guitar className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Banda" />;
    case 'cerimonial':
      return <PartyPopper className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Cerimonial" />;
    case 'decoração':
      return <Sparkles className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Decoração" />;
    case 'decoração floral':
      return <Flower2 className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Decoração Floral" />;
    case 'buffet':
      return <Utensils className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Buffet" />;
    case 'buffet de doces':
      return <CandyCane className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Buffet de Doces" />;
    case 'bolo de casamento':
      return <Cake className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Bolo de Casamento" />;
    case 'bar':
      return <Beer className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Bar" />;
    case 'open bar':
      return <CupSoda className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Open Bar" />;
    case 'fotografia':
      return <Camera className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Fotografia" />;
    case 'filmagem':
      return <Film className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Filmagem" />;
    case 'iluminação cênica':
      return <Lightbulb className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Iluminação Cênica" />;
    case 'espaço kids com monitores':
      return <Smile className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Espaço Kids com Monitores" />;
    case 'trasporte para convidados':
        return <Car className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Trasporte para Convidados" />;
    case 'valet':
        return <CarFront className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Valet" />;
    case 'gerador de energia':
      return <Zap className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Gerador de Energia" />;
    case 'segurança':
      return <Shield className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Acessibilidade" />;
    case 'limpeza':
      return <Sparkle className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" aria-label="Limpeza" />;
    default:
      return null;
  }
};

export default getServiceIcon;
