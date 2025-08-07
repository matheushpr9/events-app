import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, CreditCard, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import Header from '../components/Header';
import { toast,ToastContainer } from 'react-toastify';

const Account = () => {

  // Mock user data - in real app this would come from authentication context
  const [userData] = useState({
    name: 'João Silva Santos',
    email: 'joao.silva@email.com',
    phone_number: '(11) 99999-9999'
  });

  // Mock subscription status - in real app this would come from payment API
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    isActive: false,
    planName: 'Premium',
    expiryDate: '2024-03-15',
    isLoading: false
  });

  const handleCheckoutRedirect = () => {
    // In real app, this would integrate with Stripe or payment provider
    toast.info("Redirecionando para o checkout...");

    // Mock redirect - replace with actual payment URL
    setTimeout(() => {
      window.open('/checkout', '_blank');
    }, 1000);
  };

  const refreshSubscriptionStatus = async () => {
    setSubscriptionStatus(prev => ({ ...prev, isLoading: true }));

    // Mock API call - replace with actual subscription check
    setTimeout(() => {
      setSubscriptionStatus(prev => ({
        ...prev,
        isLoading: false,
        isActive: Math.random() > 0.5 // Random for demo
      }));

      toast.info("Status da assinatura atualizado com sucesso!");
    }, 2000);
  };

  useEffect(() => {
    // Check subscription status on component mount
    refreshSubscriptionStatus();
  }, []);

  return (
    <div>
      <Header />
      <ToastContainer />

      {/* Main Account Section */}
      <div className="min-h-screen bg-background py-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gradient mb-2 drop-shadow">
              Minha Conta
            </h1>
            <p className="text-muted-foreground text-lg">
              Gerencie suas informações pessoais e assinatura.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <Card className="shadow-brand bg-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl text-primary font-bold">
                  <User className="w-5 h-5 text-primary" />
                  Informações Pessoais
                </CardTitle>
                <CardDescription>
                  Suas informações de cadastro no EventSpace
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-lg">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Nome completo</p>
                      <p className="text-base font-semibold text-foreground">{userData.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="text-base font-semibold text-foreground">{userData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-lg">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Telefone</p>
                      <p className="text-base font-semibold text-foreground">{userData.phone_number}</p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => toast.info("Redirecionando para editar informações...")}
                >
                  Editar Informações
                </Button>
              </CardContent>
            </Card>

            {/* Subscription Status */}
            <Card className="shadow-brand bg-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl text-primary font-bold">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Status da Assinatura
                </CardTitle>
                <CardDescription>
                  Informações sobre sua assinatura mensal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Status atual:</span>
                    <Badge
                      variant={subscriptionStatus.isActive ? "default" : "destructive"}
                      className="flex items-center gap-1"
                    >
                      {subscriptionStatus.isActive ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Ativa
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          Inativa
                        </>
                      )}
                    </Badge>
                  </div>

                  {/* Plan Information */}
                  <div className="p-4 bg-accent/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">Plano:</span>
                      <span className="text-base font-semibold text-foreground">{subscriptionStatus.planName}</span>
                    </div>

                    {subscriptionStatus.isActive ? (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Próxima cobrança:</span>
                        <span className="text-base font-semibold text-foreground">
                          {new Date(subscriptionStatus.expiryDate).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        Assine agora para ter acesso completo à plataforma
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={refreshSubscriptionStatus}
                      variant="outline"
                      className="w-full"
                      disabled={subscriptionStatus.isLoading}
                    >
                      {subscriptionStatus.isLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Verificando...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Atualizar Status
                        </>
                      )}
                    </Button>

                    {!subscriptionStatus.isActive && (
                      <Button
                        onClick={handleCheckoutRedirect}
                        className="w-full gradient-brand text-primary-foreground hover:opacity-90"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Assinar Agora
                      </Button>
                    )}

                    {subscriptionStatus.isActive && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => toast.info("Gerenciando assinatura...")}
                      >
                        Gerenciar Assinatura
                      </Button>
                    )}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    Problemas com pagamento? Entre em contato conosco pelo suporte.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Section */}
          <Card className="mt-8 shadow-brand bg-card">
            <CardHeader>
              <CardTitle className="text-center text-primary">
                Benefícios da Assinatura Premium
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Anúncios Ilimitados</h3>
                  <p className="text-sm text-muted-foreground">Cadastre quantos espaços quiser</p>
                </div>
                <div className="text-center p-4">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Destaque nos Resultados</h3>
                  <p className="text-sm text-muted-foreground">Seus espaços aparecem primeiro</p>
                </div>
                <div className="text-center p-4">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Suporte Prioritário</h3>
                  <p className="text-sm text-muted-foreground">Atendimento especializado</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;
