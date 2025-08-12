import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getServiceIcon from "@/pages/helpers/get-service-icon";



export const SpaceServices = ({ services }: { services: string[] }) => {
  return (
    <Card className="border-0 shadow-md bg-white rounded-2xl">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl md:text-3xl font-bold text-[#4e2780]">
          Serviços Disponíveis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group flex items-center gap-3 p-4 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-xl hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              <div className="p-2 bg-white rounded-full group-hover:bg-[#4e2780] group-hover:text-white transition-colors duration-300">
                {getServiceIcon(service)}
              </div>
              <span className="font-medium text-[#4e2780] group-hover:text-[#3a1e5a] transition-colors duration-300">
                {service}
              </span>
            </div>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
