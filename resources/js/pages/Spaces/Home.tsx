import { useState } from 'react';
import { MapPin } from 'lucide-react';
import Header from '../components/Header';
import SearchSection from '../components/SearchSection';
import SpaceCard from '../components/SpaceCard';
import { api, initSanctum } from '@/api/api';

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
 

// Dados mock para desenvolvimento local
const Spaces: Space[] = [
  {
    id: '1',
    name: 'Villa Elegante',
    description: 'Espaço sofisticado com jardim amplo, perfeito para casamentos e eventos especiais.',
    location: 'Jardim Botânico, Rio de Janeiro',
    capacity: 150,
    pricePerHour: 450,
    rating: 4.9,
    reviewCount: 127,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop',
    type: 'Villa',
    amenities: ['Wi-Fi', 'Estacionamento', 'Jardim', 'Cozinha']
  },
  {
    id: '2', 
    name: 'Salão Crystal',
    description: 'Salão moderno com decoração contemporânea e sistema de som profissional.',
    location: 'Leblon, Rio de Janeiro',
    capacity: 80,
    pricePerHour: 280,
    rating: 4.7,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop',
    type: 'Salão',
    amenities: ['Wi-Fi', 'Ar Condicionado', 'Som Profissional', 'Estacionamento']
  }
];

const Index = () => {
  const [filteredSpaces, setFilteredSpaces] = useState<Space[]>(Spaces);
  
  return (
    <div className="min-h-screen bg-[#fff6f1] flex flex-col">
      <Header />
      <main className="flex-1">
        <SearchSection onResults={setFilteredSpaces} mockSpaces={Spaces} />
        {/* Results Section */}
        <section className="py-12 px-2 sm:px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 animate-fade-in">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#4e2780] mb-2 sm:mb-3">
                  Espaços Disponíveis
                </h2>
                <p className="text-[#4e2780]/70 text-base sm:text-lg">
                  {filteredSpaces.length} espaço{filteredSpaces.length !== 1 && 's'} encontrado{filteredSpaces.length !== 1 && 's'} para você
                </p>
              </div>
            </div>

            {filteredSpaces.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-slide-up">
                {filteredSpaces.map((space) => (
                  <SpaceCard key={space.id} space={space} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 animate-fade-in">
                <div className="max-w-md mx-auto">
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6"
                    aria-hidden="true"
                  >
                    <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-[#4e2780]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#4e2780] mb-3 sm:mb-4">
                    Nenhum espaço encontrado
                  </h3>
                  <p className="text-[#4e2780]/70 mb-5 sm:mb-6">
                    Não encontramos espaços com os filtros aplicados. Tente ajustar sua busca ou explore outras opções.
                  </p>
                  <button
                    onClick={() => setFilteredSpaces(Spaces)}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 bg-[#4e2780] text-white rounded-xl font-semibold shadow-md hover:bg-[#3a1e5a] focus:outline-none focus:ring-2 focus:ring-[#b39ddb] focus:ring-offset-2 transition-all duration-300"
                    aria-label="Ver todos os espaços"
                  >
                    Ver Todos os Espaços
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;