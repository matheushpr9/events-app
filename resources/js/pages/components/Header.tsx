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

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.href = '/'}>
            <MapPin className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">EventSpace</span>
          </div>
          {!isLoggedIn ? (
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Quer cadastrar seu espaço?</span>
              <Button variant="ghost" onClick={() => window.location.href = '/login'}>Login</Button>
              <Button onClick={() => window.location.href = '/register'}>Cadastrar</Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Quer cadastrar seu espaço?</span>
              <Button variant="ghost" onClick={() => window.location.href = '/register-space'}>Registar espaço</Button>
              <Button
                onClick={async () => {
                  await initSanctum();
                  await api.post('/logout');
                  window.location.href = '/login';
                }}
              >
                Logout
              </Button>
            </div>
          )}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            {!isLoggedIn ? (
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col space-y-4 mt-8">
                  <p className="text-sm text-muted-foreground">Quer cadastrar seu espaço?</p>
                  <Button variant="ghost" onClick={() => window.location.href = '/login'}>Login</Button>
                  <Button onClick={() => window.location.href = '/register'}>Cadastrar</Button>
                </div>
              </SheetContent>
            ) : (
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col space-y-4 mt-8">
                  <p className="text-sm text-muted-foreground">Quer cadastrar seu espaço?</p>
                  <Button variant="ghost" onClick={() => window.location.href = '/register-space'}>Registar espaço</Button>
                  <Button
                    onClick={async () => {
                      await initSanctum();
                      await api.post('/logout');
                      window.location.href = '/login';
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </SheetContent>
            )}
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
