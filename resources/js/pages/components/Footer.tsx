import { Mail, HelpCircle, Instagram, Facebook, Phone, ArrowUp } from 'lucide-react';
import { useMemo } from 'react';

const Footer = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="w-full bg-white border-t border-[#ede7f6] mt-12">
      <div className="container mx-auto max-w-7xl px-4 py-10 flex flex-col md:flex-row md:justify-between md:items-start gap-10">
        {/* Links institucionais */}
        <nav aria-label="Links institucionais" className="w-full md:w-auto">
          <ul className="flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center">
            <li>
              <a
                href="/privacy-policy"
                className="text-[#4e2780] font-semibold hover:text-[#3a1e5a] transition-colors text-base"
              >
                Política de Privacidade
              </a>
            </li>
            <li>
              <a
                href="/terms-of-use"
                className="text-[#4e2780] font-semibold hover:text-[#3a1e5a] transition-colors text-base"
              >
                Termos de Uso
              </a>
            </li>
            <li>
              <a
                href="/ajuda"
                className="text-[#4e2780] font-semibold hover:text-[#3a1e5a] transition-colors text-base"
              >
                Ajuda / SAC
              </a>
            </li>
          </ul>
        </nav>

        {/* Contato */}
        <div className="w-full md:w-auto flex flex-col gap-2 items-start">
          <div className="flex items-center gap-2 text-[#4e2780] text-base">
            <HelpCircle className="w-5 h-5" />
            <span>Suporte:</span>
            <a href="mailto:suporte@floov.com" className="font-medium hover:text-[#3a1e5a] transition-colors">
              suporte@floov.com
            </a>
          </div>
          <div className="flex items-center gap-2 text-[#4e2780] text-base">
            <Phone className="w-5 h-5" />
            <span>WhatsApp:</span>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-[#3a1e5a] transition-colors"
            >
              (11) 99999-9999
            </a>
          </div>
          <div className="flex items-center gap-2 text-[#4e2780] text-base">
            <Phone className="w-5 h-5" />
            <span>Telefone:</span>
            <a href="tel:+5511999999999" className="font-medium hover:text-[#3a1e5a] transition-colors">
              +55 (11) 99999-9999
            </a>
          </div>
        </div>

        {/* Redes sociais e voltar ao topo */}
        <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-4">
          <div className="flex gap-4">
            <a
              href="https://instagram.com/floovapp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4e2780] hover:text-[#3a1e5a] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://facebook.com/floovapp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4e2780] hover:text-[#3a1e5a] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-[#4e2780] hover:text-[#3a1e5a] text-sm font-medium transition-colors mt-2"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-4 h-4" />
            Voltar ao topo
          </button>
        </div>
      </div>
      <div className="bg-[#ede7f6] py-4 text-center text-[#4e2780]/80 text-sm rounded-b-2xl shadow-inner">
        &copy; {year} floov. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
