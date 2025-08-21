import { useEffect, useState } from 'react';
import { Shield, CheckCircle } from 'lucide-react';

const TERMS_KEY = 'floov_terms_accepted_v1'; // versionamento para futuros updates

export default function TermsConsentModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Só mostra se ainda não aceitou
    const accepted = localStorage.getItem(TERMS_KEY);
    if (!accepted) setOpen(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(TERMS_KEY, 'true');
    setOpen(false);
  };

  // Impede scroll do body enquanto o modal está aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 sm:p-8 relative animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-7 h-7 text-[#4e2780]" aria-hidden />
          <h2 className="text-lg sm:text-xl font-bold text-[#4e2780]">
            Termos de Uso & Política de Privacidade
          </h2>
        </div>
        <div className="text-[#4e2780]/80 text-sm sm:text-base max-h-[50vh] overflow-y-auto pr-1 mb-6 space-y-3">
          <p>
            <strong>Última atualização:</strong> [preencher data]
          </p>
          <p>
            Bem-vindo à Floov, plataforma online de intermediação de espaços para eventos. Ao acessar ou utilizar nosso site, você concorda com nossos <a href="/termos-de-uso" className="underline text-[#4e2780] hover:text-[#3a1e5a]" target="_blank" rel="noopener noreferrer">Termos de Uso</a> e <a href="/politica-de-privacidade" className="underline text-[#4e2780] hover:text-[#3a1e5a]" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Você deve fornecer informações verdadeiras e manter sua conta segura.</li>
            <li>O uso da plataforma implica concordância com as regras de conteúdo, pagamentos, cancelamentos e proteção de dados (LGPD).</li>
            <li>Seus dados são tratados com segurança e nunca serão vendidos para terceiros.</li>
            <li>Você pode acessar, corrigir ou excluir seus dados a qualquer momento.</li>
          </ul>
          <p>
            Leia os documentos completos para entender seus direitos e deveres. Se não concordar, recomendamos não utilizar a plataforma.
          </p>
        </div>
        <button
          onClick={handleAccept}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#4e2780] text-white font-semibold rounded-xl shadow-md hover:bg-[#3a1e5a] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#b39ddb] focus:outline-none text-base"
          aria-label="Aceitar Termos e Continuar"
        >
          <CheckCircle className="w-5 h-5" />
          Li e aceito os Termos de Uso e Política de Privacidade
        </button>
        <p className="text-xs text-[#4e2780]/60 text-center mt-3">
          Você só poderá navegar após aceitar os termos.
        </p>
      </div>
    </div>
  );
}
