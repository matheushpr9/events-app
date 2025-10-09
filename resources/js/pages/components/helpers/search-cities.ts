export type CitySuggestion = {
  city: string;
  state: string;
};

function normalizeText(s: string) {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function extractUfSigla(item: any): string | null {
  const paths = [
    item?.microrregiao?.mesorregiao?.UF?.sigla,
    item?.['regiao-imediata']?.['regiao-intermediaria']?.UF?.sigla,
    item?.['regiao-imediata']?.['regiao-intermediaria']?.UF?.sigla,
  ];

  for (const p of paths) {
    if (p && typeof p === 'string') return p;
  }

  function findUf(obj: any): string | null {
    if (!obj || typeof obj !== 'object') return null;
    if (obj?.UF && typeof obj.UF?.sigla === 'string') return obj.UF.sigla;
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (val && typeof val === 'object') {
        const found = findUf(val);
        if (found) return found;
      }
    }
    return null;
  }

  return findUf(item) ?? null;
}

export default async function searchCities(q: string, signal?: AbortSignal): Promise<CitySuggestion[]> {
  const termRaw = q?.trim();
  if (!termRaw || termRaw.length < 2) return [];

  const term = normalizeText(termRaw);

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/municipios?nome_like=${encodeURIComponent(termRaw)}`;

  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`IBGE API retornou ${res.status}`);
  }
  const data = await res.json();
  if (!Array.isArray(data)) return [];

  const mapped: CitySuggestion[] = data.map((item: any) => {
    const city = item?.nome ?? '';
    const state = extractUfSigla(item) ?? '';
    return { city, state };
  })
  .filter(c => {
    if (!c.city || !c.state) return false;
    const cityNorm = normalizeText(c.city);
    return cityNorm.startsWith(term);
  });

  const seen = new Set<string>();
  const deduped: CitySuggestion[] = [];
  for (const c of mapped) {
    const key = `${c.city}|${c.state}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(c);
    }
  }

  return deduped.slice(0, 40);
}
