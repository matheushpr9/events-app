import { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, MapPin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TermsConsentModal from '../components/TermsConsentModal';
import SearchSection from '../components/SearchSection';
import SpaceCard from '../components/SpaceCard';
import { api, initSanctum } from '@/api/api';
import { Space } from '../../interfaces/space';
import { AuthenticatedUser, SubscriptionStatus } from '@/interfaces/user';
import getSubscriptionStatus from '../helpers/get-subscription-status';
import { toast } from 'react-toastify';
import userHasSpaces from '../helpers/user-has-spaces';
import getUserInfo from '../helpers/get-user-info';
import { Head } from '@inertiajs/react';
import { SearchFilters } from '../../interfaces/search-filters';
import BannerAlert from '../components/BannerAlert';

type PaginatedSpaces = {
    current_page: number;
    data: Space[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};


const Index = () => {
    const [spaces, setSpaces] = useState<PaginatedSpaces | null>(null);
    const [loading, setLoading] = useState(true);
    const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<SearchFilters | null>(null);

    // Busca status da assinatura
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

    // Busca espaços (com ou sem filtro)
    const fetchSpaces = useCallback(async (page = 1, filtersArg: SearchFilters | null = null) => {
        setLoading(true);
        try {
            await initSanctum();
            let response;
            if (filtersArg && Object.values(filtersArg).some(v => v && (Array.isArray(v) ? v.length > 0 : true))) {
                // Tem filtro
                const params = new URLSearchParams();
                if (filtersArg.city) params.append('city', filtersArg.city);
                if (filtersArg.type) params.append('type', filtersArg.type);
                if (filtersArg.amenities && filtersArg.amenities.length > 0) params.append('amenities', filtersArg.amenities.join(','));
                if (filtersArg.services && filtersArg.services.length > 0) params.append('services', filtersArg.services.join(','));
                if (filtersArg.locality) params.append('locality', filtersArg.locality);
                if (filtersArg.state) params.append('state', filtersArg.state);
                if (filtersArg.capacity) params.append('people_capacity', filtersArg.capacity);
                if (filtersArg.sort_by) params.append('sort_by', filtersArg.sort_by);
                params.append('page', String(page));
                response = await api.get(`/api/spaces/filter?${params.toString()}`);
            } else {
                // Sem filtro
                response = await api.get(`/api/spaces?page=${page}`);
            }
            setSpaces(response.data);
        } catch (error) {
            console.error('Erro ao buscar espaços:', error);
            setSpaces(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // Busca inicial
    useEffect(() => {
        fetchSpaces(1, null);
    }, [fetchSpaces]);

    // Quando mudar página OU filtros, busca novamente
    useEffect(() => {
        fetchSpaces(currentPage, filters);
    }, [currentPage, filters, fetchSpaces]);

    // Toast de assinatura inativa
    useEffect(() => {
        if (subscriptionStatus === null) return;
        getUserInfo().then((authenticatedUser: AuthenticatedUser) => {
            userHasSpaces(authenticatedUser.user.id).then((hasSpaces) => {
                if (subscriptionStatus && !subscriptionStatus.isActive && hasSpaces) {
                    toast.warn(
                        <div
                            role="alert"
                            className="flex items-start gap-3"
                        >
                            <div className="mt-0.5">
                                <AlertTriangle className="w-5 h-5 text-orange-600" aria-hidden="true" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-[#3a1e5a] mb-1">
                                    Assinatura inativa
                                </p>
                                <p className="text-[#3a1e5a]/80 text-sm">
                                    Você possui espaços disponíveis, mas sua assinatura está inativa. Ative sua assinatura para gerenciar e exibir seus espaços.
                                </p>
                                <div className="mt-3 flex gap-2">
                                    <button
                                        onClick={() => (window.location.href = '/checkout')}
                                        className="inline-flex items-center justify-center rounded-md bg-[#4e2780] px-3 py-2 text-sm font-semibold text-white shadow hover:bg-[#3a1e5a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b39ddb]"
                                        autoFocus
                                    >
                                        Ativar Assinatura
                                    </button>
                                    <button
                                        onClick={() => toast.dismiss()}
                                        className="inline-flex items-center justify-center rounded-md border border-[#eab308]/40 bg-white px-3 py-2 text-sm font-semibold text-[#4e2780] hover:bg-[#fff7e6]"
                                    >
                                        Agora não
                                    </button>
                                </div>
                            </div>
                        </div>,
                        {
                            position: 'top-right',
                            autoClose: 12000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: false,
                            theme: 'light',
                            className: 'border-l-4 border-l-amber-500 bg-[#fff8e1]',
                            progressClassName: 'bg-amber-500',
                            icon: false,
                        }
                    );
                }
            });
        });
    }, [subscriptionStatus]);

    // Handler para busca do SearchSection
    const handleSearch = (filtersArg: SearchFilters) => {
        setCurrentPage(1);
        setFilters(filtersArg);
    };

    // Handler para "Ver todos os espaços"
    const handleShowAll = () => {
        setCurrentPage(1);
        setFilters(null);
    };
    const [showLoginBanner, setShowLoginBanner] = useState(false);
    const [showPhoneBanner, setShowPhoneBanner] = useState(false);
    const [showEmailBanner, setShowEmailBanner] = useState(false);

    useEffect(() => {
        getUserInfo().then((authenticatedUser: AuthenticatedUser) => {
            if (!authenticatedUser.authenticated) {
                setShowLoginBanner(true);
            } else {
                setShowLoginBanner(false);
                setShowPhoneBanner(authenticatedUser.user.phone_number === "");
                setShowEmailBanner(authenticatedUser.user.email_verified_at === null);
            }
        });
    }, [subscriptionStatus]);

    return (
        <>
            <Head title="Home" />
            <Header />
            <div className="min-h-screen bg-[#fff6f1] flex flex-col">
                <TermsConsentModal />
                {/* Banners de alerta */}
                {showLoginBanner && (
                    <BannerAlert
                        type="info"
                        message="Cadastre seu espaço!"
                        description="Faça login e aproveite todos os benefícios."
                        actionLabel="Entrar ou Cadastrar"
                        onAction={() => window.location.href = '/login'}
                    />
                )}
                {showPhoneBanner && (
                    <BannerAlert
                        type="warning"
                        message="Seu perfil está sem número de telefone."
                        description="Adicione agora para não perder contatos de clientes interessados nos seus espaços."
                        actionLabel="Adicionar número"
                        onAction={() => window.location.href = '/profile'}
                    />
                )}
                {showEmailBanner && (
                    <BannerAlert
                        type="error"
                        message="Seu e-mail ainda não foi verificado!"
                        description="Por favor, verifique seu e-mail para aproveitar todas as nossas funcionalidades!"
                        actionLabel="Verificar e-mail"
                        onAction={() => window.location.href = '/verify-email'}
                    />
                )}
                <main className="flex-1">
                    <SearchSection
                        onSearch={handleSearch}
                        loading={loading}
                    />
                    <section className="py-8 sm:py-12 px-2 sm:px-4">
                        <div className="container mx-auto max-w-7xl">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-10 animate-fade-in">
                                <div>
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4e2780] mb-2 sm:mb-3">
                                        Espaços Disponíveis
                                    </h2>
                                    <p className="text-[#4e2780]/70 text-base sm:text-lg">
                                        {spaces?.total ?? 0} espaço{spaces?.total !== 1 && 's'} encontrado{spaces?.total !== 1 && 's'} para você
                                    </p>
                                </div>
                            </div>
                            {loading ? (
                                <div className="text-center py-16 text-[#4e2780]/60 text-lg">Carregando...</div>
                            ) : spaces && spaces.data.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-slide-up">
                                        {spaces.data.map((space) => (
                                            <SpaceCard key={space.id} space={space} />
                                        ))}
                                    </div>
                                    <div className="flex justify-center mt-8 gap-2 flex-wrap">
                                        <button
                                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                            disabled={spaces.current_page === 1}
                                            className="px-3 py-1 rounded bg-[#ede7f6] text-[#4e2780] font-semibold disabled:opacity-50"
                                        >
                                            Anterior
                                        </button>
                                        {[...Array(spaces.last_page)].map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentPage(idx + 1)}
                                                className={`px-3 py-1 rounded font-semibold ${spaces.current_page === idx + 1
                                                    ? 'bg-[#4e2780] text-white'
                                                    : 'bg-[#ede7f6] text-[#4e2780]'
                                                    }`}
                                            >
                                                {idx + 1}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, spaces.last_page))}
                                            disabled={spaces.current_page === spaces.last_page}
                                            className="px-3 py-1 rounded bg-[#ede7f6] text-[#4e2780] font-semibold disabled:opacity-50"
                                        >
                                            Próxima
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-16 animate-fade-in">
                                    <div className="max-w-md mx-auto">
                                        <div
                                            className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6"
                                            aria-hidden="true"
                                        >
                                            <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-[#4e2780]" />
                                        </div>
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#4e2780] mb-3 sm:mb-4">
                                            Nenhum espaço encontrado
                                        </h3>
                                        <p className="text-[#4e2780]/70 mb-5 sm:mb-6">
                                            Não encontramos espaços com os filtros aplicados. Tente ajustar sua busca ou explore outras opções.
                                        </p>
                                        <button
                                            onClick={handleShowAll}
                                            className="px-5 py-2.5 sm:px-6 sm:py-3 bg-[#4e2780] text-white rounded-xl font-semibold shadow-md hover:bg-[#3a1e5a] focus:outline-none focus:ring-2 focus:ring-[#b39ddb] focus:ring-offset-2 transition-all duration-300"
                                            aria-label="Ver todos os espaços"
                                        >
                                            Ver Todos os Espaços
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </main>

            </div>
            <Footer />
        </>
    );
};

export default Index;
