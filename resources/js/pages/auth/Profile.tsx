import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, LoaderCircle, User, Mail, Phone, Lock, Save } from 'lucide-react';
import Header from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import { AuthenticatedUser } from '@/interfaces/user';
import getUserInfo from '../helpers/get-user-info';
import { api, initSanctum } from '@/api/api';
import { Head } from '@inertiajs/react';


const Profile = () => {
    const [userInfo, setUser] = useState<AuthenticatedUser | null>(null);
    useEffect(() => {
        getUserInfo()
            .then(setUser)
            .catch((error) => {
                console.error("Erro ao buscar informações do usuário:", error);
                setUser(null);
            });
    }, []);
    const [passwordData, setPasswordData] = useState({
        current_password: '',
        password: '',
        password_confirmation: ''
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [showPasswordSection, setShowPasswordSection] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            initSanctum();
            const response = await api.put('/api/auth/user', {
                name: userInfo?.user.name,
                email: userInfo?.user.email,
                phone_number: userInfo?.user.phone_number
            });

            console.log("Informações do usuário atualizadas:", response.data);
            setUser(AuthenticatedUser => AuthenticatedUser ? { ...AuthenticatedUser, user: response.data } : AuthenticatedUser);
            toast.info("Informações atualizadas com sucesso!");
        } catch (error) {
            toast.error("Ocorreu um erro ao atualizar suas informações.");
        } finally {
            setProcessing(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setChangingPassword(true);
        setErrors({});

        if (passwordData.password !== passwordData.password_confirmation) {
            setErrors({ password_confirmation: 'As senhas não coincidem' });
            setChangingPassword(false);
            return;
        }

        try {
            initSanctum();
            await api.post('/api/auth/password', passwordData);

            toast.success("Senha alterada com sucesso!");

            setPasswordData({
                current_password: '',
                password: '',
                password_confirmation: ''
            });
            setShowPasswordSection(false);
        } catch (error) {
            toast.error("Ocorreu um erro ao alterar sua senha.");
        } finally {
            setChangingPassword(false);
        }
    };

    return (
        <div>
            <Head title="Meu Perfil" />
            <Header />
            <ToastContainer />
            <div className="min-h-screen bg-[#fff6f1] py-10 px-4">
                <div className="container mx-auto max-w-2xl">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#4e2780] to-[#7c5ca3] bg-clip-text text-transparent mb-2 drop-shadow">
                            Meu Perfil
                        </h1>
                        <p className="text-[#4e2780]/70 text-lg">
                            Atualize suas informações pessoais e configurações de segurança.
                        </p>
                    </div>

                    {/* Informações Pessoais */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-xl text-[#4e2780] font-bold">
                                    <User className="w-5 h-5 text-[#4e2780]" />
                                    Informações Pessoais
                                </CardTitle>
                                <CardDescription>
                                    Atualize seus dados pessoais
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-semibold text-[#4e2780]">Nome completo</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Digite seu nome completo"
                                            value={userInfo?.user?.name || ''}
                                            onChange={(e) => setUser(userInfo ? { ...userInfo, user: { ...userInfo.user, name: e.target.value } } : userInfo)}
                                            required
                                            className="bg-white text-gray-900 border border-[#b39ddb] placeholder:text-[#7c5ca3] focus:ring-2 focus:ring-[#b39ddb]"
                                        />
                                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-[#4e2780]">
                                                <Mail className="w-4 h-4" />
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="seu@email.com"
                                                value={userInfo?.user?.email || ''}
                                                onChange={(e) => setUser(userInfo ? { ...userInfo, user: { ...userInfo.user, email: e.target.value } } : userInfo)}
                                                required
                                                className="bg-white text-gray-900 border border-[#b39ddb] placeholder:text-[#7c5ca3] focus:ring-2 focus:ring-[#b39ddb]"
                                            />
                                            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone_number" className="flex items-center gap-2 text-sm font-semibold text-[#4e2780]">
                                                <Phone className="w-4 h-4" />
                                                Telefone
                                            </Label>
                                            <Input
                                                id="phone_number"
                                                type="tel"
                                                placeholder="(11) 99999-9999"
                                                value={userInfo?.user?.phone_number || ''}
                                                onChange={(e) => setUser(userInfo ? { ...userInfo, user: { ...userInfo.user, phone_number: e.target.value } } : userInfo)}
                                                required
                                                className="bg-white text-gray-900 border border-[#b39ddb] placeholder:text-[#7c5ca3] focus:ring-2 focus:ring-[#b39ddb]"
                                            />
                                            {errors.phone_number && <span className="text-red-500 text-sm">{errors.phone_number}</span>}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Submit Button for Profile */}
                        <Card className="border-0 shadow-xl bg-gradient-to-r from-[#4e2780] to-[#7c5ca3] text-white">
                            <CardContent className="pt-6">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-white text-[#4e2780] hover:bg-[#f4e6f3] h-14 text-lg font-bold shadow-lg transition-all duration-150 cursor-pointer"
                                >
                                    {processing ? (
                                        <>
                                            <LoaderCircle className="w-5 h-5 animate-spin mr-2" />
                                            Salvando...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5 mr-2" />
                                            Salvar Alterações
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </form>

                    {/* Alterar Senha */}
                    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md mt-8">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center justify-between text-xl text-[#4e2780] font-bold">
                                <div className="flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-[#7c5ca3]" />
                                    Alterar Senha
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowPasswordSection(!showPasswordSection)}
                                    className="border-[#4e2780] text-[#4e2780] hover:bg-[#4e2780] hover:text-white"
                                >
                                    {showPasswordSection ? 'Cancelar' : 'Alterar Senha'}
                                </Button>
                            </CardTitle>
                            <CardDescription>
                                Mantenha sua conta segura alterando sua senha regularmente
                            </CardDescription>
                        </CardHeader>

                        {showPasswordSection && (
                            <CardContent>
                                <form onSubmit={handlePasswordChange} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="current_password" className="text-sm font-semibold text-[#7c5ca3]">Senha atual</Label>
                                        <div className="relative">
                                            <Input
                                                id="current_password"
                                                type={showCurrentPassword ? 'text' : 'password'}
                                                placeholder="Digite sua senha atual"
                                                value={passwordData.current_password}
                                                onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                                                required
                                                className="bg-white text-[#4e2780] border border-[#b39ddb] placeholder:text-[#7c5ca3] focus:ring-2 focus:ring-[#b39ddb] pr-10"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-[#f4e6f3] cursor-pointer"
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                tabIndex={-1}
                                            >
                                                {showCurrentPassword ? (
                                                    <EyeOff className="h-4 w-4 text-[#7c5ca3]" />
                                                ) : (
                                                    <Eye className="h-4 w-4 text-[#7c5ca3]" />
                                                )}
                                            </Button>
                                        </div>
                                        {errors.current_password && <span className="text-red-500 text-sm">{errors.current_password}</span>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="new_password" className="text-sm font-semibold text-[#7c5ca3]">Nova senha</Label>
                                            <div className="relative">
                                                <Input
                                                    id="new_password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Digite uma nova senha"
                                                    value={passwordData.password}
                                                    onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })}
                                                    required
                                                    className="bg-white text-[#4e2780] border border-[#b39ddb] placeholder:text-[#7c5ca3] focus:ring-2 focus:ring-[#b39ddb] pr-10"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-[#f4e6f3] cursor-pointer"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    tabIndex={-1}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4 text-[#7c5ca3]" />
                                                    ) : (
                                                        <Eye className="h-4 w-4 text-[#7c5ca3]" />
                                                    )}
                                                </Button>
                                            </div>
                                            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password_confirmation" className="text-sm font-semibold text-[#7c5ca3]">Confirmar nova senha</Label>
                                            <div className="relative">
                                                <Input
                                                    id="password_confirmation"
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    placeholder="Confirme sua nova senha"
                                                    value={passwordData.password_confirmation}
                                                    onChange={(e) => setPasswordData({ ...passwordData, password_confirmation: e.target.value })}
                                                    required
                                                    className="bg-white text-[#4e2780] border border-[#b39ddb] placeholder:text-[#7c5ca3] focus:ring-2 focus:ring-[#b39ddb] pr-10"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-[#f4e6f3] cursor-pointer"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    tabIndex={-1}
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff className="h-4 w-4 text-[#7c5ca3]" />
                                                    ) : (
                                                        <Eye className="h-4 w-4 text-[#7c5ca3]" />
                                                    )}
                                                </Button>
                                            </div>
                                            {errors.password_confirmation && <span className="text-red-500 text-sm">{errors.password_confirmation}</span>}
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={changingPassword}
                                        className="w-full bg-[#4e2780] text-white hover:bg-[#3a1e5a] h-12 text-lg font-bold transition-all duration-150"
                                    >
                                        {changingPassword ? (
                                            <>
                                                <LoaderCircle className="w-5 h-5 animate-spin mr-2" />
                                                Alterando senha...
                                            </>
                                        ) : (
                                            <>
                                                <Lock className="w-5 h-5 mr-2" />
                                                Alterar Senha
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
