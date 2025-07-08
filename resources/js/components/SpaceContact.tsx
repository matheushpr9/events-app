
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, Shield, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from '@/interfaces/space';



export const SpaceContact = (user: User) => {
  return (
    <Card className="border-0 shadow-brand bg-white rounded-2xl">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl md:text-3xl font-bold text-brand-purple">
          Informações de Contato
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group flex items-center gap-4 p-6 bg-gradient-brand-soft rounded-xl hover:shadow-brand transition-all duration-300">
            <div className="p-3 bg-white rounded-full group-hover:bg-brand-purple group-hover:text-white transition-colors duration-300">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <div className="font-semibold text-brand-purple text-lg">Telefone</div>
              <div className="text-brand-purple/70">{user.phone_number}</div>
            </div>
          </div>

          <div className="group flex items-center gap-4 p-6 bg-gradient-brand-soft rounded-xl hover:shadow-brand transition-all duration-300">
            <div className="p-3 bg-white rounded-full group-hover:bg-brand-purple group-hover:text-white transition-colors duration-300">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <div className="font-semibold text-brand-purple text-lg">E-mail</div>
              <div className="text-brand-purple/70">{user.email}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="flex-1 gradient-brand text-white font-semibold py-3 rounded-xl hover:shadow-brand-lg transition-all duration-300">
            <MessageCircle className="h-5 w-5 mr-2" />
            Enviar Mensagem
          </Button>
          <Button variant="outline" className="flex-1 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white font-semibold py-3 rounded-xl transition-all duration-300">
            <Phone className="h-5 w-5 mr-2" />
            Ligar Agora
          </Button>
        </div>

        <div className="p-6 bg-gradient-brand-soft rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white rounded-full">
              <Shield className="h-6 w-6 text-brand-purple" />
            </div>
            <span className="font-semibold text-brand-purple text-lg">Reserva Segura</span>
          </div>
          <p className="text-brand-purple/70 leading-relaxed">
            Todas as reservas são protegidas por nossa garantia. Você pode cancelar gratuitamente 
            até 24 horas antes do evento e receber reembolso total.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
