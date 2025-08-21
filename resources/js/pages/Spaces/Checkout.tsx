import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    CheckIcon,
    StarIcon,
    CreditCard,
    Shield,
    Zap,
    Users,
    Calendar,
    ChevronRight,
    LoaderCircle,
    Settings,
    X
} from 'lucide-react';
import Header from '../components/Header';
import { toast, ToastContainer } from 'react-toastify';
import { api, initSanctum } from '@/api/api';
import { SubscriptionStatus } from '@/interfaces/user';
import getSubscriptionStatus from '../helpers/get-subscription-status';
import getSubscriptionPlan from '../helpers/get-subscription-plan';
import { Head } from '@inertiajs/react';
import Footer from '../components/Footer';

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
        price: 119.9,
        period: 'mês',
        description: 'Assinatura mensal, flexibilidade total.',
        stripePriceId: 'price_1RtGLnKf1zEbOh7NrdTmChtJ',
        features: ['Acesso completo', 'Suporte prioritário', 'Cancelamento a qualquer momento']
    },
    {
        id: 'semiannual',
        name: 'Semestral',
        price: 99.9,
        period: 'mês',
        description: 'Economize assinando por 6 meses.',
        stripePriceId: 'price_1RtGNPKf1zEbOh7N0NkyjD6q',
        features: ['Acesso completo', 'Suporte prioritário', 'Economia garantida']
    },
    {
        id: 'annual',
        name: 'Anual',
        price: 67.9,
        originalPrice: 79.9,
        period: 'mês',
        popular: true,
        description: 'O melhor custo-benefício para o ano todo.',
        stripePriceId: 'price_1RtGOGKf1zEbOh7NKf129uqk',
        features: ['Acesso completo', 'Suporte prioritário', 'Economia máxima']
    }
];

const formatBRL = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export default function Checkout() {
    const [selectedPlan, setSelectedPlan] = useState<string>('monthly');
    const [isProcessing, setIsProcessing] = useState(false);
    const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>({
        isActive: false,
        plan: null,
        createdAt: null,
        isLoading: true
    });
    const [showPlanChange, setShowPlanChange] = useState(false);

    useEffect(() => {
        getSubscriptionStatus()
            .then((data) => {
                setSubscriptionStatus({
                    isActive: data.isActive,
                    plan: data.planName,
                    createdAt: data.createdAt,
                    isLoading: false
                });
            })
            .catch(() => {
                setSubscriptionStatus({
                    isActive: false,
                    plan: null,
                    createdAt: null,
                    isLoading: false
                });
            });
    }, []);

    const selectedPlanData = useMemo(() => plans.find((p) => p.id === selectedPlan), [selectedPlan]);
    const currentPlan = useMemo(
        () => plans.find((p) => p.name === getSubscriptionPlan(subscriptionStatus?.plan || '')),
        [subscriptionStatus?.plan]
    );

    const isLoadingStatus = subscriptionStatus?.isLoading;

    const handleSelectPlan = (planId: string) => setSelectedPlan(planId);

    const handleCheckout = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        try {
            const plan = plans.find((p) => p.id === selectedPlan);
            if (!plan) throw new Error('Plano não encontrado');
            toast.info('Redirecionando para o Stripe Checkout...', { position: 'bottom-center' });
            await initSanctum();
            const response = await api.post('/api/stripe/checkout', { price_id: plan.stripePriceId });
            const data = response.data;
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('Erro ao criar sessão de checkout');
            }
        } catch (error) {
            toast.error('Erro ao iniciar o checkout. Tente novamente.', { position: 'bottom-center' });
            console.error('Checkout error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCancelSubscription = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        try {
            await initSanctum();
            await api.post('/api/stripe/cancel-subscription');
            toast.success('Assinatura cancelada com sucesso!', { position: 'bottom-center' });
            setSubscriptionStatus({
                isActive: false,
                plan: null,
                createdAt: null,
                isLoading: false
            });
            setShowPlanChange(false);
        } catch (error) {
            toast.error('Erro ao cancelar assinatura.', { position: 'bottom-center' });
            console.error('Cancel subscription error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const onPlanKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, planId: string, disabled?: boolean) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSelectPlan(planId);
        }
    };

    const Skeleton = ({ className = '' }: { className?: string }) => (
        <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
    );

    return (
        <>
            <Head title="Assinatura" />
            <Header />
            <div>

                <ToastContainer />
                <div className="min-h-screen bg-[#fff6f1] py-6 px-2 sm:px-4">
                    <div className="container mx-auto max-w-6xl">
                        {isLoadingStatus ? (
                            <div className="max-w-4xl mx-auto mb-10">
                                <Card className="bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] text-[#4e2780] border-0 rounded-2xl shadow-md">
                                    <CardHeader className="text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Skeleton className="w-6 h-6 rounded-full" />
                                            <Skeleton className="h-6 w-40" />
                                        </div>
                                        <Skeleton className="h-4 w-72 mx-auto" />
                                    </CardHeader>
                                    <CardContent className="text-center space-y-6">
                                        <div className="bg-white/80 rounded-xl p-6">
                                            <Skeleton className="h-8 w-32 mx-auto mb-2" />
                                            <Skeleton className="h-4 w-16 mx-auto" />
                                            <Skeleton className="h-3 w-40 mx-auto mt-2" />
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <Skeleton className="h-10 w-44" />
                                            <Skeleton className="h-10 w-56" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ) : (
                            subscriptionStatus?.isActive && (
                                <div className="max-w-4xl mx-auto mb-10">
                                    <Card className="bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] text-[#4e2780] border-0 rounded-2xl shadow-md">
                                        <CardHeader className="text-center">
                                            <div className="flex items-center justify-center gap-2 mb-2">
                                                <StarIcon className="w-6 h-6" aria-hidden />
                                                <CardTitle>Assinatura Ativa</CardTitle>
                                            </div>
                                            <CardDescription className="text-[#4e2780]/80 text-lg">
                                                Você está no plano{' '}
                                                <span className="font-bold">{getSubscriptionPlan(subscriptionStatus?.plan || '')}</span>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="text-center space-y-6">
                                            <div className="bg-white/80 rounded-xl p-6 backdrop-blur-sm">
                                                <div className="text-3xl font-bold mb-2 text-[#4e2780]">
                                                    {formatBRL(currentPlan?.price || 49.9)}
                                                </div>
                                                <div className="text-[#4e2780]/80">por mês</div>
                                                <div className="text-sm text-[#4e2780]/70 mt-2">
                                                    Ativo desde{' '}
                                                    {subscriptionStatus.createdAt
                                                        ? new Date(subscriptionStatus.createdAt).toLocaleDateString('pt-BR')
                                                        : 'N/A'}
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                {/* Gerenciar Plano - NOVAS CORES */}
                                                <Button
                                                    type="button"
                                                    className="bg-white border border-[#7c5ca3] text-[#4e2780] hover:bg-[#ede7f6] hover:border-[#4e2780] focus-visible:ring-2 focus-visible:ring-[#4e2780] disabled:opacity-60"
                                                    onClick={() => setShowPlanChange(!showPlanChange)}
                                                    disabled={isProcessing}
                                                >
                                                    <Settings className="w-4 h-4 mr-2" aria-hidden />
                                                    {showPlanChange ? 'Ocultar Opções' : 'Gerenciar Plano'}
                                                </Button>

                                                {/* Cancelar Assinatura - NOVAS CORES */}
                                                <Button
                                                    type="button"
                                                    className="bg-white border border-red-400 text-red-700 hover:bg-red-50 hover:border-red-500 focus-visible:ring-2 focus-visible:ring-red-600 disabled:opacity-60"
                                                    onClick={handleCancelSubscription}
                                                    disabled={isProcessing}
                                                >
                                                    {isProcessing ? (
                                                        <>
                                                            <LoaderCircle className="w-4 h-4 mr-2 animate-spin" aria-hidden />
                                                            Cancelando...
                                                        </>
                                                    ) : (
                                                        'Cancelar Assinatura'
                                                    )}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {showPlanChange && (
                                        <Card className="mt-6 border-[#4e2780]/20 bg-white border-0 rounded-2xl shadow-md">
                                            <CardHeader>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <CardTitle className="text-xl text-[#4e2780]">Alterar Plano</CardTitle>
                                                        <CardDescription className="text-[#4e2780]/70">
                                                            Compare e escolha uma nova opção para sua assinatura
                                                        </CardDescription>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => setShowPlanChange(false)}
                                                        className="hover:bg-[#ede7f6] focus-visible:ring-2 focus-visible:ring-[#4e2780]"
                                                        aria-label="Fechar opções de alteração de plano"
                                                    >
                                                        <X className="w-4 h-4" aria-hidden />
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div
                                                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                                                    role="radiogroup"
                                                    aria-label="Planos de assinatura"
                                                    onKeyDown={(e) => {
                                                        const idx = plans.findIndex(p => p.id === selectedPlan);
                                                        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                                                            e.preventDefault();
                                                            const next = (idx + 1) % plans.length;
                                                            setSelectedPlan(plans[next].id);
                                                        }
                                                        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                                                            e.preventDefault();
                                                            const prev = (idx - 1 + plans.length) % plans.length;
                                                            setSelectedPlan(plans[prev].id);
                                                        }
                                                    }}
                                                >
                                                    {plans.map((plan) => {
                                                        const isCurrentPlan = plan.name === getSubscriptionPlan(subscriptionStatus?.plan || '');
                                                        const currentPlanPrice = currentPlan?.price || 0;

                                                        const isUpgrade = !isCurrentPlan && plan.price < currentPlanPrice;
                                                        const isDowngrade = !isCurrentPlan && plan.price > currentPlanPrice;

                                                        const isSelected = selectedPlan === plan.id;
                                                        const selectable = !isCurrentPlan && !isProcessing;
                                                        const planDescId = `change-plan-desc-${plan.id}`;

                                                        return (
                                                            <div
                                                                key={plan.id}
                                                                role="radio"
                                                                aria-checked={isSelected}
                                                                aria-describedby={planDescId}
                                                                tabIndex={selectable ? 0 : -1}
                                                                onKeyDown={(e) => onPlanKeyDown(e, plan.id, !selectable)}
                                                                className={[
                                                                    'p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer',
                                                                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4e2780]',
                                                                    'motion-safe:hover:scale-[1.01] motion-reduce:transition-none',
                                                                    isCurrentPlan
                                                                        ? 'border-[#4e2780] bg-[#ede7f6]'
                                                                        : isSelected
                                                                            ? 'border-[#4e2780] bg-[#ede7f6]'
                                                                            : 'border-[#ede7f6] hover:border-[#4e2780]/50',
                                                                    isProcessing ? 'opacity-70 pointer-events-none' : ''
                                                                ].join(' ')}
                                                                onClick={() => selectable && handleSelectPlan(plan.id)}
                                                                aria-label={`Selecionar plano ${plan.name}`}
                                                            >
                                                                <div className="text-center">
                                                                    <div className="flex items-center justify-center gap-2 mb-2">
                                                                        <h3 className="font-bold text-[#4e2780]">{plan.name}</h3>
                                                                        {isCurrentPlan && (
                                                                            <Badge className="bg-[#4e2780] text-white text-xs">Atual</Badge>
                                                                        )}
                                                                        {isUpgrade && (
                                                                            <Badge className="bg-green-600 text-white text-xs">Upgrade</Badge>
                                                                        )}
                                                                        {isDowngrade && (
                                                                            <Badge className="bg-orange-600 text-white text-xs">Downgrade</Badge>
                                                                        )}
                                                                    </div>
                                                                    <div className="text-2xl font-bold text-[#4e2780] mb-1">
                                                                        {formatBRL(plan.price)}
                                                                    </div>
                                                                    <div className="text-sm text-[#4e2780]/70 mb-3">/mês</div>
                                                                    <p id={planDescId} className="text-sm text-[#4e2780]/70 mb-4">
                                                                        {plan.description}
                                                                    </p>

                                                                    {isCurrentPlan && (
                                                                        <Button
                                                                            type="button"
                                                                            disabled
                                                                            aria-current="true"
                                                                            className={[
                                                                                'w-full text-sm rounded-xl',
                                                                                'bg-gradient-to-r from-[#ede7f6] to-[#f4e6f3]',
                                                                                'text-[#4e2780] border border-transparent',
                                                                                'shadow-inner cursor-default',
                                                                                'focus-visible:outline-none'
                                                                            ].join(' ')}
                                                                        >
                                                                            <span className="flex items-center justify-center gap-2">
                                                                                <CheckIcon className="w-4 h-4 text-[#4e2780]" aria-hidden />
                                                                                Plano atual
                                                                            </span>
                                                                        </Button>
                                                                    )}

                                                                    {!isCurrentPlan && isSelected && (
                                                                        <Button
                                                                            onClick={handleCheckout}
                                                                            disabled={isProcessing}
                                                                            className="w-full text-sm bg-[#4e2780] text-white hover:bg-[#3a1e5a] rounded-xl focus-visible:ring-2 focus-visible:ring-[#4e2780]"
                                                                        >
                                                                            {isProcessing ? (
                                                                                <>
                                                                                    <LoaderCircle className="w-4 h-4 mr-2 animate-spin" aria-hidden />
                                                                                    Processando...
                                                                                </>
                                                                            ) : (
                                                                                `Alterar para ${plan.name}`
                                                                            )}
                                                                        </Button>
                                                                    )}

                                                                    {!isCurrentPlan && !isSelected && (
                                                                        <Button
                                                                            type="button"
                                                                            onClick={() => !isProcessing && handleSelectPlan(plan.id)}
                                                                            disabled={isProcessing}
                                                                            className={[
                                                                                'w-full text-sm rounded-xl font-semibold transition-all duration-300',
                                                                                'border border-[#7c5ca3] text-[#4e2780] bg-white',
                                                                                'hover:bg-[#ede7f6] hover:border-[#4e2780] hover:shadow-md',
                                                                                'active:scale-[0.99]',
                                                                                'focus-visible:ring-2 focus-visible:ring-[#4e2780] focus-visible:outline-none',
                                                                                'disabled:opacity-60 disabled:cursor-not-allowed'
                                                                            ].join(' ')}
                                                                            aria-label="Selecionar plano"
                                                                        >

                                                                            <span className="flex items-center justify-center gap-2">
                                                                                Selecionar
                                                                                <ChevronRight className="w-4 h-4" aria-hidden />
                                                                            </span>
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                {selectedPlan && selectedPlan !== currentPlan?.id && (
                                                    <div className="bg-[#ede7f6] rounded-lg p-4 text-center" aria-live="polite">
                                                        <p className="text-sm text-[#4e2780]/70 mb-2">
                                                            Alteração selecionada:{' '}
                                                            <span className="font-semibold text-[#4e2780]">{selectedPlanData?.name}</span>
                                                        </p>
                                                        <p className="text-xs text-[#4e2780]/70">
                                                            A alteração será efetivada imediatamente e você será cobrado proporcionalmente.
                                                        </p>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            )
                        )}

                        {!isLoadingStatus && !subscriptionStatus?.isActive && (
                            <>
                                <div className="text-center mb-10">
                                    <h1 className="text-2xl sm:text-4xl font-bold text-[#4e2780] mb-4">Escolha seu Plano</h1>
                                    <p className="text-base sm:text-lg text-[#4e2780]/70 max-w-2xl mx-auto">
                                        Selecione o plano perfeito para seu espaço e comece a receber mais reservas hoje mesmo.
                                    </p>
                                </div>
                                <div
                                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
                                    role="radiogroup"
                                    aria-label="Planos de assinatura"
                                    onKeyDown={(e) => {
                                        const idx = plans.findIndex(p => p.id === selectedPlan);
                                        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                                            e.preventDefault();
                                            const next = (idx + 1) % plans.length;
                                            setSelectedPlan(plans[next].id);
                                        }
                                        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                                            e.preventDefault();
                                            const prev = (idx - 1 + plans.length) % plans.length;
                                            setSelectedPlan(plans[prev].id);
                                        }
                                    }}
                                >
                                    {plans.map((plan) => {
                                        const isSelected = selectedPlan === plan.id;
                                        const planDescId = `plan-desc-${plan.id}`;
                                        return (
                                            <Card
                                                key={plan.id}
                                                role="radio"
                                                aria-checked={isSelected}
                                                aria-describedby={planDescId}
                                                tabIndex={0}
                                                onKeyDown={(e) => onPlanKeyDown(e, plan.id)}
                                                className={[
                                                    'relative transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4e2780]',
                                                    'motion-safe:hover:scale-[1.02] motion-reduce:transition-none',
                                                    isSelected ? 'ring-2 ring-[#4e2780] shadow-md motion-safe:scale-105' : 'hover:shadow-md',
                                                    plan.popular ? 'border-[#4e2780]' : '',
                                                    'bg-white border-0 rounded-2xl cursor-pointer'
                                                ].join(' ')}
                                                onClick={() => !isProcessing && handleSelectPlan(plan.id)}
                                                aria-label={`Selecionar plano ${plan.name}`}
                                            >
                                                {plan.popular && (
                                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                                        <Badge className="bg-[#4e2780] text-white px-4 py-1 rounded-full shadow-md">
                                                            <StarIcon className="w-3 h-3 mr-1" aria-hidden />
                                                            Mais Popular
                                                        </Badge>
                                                    </div>
                                                )}
                                                <CardHeader className="text-center pb-4">
                                                    <CardTitle className="text-2xl font-bold text-[#4e2780] mb-2">{plan.name}</CardTitle>
                                                    <div className="flex items-center justify-center gap-2">
                                                        {plan.originalPrice && (
                                                            <span className="text-sm text-[#4e2780]/50 line-through">
                                                                {formatBRL(plan.originalPrice)}
                                                            </span>
                                                        )}
                                                        <div className="flex items-baseline">
                                                            <span className="text-3xl font-bold text-[#4e2780]">{formatBRL(plan.price)}</span>
                                                            <span className="text-[#4e2780]/70 ml-1">/mês</span>
                                                        </div>
                                                    </div>
                                                    <CardDescription id={planDescId} className="text-center mt-2 text-[#4e2780]/70">
                                                        {plan.description}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <ul className="space-y-3">
                                                        {plan.features.map((feature, index) => (
                                                            <li key={index} className="flex items-center gap-3">
                                                                <CheckIcon className="w-4 h-4 text-[#4e2780] flex-shrink-0" aria-hidden />
                                                                <span className="text-sm text-[#4e2780]">{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <Button
                                                        variant={isSelected ? 'default' : 'outline'}
                                                        className={[
                                                            'w-full mt-6 rounded-xl font-semibold transition-all duration-300 cursor-pointer',
                                                            'focus-visible:ring-2 focus-visible:ring-[#4e2780]',
                                                            isSelected
                                                                ? 'bg-white border border-[#4e2780]/40 text-[#4e2780] hover:bg-[#ede7f6] hover:border-[#4e2780] hover:text-[#4e2780] shadow-sm'
                                                                : 'bg-[#4e2780] text-white hover:bg-[#3a1e5a]'
                                                        ].join(' ')}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (!isProcessing) handleSelectPlan(plan.id);
                                                        }}
                                                        disabled={isProcessing}
                                                        aria-label={isSelected ? 'Plano selecionado' : 'Selecionar plano'}
                                                    >
                                                        {isSelected ? 'Selecionado' : 'Selecionar Plano'}
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                                {selectedPlanData && (
                                    <Card className="max-w-md mx-auto border-[#4e2780]/20 bg-white border-0 rounded-2xl shadow-md">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-[#4e2780]">
                                                <CreditCard className="w-5 h-5" aria-hidden />
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
                                                    <div className="font-bold text-lg text-[#4e2780]">{formatBRL(selectedPlanData.price)}</div>
                                                    <div className="text-sm text-[#4e2780]/70">/{selectedPlanData.period}</div>
                                                </div>
                                            </div>
                                            <div className="space-y-2 text-sm text-[#4e2780]">
                                                <div className="flex justify-between">
                                                    <span>Subtotal:</span>
                                                    <span>{formatBRL(selectedPlanData.price)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Impostos:</span>
                                                    <span>Inclusos</span>
                                                </div>
                                                <hr />
                                                <div className="flex justify-between font-bold">
                                                    <span>Total:</span>
                                                    <span>{formatBRL(selectedPlanData.price)}</span>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={handleCheckout}
                                                disabled={isProcessing}
                                                className="w-full rounded-xl font-semibold bg-[#4e2780] text-white hover:bg-[#3a1e5a] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#4e2780]"
                                                size="lg"
                                                aria-label="Finalizar pagamento"
                                            >
                                                {isProcessing ? (
                                                    <>
                                                        <LoaderCircle className="w-4 h-4 mr-2 animate-spin" aria-hidden />
                                                        Processando...
                                                    </>
                                                ) : (
                                                    <>
                                                        Finalizar Pagamento
                                                        <ChevronRight className="w-4 h-4 ml-2" aria-hidden />
                                                    </>
                                                )}
                                            </Button>
                                            <div className="flex items-center justify-center gap-4 pt-4 border-t border-[#ede7f6]">
                                                <div className="flex items-center gap-2 text-xs text-[#4e2780]/70">
                                                    <Shield className="w-4 h-4" aria-hidden />
                                                    <span>Pagamento Seguro</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-[#4e2780]/70">
                                                    <Zap className="w-4 h-4" aria-hidden />
                                                    <span>Ativação Imediata</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {!subscriptionStatus?.isActive && selectedPlanData && (
                                    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#ede7f6] px-4 py-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-[#4e2780]/70">Plano selecionado</p>
                                                <p className="font-semibold text-[#4e2780]">
                                                    {selectedPlanData.name} • {formatBRL(selectedPlanData.price)}/mês
                                                </p>
                                            </div>
                                            <Button
                                                onClick={handleCheckout}
                                                disabled={isProcessing}
                                                className="rounded-lg font-semibold bg-[#4e2780] text-white hover:bg-[#3a1e5a] disabled:opacity-50"
                                                aria-label="Finalizar pagamento"
                                            >
                                                {isProcessing ? 'Processando...' : 'Pagar'}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        <div className="mt-16">
                            <h2 className="text-2xl font-bold text-center mb-8 text-[#4e2780]">Por que escolher nossos planos?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Users className="w-6 h-6 text-[#4e2780]" aria-hidden />
                                    </div>
                                    <h3 className="font-semibold mb-2 text-[#4e2780]">Mais Visibilidade</h3>
                                    <p className="text-sm text-[#4e2780]/70">
                                        Seu espaço será visto por milhares de pessoas procurando o local perfeito para seus eventos.
                                    </p>
                                </div>
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Calendar className="w-6 h-6 text-[#4e2780]" aria-hidden />
                                    </div>
                                    <h3 className="font-semibold mb-2 text-[#4e2780]">Gestão Fácil</h3>
                                    <p className="text-sm text-[#4e2780]/70">
                                        Gerencie reservas, calendário e comunicação com clientes tudo em um só lugar.
                                    </p>
                                </div>
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Zap className="w-6 h-6 text-[#4e2780]" aria-hidden />
                                    </div>
                                    <h3 className="font-semibold mb-2 text-[#4e2780]">Suporte Premium</h3>
                                    <p className="text-sm text-[#4e2780]/70">
                                        Nossa equipe está sempre pronta para ajudar você a maximizar seus resultados.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 max-w-2xl mx-auto">
                            <h2 className="text-2xl font-bold text-center mb-8 text-[#4e2780]">Perguntas Frequentes</h2>
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
            <Footer />
        </>
    );
}
