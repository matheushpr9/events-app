import { Head } from '@inertiajs/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
    return (
        <>
            <Header />
            <Head title="Política de Privacidade - Floov" />
            <div className="min-h-screen bg-[#fff6f1] py-8 px-2 sm:px-4">
                <div className="container mx-auto max-w-3xl bg-white rounded-2xl shadow-md p-6 sm:p-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#4e2780] mb-4">Política de Privacidade</h1>
                    <p className="text-[#4e2780]/70 mb-6 text-sm">Última atualização: [preencher data]</p>
                    <section className="space-y-6 text-[#4e2780] text-base">
                        <p>
                            A Floov respeita a privacidade de seus usuários e atua em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 - LGPD). Ao utilizar nossa plataforma, você concorda com as práticas descritas nesta Política de Privacidade.
                        </p>
                        <h2 className="font-semibold text-lg mt-6 mb-2">1. Dados coletados</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Nome, CPF, CNPJ e razão social (quando aplicável);</li>
                            <li>Endereço, telefone, e-mail;</li>
                            <li>Fotos e informações do espaço;</li>
                            <li>Localização e serviços oferecidos;</li>
                            <li>Dados de pagamento (processados via Stripe).</li>
                        </ul>
                        <h2 className="font-semibold text-lg mt-6 mb-2">2. Finalidade do tratamento</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Cadastro e autenticação dos usuários;</li>
                            <li>Divulgação dos espaços anunciados;</li>
                            <li>Processamento de pagamentos de assinatura;</li>
                            <li>Comunicação entre usuários (anunciantes e contratantes);</li>
                            <li>Cumprimento de obrigações legais.</li>
                        </ul>
                        <h2 className="font-semibold text-lg mt-6 mb-2">3. Compartilhamento de dados</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Com a plataforma Stripe, para processar pagamentos;</li>
                            <li>Com prestadores de serviços de hospedagem e tecnologia, quando necessário para operação do site;</li>
                            <li>Nunca serão vendidos ou cedidos para fins comerciais indevidos.</li>
                        </ul>
                        <h2 className="font-semibold text-lg mt-6 mb-2">4. Cookies e rastreamento</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Utilizamos cookies para melhorar a experiência do usuário, analisar estatísticas de navegação e veicular campanhas de marketing.</li>
                            <li>O usuário pode configurar seu navegador para bloquear cookies, mas algumas funcionalidades poderão ser afetadas.</li>
                        </ul>
                        <h2 className="font-semibold text-lg mt-6 mb-2">5. Direitos dos titulares</h2>
                        <p>
                            Nos termos da LGPD, o usuário poderá solicitar:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Confirmação da existência de tratamento de seus dados;</li>
                            <li>Acesso, correção e atualização de informações;</li>
                            <li>Exclusão de dados pessoais, respeitados os prazos legais;</li>
                            <li>Portabilidade e revogação do consentimento.</li>
                        </ul>
                        <p>
                            Para exercer tais direitos, o usuário deverá entrar em contato pelo e-mail <a href="mailto:contato@floov.com.br" className="underline text-[#4e2780] hover:text-[#3a1e5a]">contato@floov.com.br</a>.
                        </p>
                        <h2 className="font-semibold text-lg mt-6 mb-2">6. Alterações desta Política</h2>
                        <p>
                            A Floov poderá alterar esta Política de Privacidade a qualquer tempo, mediante publicação no site. O uso da plataforma após a alteração implica concordância com as novas condições.
                        </p>
                        <h2 className="font-semibold text-lg mt-6 mb-2">7. Dúvidas</h2>
                        <p>
                            Em caso de dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, entre em contato pelo e-mail <a href="mailto:contato@floov.com.br" className="underline text-[#4e2780] hover:text-[#3a1e5a]">contato@floov.com.br</a>.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}
