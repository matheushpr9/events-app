import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getServiceIcon from "@/pages/helpers/get-service-icon";

export const SpaceServices = ({ services }: { services: string[] }) => {
    return (
        <Card className="border-0 shadow-md bg-white rounded-2xl">
            <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4e2780]">
                    Serviços Disponíveis
                </CardTitle>
            </CardHeader>
            <CardContent>
                {services.length === 0 ? (
                    <div className="text-[#4e2780]/60 text-center py-8">
                        Nenhum serviço cadastrado para este espaço.
                    </div>
                ) : (
                    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {services.map((service, idx) => (
                            <li
                                key={idx}
                                className="group flex items-center gap-3 p-3 sm:p-4 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-xl hover:shadow-md transition-all duration-300 hover:scale-105"
                                tabIndex={0}
                                aria-label={service}
                            >
                                <div
                                    className="p-2 bg-white rounded-full group-hover:bg-[#4e2780] group-hover:text-white transition-colors duration-300"
                                    aria-hidden="true"
                                >
                                    {getServiceIcon(service)}
                                </div>
                                <span className="font-medium text-[#4e2780] group-hover:text-[#3a1e5a] transition-colors duration-300 text-sm sm:text-base">
                                    {service}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
};
