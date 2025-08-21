import { Head } from '@inertiajs/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsOfUse() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#fff6f1] py-8 px-2 sm:px-4">
                <Head title="Termos de Uso - Floov" />
                <div className="container mx-auto max-w-3xl bg-white rounded-2xl shadow-md p-6 sm:p-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#4e2780] mb-4">Termos de Uso</h1>
                    <p className="text-[#4e2780]/70 mb-6 text-sm">Última atualização: [preencher data]</p>
                    <section className="space-y-6 text-[#4e2780] text-base">
                        <p>
                            Bem-vindo à Floov, plataforma online de intermediação de espaços para eventos. Ao acessar ou utilizar nosso site, você concorda com estes Termos de Uso. Caso não concorde, recomendamos que não utilize a plataforma.
                        </p>
                        <h2 className="font-semibold text-lg mt-6 mb-2">1. Definições</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>Floov:</strong> Plataforma digital que conecta proprietários de espaços de eventos a interessados em contratá-los.</li>
                            <li><strong>Usuário Anunciante:</strong> Pessoa física ou jurídica que anuncia espaços na Floov.</li>
                            <li><strong>Usuário Contratante:</strong> Pessoa física ou jurídica que pesquisa, contata ou contrata espaços anunciados.</li>
                            <li><strong>Usuário:</strong> Qualquer pessoa que utilize a plataforma, seja anunciante, contratante ou visitante.</li>
                        </ul>
                        <h2 className="font-semibold text-lg mt-6 mb-2">2. Objeto da Plataforma</h2>
                        <p>
                            A Floov disponibiliza ambiente digital para divulgação de espaços de eventos em geral. A Floov não é proprietária dos espaços, não presta serviços de locação, não garante a execução dos contratos entre usuários e atua exclusivamente como intermediadora tecnológica.
                        </p>
                        <h2 className="font-semibold text-lg mt-6 mb-2">3. Cadastro e Conta de Usuário</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>O cadastro é pessoal e intransferível, sendo necessário fornecer informações verídicas, completas e atualizadas.</li>
                            <li>O Usuário Anunciante deverá enviar documentos comprobatórios da legitimidade para anunciar o espaço (ex.: documentos pessoais, CNPJ, razão social, alvarás, entre outros que a Floov considerar necessários).</li>
                            <li>A Floov poderá suspender ou excluir contas que apresentem informações falsas ou descumpram estes Termos.</li>
                        </ul>
                        <h2 className="font-semibold text-lg mt-6 mb-2">4. Assinatura e Pagamentos</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>O anúncio de espaços na Floov exige a contratação de assinatura paga.</li>
                            <li>Os pagamentos serão processados por meio da plataforma Stripe, cabendo ao Usuário Anunciante fornecer dados corretos para viabilizar a cobrança.</li>
                            <li>O cancelamento da assinatura poderá ser solicitado a qualquer momento.</li>
                            <li>Nos termos do Código de Defesa do Consumidor, em caso de cancelamento dentro de 7 (sete) dias da assinatura, o Usuário terá direito ao reembolso integral. Após esse prazo, não haverá devolução dos valores pagos.</li>
                        </ul>
                        <h2 className="font-semibold text-lg mt-6 mb-2">5. Obrigações dos Usuários</h2>
                        <h3 className="font-semibold mt-4">5.1 Obrigações do Usuário Anunciante</h3>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Garantir a veracidade das informações fornecidas.</li>
                            <li>Ser o legítimo proprietário ou possuir autorização válida para anunciar o espaço.</li>
                            <li>Cumprir integralmente a legislação aplicável (ex.: segurança, acessibilidade, autorizações).</li>
                            <li>Fornecer conteúdo (textos, fotos, vídeos) que não infrinja direitos de terceiros.</li>
                        </ul>
                        <h3 className="font-semibold mt-4">5.2 Obrigações do Usuário Contratante</h3>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Utilizar a plataforma de forma ética e dentro da legalidade.</li>
                            <li>Não empregar informações obtidas na Floov para fins ilícitos.</li>
                            <li>Honrar compromissos assumidos com os anunciantes.</li>
                        </ul>
                        <h2 className="font-semibold text-lg mt-6 mb-2">6. Regras de Conteúdo e Avaliações</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>É permitido que contratantes deixem avaliações e comentários sobre os espaços.</li>
                            <li>A Floov poderá remover conteúdos que sejam falsos, difamatórios, ofensivos, contenham palavreado de baixo calão, infrinjam direitos de terceiros ou a legislação vigente.</li>
                        </ul>
                        <h2 className="font-semibold text-lg mt-6 mb-2">7. Cancelamentos e Reembolsos</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>O Usuário Anunciante pode cancelar a assinatura a qualquer momento.</li>
                            <li>Reembolsos serão realizados somente em pedidos dentro de 7 dias corridos após a contratação (direito de arrependimento previsto no CDC).</li>
                        </ul>
                        <h2 className="font-semibold text-lg mt-6 mb-2">8. Limitação de Responsabilidade da Floov</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>A Floov não se responsabiliza por qualidade, veracidade ou disponibilidade dos espaços anunciados.</li>
                            <li>Não se responsabiliza por cancelamentos, alterações ou descumprimentos de obrigações entre anunciantes e contratantes.</li>
                            <li>Não se responsabiliza por danos diretos ou indiretos decorrentes do uso da plataforma ou da relação entre usuários.</li>
                        </ul>
                        <h2 className="font-semibold text-lg mt-6 mb-2">9. Indenização</h2>
                        <p>
                            O Usuário concorda em indenizar e isentar a Floov de quaisquer responsabilidades, reclamações, perdas ou despesas (incluindo honorários advocatícios) decorrentes de violação destes Termos, publicação de informações falsas, ilegais ou lesivas, ou uso indevido da plataforma que resulte em danos a terceiros ou à própria Floov.
                        </p>
                        <h2 className="font-semibold text-lg mt-6 mb-2">10. Propriedade Intelectual</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>A marca, o design, o software e demais elementos da plataforma pertencem exclusivamente à Floov.</li>
                            <li>Os conteúdos enviados pelos Usuários permanecem de sua titularidade, mas o Usuário concede à Floov uma licença não exclusiva para utilizá-los dentro da plataforma e em campanhas de divulgação.</li>
                        </ul>
                        <h2 className="font-semibold text-lg mt-6 mb-2">11. Alterações dos Termos</h2>
                        <p>
                            A Floov poderá alterar estes Termos a qualquer tempo, mediante publicação no site. O uso da plataforma após a alteração implica concordância com as novas condições.
                        </p>
                        <h2 className="font-semibold text-lg mt-6 mb-2">12. Foro e Legislação Aplicável</h2>
                        <p>
                            Estes Termos são regidos pela legislação brasileira. Fica eleito o Foro da Comarca de Bragança Paulista/SP para dirimir quaisquer controvérsias.
                        </p>
                        <p className="mt-8 text-[#4e2780]/70 text-sm">
                            Ao utilizar a Floov, o usuário declara que leu, entendeu e concorda integralmente com estes Termos de Uso.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}
