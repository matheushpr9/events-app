import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {  Eye, EyeOff, LoaderCircle, User, Mail, Phone, Lock } from 'lucide-react';
import Header from '../components/Header';

const Cadastro = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.senha !== data.confirmarSenha) {
      alert('As senhas não coincidem');
      return;
    }
    post(route('register'), {
      onFinish: () => reset('senha', 'confirmarSenha'),
    });
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-10 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 drop-shadow">
              Criar conta
            </h1>
            <p className="text-muted-foreground text-lg">
              Preencha os dados abaixo para criar sua conta e começar a usar o EventSpace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informações Pessoais */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl text-gray-800 font-bold">
                  <User className="w-5 h-5 text-blue-600" />
                  Informações Pessoais
                </CardTitle>
                <CardDescription>
                  Preencha seus dados pessoais para criar sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-sm font-semibold text-blue-700">Nome completo</Label>
                    <Input
                      id="nome"
                      type="text"
                      placeholder="Digite seu nome completo"
                      value={data.nome}
                      onChange={(e) => setData('nome', e.target.value)}
                      required
                      autoFocus
                      className="bg-white text-gray-800 border border-gray-300 placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.nome && <span className="text-red-500 text-sm">{errors.nome}</span>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-blue-700">
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
                        className="bg-white text-gray-800 border border-gray-300 placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-400"
                      />
                      {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefone" className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                        <Phone className="w-4 h-4" />
                        Telefone
                      </Label>
                      <Input
                        id="telefone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={data.telefone}
                        onChange={(e) => setData('telefone', e.target.value)}
                        required
                        className="bg-white text-gray-800 border border-gray-300 placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-400"
                      />
                      {errors.telefone && <span className="text-red-500 text-sm">{errors.telefone}</span>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Segurança */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl text-gray-800 font-bold">
                  <Lock className="w-5 h-5 text-green-600" />
                  Segurança
                </CardTitle>
                <CardDescription>
                  Defina uma senha segura para proteger sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="senha" className="text-sm font-semibold text-green-700">Senha</Label>
                    <div className="relative">
                      <Input
                        id="senha"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Digite uma senha"
                        value={data.senha}
                        onChange={(e) => setData('senha', e.target.value)}
                        required
                        className="bg-white text-gray-800 border border-gray-300 placeholder:text-muted-foreground focus:ring-2 focus:ring-green-400 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-green-50"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-green-600" />
                        ) : (
                          <Eye className="h-4 w-4 text-green-600" />
                        )}
                      </Button>
                    </div>
                    {errors.senha && <span className="text-red-500 text-sm">{errors.senha}</span>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmarSenha" className="text-sm font-semibold text-green-700">Confirmar senha</Label>
                    <div className="relative">
                      <Input
                        id="confirmarSenha"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirme sua senha"
                        value={data.confirmarSenha}
                        onChange={(e) => setData('confirmarSenha', e.target.value)}
                        required
                        className="bg-white text-gray-800 border border-gray-300 placeholder:text-muted-foreground focus:ring-2 focus:ring-green-400 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-green-50"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-green-600" />
                        ) : (
                          <Eye className="h-4 w-4 text-green-600" />
                        )}
                      </Button>
                    </div>
                    {errors.confirmarSenha && <span className="text-red-500 text-sm">{errors.confirmarSenha}</span>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="pt-6">
                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-white text-blue-700 hover:bg-blue-50 h-14 text-lg font-bold shadow-lg transition-all duration-150"
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
                  <a href="/login" className="text-white font-semibold hover:underline">
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
