import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Layers, LogIn, LogOut, Menu, PlusCircle, UserCircle, UserPlus, X } from 'lucide-react';
import Logo from './logo';
import { api, initSanctum } from '../../api/api';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        async function checkAuth() {
            try {
                await initSanctum();
                const response = await api.get('/auth/user');
                setIsLoggedIn(response.data.authenticated);
            } catch {
                setIsLoggedIn(false);
            }
        }
        checkAuth();
    }, []);

    if (isLoggedIn === null) return null;

    // Classes otimizadas para responsividade e acessibilidade
    const navLinkClass =
        "w-full md:w-auto text-indigo-700 hover:text-purple-700 font-semibold px-4 py-3 rounded transition-colors duration-200 underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 text-lg";
    const actionButtonClass =
        "w-full md:w-auto bg-gradient-to-r from-indigo-800 to-purple-800 hover:from-indigo-900 hover:to-purple-900 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-800 focus-visible:ring-offset-2 cursor-pointer text-lg";

    // Botões para usuários não autenticados
    const AuthButtons = () => (
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full">
            <span className="text-[#4e2780] font-medium opacity-85 text-base md:text-lg">Quer cadastrar seu espaço?</span>
            <a href="/login" className={navLinkClass} aria-label="Entrar">Entrar</a>
            <a href="/register" className={navLinkClass} aria-label="Cadastrar">Cadastrar</a>
        </div>
    );

    // Botões para usuários autenticados
    const LoggedButtons = () => (
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full">
            <span className="text-[#4e2780] font-medium opacity-85 text-base md:text-lg">Bem-vindo de volta!</span>
            <a href="/my-spaces" className={navLinkClass} aria-label="Meus Espaços">Meus Espaços</a>
            <a href="/account" className={navLinkClass} aria-label="Minha Conta">Minha Conta</a>
            <a href="/register-space" className={navLinkClass} aria-label="Cadastrar Espaço">Cadastrar Espaço</a>
            <button
                onClick={async () => {
                    await initSanctum();
                    await api.post('/logout');
                    window.location.href = '/login';
                }}
                className={actionButtonClass}
                aria-label="Sair"
                type="button"
            >
                Sair
            </button>
        </div>
    );

    // Links de navegação para mobile
    const mobileLinks = !isLoggedIn
        ? [
            { href: '/login', label: 'Entrar', icon: <LogIn className="w-5 h-5 mr-2" /> },
            { href: '/register', label: 'Cadastrar', icon: <UserPlus className="w-5 h-5 mr-2" /> },
        ]
        : [
            { href: '/my-spaces', label: 'Meus Espaços', icon: <Layers className="w-5 h-5 mr-2" /> },
            { href: '/account', label: 'Minha Conta', icon: <UserCircle className="w-5 h-5 mr-2" /> },
            { href: '/register-space', label: 'Cadastrar Espaço', icon: <PlusCircle className="w-5 h-5 mr-2" /> },
        ];

    return (
        <header className="backdrop-blur bg-white sticky top-0 z-50 border-b border-[#4e2780]/10 shadow-sm">
            <div className="container mx-auto px-2 sm:px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo com área de toque maior para mobile */}
                    <button
                        onClick={() => window.location.href = '/'}
                        aria-label="Ir para a página inicial"
                        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                        style={{ lineHeight: 0 }}
                    >
                        <Logo style={{ width: 180, height: 60, cursor: 'pointer' }} />
                    </button>

                    {/* Navegação Desktop */}
                    <nav className="hidden md:flex items-center align-middle space-x-4">
                        {!isLoggedIn ? <AuthButtons /> : <LoggedButtons />}
                    </nav>

                    {/* Menu Mobile */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden text-[#4e2780] hover:bg-[#ede7f6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4e2780]"
                                aria-label="Abrir menu"
                            >
                                <Menu className="h-7 w-7" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-full max-w-xs bg-gradient-to-b from-[#f4e6f3] to-[#fff6f1] border-l border-[#4e2780]/10 focus:outline-none p-0"
                            aria-label="Menu de navegação"
                        >
                            {/* Topo do menu */}
                            <div className="flex items-center justify-between px-6 pt-6 pb-2">
                                <button
                                    onClick={() => window.location.href = '/'}
                                    aria-label="Ir para a página inicial"
                                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                                    style={{ lineHeight: 0 }}
                                >
                                    <Logo style={{ width: 120, height: 40, cursor: 'pointer', margin: 0 }} />
                                </button>
                                <SheetClose asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-[#4e2780] hover:bg-[#ede7f6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4e2780]"
                                        aria-label="Fechar menu"
                                    >
                                        <X className="h-7 w-7" />
                                    </Button>
                                </SheetClose>
                            </div>
                            <p className="text-center text-[#4e2780] text-base opacity-85 mb-4">Seu evento em um clique!</p>
                            <hr className="border-[#4e2780]/10 mb-2" />

                            {/* Links de navegação */}
                            <nav className="flex flex-col gap-2 px-6">
                                {mobileLinks.map(link => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="flex items-center w-full px-4 py-3 rounded-lg text-[#4e2780] font-semibold text-lg hover:bg-[#ede7f6] transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500"
                                        aria-label={link.label}
                                    >
                                        {link.icon}
                                        {link.label}
                                    </a>
                                ))}
                                {/* Botão de sair, se logado */}
                                {isLoggedIn && (
                                    <button
                                        onClick={async () => {
                                            await initSanctum();
                                            await api.post('/logout');
                                            window.location.href = '/login';
                                        }}
                                        className="flex items-center w-full px-4 py-3 mt-2 rounded-lg bg-gradient-to-r from-indigo-800 to-purple-800 text-white font-semibold text-lg shadow-md hover:from-indigo-900 hover:to-purple-900 transition-all focus-visible:ring-2 focus-visible:ring-purple-800"
                                        aria-label="Sair"
                                        type="button"
                                    >
                                        <LogOut className="w-5 h-5 mr-2" />
                                        Sair
                                    </button>
                                )}
                            </nav>
                            <div className="flex-1" />
                            {/* Rodapé opcional */}
                            <div className="px-6 py-4 text-xs text-[#4e2780]/60 text-center">
                                &copy; {new Date().getFullYear()} SuaMarca. Todos os direitos reservados.
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Header;
