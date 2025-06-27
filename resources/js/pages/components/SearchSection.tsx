import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Filter } from 'lucide-react';
import { api, initSanctum } from '@/api/api';

interface SearchFilters {
  location: string;
  state: string;
  type: string;
  locality: string;
  amenities: string;
  services: string;
}

interface Space {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  image: string;
  type: string;
  amenities: string[];
}

interface SearchSectionProps {
  onResults: (spaces: Space[]) => void;
  mockSpaces?: Space[];
}

const SearchSection = ({ onResults, mockSpaces = [] }: SearchSectionProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    state: '',
    type: '',
    locality: '',
    amenities: '',
    services: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.location) params.append('city', filters.location);
      if (filters.type) params.append('type', filters.type);
      if (filters.amenities) params.append('amenities', filters.amenities);
      if (filters.services) params.append('services', filters.services);
      if (filters.locality) params.append('locality', filters.locality);
      if (filters.state) params.append('state', filters.state);

      // Se quiser usar mock, descomente a linha abaixo e comente o bloco da API
      // onResults(mockSpaces);

      // Busca real
      await initSanctum();
      const response = await api.get(`/api/spaces/filter?${params.toString()}`);
      onResults(response.data);
    } catch (error) {
      console.error('Erro ao buscar espaços:', error);
      onResults([]);
    } finally {
      setLoading(false);
    }
  };

  const brazilianStates = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' }
  ];

  return (
    <section className="bg-[#f4e6f3] bg-gradient-to-b from-[#f4e6f3] to-[#fff6f1] py-16 px-2 sm:px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold text-[#4e2780] mb-4 md:mb-6 leading-tight">
            Encontre o Espaço
            <span className="block bg-gradient-to-r from-[#4e2780] to-[#7c5ca3] bg-clip-text text-transparent">
              Perfeito para seu Evento
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#4e2780]/70 max-w-3xl mx-auto leading-relaxed">
            Descubra espaços únicos e especiais para tornar seu evento inesquecível.
            De casamentos íntimos a grandes celebrações.
          </p>
        </div>

        {/* Search Card */}
        <Card className="backdrop-blur bg-white/80 shadow-lg border-0 animate-slide-up">
          <CardContent className="p-6 md:p-8">
            {/* Main Search */}
            <form
              className="flex flex-col gap-6 mb-8"
              onSubmit={e => {
                e.preventDefault();
                handleSearch();
              }}
              aria-label="Formulário de busca de espaços"
            >
              <div className="flex flex-col lg:flex-row gap-4">
                {/* State Selector */}
                <div className="w-full lg:w-64">
                  <Select value={filters.state} onValueChange={value => setFilters({ ...filters, state: value })}>
                    <SelectTrigger className="bg-white/90 border-[#4e2780]/20 text-[#4e2780] h-12 rounded-xl focus:ring-2 focus:ring-[#b39ddb]">
                      <SelectValue placeholder="Selecionar Estado" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#4e2780]/20 shadow-lg z-50">
                      {brazilianStates.map(state => (
                        <SelectItem
                          key={state.value}
                          value={state.value}
                          className="text-[#4e2780] hover:bg-[#4e2780]/5 focus:bg-[#4e2780]/5"
                        >
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Search */}
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#4e2780]/50 pointer-events-none" aria-hidden="true" />
                  <Input
                    placeholder="Digite a cidade, bairro ou endereço..."
                    value={filters.location}
                    onChange={e => setFilters({ ...filters, location: e.target.value })}
                    className="pl-12 bg-white/90 border-[#4e2780]/20 text-[#4e2780] h-12 rounded-xl focus:ring-2 focus:ring-[#b39ddb] placeholder:text-[#4e2780]/50"
                    aria-label="Buscar por cidade, bairro ou endereço"
                  />
                </div>

                {/* Search Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#4e2780] bg-gradient-to-br from-[#4e2780] to-[#7c5ca3] text-white font-semibold px-8 h-12 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#b39ddb]"
                  aria-label="Buscar Espaços"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Buscando...
                    </div>
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      Buscar Espaços
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Advanced Filters */}
            <div className="border-t border-[#4e2780]/10 pt-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 bg-[#4e2780]/10 rounded-lg flex items-center justify-center">
                  <Filter className="h-4 w-4 text-[#4e2780]" aria-hidden="true" />
                </div>
                <span className="font-semibold text-[#4e2780]">Filtros Avançados</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select value={filters.type} onValueChange={value => setFilters({ ...filters, type: value })}>
                  <SelectTrigger className="bg-white/80 border-[#4e2780]/20 text-[#4e2780] rounded-xl focus:ring-2 focus:ring-[#b39ddb]">
                    <SelectValue placeholder="Tipo de espaço" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#4e2780]/20 shadow-lg z-50">
                    <SelectItem value="villa" className="text-[#4e2780] hover:bg-[#4e2780]/5">Villa</SelectItem>
                    <SelectItem value="salao" className="text-[#4e2780] hover:bg-[#4e2780]/5">Salão</SelectItem>
                    <SelectItem value="chacara" className="text-[#4e2780] hover:bg-[#4e2780]/5">Chácara</SelectItem>
                    <SelectItem value="sitio" className="text-[#4e2780] hover:bg-[#4e2780]/5">Sítio</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.locality} onValueChange={value => setFilters({ ...filters, locality: value })}>
                  <SelectTrigger className="bg-white/80 border-[#4e2780]/20 text-[#4e2780] rounded-xl focus:ring-2 focus:ring-[#b39ddb]">
                    <SelectValue placeholder="Localização" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#4e2780]/20 shadow-lg z-50">
                    <SelectItem value="urbano" className="text-[#4e2780] hover:bg-[#4e2780]/5">Urbano</SelectItem>
                    <SelectItem value="rural" className="text-[#4e2780] hover:bg-[#4e2780]/5">Rural</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.amenities} onValueChange={value => setFilters({ ...filters, amenities: value })}>
                  <SelectTrigger className="bg-white/80 border-[#4e2780]/20 text-[#4e2780] rounded-xl focus:ring-2 focus:ring-[#b39ddb]">
                    <SelectValue placeholder="Comodidades" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#4e2780]/20 shadow-lg z-50">
                    <SelectItem value="wifi" className="text-[#4e2780] hover:bg-[#4e2780]/5">Wi-Fi</SelectItem>
                    <SelectItem value="estacionamento" className="text-[#4e2780] hover:bg-[#4e2780]/5">Estacionamento</SelectItem>
                    <SelectItem value="jardim" className="text-[#4e2780] hover:bg-[#4e2780]/5">Jardim</SelectItem>
                    <SelectItem value="cozinha" className="text-[#4e2780] hover:bg-[#4e2780]/5">Cozinha</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.services} onValueChange={value => setFilters({ ...filters, services: value })}>
                  <SelectTrigger className="bg-white/80 border-[#4e2780]/20 text-[#4e2780] rounded-xl focus:ring-2 focus:ring-[#b39ddb]">
                    <SelectValue placeholder="Serviços" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#4e2780]/20 shadow-lg z-50">
                    <SelectItem value="catering" className="text-[#4e2780] hover:bg-[#4e2780]/5">Catering</SelectItem>
                    <SelectItem value="decoracao" className="text-[#4e2780] hover:bg-[#4e2780]/5">Decoração</SelectItem>
                    <SelectItem value="som-luz" className="text-[#4e2780] hover:bg-[#4e2780]/5">Som e Luz</SelectItem>
                    <SelectItem value="seguranca" className="text-[#4e2780] hover:bg-[#4e2780]/5">Segurança</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SearchSection;