
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getAmenityIcon from "@/pages/helpers/get-amenty-icon";

export const SpaceAmenities = (amenities : string[]) => {
  return (
    <Card className="border-0 shadow-brand bg-white rounded-2xl">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl md:text-3xl font-bold text-brand-purple">
          Comodidades Disponíveis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {amenities.map((amenity, index) => (
            <div 
              key={index} 
              className="group flex items-center gap-3 p-4 bg-gradient-brand-soft rounded-xl hover:shadow-brand transition-all duration-300 hover:scale-105"
            >
              <div className="p-2 bg-white rounded-full group-hover:bg-brand-purple group-hover:text-white transition-colors duration-300">
                {getAmenityIcon(amenity)}
              </div>
              <span className="font-medium text-brand-purple group-hover:text-brand-purple-dark transition-colors duration-300">
                {amenity}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
