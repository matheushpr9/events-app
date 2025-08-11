import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getAmenityIcon from "@/pages/helpers/get-amenty-icon";

export const SpaceAmenities = ({ amenities }: { amenities: string[] }) => {
  return (
    <Card className="border-0 shadow-md bg-white rounded-2xl">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl md:text-3xl font-bold text-[#4e2780]">
          Comodidades Disponíveis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="group flex items-center gap-3 p-4 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-xl hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              <div className="p-2 bg-white rounded-full group-hover:bg-[#4e2780] group-hover:text-white transition-colors duration-300">
                {getAmenityIcon(amenity)}
              </div>
              <span className="font-medium text-[#4e2780] group-hover:text-[#3a1e5a] transition-colors duration-300">
                {amenity}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
