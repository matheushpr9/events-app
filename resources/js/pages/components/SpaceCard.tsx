import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Star } from 'lucide-react';
import {Space} from '../../interfaces/space'
import getAmenityIcon from '../helpers/get-amenty-icon';

interface SpaceCardProps {
  space: Space;
}

const SpaceCard = ({ space }: SpaceCardProps) => {

  return (
    <Card className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border-0 rounded-2xl focus-within:ring-2 focus-within:ring-[#b39ddb]">
      {/* Image Section */}
      <div className="aspect-[4/3] bg-[#f4e6f3] relative overflow-hidden">
        <img
          key={space.id}
          src={`/storage/${space.images[0].image_path}`}
          alt={space.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Type Badge */}
        <Badge className="absolute top-4 left-4 bg-white/90 text-[#4e2780] border-0 font-semibold shadow-sm">
          {space.type}
        </Badge>
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1.5 flex items-center gap-1 shadow-sm">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" aria-label="Nota" />
          <span className="text-sm font-semibold text-[#4e2780]">{space.rating}</span>
        </div>
      </div>

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-[#4e2780] mb-2 group-hover:text-[#7c5ca3] transition-colors">
              {space.name}
            </CardTitle>
            <div className="flex items-center text-[#4e2780]/60 mb-3">
              <MapPin className="h-4 w-4 mr-2" aria-hidden="true" />
              <span className="text-sm">{space.address.city}, {space.address.state} - {space.locality}</span>
            </div>
          </div>
        </div>
        
        <CardDescription className="text-[#4e2780]/70 line-clamp-2 leading-relaxed">
          {space.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Capacity and Price */}
        <div className="flex items-center justify-between mb-6 p-4 bg-[#f4e6f3] rounded-xl">
          <div className="flex items-center text-[#4e2780]">
            <Users className="h-4 w-4 mr-2" aria-hidden="true" />
            <span className="text-sm font-medium">Até {space.people_capacity} pessoas</span>
          </div>
          {/* <div className="text-right">
            <div className="text-2xl font-bold text-[#4e2780]">
              R$ {space.price_per_person_buffet}
            </div>
            <div className="text-xs text-[#4e2780]/60 font-medium">por hora</div>
          </div> */}
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-6">
          {space.amenities.slice(0, 3).map((amenity, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs bg-[#4e2780]/10 text-[#4e2780] border-0 font-medium px-3 py-1 flex items-center gap-1.5"
            >
              {getAmenityIcon(amenity)}
              {amenity}
            </Badge>
          ))}
          {space.amenities.length > 3 && (
            <Badge 
              variant="outline" 
              className="text-xs border-[#4e2780]/20 text-[#4e2780]/70 font-medium px-3 py-1"
            >
              +{space.amenities.length - 3} mais
            </Badge>
          )}
        </div>

        {/* Reviews */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(space.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} 
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-sm text-[#4e2780]/70 font-medium">
              ({space.reviews_count} avaliações)
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full bg-[#4e2780] bg-gradient-to-br from-[#4e2780] to-[#7c5ca3] text-white font-semibold h-12 rounded-xl hover:shadow-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#b39ddb]"
          aria-label={`Ver detalhes e reservar ${space.name}`}
        >
          Ver Detalhes e Reservar
        </Button>
      </CardContent>
    </Card>
  );
};

export default SpaceCard;