import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, StarIcon, CreditCard, Shield, Zap, Users, Calendar, ChevronRight, LoaderCircle } from 'lucide-react';
import Header from '../components/Header';
import { toast, ToastContainer } from 'react-toastify';
import { api, initSanctum } from '@/api/api';

interface Plan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  popular?: boolean;
  description: string;
  features: string[];
  stripePriceId: string;
}

const plans: Plan[] = [
  {
    id: 'monthly',
    name: 'Mensal',
    price: 119.90,
    period: 'mês',
    description: 'Assinatura mensal, flexibilidade total.',
    stripePriceId: 'price_1RtGLnKf1zEbOh7NrdTmChtJ',
    features: [
      'Acesso completo',
      'Suporte prioritário',
      'Cancelamento a qualquer momento'
    ]
  },
  {
    id: 'semiannual',
    name: 'Semestral',
    price: 99.90,
    period: 'mês',
    description: 'Economize assinando por 6 meses.',
    stripePriceId: 'price_1RtGNPKf1zEbOh7N0NkyjD6q',
    features: [
      'Acesso completo',
      'Suporte prioritário',
      'Economia garantida'
    ]
  },
  {
    id: 'annual',
    name: 'Anual',
    price: 67.90,
    originalPrice: 79.90,
    period: 'mês',
    popular: true,
    description: 'O melhor custo-benefício para o ano todo.',
    stripePriceId: 'price_1RtGOGKf1zEbOh7NKf129uqk',
    features: [
      'Acesso completo',
      'Suporte prioritário',
      'Economia máxima'
    ]
  }
];

export default function Checkout() {
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleCheckout = async () => {
    setIsProcessing(true);

    try {
      const plan = plans.find(p => p.id === selectedPlan);
      if (!plan) throw new Error('Plano não encontrado');

      toast.info("Redirecionando para o Stripe Checkout...");

      await initSanctum();

      const response = await api.post(
        '/api/stripe/checkout',
        { price_id: plan.stripePriceId }
      );

      const data = response.data;
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Erro ao criar sessão de checkout');
      }
    } catch (error) {
      toast.error("Erro ao iniciar o checkout. Tente novamente.");
      setIsProcessing(false);
    }
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  return (
    <div>
      <Header />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="min-h-screen bg-[#fff6f1] py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#4e2780] mb-4">
              Escolha seu Plano
            </h1>
            <p className="text-lg text-[#4e2780]/70 max-w-2xl mx-auto">
              Selecione o plano perfeito para seu espaço e comece a receber mais reservas hoje mesmo.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative cursor-pointer transition-all duration-300
                  ${selectedPlan === plan.id
                    ? 'ring-2 ring-[#4e2780] shadow-md scale-105'
                    : 'hover:scale-102 hover:shadow-md'
                  }
                  ${plan.popular ? 'border-[#4e2780]' : ''}
                  bg-white border-0 rounded-2xl
                `}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#4e2780] text-white px-4 py-1 rounded-full shadow-md">
                      <StarIcon className="w-3 h-3 mr-1" />
                      Mais Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-[#4e2780] mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="flex items-center justify-center gap-2">
                    {plan.originalPrice && (
                      <span className="text-sm text-[#4e2780]/50 line-through">
                        R$ {plan.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-[#4e2780]">
                        R$ {plan.price.toFixed(2)}
                      </span>
                      <span className="text-[#4e2780]/70 ml-1">/mês</span>
                    </div>
                  </div>
                  {/* Valor total para semestral e anual */}
                  {plan.id === 'semiannual' && (
                    <div className="text-xs text-[#4e2780]/70 mt-1">
                      Cobrado semestralmente
                    </div>
                  )}
                  {plan.id === 'annual' && (
                    <div className="text-xs text-[#4e2780]/70 mt-1">
                      Cobrado anualmente
                    </div>
                  )}
                  <CardDescription className="text-center mt-2 text-[#4e2780]/70">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckIcon className="w-4 h-4 text-[#4e2780] flex-shrink-0" />
                        <span className="text-sm text-[#4e2780]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                    className={`w-full mt-6 rounded-xl font-semibold transition-all duration-300
                      ${selectedPlan === plan.id
                        ? 'bg-[#4e2780] text-white hover:bg-[#3a1e5a]'
                        : 'border-2 border-[#4e2780] text-[#4e2780] hover:bg-[#4e2780] hover:text-white'
                      }`}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {selectedPlan === plan.id ? 'Selecionado' : 'Selecionar Plano'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Checkout Summary */}
          {selectedPlanData && (
            <Card className="max-w-md mx-auto border-[#4e2780]/20 bg-white border-0 rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#4e2780]">
                  <CreditCard className="w-5 h-5" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-lg">
                  <div>
                    <h3 className="font-semibold text-[#4e2780]">{selectedPlanData.name}</h3>
                    <p className="text-sm text-[#4e2780]/70">{selectedPlanData.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-[#4e2780]">
                      R$ {selectedPlanData.price.toFixed(2)}
                    </div>
                    <div className="text-sm text-[#4e2780]/70">
                      /{selectedPlanData.period}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-[#4e2780]">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {selectedPlanData.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impostos:</span>
                    <span>Inclusos</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>R$ {selectedPlanData.price.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full rounded-xl font-semibold bg-[#4e2780] text-white hover:bg-[#3a1e5a] transition-all duration-300"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      Finalizar Pagamento
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                {/* Security Badges */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-[#ede7f6]">
                  <div className="flex items-center gap-2 text-xs text-[#4e2780]/70">
                    <Shield className="w-4 h-4" />
                    <span>Pagamento Seguro</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#4e2780]/70">
                    <Zap className="w-4 h-4" />
                    <span>Ativação Imediata</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8 text-[#4e2780]">
              Por que escolher nossos planos?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ede7f6] to-[#4e6f3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-[#4e2780]" />
                </div>
                <h3 className="font-semibold mb-2 text-[#4e2780]">Mais Visibilidade</h3>
                <p className="text-sm text-[#4e2780]/70">
                  Seu espaço será visto por milhares de pessoas procurando o local perfeito para seus eventos.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-[#4e2780]" />
                </div>
                <h3 className="font-semibold mb-2 text-[#4e2780]">Gestão Fácil</h3>
                <p className="text-sm text-[#4e2780]/70">
                  Gerencie reservas, calendário e comunicação com clientes tudo em um só lugar.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-[#4e2780]" />
                </div>
                <h3 className="font-semibold mb-2 text-[#4e2780]">Suporte Premium</h3>
                <p className="text-sm text-[#4e2780]/70">
                  Nossa equipe está sempre pronta para ajudar você a maximizar seus resultados.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8 text-[#4e2780]">
              Perguntas Frequentes
            </h2>

            <div className="space-y-4">
              <Card className="bg-white border-0 rounded-2xl shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-[#4e2780]">Posso cancelar a qualquer momento?</h3>
                  <p className="text-sm text-[#4e2780]/70">
                    Sim, você pode cancelar sua assinatura a qualquer momento. Não há taxas de cancelamento.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 rounded-2xl shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-[#4e2780]">Como funciona o período de teste?</h3>
                  <p className="text-sm text-[#4e2780]/70">
                    Oferecemos 7 dias grátis para você testar todas as funcionalidades do plano escolhido.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 rounded-2xl shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-[#4e2780]">Posso mudar de plano depois?</h3>
                  <p className="text-sm text-[#4e2780]/70">
                    Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento pelo painel de controle.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
