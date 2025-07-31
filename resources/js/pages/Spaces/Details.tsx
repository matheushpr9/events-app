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
  import {  Star } from "lucide-react";
  import { Card, CardContent } from "@/components/ui/card";
import { ReviewCarousel } from '../components/ReviewCarousel';

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
              <SpaceImageGallery images={space.images} />
            </div>

            {/* Space Information */}
            <div className="xl:col-span-2">
              <SpaceInfoCard {...space} />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="container mx-auto max-w-7xl px-4 pb-12 md:pb-16">
          <SpaceContact {...space.user} />
        </section>

        {/* Amenities Section */}
        <section className="container mx-auto max-w-7xl px-4 pb-8 md:pb-12">
          <SpaceAmenities amenities={space.amenities} />
        </section>
         {/* Reviews Section */}
        <section className="container mx-auto max-w-7xl px-4 pb-12 md:pb-16">
          <ReviewCarousel spaceId={space.id} />
        </section>


        {/* Rating Card */}
        <section className="container mx-auto max-w-7xl px-4 pb-8 md:pb-12">
          <Card className="border-0 shadow-brand bg-white rounded-2xl">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                
                <div className="text-4xl font-bold text-brand-purple mb-2">
                  Já visitou este espaço?
                </div>
                  
                
                <Button className="w-full gradient-brand text-white px-8 py-4 text-lg font-semibold rounded-xl hover:shadow-brand-lg transition-all duration-300 cursor-pointer"
                onClick={() => window.location.href = `/space/review/${space.id}`}
                >
                  <Star className="h-5 w-5 mr-2" />
                  Faça sua avaliação
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  };

  export default Index;