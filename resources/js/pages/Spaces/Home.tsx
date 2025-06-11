
import { useState } from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import SpaceCard from './components/SpaceCard';

interface SearchFilters {
  location: string;
  type: string;
  locality: string;
  amenities: string;
  services: string;
}

interface Space {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  image: string;
  type: string;
  amenities: string[];
}

// Dados mock para demonstração
const mockSpaces: Space[] = [
  {
    id: '1',
    name: 'Salão Elegance',
    description: 'Espaço sofisticado ideal para casamentos e eventos corporativos, com decoração clássica e ambiente acolhedor.',
    location: 'Ipanema, Rio de Janeiro',
    capacity: 150,
    pricePerHour: 320,
    rating: 4.8,
    reviewCount: 127,
    image: 'https://images.unsplash.com/photo-1519167758481-83f29c1fe8ea?w=500&h=300&fit=crop',
    type: 'Salão de Festas',
    amenities: ['Wi-Fi', 'Estacionamento', 'Cozinha', 'Ar Condicionado']
  },
  {
    id: '2',
    name: 'Auditório Business Center',
    description: 'Moderno auditório equipado com tecnologia de ponta para apresentações e conferências profissionais.',
    location: 'Centro, São Paulo',
    capacity: 200,
    pricePerHour: 480,
    rating: 4.9,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&h=300&fit=crop',
    type: 'Auditório',
    amenities: ['Wi-Fi', 'Projetor', 'Som Profissional', 'Ar Condicionado']
  },
  {
    id: '3',
    name: 'Terraço Garden',
    description: 'Lindíssimo terraço com vista panorâmica, perfeito para eventos ao ar livre e celebrações especiais.',
    location: 'Leblon, Rio de Janeiro',
    capacity: 80,
    pricePerHour: 250,
    rating: 4.7,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=300&fit=crop',
    type: 'Área Externa',
    amenities: ['Vista Panorâmica', 'Jardim', 'Estacionamento', 'Catering']
  },
  {
    id: '4',
    name: 'Coworking Hub',
    description: 'Espaço colaborativo moderno e flexível, ideal para workshops, reuniões e eventos corporativos.',
    location: 'Vila Madalena, São Paulo',
    capacity: 50,
    pricePerHour: 120,
    rating: 4.6,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop',
    type: 'Coworking',
    amenities: ['Wi-Fi', 'Café', 'Lousa Digital', 'Flexibilidade']
  },
  {
    id: '5',
    name: 'Restaurante Família',
    description: 'Aconchegante restaurante familiar com ambiente reservado, perfeito para confraternizações e jantares.',
    location: 'Copacabana, Rio de Janeiro',
    capacity: 60,
    pricePerHour: 180,
    rating: 4.5,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
    type: 'Restaurante',
    amenities: ['Cozinha Completa', 'Serviço de Mesa', 'Adega', 'Música Ambiente']
  },
  {
    id: '6',
    name: 'Salão Crystal',
    description: 'Espaço luxuoso com cristais e iluminação especial, ideal para formaturas e eventos de gala.',
    location: 'Barra da Tijuca, Rio de Janeiro',
    capacity: 120,
    pricePerHour: 380,
    rating: 4.9,
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500&h=300&fit=crop',
    type: 'Salão de Festas',
    amenities: ['Decoração Luxuosa', 'Estacionamento', 'Segurança', 'Catering']
  }
];

const Index = () => {
  const [filteredSpaces, setFilteredSpaces] = useState<Space[]>(mockSpaces);

  const handleSearch = (filters: SearchFilters) => {
    console.log('Aplicando filtros:', filters);

    let filtered = mockSpaces;

    if (filters.location) {
      filtered = filtered.filter(space =>
        space.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.type) {
      filtered = filtered.filter(space =>
        space.type.toLowerCase().includes(filters.type.toLowerCase())
      );
    }

    if (filters.amenities) {
      filtered = filtered.filter(space =>
        space.amenities.some(amenity =>
          amenity.toLowerCase().includes(filters.amenities.toLowerCase())
        )
      );
    }

    setFilteredSpaces(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SearchSection onSearch={handleSearch} />

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Espaços Disponíveis
              </h2>
              <p className="text-muted-foreground">
                {filteredSpaces.length} espaços encontrados
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>

          {filteredSpaces.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                Nenhum espaço encontrado com os filtros aplicados.
              </p>
              <p className="text-sm text-muted-foreground">
                Tente ajustar os filtros ou fazer uma nova busca.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
