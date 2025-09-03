import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Filter, ChevronDown } from 'lucide-react';
import getTypes from '../helpers/get-types';
import getLocalities from '../helpers/get-localities';
import getAmenities from '../helpers/get-amenties';
import getServices from '../helpers/get-services';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import getCapacities from '../helpers/get-capacities';
import { SearchFilters } from '../../interfaces/search-filters';

import './search-section-mobile.css';

interface SearchSectionProps {
    onSearch: (filters: SearchFilters) => void;
    loading: boolean;
    onToast?: (type: 'success' | 'error' | 'info', message: string) => void;
}

const SearchSection = ({ onSearch, loading, onToast }: SearchSectionProps) => {
    const [filters, setFilters] = useState<SearchFilters>({
        city: '',
        state: '',
        type: '',
        locality: '',
        amenities: [],
        services: [],
        capacity: '',
        sort_by: '',
    });
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Dados dinâmicos
    const [amenties, setAmenties] = useState<string[]>([]);
    const [spaceLocality, setSpaceLocality] = useState<string[]>([]);
    const [services, setServices] = useState<string[]>([]);
    const [spaceTypes, setSpaceTypes] = useState<string[]>([]);
    const [capacities, setCapacities] = useState<string[]>([]);

    // Fetch helpers
    useEffect(() => { getAmenities().then(setAmenties).catch(() => setAmenties([])); }, []);
    useEffect(() => { getLocalities().then(setSpaceLocality).catch(() => setSpaceLocality([])); }, []);
    useEffect(() => { getServices().then(setServices).catch(() => setServices([])); }, []);
    useEffect(() => { getTypes().then(setSpaceTypes).catch(() => setSpaceTypes([])); }, []);
    useEffect(() => { getCapacities().then(setCapacities).catch(() => setCapacities([])); }, []);

    const brazilianStates = [
        { value: 'AC', label: 'Acre' }, { value: 'AL', label: 'Alagoas' }, { value: 'AP', label: 'Amapá' },
        { value: 'AM', label: 'Amazonas' }, { value: 'BA', label: 'Bahia' }, { value: 'CE', label: 'Ceará' },
        { value: 'DF', label: 'Distrito Federal' }, { value: 'ES', label: 'Espírito Santo' }, { value: 'GO', label: 'Goiás' },
        { value: 'MA', label: 'Maranhão' }, { value: 'MT', label: 'Mato Grosso' }, { value: 'MS', label: 'Mato Grosso do Sul' },
        { value: 'MG', label: 'Minas Gerais' }, { value: 'PA', label: 'Pará' }, { value: 'PB', label: 'Paraíba' },
        { value: 'PR', label: 'Paraná' }, { value: 'PE', label: 'Pernambuco' }, { value: 'PI', label: 'Piauí' },
        { value: 'RJ', label: 'Rio de Janeiro' }, { value: 'RN', label: 'Rio Grande do Norte' }, { value: 'RS', label: 'Rio Grande do Sul' },
        { value: 'RO', label: 'Rondônia' }, { value: 'RR', label: 'Roraima' }, { value: 'SC', label: 'Santa Catarina' },
        { value: 'SP', label: 'São Paulo' }, { value: 'SE', label: 'Sergipe' }, { value: 'TO', label: 'Tocantins' }
    ];

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!filters.city && !filters.state) {
            onToast?.('info', 'Informe pelo menos cidade ou estado para buscar.');
            return;
        }
        onSearch(filters);
    };

    return (
        <section
            className="bg-[#f4e6f3] bg-gradient-to-b from-[#f4e6f3] to-[#fff6f1] py-4 px-2 sm:px-4"
            aria-label="Seção de busca de espaços"
        >
            <div className="container mx-auto max-w-6xl">
                {/* Hero Section */}
                <div className="text-center mb-4 animate-fade-in">
                    <h1 className="text-2xl md:text-4xl font-bold text-[#4e2780] mb-2 md:mb-4 leading-tight">
                        Seu evento em um clique!
                    </h1>
                    <p className="text-base md:text-lg text-[#4e2780]/70 max-w-2xl mx-auto leading-relaxed">
                        Pesquise, compare e reserve.
                    </p>
                </div>

                {/* Search Card */}
                <Card className="backdrop-blur bg-white/95 shadow-xl border-0 animate-slide-up">
                    <CardContent className="p-2 sm:p-4 md:p-6">
                        {/* Main Search */}
                        <form
                            className="flex flex-col gap-2 md:gap-4 mb-2"
                            onSubmit={handleSearch}
                            aria-label="Formulário de busca de espaços"
                        >
                            <div className="flex flex-col gap-2 md:flex-row md:gap-3">
                                {/* State Selector */}
                                <div className="w-full md:w-64">
                                    <Select
                                        closeMenuOnSelect
                                        isMulti={false}
                                        isClearable
                                        components={makeAnimated()}
                                        placeholder="Selecionar Estado"
                                        options={brazilianStates}
                                        value={brazilianStates.find(option => option.value === filters.state) || null}
                                        onChange={selectedOption => {
                                            setFilters({ ...filters, state: selectedOption ? selectedOption.value : '' });
                                        }}
                                        classNamePrefix="react-select"
                                        aria-label="Selecionar Estado"
                                        styles={{
                                            menu: (provided) => ({
                                                ...provided,
                                                backgroundColor: '#fff',
                                                color: '#4e2780',
                                            }),
                                            option: (provided, state) => ({
                                                ...provided,
                                                backgroundColor: state.isFocused ? '#f4e6f3' : '#fff',
                                                color: '#4e2780',
                                                cursor: 'pointer',
                                            }),
                                            singleValue: (provided) => ({
                                                ...provided,
                                                color: '#4e2780',
                                            }),
                                            placeholder: (provided) => ({
                                                ...provided,
                                                color: '#4e2780aa',
                                            }),
                                        }}
                                    />
                                </div>

                                {/* City Search */}
                                <div className="relative w-full">
                                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#4e2780]/50 pointer-events-none" aria-hidden="true" />
                                    <Input
                                        placeholder="Digite a cidade, bairro ou endereço..."
                                        value={filters.city}
                                        onChange={e => setFilters({ ...filters, city: e.target.value })}
                                        className="pl-12 bg-white/95 border-[#4e2780]/20 text-[#4e2780] h-12 rounded-xl focus:ring-2 focus:ring-[#b39ddb] placeholder:text-[#4e2780]/50 text-base sm:text-lg"
                                        aria-label="Buscar por cidade, bairro ou endereço"
                                    />
                                </div>
                            </div>

                            {/* Search Button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full md:w-auto bg-[#3a1c6e] bg-gradient-to-br from-[#4e2780] to-[#3a1c6e] text-white font-semibold px-8 h-14 rounded-xl hover:shadow-2xl hover:bg-[#2d1554] transition-all duration-300 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#b39ddb] cursor-pointer text-lg"
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
                        </form>

                        {/* Advanced Filters Toggle */}
                        <div className="border-t border-[#4e2780]/10 pt-2 md:pt-4">
                            <button
                                type="button"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="flex items-center gap-2 mb-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b39ddb]"
                                aria-expanded={showAdvanced}
                                aria-controls="advanced-filters"
                            >
                                <div className="w-8 h-8 bg-[#4e2780]/10 rounded-lg flex items-center justify-center">
                                    <Filter className="h-4 w-4 text-[#4e2780]" aria-hidden="true" />
                                </div>
                                <span className="font-semibold text-[#4e2780]">Filtros Avançados</span>
                                <ChevronDown
                                    className={`h-4 w-4 text-[#4e2780] transition-transform duration-300 ${showAdvanced ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {/* Advanced Filters */}
                            <div
                                id="advanced-filters"
                                className={`transition-all duration-300 ${showAdvanced ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                                aria-hidden={!showAdvanced}
                            >
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 md:gap-3 animate-fade-in">
                                    <Select
                                        closeMenuOnSelect
                                        isMulti={false}
                                        isClearable
                                        components={makeAnimated()}
                                        placeholder="Tipo de espaço"
                                        options={spaceTypes.map(type => ({ value: type, label: type }))}
                                        value={spaceTypes.find(type => type === filters.type) ? { value: filters.type, label: filters.type } : null}
                                        onChange={selectedOption => {
                                            setFilters({ ...filters, type: selectedOption ? selectedOption.value : '' });
                                        }}
                                        classNamePrefix="react-select"
                                        aria-label="Tipo de espaço"
                                        styles={{
                                            menu: (provided) => ({
                                                ...provided,
                                                backgroundColor: '#fff',
                                                color: '#4e2780',
                                            }),
                                            option: (provided, state) => ({
                                                ...provided,
                                                backgroundColor: state.isFocused ? '#f4e6f3' : '#fff',
                                                color: '#4e2780',
                                                cursor: 'pointer',
                                            }),
                                            singleValue: (provided) => ({
                                                ...provided,
                                                color: '#4e2780',
                                            }),
                                            placeholder: (provided) => ({
                                                ...provided,
                                                color: '#4e2780aa',
                                            }),
                                        }}
                                    />

                                    <Select
                                        closeMenuOnSelect
                                        isMulti={false}
                                        isClearable
                                        components={makeAnimated()}
                                        placeholder="Localização"
                                        options={spaceLocality.map(locality => ({ value: locality, label: locality }))}
                                        value={spaceLocality.find(locality => locality === filters.locality) ? { value: filters.locality, label: filters.locality } : null}
                                        onChange={selectedOption => {
                                            setFilters({ ...filters, locality: selectedOption ? selectedOption.value : '' });
                                        }}
                                        classNamePrefix="react-select"
                                        aria-label="Localização"
                                        styles={{
                                            menu: (provided) => ({
                                                ...provided,
                                                backgroundColor: '#fff',
                                                color: '#4e2780',
                                            }),
                                            option: (provided, state) => ({
                                                ...provided,
                                                backgroundColor: state.isFocused ? '#f4e6f3' : '#fff',
                                                color: '#4e2780',
                                                cursor: 'pointer',
                                            }),
                                            singleValue: (provided) => ({
                                                ...provided,
                                                color: '#4e2780',
                                            }),
                                            placeholder: (provided) => ({
                                                ...provided,
                                                color: '#4e2780aa',
                                            }),
                                        }}
                                    />

                                    <Select
                                        closeMenuOnSelect
                                        components={makeAnimated()}
                                        placeholder="Comodidades"
                                        isMulti
                                        options={amenties.map(amenity => ({
                                            value: amenity,
                                            label: amenity.charAt(0).toUpperCase() + amenity.slice(1)
                                        }))}
                                        onChange={selectedOptions => {
                                            const options = (selectedOptions ?? []) as { value: string; label: string }[];
                                            setFilters({ ...filters, amenities: options.map(option => option.value) });
                                        }}
                                        classNamePrefix="react-select"
                                        aria-label="Comodidades"
                                        styles={{
                                            menu: (provided) => ({
                                                ...provided,
                                                backgroundColor: '#fff',
                                                color: '#4e2780',
                                            }),
                                            option: (provided, state) => ({
                                                ...provided,
                                                backgroundColor: state.isFocused ? '#f4e6f3' : '#fff',
                                                color: '#4e2780',
                                                cursor: 'pointer',
                                            }),
                                            singleValue: (provided) => ({
                                                ...provided,
                                                color: '#4e2780',
                                            }),
                                            placeholder: (provided) => ({
                                                ...provided,
                                                color: '#4e2780aa',
                                            }),
                                        }}
                                    />

                                    <Select
                                        closeMenuOnSelect
                                        components={makeAnimated()}
                                        placeholder="Serviços"
                                        isMulti
                                        options={services.map(service => ({
                                            value: service,
                                            label: service.charAt(0).toUpperCase() + service.slice(1)
                                        }))}
                                        onChange={selectedOptions => {
                                            const options = (selectedOptions ?? []) as { value: string; label: string }[];
                                            setFilters({ ...filters, services: options.map(option => option.value) });
                                        }}
                                        classNamePrefix="react-select"
                                        aria-label="Serviços"
                                        styles={{
                                            menu: (provided) => ({
                                                ...provided,
                                                backgroundColor: '#fff',
                                                color: '#4e2780',
                                            }),
                                            option: (provided, state) => ({
                                                ...provided,
                                                backgroundColor: state.isFocused ? '#f4e6f3' : '#fff',
                                                color: '#4e2780',
                                                cursor: 'pointer',
                                            }),
                                            singleValue: (provided) => ({
                                                ...provided,
                                                color: '#4e2780',
                                            }),
                                            placeholder: (provided) => ({
                                                ...provided,
                                                color: '#4e2780aa',
                                            }),
                                        }}
                                    />

                                    <Select
                                        closeMenuOnSelect
                                        isMulti={false}
                                        isClearable
                                        components={makeAnimated()}
                                        placeholder="Capacidade"
                                        options={capacities.map((capacity, idx) => ({
                                            value: capacity,
                                            label:
                                                idx === capacities.length - 1
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
                                        classNamePrefix="react-select"
                                        aria-label="Capacidade"
                                        styles={{
                                            menu: (provided) => ({
                                                ...provided,
                                                backgroundColor: '#fff',
                                                color: '#4e2780',
                                            }),
                                            option: (provided, state) => ({
                                                ...provided,
                                                backgroundColor: state.isFocused ? '#f4e6f3' : '#fff',
                                                color: '#4e2780',
                                                cursor: 'pointer',
                                            }),
                                            singleValue: (provided) => ({
                                                ...provided,
                                                color: '#4e2780',
                                            }),
                                            placeholder: (provided) => ({
                                                ...provided,
                                                color: '#4e2780aa',
                                            }),
                                        }}
                                    />

                                    {/* Sort Order */}
                                    <Select
                                        closeMenuOnSelect
                                        isMulti={false}
                                        isClearable
                                        components={makeAnimated()}
                                        placeholder="Ordenar por"
                                        options={[
                                            { value: 'most_relevant', label: 'Mais Relevantes' },
                                            { value: 'least_relevant', label: 'Menos Relevantes' },
                                            { value: 'newest', label: 'Cadastrados há menos tempo' },
                                            { value: 'oldest', label: 'Cadastrados há mais tempo' }
                                        ]}
                                        value={
                                            [
                                                { value: 'most_relevant', label: 'Mais Relevantes' },
                                                { value: 'least_relevant', label: 'Menos Relevantes' },
                                                { value: 'newest', label: 'Cadastrados há menos tempo' },
                                                { value: 'oldest', label: 'Cadastrados há mais tempo' }
                                            ].find(option => option.value === filters.sort_by) || null
                                        }
                                        onChange={selectedOption => {
                                            setFilters({ ...filters, sort_by: selectedOption ? selectedOption.value : '' });
                                        }}
                                        classNamePrefix="react-select"
                                        aria-label="Ordenar por"
                                        styles={{
                                            menu: (provided) => ({
                                                ...provided,
                                                backgroundColor: '#fff',
                                                color: '#4e2780',
                                            }),
                                            option: (provided, state) => ({
                                                ...provided,
                                                backgroundColor: state.isFocused ? '#f4e6f3' : '#fff',
                                                color: '#4e2780',
                                                cursor: 'pointer',
                                            }),
                                            singleValue: (provided) => ({
                                                ...provided,
                                                color: '#4e2780',
                                            }),
                                            placeholder: (provided) => ({
                                                ...provided,
                                                color: '#4e2780aa',
                                            }),
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default SearchSection;
