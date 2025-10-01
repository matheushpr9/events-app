import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { User, Space } from "@/interfaces/space";

function formatPhone(phone: string = "") {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11) {
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  if (digits.length === 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
  return phone;
}

// Normaliza para E.164 com DDI BR (+55); não duplica se já tiver
function toE164BR(phone?: string) {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.startsWith("55")) return `+${digits}`;
  if (digits.startsWith("0")) return `+55${digits.replace(/^0+/, "")}`;
  if (digits.length === 11 || digits.length === 10) return `+55${digits}`;
  if (phone.trim().startsWith("+")) return phone.trim();
  return `+${digits}`;
}

// Retorna a base URL do app (preferir env; fallback para origin no cliente)
function getAppBaseUrl(): string | null {
  if (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/+$/, "");
  }
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, "");
  }
  return null; // SSR sem env: não conseguimos montar absoluto
}

function buildSpaceUrl(spaceId?: number): string | null {
  if (!spaceId && spaceId !== 0) return null;
  const base = getAppBaseUrl();
  const path = `/space/details/${spaceId}`;
  return base ? `${base}${path}` : null; // sem base, evitamos relativo no WhatsApp
}

function buildWhatsAppLink(opts: {
  phone?: string;
  recipientName?: string | null;
  spaceName?: string | null;
  spaceId?: number | null;
}) {
  const e164 = toE164BR(opts.phone);
  if (!e164) return null;

  const name = opts.recipientName?.trim();
  const spaceName = opts.spaceName?.trim();
  const spaceUrl = buildSpaceUrl(
    typeof opts.spaceId === "number" ? opts.spaceId : undefined
  );

  const greeting = name ? `Olá, ${name}!` : "Olá!";

  // Monta a parte do espaço com link (prioriza URL absoluta)
  // Dois estilos (escolha 1): inline ou em nova linha
  const spacePartInline =
    spaceName && spaceUrl
      ? `o espaço ${spaceName} na Floov (${spaceUrl})`
      : spaceName
      ? `o espaço ${spaceName} na Floov`
      : spaceUrl
      ? `o espaço na Floov (${spaceUrl})`
      : `o espaço na Floov`;

  // Mensagem final (compacta; use %0A para linha nova se preferir)
  const text =
    `${greeting} ` +
    `Vi ${spacePartInline} e gostaria de solicitar um orçamento para um evento. ` +
    `Podemos falar?`;

  const encoded = encodeURIComponent(text);
  const number = e164.replace(/^\+/, "");
  return `https://wa.me/${number}?text=${encoded}`;
}

export const SpaceContact = ( space: Space) => {
  const phoneE164 = toE164BR(space.user.phone_number ?? undefined);
  const whatsappLink = buildWhatsAppLink({
    phone: space.user.phone_number ?? undefined,
    recipientName: space.user.name as string,
    spaceName: space?.name,
    spaceId: space?.id,
  });

  return (
    <Card className="border-0 shadow-md bg-white rounded-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg sm:text-2xl font-bold text-[#4e2780]">
          Contato Rápido
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Dados de contato */}
        <div className="flex flex-col gap-3">
          {/* Telefone */}
          <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-xl">
            <Phone className="h-5 w-5 text-[#4e2780]" />
            <span className="font-medium text-[#4e2780] text-base">
              {formatPhone(space.user.phone_number ?? undefined)}
            </span>
          </div>
          {/* E-mail */}
          <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-xl">
            <Mail className="h-5 w-5 text-[#4e2780]" />
            <span className="font-medium text-[#4e2780] text-base break-all">
              {space.user.email}
            </span>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col gap-3 mt-2">
          {/* WhatsApp */}
          <a
            href={whatsappLink ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl shadow-md transition-all duration-300 font-semibold ${
              whatsappLink
                ? "bg-[#25D366] text-white hover:bg-[#1ebe57]"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            aria-label="Conversar no WhatsApp"
            aria-disabled={!whatsappLink}
            onClick={(e) => {
              if (!whatsappLink) e.preventDefault();
            }}
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </a>

          {/* Ligar Agora */}
          <a
            href={phoneE164 ? `tel:${phoneE164}` : "#"}
            className={`flex items-center justify-center gap-2 px-4 py-3 border-2 font-semibold rounded-xl transition-all duration-300 ${
              phoneE164
                ? "border-[#4e2780] text-[#4e2780] hover:bg-[#4e2780] hover:text-white"
                : "border-gray-300 text-gray-400 cursor-not-allowed"
            }`}
            aria-label="Ligar agora"
            aria-disabled={!phoneE164}
            onClick={(e) => {
              if (!phoneE164) e.preventDefault();
            }}
          >
            <Phone className="h-5 w-5" />
            Ligar Agora
          </a>

          {/* E-mail */}
          <a
            href={`mailto:${encodeURIComponent(space.user.email ?? "")}`}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-[#4e2780] text-white font-semibold rounded-xl shadow-md hover:bg-[#3a1e5a] transition-all duration-300"
            aria-label="Enviar e-mail"
          >
            <Mail className="h-5 w-5" />
            Enviar E-mail
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
