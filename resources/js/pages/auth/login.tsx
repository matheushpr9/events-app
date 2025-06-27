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
    <div className="min-h-screen bg-[#fff6f1]">
      <Head title="Login" />
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white/90 rounded-2xl shadow-lg p-8 backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {/* Seu logo aqui */}
              <span className="text-2xl font-bold bg-gradient-to-r from-[#4e2780] to-[#7c5ca3] bg-clip-text text-transparent">EventSpace</span>
            </div>
            <h1 className="text-3xl font-bold text-[#4e2780] mb-2">Bem-vindo de volta</h1>
            <p className="text-[#4e2780]/70">Entre com suas credenciais para acessar sua conta</p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={submit} aria-label="Formulário de login">
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
                  className="bg-white border border-[#b39ddb] text-[#4e2780] placeholder:text-[#7c5ca3] focus:ring-2 focus:ring-[#b39ddb]"
                />
                {errors.email && (
                  <span className="text-sm text-red-500">{errors.email}</span>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-[#4e2780]">Senha</Label>
                  {canResetPassword && (
                    <a href={route('password.request')} className="ml-auto text-sm text-[#4e2780] hover:underline focus:outline-none focus:ring-2 focus:ring-[#b39ddb]">
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
                  className="bg-white border border-[#b39ddb] text-[#4e2780] placeholder:text-[#7c5ca3] focus:ring-2 focus:ring-[#b39ddb]"
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
                  className="border-[#b39ddb] text-[#4e2780] focus:ring-2 focus:ring-[#b39ddb]"
                />
                <Label htmlFor="remember" className="text-[#4e2780]">Lembrar de mim</Label>
              </div>

              <Button
                type="submit"
                className="mt-4 w-full bg-gradient-to-r from-[#4e2780] to-[#7c5ca3] text-white font-semibold h-12 rounded-xl hover:shadow-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#b39ddb]"
                disabled={processing}
                aria-label="Entrar"
              >
                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                Entrar
              </Button>
            </div>

            <div className="text-center text-sm text-[#4e2780]/70">
              Não tem uma conta?{' '}
              <a href={route('register')} className="text-[#4e2780] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[#b39ddb]">
                Cadastre-se
              </a>
            </div>
          </form>

          {status && (
            <div className="mt-4 text-center text-sm font-medium text-green-600">{status}</div>
          )}
        </div>
      </div>
    </div>
  );
}