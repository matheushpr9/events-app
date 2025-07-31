import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewCarouselProps {
  spaceId: string;
}

// Mock reviews data - replace with actual API call
const mockReviews: Review[] = [
  {
    id: "1",
    name: "Ana Silva",
    rating: 5,
    comment: "Espaço incrível! Superou todas as expectativas. A localização é perfeita e o atendimento foi excepcional.",
    date: "2024-01-15"
  },
  {
    id: "2", 
    name: "Carlos Santos",
    rating: 4,
    comment: "Muito bom para eventos corporativos. O sistema de som é excelente e a infraestrutura é completa.",
    date: "2024-01-10"
  },
  {
    id: "3",
    name: "Maria Fernanda",
    rating: 5,
    comment: "Realizei meu casamento aqui e foi perfeito! Todos os convidados elogiaram o local. Recomendo muito!",
    date: "2024-01-08"
  },
  {
    id: "4",
    name: "João Oliveira",
    rating: 4,
    comment: "Ótimo custo-benefício. O espaço é bem amplo e comporta bastante gente. Voltaria a usar com certeza.",
    date: "2024-01-05"
  },
  {
    id: "5",
    name: "Beatriz Costa",
    rating: 5,
    comment: "Ambiente sofisticado e moderno. Ideal para eventos empresariais. A equipe de apoio é muito profissional.",
    date: "2024-01-03"
  }
];

const ReviewCard = ({ review }: { review: Review }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="border-0 shadow-brand bg-white rounded-2xl h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center space-x-1 mb-3">
          {renderStars(review.rating)}
        </div>
        
        <p className="text-gray-700 mb-4 flex-grow italic">
          "{review.comment}"
        </p>
        
        <div className="border-t border-gray-100 pt-4">
          <p className="font-semibold text-brand-purple text-lg">
            {review.name}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(review.date).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export const ReviewCarousel = ({ spaceId }: ReviewCarouselProps) => {
  // In a real app, you would fetch reviews based on spaceId
  const reviews = mockReviews;

  if (reviews.length === 0) {
    return (
      <Card className="border-0 shadow-brand bg-white rounded-2xl">
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">Ainda não há avaliações para este espaço.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-brand-purple mb-2">
          Avaliações dos Visitantes
        </h2>
        <p className="text-brand-purple/70">
          Veja o que outras pessoas acharam deste espaço
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {reviews.map((review) => (
            <CarouselItem key={review.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <ReviewCard review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-white border-brand-purple/20 text-brand-purple hover:bg-brand-purple hover:text-white transition-colors duration-300" />
        <CarouselNext className="bg-white border-brand-purple/20 text-brand-purple hover:bg-brand-purple hover:text-white transition-colors duration-300" />
      </Carousel>
    </div>
  );
};