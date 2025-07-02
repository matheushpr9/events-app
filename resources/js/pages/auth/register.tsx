import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, LoaderCircle, User, Mail, Phone, Lock } from 'lucide-react';
import Header from '../components/Header';

const Cadastro = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    password_confirmation: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => post('/logout'),
    });
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#fff6f1] py-10 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#4e2780] to-[#7c5ca3] bg-clip-text text-transparent mb-2 drop-shadow">
              Criar conta
            </h1>
            <p className="text-[#4e2780]/70 text-lg">
              Preencha os dados abaixo para criar sua conta e começar a usar o EventSpace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informações Pessoais */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl text-[#4e2780] font-bold">
                  <User className="w-5 h-5 text-[#4e2780]" />
                  Informações Pessoais
                </CardTitle>
                <CardDescription>
                  Preencha seus dados pessoais para criar sua conta
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
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      required
                      autoFocus
                      className="bg-white text-[#4e2780] border border-[#b39ddb] placeholder:text-[#7c5ca3] focus:ring-2 focus:ring-[#b39ddb]"
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
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        className="bg-white text-[#4e2780] border border-[#b39ddb] placeholder:text-[#7c5ca3] focus:ring-2 focus:ring-[#b39ddb]"
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
                        value={data.phone_number}
                        onChange={(e) => setData('phone_number', e.target.value)}
                        required
                        className="bg-white text-[#4e2780] border border-[#b39ddb] placeholder:text-[#7c5ca3] focus:ring-2 focus:ring-[#b39ddb]"
                      />
                      {errors.phone_number && <span className="text-red-500 text-sm">{errors.phone_number}</span>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Segurança */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl text-[#4e2780] font-bold">
                  <Lock className="w-5 h-5 text-[#7c5ca3]" />
                  Segurança
                </CardTitle>
                <CardDescription>
                  Defina uma senha segura para proteger sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold text-[#7c5ca3]">Senha</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Digite uma senha"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        className="bg-white text-[#4e2780] border border-[#b39ddb] placeholder:text-[#7c5ca3] focus:ring-2 focus:ring-[#b39ddb] pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-[#f4e6f3]"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
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
                    <Label htmlFor="password_confirmation" className="text-sm font-semibold text-[#7c5ca3]">Confirmar senha</Label>
                    <div className="relative">
                      <Input
                        id="password_confirmation"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirme sua senha"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                        className="bg-white text-[#4e2780] border border-[#b39ddb] placeholder:text-[#7c5ca3] focus:ring-2 focus:ring-[#b39ddb] pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-[#f4e6f3]"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        tabIndex={-1}
                        aria-label={showConfirmPassword ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}
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
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Card className="border-0 shadow-xl bg-gradient-to-r from-[#4e2780] to-[#7c5ca3] text-white">
              <CardContent className="pt-6">
                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-white text-[#4e2780] hover:bg-[#f4e6f3] h-14 text-lg font-bold shadow-lg transition-all duration-150"
                >
                  {processing ? (
                    <>
                      <LoaderCircle className="w-5 h-5 animate-spin mr-2" />
                      Criando conta...
                    </>
                  ) : (
                    'Criar conta'
                  )}
                </Button>

                <div className="text-center text-sm mt-6">
                  <span className="text-white/80">Já tem uma conta? </span>
                  <a href="/login" className="text-white font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[#b39ddb]">
                    Faça login
                  </a>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;