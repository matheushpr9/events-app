import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, CreditCard, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import Header from '../components/Header';
import { toast, ToastContainer } from 'react-toastify';
import getUserInfo from '../helpers/get-user-info';
import { AuthenticatedUser, SubscriptionStatus } from '@/interfaces/user';
import getSubscriptionStatus from '../helpers/get-subscription-status';
import getSubscriptionPlan from '../helpers/get-subscription-plan';
import getNextPaymentDate from '../helpers/get-next-payment';

const Account = () => {

    const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
    useEffect(() => {
        getSubscriptionStatus()
            .then(data => {
                setSubscriptionStatus({
                    isActive: data.isActive,
                    plan: data.planName,
                    createdAt: data.createdAt,
                    isLoading: false
                });
            })
            .catch(error => {
                console.error("Erro ao buscar status da assinatura:", error);
                setSubscriptionStatus({
                    isActive: false,
                    plan: null,
                    createdAt: null,
                    isLoading: false
                });
            });
    }, []);
    const [userInfo, setUser] = useState<AuthenticatedUser | null>(null);
    useEffect(() => {
        getUserInfo()
            .then(setUser)
            .catch((error) => {
                console.error("Erro ao buscar informações do usuário:", error);
                setUser(null);
            });
    }, []);



    const handleCheckoutRedirect = () => {
        toast.info("Redirecionando para o checkout...");
        setTimeout(() => {
            window.open('/checkout', '_blank');
        }, 100);
    };

    const refreshSubscriptionStatus = async () => {
        getSubscriptionStatus()
            .then(data => {
                setSubscriptionStatus({
                    isActive: data.isActive,
                    plan: data.planName,
                    createdAt: data.createdAt,
                    isLoading: false
                });
            })
            .catch(error => {
                console.error("Erro ao buscar status da assinatura:", error);
                setSubscriptionStatus({
                    isActive: false,
                    plan: null,
                    createdAt: null,
                    isLoading: false
                });
            });

    };

    useEffect(() => {
        refreshSubscriptionStatus();
    }, []);

    return (
        <div>
            <Header />
            <ToastContainer />

            {/* Main Account Section */}
            <div className="min-h-screen bg-[#fff6f1] py-10 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-extrabold text-[#4e2780] mb-2 drop-shadow">
                            Minha Conta
                        </h1>
                        <p className="text-[#4e2780]/70 text-lg">
                            Gerencie suas informações pessoais e assinatura.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Personal Information */}
                        <Card className="shadow-md bg-white border-0 rounded-2xl">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-xl text-[#4e2780] font-bold">
                                    <User className="w-5 h-5 text-[#4e2780]" />
                                    Informações Pessoais
                                </CardTitle>
                                <CardDescription className="text-[#4e2780]/70">
                                    Suas informações de cadastro no EventSpace
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-lg">
                                        <User className="w-5 h-5 text-[#4e2780]" />
                                        <div>
                                            <p className="text-sm font-medium text-[#4e2780]/70">Nome completo</p>
                                            <p className="text-base font-semibold text-[#4e2780]">{userInfo?.user?.name}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-lg">
                                        <Mail className="w-5 h-5 text-[#4e2780]" />
                                        <div>
                                            <p className="text-sm font-medium text-[#4e2780]/70">Email</p>
                                            <p className="text-base font-semibold text-[#4e2780]">{userInfo?.user?.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-lg">
                                        <Phone className="w-5 h-5 text-[#4e2780]" />
                                        <div>
                                            <p className="text-sm font-medium text-[#4e2780]/70">Telefone</p>
                                            <p className="text-base font-semibold text-[#4e2780]">{userInfo?.user?.phone_number}</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="w-full px-4 py-2 border-2 border-[#4e2780] text-[#4e2780] font-semibold rounded-xl hover:bg-[#4e2780] hover:text-white transition-all duration-300"
                                    onClick={() => window.location.href = '/profile'}
                                >
                                    Editar Informações
                                </button>
                            </CardContent>
                        </Card>

                        {/* Subscription Status */}
                        <Card className="shadow-md bg-white border-0 rounded-2xl">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-xl text-[#4e2780] font-bold">
                                    <CreditCard className="w-5 h-5 text-[#4e2780]" />
                                    Status da Assinatura
                                </CardTitle>
                                <CardDescription className="text-[#4e2780]/70">
                                    Informações sobre sua assinatura mensal
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    {/* Status Badge */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-[#4e2780]/70">Status atual:</span>
                                        <span
                                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold
                        ${subscriptionStatus?.isActive
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {subscriptionStatus?.isActive ? (
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
                                        </span>
                                    </div>

                                    {/* Plan Information */}
                                    <div className="p-4 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-[#4e2780]/70">Plano:</span>
                                            <span className="text-base font-semibold text-[#4e2780]">{subscriptionStatus?.plan ? `Plano ${getSubscriptionPlan(subscriptionStatus?.plan)}` : '--'}</span>
                                        </div>

                                        {subscriptionStatus?.isActive ? (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-[#4e2780]/70">Próxima cobrança:</span>
                                                <span className="text-base font-semibold text-[#4e2780]">
                                                    {subscriptionStatus?.createdAt
                                                        ? getNextPaymentDate(subscriptionStatus?.plan, subscriptionStatus?.createdAt)
                                                        : '--'}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-[#4e2780]/70">
                                                Assine agora para ter acesso completo à plataforma
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => {
                                                refreshSubscriptionStatus().then(() => {
                                                    toast.info("Status da assinatura atualizado com sucesso!");
                                                });
                                            }}
                                            className="w-full px-4 py-2 border-2 border-[#4e2780] text-[#4e2780] font-semibold rounded-xl hover:bg-[#4e2780] hover:text-white transition-all duration-300 flex items-center justify-center"
                                            disabled={subscriptionStatus?.isLoading}
                                        >
                                            {subscriptionStatus?.isLoading ? (
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
                                        </button>

                                        {!(subscriptionStatus?.isActive) && (
                                            <button
                                                onClick={handleCheckoutRedirect}
                                                className="w-full px-4 py-2 bg-[#4e2780] text-white font-semibold rounded-xl shadow-md hover:bg-[#3a1e5a] transition-all duration-300 flex items-center justify-center"
                                            >
                                                <CreditCard className="w-4 h-4 mr-2" />
                                                Assinar Agora
                                            </button>
                                        )}

                                        {subscriptionStatus?.isActive && (
                                            <button
                                                className="w-full px-4 py-2 border-2 border-[#4e2780] text-[#4e2780] font-semibold rounded-xl hover:bg-[#4e2780] hover:text-white transition-all duration-300"
                                                onClick={handleCheckoutRedirect}
                                            >
                                                Gerenciar Assinatura
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="pt-4 border-t border-[#ede7f6]">
                                    <p className="text-xs text-[#4e2780]/70 text-center">
                                        Problemas com pagamento? Entre em contato conosco pelo suporte.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Benefits Section */}
                    <Card className="mt-8 shadow-md bg-white border-0 rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-center text-[#4e2780]">
                                Benefícios da Assinatura Premium
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center p-4">
                                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                    <h3 className="font-semibold text-[#4e2780]">Anúncios Ilimitados</h3>
                                    <p className="text-sm text-[#4e2780]/70">Cadastre quantos espaços quiser</p>
                                </div>
                                <div className="text-center p-4">
                                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                    <h3 className="font-semibold text-[#4e2780]">Destaque nos Resultados</h3>
                                    <p className="text-sm text-[#4e2780]/70">Seus espaços aparecem primeiro</p>
                                </div>
                                <div className="text-center p-4">
                                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                    <h3 className="font-semibold text-[#4e2780]">Suporte Prioritário</h3>
                                    <p className="text-sm text-[#4e2780]/70">Atendimento especializado</p>
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
