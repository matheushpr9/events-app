import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { SpaceImageGallery } from '../../components/image/SpaceImageGallery';
import { SpaceInfoCard } from '../../components/SpaceInfoCard';
import { SpaceAmenities } from '../../components/SpaceAmenities';
import { SpaceContact } from '../../components/SpaceContact';
import getSpace from '../helpers/get-space';
import { Space } from '@/interfaces/space';
import Header from '../components/Header';

const Index = () => {
  const { id } = usePage().props as { [key: string]: any };
  const [space, setSpace] = useState<Space | null>(null);

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!id) {
      setSpace(null);
      return;
    }
    getSpace(id)
      .then(setSpace)
      .catch((error) => {
        console.error("Erro ao buscar espaço:", error);
        setSpace(null);
      });
    setLoading(false);
  }, [id]);

  
  space?.images?.forEach((image) => {
    image.image_path = image.image_path.startsWith('http')
      ? image.image_path
      : `/storage/${image.image_path}`;
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream">
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-brand-purple/20 rounded w-1/4"></div>
            <div className="h-96 bg-brand-purple/20 rounded-2xl"></div>
            <div className="h-32 bg-brand-purple/20 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!space) {
    return (
      <>
      <Header />
        <div className="min-h-screen bg-brand-cream flex items-center justify-center">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-brand-purple">Espaço não encontrado</h1>
            <p className="text-brand-purple/70">O espaço que você procura não existe ou foi removido.</p>
            <Button onClick={() => window.location.href = '/'} className="gradient-brand text-white px-8 py-3 rounded-xl">
              Voltar ao Início
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (

    
    <div className="min-h-screen bg-brand-cream">
      <Header />
      {/* Hero Section */}
      <section className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="xl:col-span-3 space-y-6">
            <SpaceImageGallery {...space.images} />
          </div>

          {/* Space Information */}
          <div className="xl:col-span-2">
            <SpaceInfoCard {...space} />
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="container mx-auto max-w-7xl px-4 pb-8 md:pb-12">
        <SpaceAmenities {...space.amenities} />
      </section>

      {/* Contact Section */}
      <section className="container mx-auto max-w-7xl px-4 pb-12 md:pb-16">
        <SpaceContact {...space.user} />
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-brand py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para reservar?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Este espaço é perfeito para o seu evento. Não perca tempo e garante já a sua reserva.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-brand-purple hover:bg-white/90 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:shadow-brand-lg"
          >
            Reservar Agora
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;