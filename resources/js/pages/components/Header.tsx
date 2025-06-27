import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, MapPin } from 'lucide-react';

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
  // Componentes auxiliares para reutilização
  const AuthButtons = () => (
    <>
      <span className="text-[#4e2780]/70 font-medium">Quer cadastrar seu espaço?</span>
      <Button
        variant="ghost"
        onClick={() => window.location.href = '/login'}
        className="text-[#4e2780] hover:bg-[#4e2780]/5 font-semibold focus-visible:ring-2 focus-visible:ring-[#b39ddb]"
        aria-label="Entrar"
      >
        Entrar
      </Button>
      <Button
        onClick={() => window.location.href = '/register'}
        className="bg-[#4e2780] bg-gradient-to-br from-[#4e2780] to-[#7c5ca3] text-white font-semibold px-6 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#b39ddb]"
        aria-label="Cadastrar"
      >
        Cadastrar
      </Button>
    </>
  );

  const LoggedButtons = () => (
    <>
      <span className="text-[#4e2780]/70 font-medium">Bem-vindo de volta!</span>
      <Button
        variant="ghost"
        onClick={() => window.location.href = '/register-space'}
        className="text-[#4e2780] hover:bg-[#4e2780]/5 font-semibold focus-visible:ring-2 focus-visible:ring-[#b39ddb]"
        aria-label="Cadastrar Espaço"
      >
        Cadastrar Espaço
      </Button>
      <Button
        onClick={() => window.location.href = '/login'}
        className="bg-[#4e2780] bg-gradient-to-br from-[#4e2780] to-[#7c5ca3] text-white font-semibold px-6 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#b39ddb]"
        aria-label="Sair"
      >
        Sair
      </Button>
    </>
  );

  return (
    <header className="backdrop-blur bg-white/80 sticky top-0 z-50 border-b border-[#4e2780]/10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            className="flex items-center space-x-3 group focus:outline-none"
            onClick={() => window.location.href = '/'}
            aria-label="Ir para a página inicial"
          >
            <span className="w-12 h-12 bg-gradient-to-br from-[#4e2780] to-[#7c5ca3] rounded-xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
              <MapPin className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <span>
              <span className="text-2xl font-bold bg-gradient-to-br from-[#4e2780] to-[#7c5ca3] bg-clip-text text-transparent">
                EventSpace
              </span>
              <div className="text-xs text-[#4e2780]/60 -mt-1">Espaços únicos para momentos especiais</div>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {!isLoggedIn ? <AuthButtons /> : <LoggedButtons />}
          </nav>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-[#4e2780] hover:bg-[#4e2780]/5 focus-visible:ring-2 focus-visible:ring-[#b39ddb]"
                aria-label="Abrir menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 bg-white border-l border-[#4e2780]/10 focus:outline-none"
            >
              <div className="flex flex-col space-y-6 mt-12">
                <div className="pb-4 border-b border-[#4e2780]/10">
                  <h3 className="font-semibold text-[#4e2780] text-lg">EventSpace</h3>
                  <p className="text-[#4e2780]/60 text-sm">Espaços únicos para momentos especiais</p>
                </div>
                {!isLoggedIn ? <AuthButtons /> : <LoggedButtons />}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;