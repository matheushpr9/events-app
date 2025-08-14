import { useState, useEffect } from 'react';
import { AlertTriangle, MapPin } from 'lucide-react';
import Header from '../components/Header';
import SearchSection from '../components/SearchSection';
import SpaceCard from '../components/SpaceCard';
import { api, initSanctum } from '@/api/api';
import { Space } from '../../interfaces/space';
import { AuthenticatedUser, SubscriptionStatus } from '@/interfaces/user';
import getSubscriptionStatus from '../helpers/get-subscription-status';
import { toast, ToastContainer } from 'react-toastify';
import userHasSpaces from '../helpers/user-has-spaces';
import getUserInfo from '../helpers/get-user-info';
import { Head } from '@inertiajs/react';

const Index = () => {
    const [spaces, setSpaces] = useState<Space[]>([]);
    const [filteredSpaces, setFilteredSpaces] = useState<Space[]>([]);
    const [loading, setLoading] = useState(true);
    const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);

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

    // Busca espaços
    useEffect(() => {
        const fetchSpaces = async () => {
            setLoading(true);
            try {
                await initSanctum();
                const response = await api.get<Space[]>('/api/spaces');
                setSpaces(response.data);
                setFilteredSpaces(response.data);
            } catch (error) {
                console.error('Erro ao buscar espaços:', error);
                setSpaces([]);
                setFilteredSpaces([]);
            } finally {
                setLoading(false);
            }
        };
        fetchSpaces();
    }, []);

    // Toast de assinatura inativa
    useEffect(() => {
        if (subscriptionStatus === null) return;
        getUserInfo().then((authenticatedUser: AuthenticatedUser) => {

            if (authenticatedUser.user.email_verified_at === null) {
                toast(
                    <div>
                        <span style={{ color: '#b91c1c', fontWeight: 600 }}>
                            Seu e-mail ainda não foi verificado!
                        </span>
                        <br />
                        <span style={{ color: '#b91c1c' }}>
                            Por favor, verifique seu e-mail para acessar todas as funcionalidades.
                        </span>
                        <br />
                        <button
                            onClick={() => window.location.href = '/verify-email'}
                            style={{
                                marginTop: 10,
                                background: '#b91c1c',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 6,
                                padding: '8px 16px',
                                cursor: 'pointer',
                            }}
                        >
                            Verificar E-mail
                        </button>
                    </div>,
                    {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    }
                );
                return;
            }
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
                            // Estilização do container do toast
                            className: 'border-l-4 border-l-amber-500 bg-[#fff8e1]',
                            progressClassName: 'bg-amber-500',
                            icon: false, // usamos nosso ícone customizado
                        }
                    );
                }
            });
        });
    }, [subscriptionStatus]);

    return (
        <div className="min-h-screen bg-[#fff6f1] flex flex-col">
            <Head title="Home" />
            <Header />
            <ToastContainer />
            <main className="flex-1">
                <SearchSection onResults={setFilteredSpaces} Spaces={spaces} />
                <section className="py-8 sm:py-12 px-2 sm:px-4">
                    <div className="container mx-auto max-w-7xl">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-10 animate-fade-in">
                            <div>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4e2780] mb-2 sm:mb-3">
                                    Espaços Disponíveis
                                </h2>
                                <p className="text-[#4e2780]/70 text-base sm:text-lg">
                                    {filteredSpaces.length} espaço{filteredSpaces.length !== 1 && 's'} encontrado{filteredSpaces.length !== 1 && 's'} para você
                                </p>
                            </div>
                        </div>
                        {loading ? (
                            <div className="text-center py-16 text-[#4e2780]/60 text-lg">Carregando...</div>
                        ) : filteredSpaces.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-slide-up">
                                {filteredSpaces.map((space) => (
                                    <SpaceCard key={space.id} space={space} />
                                ))}
                            </div>
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
                                        onClick={() => setFilteredSpaces(spaces)}
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
    );
};

export default Index;
