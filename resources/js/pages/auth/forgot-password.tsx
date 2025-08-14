import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import Header from '../components/Header';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Esqueci minha senha" />
            <Header />
            <div className="min-h-screen bg-[#fff6f1] flex flex-col">

                <main className="flex-1 flex items-center justify-center">
                    <section className="w-full max-w-md mx-auto rounded-xl shadow-lg px-6 py-10 sm:px-8 sm:py-12 bg-[#2d1846]">
                        <div className="flex flex-col items-center">
                            {/* Ícone opcional */}
                            {/* <Icon className="mb-4 text-[#b39ddb] w-10 h-10" /> */}
                            <h2 className="text-2xl font-bold text-white mb-2 text-center">Esqueceu a senha?</h2>
                            <p className="text-[#b39ddb] text-base text-center mb-6">
                                Digite seu e-mail para receber o link de redefinição de senha.
                            </p>
                        </div>

                        {status && (
                            <div className="mb-4 text-center text-sm font-medium text-green-400">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-[#b39ddb] font-semibold mb-1"
                                >
                                    E-mail
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    value={data.email}
                                    autoFocus
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="email@exemplo.com"
                                    className="w-full px-4 py-2 rounded-lg border border-[#b39ddb] focus:outline-none focus:ring-2 focus:ring-[#b39ddb] text-gray-900 bg-white placeholder-[#4e2780]/40 transition-all duration-200"
                                    aria-label="E-mail"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-5 py-2.5 bg-[#6c3eb6] text-white rounded-lg font-semibold shadow-md hover:bg-[#4e2780] focus:outline-none focus:ring-2 focus:ring-[#b39ddb] focus:ring-offset-2 transition-all duration-300 flex items-center justify-center gap-2"
                                disabled={processing}
                                aria-label="Enviar link de redefinição de senha"
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Enviar link de redefinição
                            </button>
                        </form>

                        <div className="text-center text-sm mt-6">
                            <span className="text-[#b39ddb]">Ou, volte para o </span>
                            <TextLink
                                href={route('login')}
                                className="text-[#b39ddb] font-semibold underline hover:text-white transition-colors"
                            >
                                login
                            </TextLink>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
