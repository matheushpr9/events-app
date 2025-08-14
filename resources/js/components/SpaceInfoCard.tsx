import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Space } from "@/interfaces/space";
import getRating from "@/pages/helpers/get-rating";
import { MapPin, Users, Clock, Star } from "lucide-react";

export const SpaceInfoCard = (space: Space) => {
    const rating = getRating(space.ratings);

    return (
        <section className="space-y-8">
            {/* Header */}
            <header className="space-y-6">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Badge className="bg-[#ede7f6] text-[#4e2780] border-0 font-semibold px-4 py-2 text-sm">
                        {space.type}
                    </Badge>
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-label="Nota média" />
                        <span className="font-semibold text-[#4e2780]">{rating.average}</span>
                        <span className="text-[#4e2780]/60 text-sm">({rating.quantity} avaliações)</span>
                    </div>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#4e2780] leading-tight animate-fade-in break-words">
                    {space.name}
                </h1>

                <div className="flex items-center text-[#4e2780]/70 mt-2">
                    <MapPin className="h-5 w-5 mr-2 flex-shrink-0" aria-hidden="true" />
                    <span className="text-base sm:text-lg">{space.address.city} - {space.address.country}</span>
                </div>

                <p className="text-[#4e2780]/80 text-base sm:text-lg leading-relaxed mt-2">
                    {space.description}
                </p>
            </header>

            {/* Key Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="border-0 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white rounded-full" aria-hidden="true">
                                <Users className="h-6 w-6 text-[#4e2780]" />
                            </div>
                            <div>
                                <div className="font-semibold text-[#4e2780] text-base sm:text-lg">Capacidade</div>
                                <div className="text-[#4e2780]/70 text-sm sm:text-base">Até {space.people_capacity} pessoas</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white rounded-full" aria-hidden="true">
                                <Clock className="h-6 w-6 text-[#4e2780]" />
                            </div>
                            <div>
                                <div className="font-semibold text-[#4e2780] text-base sm:text-lg">Disponibilidade</div>
                                <div className="text-[#4e2780]/70 text-sm sm:text-base">24 horas</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};
