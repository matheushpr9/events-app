import { SpaceRating } from "@/interfaces/space";

interface Rating {
  quantity: number;
  average: number;
}

export default function getRating(spaceRatings: SpaceRating[]): Rating {
  const total = spaceRatings.reduce((acc, rating) => acc + rating.rating, 0);
  const average = total / spaceRatings.length;

  return {
    quantity: spaceRatings.length,
    average
  };
}