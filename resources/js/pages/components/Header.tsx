import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, MapPin } from 'lucide-react';
import axios from 'axios';

function getCookie(name:string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const part = parts.pop();
    if (part !== undefined) {
      return part.split(';').shift();
    }
  }
  return '';
}

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null = carregando, true/false = definido

  useEffect(() => {
    axios.get('/auth/user')
      .then(response => {
        console.log('User authenticated:', response.data.authenticated);
        console.log('User data:', response.data.user);
        console.log('XSRF-TOKEN:', getCookie('XSRF-TOKEN'));
        setIsLoggedIn(response.data.authenticated);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  // Enquanto carrega, pode mostrar um loader ou nada
  if (isLoggedIn === null) return null;

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.href = '/'}>
            <MapPin className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">EventSpace</span>
          </div>

          {/* Desktop Navigation */}
          {!isLoggedIn ? (
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Quer cadastrar seu espaço?</span>
              <Button variant="ghost" className="justify-start cursor-pointer hover:bg-gray-200 transition duration-300" onClick={() => window.location.href = '/login'} >Login</Button>
              <Button className="justify-start cursor-pointer hover:bg-gray-200 transition duration-300" onClick={() => window.location.href = '/register'}>Cadastrar</Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Quer cadastrar seu espaço?</span>
              <Button variant="ghost" className="justify-start cursor-pointer hover:bg-gray-200 transition duration-300" onClick={() => window.location.href = '/register-space'} >Registar espaço</Button>
              <Button
                className="justify-start cursor-pointer hover:bg-gray-200 transition duration-300"
                onClick={async () => {

                    await axios.post('/logout', {}, { withCredentials: true });
                    window.location.href = '/login';
                }}
                >
                Logout
                </Button>
            </div>
          )}

          {/* Mobile Menu */}
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
                  <Button variant="ghost" className="justify-start" onClick={() => window.location.href = '/login'}>Login</Button>
                  <Button className="justify-start" onClick={() => window.location.href = '/register'}>Cadastrar</Button>
                </div>
              </SheetContent>
            ) : (
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col space-y-4 mt-8">
                  <p className="text-sm text-muted-foreground">Quer cadastrar seu espaço?</p>
                  <Button variant="ghost" className="justify-start" onClick={() => window.location.href = '/register-space'}>Registar espaço</Button>
                  <Button className="justify-start" onClick={async () => {

                            await axios.post('/logout', {}, { withCredentials: true });
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
