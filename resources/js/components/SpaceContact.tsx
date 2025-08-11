import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from '@/interfaces/space';

export const SpaceContact = (user: User) => {
  return (
    <Card className="border-0 shadow-md bg-white rounded-2xl">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl md:text-3xl font-bold text-[#4e2780]">
          Informações de Contato
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group flex items-center gap-4 p-6 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-xl hover:shadow-md transition-all duration-300">
            <div className="p-3 bg-white rounded-full group-hover:bg-[#4e2780] group-hover:text-white transition-colors duration-300">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <div className="font-semibold text-[#4e2780] text-lg">Telefone</div>
              <div className="text-[#4e2780]/70">{user.phone_number}</div>
            </div>
          </div>

          <div className="group flex items-center gap-4 p-6 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-xl hover:shadow-md transition-all duration-300">
            <div className="p-3 bg-white rounded-full group-hover:bg-[#4e2780] group-hover:text-white transition-colors duration-300">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <div className="font-semibold text-[#4e2780] text-lg">E-mail</div>
              <div className="text-[#4e2780]/70">{user.email}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="flex-1 px-4 py-3 bg-[#4e2780] text-white font-semibold rounded-xl shadow-md hover:bg-[#3a1e5a] focus:outline-none focus:ring-2 focus:ring-[#b39ddb] focus:ring-offset-2 transition-all duration-300 flex items-center justify-center"
            aria-label="Enviar mensagem"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Enviar Mensagem
          </button>
          <button
            className="flex-1 px-4 py-3 border-2 border-[#4e2780] text-[#4e2780] font-semibold rounded-xl hover:bg-[#4e2780] hover:text-white transition-all duration-300 flex items-center justify-center"
            aria-label="Ligar agora"
          >
            <Phone className="h-5 w-5 mr-2" />
            Ligar Agora
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
