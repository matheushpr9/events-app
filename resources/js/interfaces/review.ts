export interface Review {
    createdAt?: string;
    updatedAt?: string;
    review: string;
    id: string;
    name: string;
    email: string;
    spaceId: number;
    rating: number;
}

export interface ReviewCarouselProps {
  spaceId: number;
}
