import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getAmenityIcon from "@/pages/helpers/get-amenty-icon";

export const SpaceAmenities = ({ amenities }: { amenities: string[] }) => {
    return (
        <Card className="border-0 shadow-md bg-white rounded-2xl">
            <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4e2780]">
                    Comodidades Disponíveis
                </CardTitle>
            </CardHeader>
            <CardContent>
                {amenities.length === 0 ? (
                    <div className="text-[#4e2780]/60 text-center py-8">
                        Nenhuma comodidade cadastrada para este espaço.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {amenities.map((amenity, index) => (
                            <div
                                key={index}
                                className="group flex items-center gap-3 p-3 sm:p-4 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-xl hover:shadow-md transition-all duration-300 hover:scale-105"
                                tabIndex={0}
                                aria-label={amenity}
                                title={amenity}
                            >
                                <div
                                    className="p-2 bg-white rounded-full group-hover:bg-[#4e2780] group-hover:text-white transition-colors duration-300 flex-none"
                                    aria-hidden="true"
                                >
                                    {getAmenityIcon(amenity)}
                                </div>
                                <span
                                    className="
                                        font-medium text-[#4e2780] group-hover:text-[#3a1e5a]
                                        transition-colors duration-300 text-sm sm:text-base
                                        flex-1 min-w-0 overflow-hidden
                                        break-words [hyphens:auto]
                                        leading-snug line-clamp-2
                                    "
                                >
                                    {amenity}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
