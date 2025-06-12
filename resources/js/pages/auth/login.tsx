import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '../components/Header';

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

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Head title="Login" />
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {/* Seu logo aqui */}
              <span className="text-2xl font-bold text-foreground">EventSpace</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Bem-vindo de volta</h1>
            <p className="text-muted-foreground">Entre com suas credenciais para acessar sua conta</p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  required
                  autoFocus
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="text-sm text-red-500">{errors.email}</span>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  {canResetPassword && (
                    <a href={route('password.request')} className="ml-auto text-sm text-primary hover:underline">
                      Esqueceu a senha?
                    </a>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                  required
                  autoComplete="current-password"
                />
                {errors.password && (
                  <span className="text-sm text-red-500">{errors.password}</span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="remember"
                  name="remember"
                  checked={data.remember}
                  onCheckedChange={checked => setData('remember', checked === true)}
                />
                <Label htmlFor="remember">Lembrar de mim</Label>
              </div>

              <Button type="submit" className="mt-4 w-full" disabled={processing}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Entrar
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <a href={route('register')} className="text-primary hover:underline">
                Cadastre-se
              </a>
            </div>
          </form>

          {status && (
            <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>
          )}
        </div>
      </div>
    </div>
  );
}
