import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Filter } from 'lucide-react';
import { api, initSanctum } from '@/api/api';
import {Space} from '../../interfaces/space'
import { SearchFilters } from '../../interfaces/search-filters';
import getTypes from '../helpers/get-types';
import getLocalities from '../helpers/get-localities';
import getAmenities from '../helpers/get-amenties';
import getServices from '../helpers/get-services';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import getCapacities from '../helpers/get-capacities';

interface SearchSectionProps {
  onResults: (spaces: Space[]) => void;
  Spaces?: Space[];
}

const SearchSection = ({ onResults, Spaces }: SearchSectionProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    city: '',
    state: '',
    type: '',
    locality: '',
    amenities: [],
    services: [],
    capacity: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      if (Spaces && Spaces.length > 0) {
        const filtered = Spaces.filter(space => {
          const matchCity = !filters.city || space.address.city.toLowerCase().includes(filters.city.toLowerCase());
          const matchType = !filters.type || space.type.toLowerCase() === filters.type.toLowerCase();
          const matchAmenities = !(filters.amenities.length>0) || space.amenities.some(amenity =>
            filters.amenities.includes(amenity.toLowerCase())
          );
          const matchServices = !(filters.services.length>0) || space.services.some(service =>
            filters.services.includes(service.toLowerCase())
          );
          return matchCity && matchType && matchAmenities && matchServices ;
        });
        onResults(filtered);
      } else {
        await initSanctum();
        const params = new URLSearchParams();
        if (filters.city) params.append('city', filters.city);
        if (filters.type) params.append('type', filters.type);
        if (filters.amenities.length > 0) params.append('amenities', filters.amenities.join(','));
        if (filters.services.length > 0) params.append('services', filters.services.join(','));
        if (filters.locality) params.append('locality', filters.locality);
        if (filters.state) params.append('state', filters.state);
        if (filters.capacity) params.append('people_capacity', filters.capacity);
        const response = await api.get(`/api/spaces/filter?${params.toString()}`);
        onResults(response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar espaços:', error);
      onResults([]);
    } finally {
      setLoading(false);
    }
  };

  const [amenties, setAmenties] = useState<string[]>([]);
  useEffect(() =>{
    getAmenities()
      .then(setAmenties)
      .catch(() => setAmenties([]));
  },[]);

  const [spaceLocality, setSpaceLocality] = useState<string[]>([]);
  useEffect(
    () =>{
      getLocalities()
      .then(setSpaceLocality)
      .catch(()=> setSpaceLocality([]));
    }, []);

  const [services, setServices] = useState<string[]>([]);
  useEffect(() => {
    getServices()
    .then(setServices)
    .catch(() => setServices([]));
  }, []);

  const [spaceTypes, setSpaceTypes] = useState<string[]>([]);
  
  useEffect(() => {
    getTypes()
      .then(setSpaceTypes)
      .catch(() => setSpaceTypes([]));
  }, []);

  const [capacities, setCapacities] = useState<string[]>([]);
  useEffect(() => {
    getCapacities()
      .then(setCapacities)
      .catch(() => setCapacities([]));
  },[]);


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
            Seu casamento em um clique!
          </h1>
          <p className="text-lg md:text-xl text-[#4e2780]/70 max-w-3xl mx-auto leading-relaxed">
            Descubra espaços únicos e especiais para tornar seu casamento inesquecível.
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
                  <Select
                    closeMenuOnSelect={true}
                    isMulti={false}
                    isClearable={true}
                    components={makeAnimated()}
                    placeholder="Selecionar Estado"
                    options={brazilianStates.map(state => ({ value: state.value, label: state.label }))}
                    value={brazilianStates.find(option => option.value === filters.state) || null}
                    onChange={selectedOption => {
                      setFilters({ ...filters, state: selectedOption ? selectedOption.value : '' });
                    }}
                    className="bg-white/90 border-[#4e2780]/20 text-[#4e2780] h-12 rounded-xl focus:ring-2 focus:ring-[#b39ddb]"
                  />
                </div>

                {/* City Search */}
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#4e2780]/50 pointer-events-none" aria-hidden="true" />
                  <Input
                    placeholder="Digite a cidade, bairro ou endereço..."
                    value={filters.city}
                    onChange={e => setFilters({ ...filters, city: e.target.value })}
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
                <Select
                  closeMenuOnSelect={true}
                  isMulti={false}
                  isClearable={true}
                  components={makeAnimated()}
                  placeholder='Tipo de espaço'
                  options={spaceTypes.map(type => ({value: type, label: type}))}
                  value={spaceTypes.find(type => type === filters.type) ? { value: filters.type, label: filters.type } : null}
                  onChange={selectedOption => {
                    setFilters({ ...filters, type: selectedOption ? selectedOption.value : '' });
                  }}
                  className="bg-white/80 border-[#4e2780]/20 text-[#4e2780] rounded-xl focus:ring-2 focus:ring-[#b39ddb]"
                />
                <Select
                  closeMenuOnSelect={true}
                  isMulti={false}
                  isClearable={true}
                  components={makeAnimated()}
                  placeholder='Localização'
                  options={spaceLocality.map(locality => ({ value: locality, label: locality }))}
                  value={spaceLocality.find(locality => locality === filters.locality) ? { value: filters.locality, label: filters.locality } : null}
                  onChange={selectedOption => {
                    setFilters({ ...filters, locality: selectedOption ? selectedOption.value : '' });
                  }}
                  className="bg-white/80 border-[#4e2780]/20 text-[#4e2780] rounded-xl focus:ring-2 focus:ring-[#b39ddb]"
                />
                <Select 
                  closeMenuOnSelect={false}
                  components={makeAnimated()}
                  placeholder='Comodidades'
                  isMulti
                  options={amenties.map(amenity => ({ value: amenity, label: amenity.charAt(0).toUpperCase() + amenity.slice(1) }))}
                  onChange={selectedOptions => {
                  const options = (selectedOptions ?? []) as { value: string; label: string }[];
                  const selectedValues = options.map(option => option.value);
                  setFilters({ ...filters, amenities: selectedValues });
                }}
                  className="bg-white/80 border-[#4e2780]/20 text-[#4e2780] rounded-xl focus:ring-2 focus:ring-[#b39ddb] hover:bg-[#4e2780]/5"
                />
                <Select
                  closeMenuOnSelect={false}
                  components={makeAnimated()}
                  placeholder='Serviços'
                  isMulti
                  options={services.map(service => ({ value: service, label: service.charAt(0).toUpperCase() + service.slice(1) }))}
                  onChange={selectedOptions => {
                    const options = (selectedOptions ?? []) as { value: string; label: string }[];
                    const selectedValues = options.map(option => option.value);
                    setFilters({ ...filters, services: selectedValues });
                  }}
                  className="bg-white/80 border-[#4e2780]/20 text-[#4e2780] rounded-xl focus:ring-2 focus:ring-[#b39ddb] hover:bg-[#4e2780]/5"
                />
                <Select
                  closeMenuOnSelect={true}
                  isMulti={false}
                  isClearable={true}
                  components={makeAnimated()}
                  placeholder='Capacidade'
                  options={capacities.map((capacity, idx) => ({
                    value: capacity, // value é o número puro
                    label: idx === capacities.length - 1
                      ? `Mais de ${capacity} pessoas`
                      : `Até ${capacity} pessoas`
                  }))}
                  value={
                    filters.capacity
                      ? {
                          value: filters.capacity,
                          label:
                            capacities[capacities.length - 1] === filters.capacity
                              ? `Mais de ${filters.capacity} pessoas`
                              : `Até ${filters.capacity} pessoas`
                        }
                      : null
                  }
                  onChange={selectedOption => {
                    setFilters({ ...filters, capacity: selectedOption ? selectedOption.value : '' });
                  }}
                  className="bg-white/80 border-[#4e2780]/20 text-[#4e2780] rounded-xl focus:ring-2 focus:ring-[#b39ddb] hover:bg-[#4e2780]/5"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SearchSection;