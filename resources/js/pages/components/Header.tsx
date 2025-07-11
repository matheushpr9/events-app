import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

import Logo from './logo'

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

  const AuthButtons = () => (
    <>
      <span className="text-[#4e2780] font-medium opacity-85">Quer cadastrar seu espaço?</span>
      <Button
        variant="ghost"
        onClick={() => window.location.href = '/login'}
        className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        aria-label="Entrar"
      >
        Entrar
      </Button>
      <Button
        onClick={() => window.location.href = '/register'}
        className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
        aria-label="Cadastrar"
      >
        Cadastrar
      </Button>
    </>
  );

  const LoggedButtons = () => (
    <>
      <span className="text-[#4e2780] font-medium  opacity-85 ">Bem-vindo de volta!</span>
      <Button
        variant="ghost"
        onClick={() => window.location.href = '/register-space'}
        className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        aria-label="Cadastrar Espaço"
      >
        Cadastrar Espaço
      </Button>
      <Button
         onClick={async () => {
                  await initSanctum();
                  await api.post('/logout');
                  window.location.href = '/login';
                }}
        className="w-full md:w-auto bg-gradient-to-r from-indigo-800 to-purple-800 hover:from-indigo-900 hover:to-purple-900 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-800 focus-visible:ring-offset-2"
        aria-label="Sair"
      >
        Sair
      </Button>
    </>
  );

  return (
    <header className="backdrop-blur bg-white sticky top-0 z-50 border-b border-[#4e2780]/10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo style={{ width: 200, height: 110, cursor: 'pointer' }} onClick={() => window.location.href = '/'} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center align-middle space-x-6" >
            {!isLoggedIn ? <AuthButtons /> : <LoggedButtons />}
          </nav>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-[#4e2780] hover:bg-[#ede7f6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4e2780]"
                aria-label="Abrir menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 bg-white border-l border-[#4e2780]/10 focus:outline-none"
            >
              <div className="flex flex-col space-y-4 flex-1 items-center justify-self-start">
                <Logo style={{ width: 280, height: 140, cursor: 'pointer', margin:0}}/>
                <p className="text-center text-[#4e2780] text-sm opacity-85">- Seu casamento em um clique! -</p>
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