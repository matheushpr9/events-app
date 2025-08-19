import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { User } from '@/interfaces/space';

function formatPhone(phone: string = "") {
    const digits = phone.replace(/\D/g, "");
    if (digits.length === 11) {
        // Formato (99) 99999-9999
        return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    if (digits.length === 10) {
        // Formato (99) 9999-9999
        return digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    return phone;
}

export const SpaceContact = (user: User) => {
    const whatsappNumber = user.phone_number?.replace(/\D/g, '');
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    return (
        <Card className="border-0 shadow-md bg-white rounded-2xl">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg sm:text-2xl font-bold text-[#4e2780]">
                    Contato Rápido
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Dados de contato */}
                <div className="flex flex-col gap-3">
                    {/* Telefone */}
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-xl">
                        <Phone className="h-5 w-5 text-[#4e2780]" />
                        <span className="font-medium text-[#4e2780] text-base">{formatPhone(user.phone_number ?? undefined)}</span>
                    </div>
                    {/* E-mail */}
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-xl">
                        <Mail className="h-5 w-5 text-[#4e2780]" />
                        <span className="font-medium text-[#4e2780] text-base break-all">{user.email}</span>
                    </div>
                </div>

                {/* Botões de ação */}
                <div className="flex flex-col gap-3 mt-2">
                    {/* WhatsApp */}
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white font-semibold rounded-xl shadow-md hover:bg-[#1ebe57] transition-all duration-300"
                        aria-label="Conversar no WhatsApp"
                    >
                        <MessageCircle className="h-5 w-5" />
                        WhatsApp
                    </a>
                    {/* Ligar Agora */}
                    <a
                        href={`tel:${user.phone_number}`}
                        className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#4e2780] text-[#4e2780] font-semibold rounded-xl hover:bg-[#4e2780] hover:text-white transition-all duration-300"
                        aria-label="Ligar agora"
                    >
                        <Phone className="h-5 w-5" />
                        Ligar Agora
                    </a>
                    {/* E-mail */}
                    <a
                        href={`mailto:${user.email}`}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-[#4e2780] text-white font-semibold rounded-xl shadow-md hover:bg-[#3a1e5a] transition-all duration-300"
                        aria-label="Enviar e-mail"
                    >
                        <Mail className="h-5 w-5" />
                        Enviar E-mail
                    </a>
                </div>
            </CardContent>
        </Card>
    );
};
