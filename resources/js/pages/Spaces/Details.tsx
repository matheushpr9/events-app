import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { SpaceImageGallery } from '../../components/image/SpaceImageGallery';
import { SpaceInfoCard } from '../../components/SpaceInfoCard';
import { SpaceAmenities } from '../../components/SpaceAmenities';
import { SpaceContact } from '../../components/SpaceContact';
import getSpace from '../helpers/get-space';
import { Space } from '@/interfaces/space';
import Header from '../components/Header';
import { Star } from "lucide-react";
import { ReviewCarousel } from '../components/ReviewCarousel';
import { SpaceServices } from '@/components/SpaceServicesList';

const Index = () => {
    const { id } = usePage().props as { [key: string]: any };
    const [space, setSpace] = useState<Space | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            setSpace(null);
            setLoading(false);
            return;
        }
        setLoading(true);
        getSpace(id)
            .then(setSpace)
            .catch((error) => {
                console.error("Erro ao buscar espaço:", error);
                setSpace(null);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fff6f1]">
                <div className="container mx-auto max-w-7xl px-4 py-16">
                    <div className="animate-pulse space-y-8">
                        <div className="h-8 bg-[#4e2780]/20 rounded w-1/4"></div>
                        <div className="h-64 sm:h-96 bg-[#4e2780]/20 rounded-2xl"></div>
                        <div className="h-32 bg-[#4e2780]/20 rounded-2xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!space) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-[#fff6f1] flex items-center justify-center">
                    <div className="text-center space-y-6 animate-fade-in">
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#4e2780]">Espaço não encontrado</h1>
                        <p className="text-[#4e2780]/70">O espaço que você procura não existe ou foi removido.</p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-8 py-3 bg-[#4e2780] text-white rounded-xl font-semibold shadow-md hover:bg-[#3a1e5a] focus:outline-none focus:ring-2 focus:ring-[#b39ddb] focus:ring-offset-2 transition-all duration-300"
                            aria-label="Voltar ao Início"
                        >
                            Voltar ao Início
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="min-h-screen bg-[#fff6f1] flex flex-col">
            <Header />

            {/* Hero Section */}
            <section className="container mx-auto max-w-7xl px-2 sm:px-4 py-6 md:py-10">
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 lg:gap-12 animate-fade-in">
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
            <section className="container mx-auto max-w-7xl px-2 sm:px-4 pb-8 md:pb-12">
                <SpaceContact {...space.user} />
            </section>

            {/* Amenities Section */}
            <section className="container mx-auto max-w-7xl px-2 sm:px-4 pb-8 md:pb-12">
                <SpaceAmenities amenities={space.amenities} />
            </section>

            {/* Services Section */}
            <section className="container mx-auto max-w-7xl px-2 sm:px-4 pb-8 md:pb-12">
                <SpaceServices services={space.services} />
            </section>

            {/* Reviews Section */}
            <section className="container mx-auto max-w-7xl px-2 sm:px-4 pb-10 md:pb-16">
                <ReviewCarousel spaceId={space.id} />
            </section>

            {/* Rating Card */}
            <section className="container mx-auto max-w-7xl px-2 sm:px-4 pb-8 md:pb-12">
                <div className="bg-white rounded-2xl shadow-md border-0">
                    <div className="p-6 sm:p-8 text-center space-y-6">
                        <div className="text-2xl sm:text-4xl font-bold text-[#4e2780] mb-2">
                            Já visitou este espaço?
                        </div>
                        <button
                            className="w-full px-8 py-4 text-base sm:text-lg font-semibold rounded-xl bg-[#4e2780] text-white shadow-md hover:bg-[#3a1e5a] focus:outline-none focus:ring-2 focus:ring-[#b39ddb] focus:ring-offset-2 transition-all duration-300 flex items-center justify-center"
                            onClick={() => window.location.href = `/space/review/${space.id}`}
                            aria-label="Faça sua avaliação"
                        >
                            <Star className="h-5 w-5 mr-2" />
                            Faça sua avaliação
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Index;
