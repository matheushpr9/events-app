import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { toast,ToastContainer } from 'react-toastify';
import { Edit, Trash2, Eye, Plus, MapPin, Users, Star } from 'lucide-react';
import Header from '../components/Header';
import getUserInfo from '../helpers/get-user-info';
import { AuthenticatedUser } from '@/interfaces/user';
import getSpacesByUserId from '../helpers/get-spaces-by-user-id';
import { Space } from '@/interfaces/space';
import { api, initSanctum } from '@/api/api';


const MySpaces = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);

   useEffect(() => {
    getUserInfo().then((authenticatedUser: AuthenticatedUser) => {
      getSpacesByUserId(authenticatedUser.user.id).then((spaces: Space[]) => {
        setSpaces(spaces);
      });
    });
  }, []);
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

  const handleEditSpace = (spaceId: number) => {
    location.href = `/edit-space/${spaceId}`;
  };

  const handleViewSpace = (spaceId: number) => {
    location.href = `/space/details/${spaceId}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Ativo</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inativo</Badge>;
      case 'pending payment':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Pagamento Pendente</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />
      <ToastContainer />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Espaços</h1>
            <p className="text-gray-600">Gerencie todos os seus espaços cadastrados</p>
          </div>
          <Button
            onClick={() => location.href = '/register-space'}
            className="gradient-brand text-white font-semibold px-6 py-3 rounded-xl hover:shadow-brand-lg transition-all duration-300"
          >
            <Plus className="h-5 w-5 mr-2" />
            Cadastrar Novo Espaço
          </Button>
        </div>

        {/* Estatísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg mr-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Espaços</p>
                  <p className="text-2xl font-bold text-gray-900">{spaces.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg mr-4">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Avaliação Média</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {spaces.reduce((acc, s) => acc + (s.ratings.length > 0 ? s.ratings.reduce((rAcc, r) => rAcc + r.rating, 0) / s.ratings.length : 0), 0).toFixed(1)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {spaces.reduce((acc, s) => acc + s.ratings.length, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de espaços */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Espaços</CardTitle>
          </CardHeader>
          <CardContent>
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
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <img
                          src={`storage/${space.images[0].image_path}`}
                          alt={space.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-semibold">{space.name}</p>
                          <p className="text-sm text-gray-500 max-w-xs truncate">
                            {space.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{space.type}</TableCell>
                    <TableCell>{space.locality}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                        {space.people_capacity}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                        {space.ratings.reduce((acc, r) => acc + r.rating, 0) / space.ratings.length || 0} ({space.ratings.length})
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(space.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewSpace(space.id)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditSpace(space.id)}
                          className="text-green-600 hover:text-green-800 hover:bg-green-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
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
          </CardContent>
        </Card>

        {spaces.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum espaço cadastrado
              </h3>
              <p className="text-gray-600 mb-6">
                Comece cadastrando seu primeiro espaço para eventos.
              </p>
              <Button
                onClick={() => location.href = '/register-space'}
                className="gradient-brand text-white font-semibold px-6 py-3 rounded-xl hover:shadow-brand-lg transition-all duration-300"
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
