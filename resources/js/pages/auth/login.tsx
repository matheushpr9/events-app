import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoogleLogo from '../components/google-logo';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleGoogleSignIn = () => {
        window.location.href = '/auth/google';
    };

    return (
        <>
            <Head title="Login" />
            <Header />
            <div className="min-h-screen bg-[#fff6f1]">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-md mx-auto bg-white/90 rounded-2xl shadow-lg p-8 backdrop-blur-md">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center space-x-2 mb-4">
                                {/* Seu logo aqui */}
                                <span className="text-2xl font-bold bg-gradient-to-r from-[#4e2780] to-[#7c5ca3] bg-clip-text text-transparent">
                                    EventSpace
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-[#4e2780] mb-2">Bem-vindo de volta</h1>
                            <p className="text-[#4e2780]/70">Entre com suas credenciais para acessar sua conta</p>
                        </div>

                        {/* Social Login primeiro */}
                        <div className="mb-6">
                            <Button
                                type="button"
                                onClick={handleGoogleSignIn}
                                aria-label="Entrar com Google"
                                title="Entrar com Google"
                                className="w-full h-12 bg-white text-[#4e2780] border border-[#ede7f6] hover:bg-[#faf6ff] hover:border-[#d7c8f1] rounded-xl font-semibold gap-3 justify-center shadow-sm"
                            >
                                <GoogleLogo />
                                Entrar com Google
                            </Button>

                            {/* Divisor OU */}
                            <div className="flex items-center my-6">
                                <span className="h-px bg-[#e9ddf8] flex-1" />
                                <span className="px-3 text-[#4e2780]/60 text-sm">ou</span>
                                <span className="h-px bg-[#e9ddf8] flex-1" />
                            </div>
                        </div>

                        {/* Status (ex: senha redefinida com sucesso) */}
                        {status && (
                            <div className="mb-4 text-center text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <form className="flex flex-col gap-6" onSubmit={submit} aria-label="Formulário de login" noValidate>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-[#4e2780]">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="email@exemplo.com"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        required
                                        autoFocus
                                        autoComplete="email"
                                        inputMode="email"
                                        className="bg-white border border-[#b39ddb] text-gray-900 placeholder:text-[#7c5ca3] focus:ring-2 focus:ring-[#b39ddb]"
                                    />
                                    {errors.email && (
                                        <span className="text-sm text-red-600">{errors.email}</span>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password" className="text-[#4e2780]">Senha</Label>
                                        {canResetPassword && (
                                            <a
                                                href={route('password.request')}
                                                className="ml-auto text-sm text-[#4e2780] hover:underline focus:outline-none focus:ring-2 focus:ring-[#b39ddb] rounded"
                                            >
                                                Esqueceu a senha?
                                            </a>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Digite sua senha"
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            required
                                            autoComplete="current-password"
                                            className="bg-white border border-[#b39ddb] text-gray-900 placeholder:text-[#7c5ca3] focus:ring-2 focus:ring-[#b39ddb] pr-10"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-[#f4e6f3] cursor-pointer"
                                            onClick={() => setShowPassword(prev => !prev)}
                                            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                                            title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                                            tabIndex={-1}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-[#7c5ca3]" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-[#7c5ca3]" />
                                            )}
                                        </Button>
                                    </div>
                                    {errors.password && (
                                        <span className="text-sm text-red-600">{errors.password}</span>
                                    )}
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={data.remember}
                                        onCheckedChange={checked => setData('remember', checked === true)}
                                        className="border-[#b39ddb] text-[#4e2780] focus:ring-2 focus:ring-[#b39ddb] cursor-pointer"
                                    />
                                    <Label htmlFor="remember" className="text-[#4e2780]">Lembrar de mim</Label>
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-2 w-full bg-gradient-to-r from-[#4e2780] to-[#7c5ca3] text-white font-semibold h-12 rounded-xl hover:shadow-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#b39ddb] cursor-pointer"
                                    disabled={processing}
                                    aria-label="Entrar"
                                >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                    Entrar
                                </Button>
                            </div>

                            <div className="text-center text-sm text-[#4e2780]/70">
                                Não tem uma conta?{' '}
                                <a
                                    href={route('register')}
                                    className="text-[#4e2780] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[#b39ddb] rounded"
                                >
                                    Cadastre-se
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
