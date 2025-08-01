import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { getRating } from '../helpers/get-ratings';
import  { useEffect, useRef, useState } from 'react';
import { Review, ReviewCarouselProps } from '@/interfaces/review';

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
          "{review.review}"
        </p>

        <div className="border-t border-gray-100 pt-4">
          <p className="font-semibold text-brand-purple text-lg">
            {review.name}
          </p>
          <p className="text-sm text-gray-500">
            {review.createdAt ? new Date(review.createdAt).toLocaleDateString('pt-BR') : ''}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export const ReviewCarousel = ({ spaceId }: ReviewCarouselProps) => {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [embla, setEmbla] = useState<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      embla?.scrollNext();
    }, 2800);
  };

  const resetAutoplay = () => {
    startAutoplay();
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getRating(spaceId).then((data: Review[]) => {
      if (isMounted) {
        setReviews(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [spaceId]);

  useEffect(() => {
    if (!embla || !reviews || reviews.length === 0) return;
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [embla, reviews]);

  if (loading) {
    return (
      <Card className="border-0 shadow-brand bg-white rounded-2xl">
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">Carregando avaliações...</p>
        </CardContent>
      </Card>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <Card className="border-0 shadow-brand bg-white rounded-2xl">
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">Ainda não há avaliações para este espaço.</p>
        </CardContent>
      </Card>
    );
  }

  const handlePrev = () => {
    embla?.scrollPrev();
    resetAutoplay();
  };

  const handleNext = () => {
    embla?.scrollNext();
    resetAutoplay();
  };

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
        setApi={setEmbla}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {reviews.map((review) => (
            <CarouselItem key={review.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <ReviewCard review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="
            bg-white border-brand-purple/20 text-brand-purple
            hover:bg-brand-purple hover:text-white transition-colors duration-300
            w-8 h-8 md:w-10 md:h-10
            -left-3 md:-left-5
            top-1/2 -translate-y-1/2
            absolute z-10
          "
          onClick={handlePrev}
        />
        <CarouselNext
          className="
            bg-white border-brand-purple/20 text-brand-purple
            hover:bg-brand-purple hover:text-white transition-colors duration-300
            w-8 h-8 md:w-10 md:h-10
            -right-3 md:-right-5
            top-1/2 -translate-y-1/2
            absolute z-10
          "
          onClick={handleNext}
        />
      </Carousel>
    </div>
  );
};
