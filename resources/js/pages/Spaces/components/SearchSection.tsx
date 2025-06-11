
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Filter } from 'lucide-react';

interface SearchFilters {
  location: string;
  type: string;
  locality: string;
  amenities: string;
  services: string;
}

interface SearchSectionProps {
  onSearch: (filters: SearchFilters) => void;
}

const SearchSection = ({ onSearch }: SearchSectionProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    type: '',
    locality: '',
    amenities: '',
    services: ''
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <section className="bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Encontre o Espaço Perfeito para seu Evento
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra espaços únicos e especiais para tornar seu evento inesquecível
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            {/* Busca Principal */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Digite a cidade ou estado..."
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch} size="lg" className="md:w-auto w-full">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>

            {/* Filtros */}
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filtros:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de espaço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salao-festas">Salão de Festas</SelectItem>
                  <SelectItem value="auditorio">Auditório</SelectItem>
                  <SelectItem value="area-externa">Área Externa</SelectItem>
                  <SelectItem value="coworking">Coworking</SelectItem>
                  <SelectItem value="restaurante">Restaurante</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.locality} onValueChange={(value) => setFilters({ ...filters, locality: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Localização" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="centro">Centro</SelectItem>
                  <SelectItem value="zona-sul">Zona Sul</SelectItem>
                  <SelectItem value="zona-norte">Zona Norte</SelectItem>
                  <SelectItem value="zona-oeste">Zona Oeste</SelectItem>
                  <SelectItem value="zona-leste">Zona Leste</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.amenities} onValueChange={(value) => setFilters({ ...filters, amenities: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Comodidades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="estacionamento">Estacionamento</SelectItem>
                  <SelectItem value="ar-condicionado">Ar Condicionado</SelectItem>
                  <SelectItem value="wifi">Wi-Fi</SelectItem>
                  <SelectItem value="acessibilidade">Acessibilidade</SelectItem>
                  <SelectItem value="cozinha">Cozinha</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.services} onValueChange={(value) => setFilters({ ...filters, services: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Serviços" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="catering">Catering</SelectItem>
                  <SelectItem value="decoracao">Decoração</SelectItem>
                  <SelectItem value="som-luz">Som e Luz</SelectItem>
                  <SelectItem value="seguranca">Segurança</SelectItem>
                  <SelectItem value="limpeza">Limpeza</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SearchSection;
