import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { User } from '@/interfaces/space';

export const SpaceContact = (user: User) => {
    return (
        <Card className="border-0 shadow-md bg-white rounded-2xl">
            <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4e2780]">
                    Informações de Contato
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Telefone */}
                    <div className="group flex items-center gap-4 p-4 sm:p-6 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-xl hover:shadow-md transition-all duration-300">
                        <div className="p-3 bg-white rounded-full group-hover:bg-[#4e2780] group-hover:text-white transition-colors duration-300" aria-hidden="true">
                            <Phone className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div>
                            <div className="font-semibold text-[#4e2780] text-base sm:text-lg">Telefone</div>
                            <div className="text-[#4e2780]/70 text-sm sm:text-base">{user.phone_number}</div>
                        </div>
                    </div>

                    {/* E-mail */}
                    <div className="group flex items-center gap-4 p-4 sm:p-6 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-xl hover:shadow-md transition-all duration-300">
                        <div className="p-3 bg-white rounded-full group-hover:bg-[#4e2780] group-hover:text-white transition-colors duration-300" aria-hidden="true">
                            <Mail className="h-6 w-6 text-[#4e2780] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div>
                            <div className="font-semibold text-[#4e2780] text-base sm:text-lg">E-mail</div>
                            <div className="text-[#4e2780]/70 text-sm sm:text-base">{user.email}</div>
                        </div>
                    </div>
                </div>

                {/* Botões de ação */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a
                        href={`mailto:${user.email}`}
                        className="flex-1 px-4 py-3 bg-[#4e2780] text-white font-semibold rounded-xl shadow-md hover:bg-[#3a1e5a] focus:outline-none focus:ring-2 focus:ring-[#b39ddb] focus:ring-offset-2 transition-all duration-300 flex items-center justify-center"
                        aria-label="Enviar mensagem por e-mail"
                    >
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Enviar Mensagem
                    </a>
                    <a
                        href={`tel:${user.phone_number}`}
                        className="flex-1 px-4 py-3 border-2 border-[#4e2780] text-[#4e2780] font-semibold rounded-xl hover:bg-[#4e2780] hover:text-white transition-all duration-300 flex items-center justify-center"
                        aria-label="Ligar agora"
                    >
                        <Phone className="h-5 w-5 mr-2" />
                        Ligar Agora
                    </a>
                </div>
            </CardContent>
        </Card>
    );
};
