import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { toast, ToastContainer } from 'react-toastify';
import { Edit, Trash2, Eye, Plus, MapPin, Users, Star, AlertTriangle, CreditCard } from 'lucide-react';
import Header from '../components/Header';
import getUserInfo from '../helpers/get-user-info';
import { AuthenticatedUser, SubscriptionStatus } from '@/interfaces/user';
import getSpacesByUserId from '../helpers/get-spaces-by-user-id';
import { Space } from '@/interfaces/space';
import { api, initSanctum } from '@/api/api';
import getSubscriptionStatus from '../helpers/get-subscription-status';
import { Switch } from '../components/ui/switch';
import userHasSpaces from '../helpers/user-has-spaces';
import activateSpace from '../helpers/activate-space';
import deactivateSpace from '../helpers/deactivate-space';

const MySpaces = () => {
    const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
    const [hasSpaces, setHasSpaces] = useState<boolean | null>(null);
    const [spaces, setSpaces] = useState<Space[]>([]);

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

    // Busca espaços do usuário
    useEffect(() => {
        getUserInfo().then((authenticatedUser: AuthenticatedUser) => {
            getSpacesByUserId(authenticatedUser.user.id).then((spaces: Space[]) => {
                setSpaces(spaces);
            });
        });
    }, []);

    // Verifica se o usuário tem espaços e assinatura ativa
    useEffect(() => {
        if (subscriptionStatus === null) return;
        getUserInfo().then((authenticatedUser: AuthenticatedUser) => {
            userHasSpaces(authenticatedUser.user.id).then((hasSpaces) => {
                if (!subscriptionStatus.isActive && hasSpaces) {
                    setHasSpaces(true);
                } else {
                    setHasSpaces(false);
                }
            });
        });
    }, [subscriptionStatus]);

    // Ativa/desativa espaço
    const handleToggleSpace = async (id: number, status: string) => {
        if (status === 'active') {
            await deactivateSpace(id);
            setSpaces(prevSpaces =>
                prevSpaces.map(space =>
                    space.id === id ? { ...space, status: 'inactive' } : space
                )
            );
            toast.info("Espaço desativado com sucesso!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
            });
        } else {
            await activateSpace(id);
            setSpaces(prevSpaces =>
                prevSpaces.map(space =>
                    space.id === id ? { ...space, status: 'active' } : space
                )
            );
            toast.info("Espaço ativado com sucesso!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
            });
        }
    };

    // Exclui espaço
    const handleDeleteSpace = async (spaceId: number) => {
        await initSanctum();
        api.delete(`/api/spaces/${spaceId}`).then(() => {
            toast.success('Espaço excluído com sucesso!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setSpaces(spaces.filter(space => space.id !== spaceId));
        });
    };

    // Edita espaço
    const handleEditSpace = (spaceId: number) => {
        location.href = `/edit-space/${spaceId}`;
    };

    // Visualiza espaço
    const handleViewSpace = (spaceId: number) => {
        location.href = `/space/details/${spaceId}`;
    };

    // Badge de status
    const getStatusBadge = (spaceStatus: string, subscriptionStatus: boolean | null) => {
        if (!subscriptionStatus) {
            return <Badge className="bg-yellow-100 text-yellow-700 border border-yellow-400">Pagamento Pendente</Badge>;
        }
        switch (spaceStatus) {
            case 'active':
                return <Badge className="bg-green-100 text-green-700">Ativo</Badge>;
            case 'inactive':
                return <Badge className="bg-[#ede7f6] text-[#4e2780]/70">Inativo</Badge>;
            default:
                return <Badge className="bg-[#ede7f6] text-[#4e2780]/70">{spaceStatus}</Badge>;
        }
    };

    return (
        <div className="min-h-screen bg-[#fff6f1]">
            <Header />
            <ToastContainer />

            <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#4e2780] mb-2">Meus Espaços</h1>
                        <p className="text-[#4e2780]/70 text-base">Gerencie todos os seus espaços cadastrados</p>
                    </div>
                    <Button
                        onClick={() => location.href = '/register-space'}
                        className="px-6 py-3 bg-[#4e2780] text-white font-semibold rounded-xl shadow-md hover:bg-[#3a1e5a] transition-all duration-300 w-full sm:w-auto"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Cadastrar Novo Espaço
                    </Button>
                </div>

                {/* Aviso de assinatura pendente */}
                {!subscriptionStatus?.isActive && hasSpaces && (
                    <Card className="mb-8 border-l-4 border-l-orange-500 bg-orange-50">
                        <CardContent className="p-6">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="p-2 bg-orange-100 rounded-full">
                                    <AlertTriangle className="h-6 w-6 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-orange-800 mb-2">
                                        Pagamento Pendente
                                    </h3>
                                    <p className="text-orange-700 mb-4">
                                        Seus espaços não estão sendo exibidos pois ainda não identificamos o pagamento da sua assinatura.
                                        Complete o pagamento para que seus espaços fiquem visíveis para os clientes.
                                    </p>
                                    <Button
                                        onClick={() => window.location.href = '/checkout'}
                                        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-lg"
                                    >
                                        <CreditCard className="h-4 w-4 mr-2" />
                                        Finalizar Pagamento
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Estatísticas rápidas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-white border-0 rounded-2xl shadow-md">
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-lg mr-4">
                                    <MapPin className="h-6 w-6 text-[#4e2780]" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#4e2780]/70">Total de Espaços</p>
                                    <p className="text-2xl font-bold text-[#4e2780]">{spaces.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-0 rounded-2xl shadow-md">
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-lg mr-4">
                                    <Star className="h-6 w-6 text-yellow-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#4e2780]/70">Avaliação Média</p>
                                    <p className="text-2xl font-bold text-[#4e2780]">
                                        {spaces.length > 0
                                            ? (
                                                spaces.reduce((acc, s) => acc + (s.ratings.length > 0 ? s.ratings.reduce((rAcc, r) => rAcc + r.rating, 0) / s.ratings.length : 0), 0) / spaces.length
                                            ).toFixed(1)
                                            : '0.0'
                                        }
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-0 rounded-2xl shadow-md">
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-lg mr-4">
                                    <Users className="h-6 w-6 text-[#4e2780]" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#4e2780]/70">Total Reviews</p>
                                    <p className="text-2xl font-bold text-[#4e2780]">
                                        {spaces.reduce((acc, s) => acc + s.ratings.length, 0)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Lista de espaços */}
                <Card className="bg-white border-0 rounded-2xl shadow-md overflow-x-auto">
                    <CardHeader>
                        <CardTitle className="text-[#4e2780]">Lista de Espaços</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Espaço</TableHead>
                                        <TableHead>Tipo</TableHead>
                                        <TableHead>Localização</TableHead>
                                        <TableHead>Capacidade</TableHead>
                                        <TableHead>Avaliação</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {spaces.map((space) => (
                                        <TableRow key={space.id}>
                                            <TableCell className="font-medium max-w-[160px] sm:max-w-[220px] whitespace-normal break-words align-top">
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        src={`storage/${space.images[0].image_path}`}
                                                        alt={space.name}
                                                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                                    />
                                                    <div className="min-w-0">
                                                        <p
                                                            className="font-semibold text-[#4e2780] text-sm sm:text-base whitespace-normal break-words leading-tight"
                                                            style={{
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: 'vertical',
                                                                overflow: 'hidden',
                                                            }}
                                                            title={space.name}
                                                        >
                                                            {space.name}
                                                        </p>
                                                        <p className="text-xs text-[#4e2780]/70 max-w-[120px] sm:max-w-[180px] truncate" title={space.description}>
                                                            {space.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-[#4e2780]/80 text-xs sm:text-sm whitespace-normal break-words max-w-[80px] sm:max-w-[120px]" title={space.type}>
                                                {space.type}
                                            </TableCell>
                                            <TableCell className="text-[#4e2780]/80 text-xs sm:text-sm whitespace-normal break-words max-w-[80px] sm:max-w-[120px]" title={space.locality}>
                                                {space.locality}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center text-[#4e2780]/80">
                                                    <Users className="h-4 w-4 mr-1" />
                                                    {space.people_capacity}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                                                    {(space.ratings.reduce((acc, r) => acc + r.rating, 0) / (space.ratings.length || 1)).toFixed(1)} ({space.ratings.length})
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {getStatusBadge(space.status, subscriptionStatus?.isActive ?? null)}
                                                    <div className="flex items-center gap-2">
                                                        <Switch
                                                            checked={space.status === 'active'}
                                                            onCheckedChange={() => handleToggleSpace(space.id, space.status)}
                                                            disabled={!subscriptionStatus?.isActive}
                                                        />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleViewSpace(space.id)}
                                                        className="text-[#4e2780] hover:text-white hover:bg-[#4e2780]/80"
                                                        aria-label="Visualizar espaço"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEditSpace(space.id)}
                                                        className="text-green-700 hover:text-white hover:bg-green-600"
                                                        aria-label="Editar espaço"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-red-600 hover:text-white hover:bg-red-600"
                                                                aria-label="Excluir espaço"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Tem certeza que deseja excluir o espaço "{space.name}"?
                                                                    Esta ação não pode ser desfeita.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDeleteSpace(space.id)}
                                                                    className="bg-red-600 hover:bg-red-700"
                                                                >
                                                                    Excluir
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Nenhum espaço cadastrado */}
                {spaces.length === 0 && (
                    <Card className="bg-white border-0 rounded-2xl shadow-md text-center py-12">
                        <CardContent>
                            <MapPin className="h-16 w-16 text-[#ede7f6] mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-[#4e2780] mb-2">
                                Nenhum espaço cadastrado
                            </h3>
                            <p className="text-[#4e2780]/70 mb-6">
                                Comece cadastrando seu primeiro espaço para eventos.
                            </p>
                            <Button
                                onClick={() => location.href = '/register-space'}
                                className="px-6 py-3 bg-[#4e2780] text-white font-semibold rounded-xl shadow-md hover:bg-[#3a1e5a] transition-all duration-300"
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Cadastrar Primeiro Espaço
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default MySpaces;
