
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Star, Wifi, Car, Utensils } from 'lucide-react';

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

interface SpaceCardProps {
  space: Space;
}

const SpaceCard = ({ space }: SpaceCardProps) => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
      case 'wi-fi':
        return <Wifi className="h-3 w-3" />;
      case 'estacionamento':
        return <Car className="h-3 w-3" />;
      case 'cozinha':
      case 'catering':
        return <Utensils className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video bg-muted relative overflow-hidden">
        <img
          src={space.image}
          alt={space.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-background/90 text-foreground">
          {space.type}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1">{space.name}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {space.location}
            </div>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{space.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({space.reviewCount})</span>
          </div>
        </div>
        <CardDescription className="line-clamp-2">
          {space.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            Até {space.capacity} pessoas
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-foreground">
              R$ {space.pricePerHour}
            </div>
            <div className="text-xs text-muted-foreground">por hora</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {space.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs flex items-center gap-1">
              {getAmenityIcon(amenity)}
              {amenity}
            </Badge>
          ))}
          {space.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{space.amenities.length - 3}
            </Badge>
          )}
        </div>

        <Button className="w-full">Ver Detalhes</Button>
      </CardContent>
    </Card>
  );
};

export default SpaceCard;
