import { useState, ChangeEvent, FormEventHandler, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { LoaderCircle, Upload, X, ImageIcon, MapPin, DollarSign, Calendar, Home } from 'lucide-react';
import Header from '../components/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api, initSanctum } from '../../api/api';
import axios from 'axios';
import getTypes from '../helpers/get-types';
import getLocalities from '../helpers/get-localities';
import getAmenities from '../helpers/get-amenties';
import getServices from '../helpers/get-services';
import getCapacities from '../helpers/get-capacities';
import { Head } from '@inertiajs/react';
import Footer from '../components/Footer';

type SpaceFormType = {
    name: string;
    images: File[];
    people_capacity: string;
    postal_code: string;
    street: string;
    neighborhood: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    country: string;
    type: string;
    locality: string;
    amenities: string[];
    services: string[];
    description: string;
};

export default function Index() {

    const [amenitiesOptions, setAmenitiesOptions] = useState<string[]>([]);
    useEffect(() => {
        getAmenities()
            .then(setAmenitiesOptions)
            .catch(() => setAmenitiesOptions([]));
    }, []);

    const [servicesOptions, setServicesOptions] = useState<string[]>([]);
    useEffect(() => {
        getServices()
            .then(setServicesOptions)
            .catch(() => setServicesOptions([]));
    }, []);

    const [localityOptions, setLocalityOptions] = useState<string[]>([]);

    useEffect(() => {
        getLocalities()
            .then(setLocalityOptions)
            .catch(() => setLocalityOptions([]));
    }, []);

    const [typeOptions, setTypeOptions] = useState<string[]>([]);
    useEffect(() => {
        getTypes()
            .then(setTypeOptions)
            .catch(() => setTypeOptions([]));
    }, []);

    const [capacities, setCapacities] = useState<string[]>([]);
    useEffect(() => {
        getCapacities()
            .then(setCapacities)
            .catch(() => setCapacities([]));
    }, []);

    const [data, setData] = useState<SpaceFormType>({
        name: '',
        images: [],
        people_capacity: '',
        postal_code: '',
        street: '',
        neighborhood: '',
        number: '',
        complement: '',
        city: '',
        state: '',
        country: '',
        type: '',
        locality: '',
        amenities: [],
        services: [],
        description: '',
    });

    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const validateForm = (): boolean => {
        const newErrors: string[] = [];

        // Validação de nome
        if (!data.name.trim()) {
            newErrors.push('Nome do espaço é obrigatório');
        }

        // Validação de imagens
        if (data.images.length === 0) {
            newErrors.push('Adicione pelo menos uma imagem do espaço');
        }

        // Validação de capacidade de pessoas
        if (!data.people_capacity.trim()) {
            newErrors.push('Capacidade de pessoas é obrigatória');
        }

        // Validação de endereço
        if (!data.postal_code.trim()) {
            newErrors.push('CEP é obrigatório');
        }
        if (!data.street.trim()) {
            newErrors.push('Rua/Avenida é obrigatória');
        }
        if (!data.neighborhood.trim()) {
            newErrors.push('Bairro é obrigatório');
        }
        if (!data.number.trim()) {
            newErrors.push('Número é obrigatório');
        }
        if (!data.city.trim()) {
            newErrors.push('Cidade é obrigatória');
        }
        if (!data.state.trim()) {
            newErrors.push('Estado é obrigatório');
        }
        if (!data.country.trim()) {
            newErrors.push('País é obrigatório');
        }

        // Validação de tipo e localidade
        if (!data.type) {
            newErrors.push('Tipo do espaço é obrigatório');
        }
        if (!data.locality) {
            newErrors.push('Localidade é obrigatória');
        }

        // Validação de comodidades e serviços
        if (data.amenities.length === 0) {
            newErrors.push('Selecione pelo menos uma comodidade');
        }
        if (data.services.length === 0) {
            newErrors.push('Selecione pelo menos um serviço');
        }

        // Validação de descrição
        if (!data.description.trim()) {
            newErrors.push('Descrição do espaço é obrigatória');
        }

        setErrors(newErrors);

        if (newErrors.length > 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        return newErrors.length === 0;
    };

    const fetchAddressByCep = async (cep: string) => {
        try {
            const cleanCep = cep.replace(/\D/g, '');
            if (cleanCep.length !== 8) return;
            const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
            const address = await res.json();
            console.log('Resposta ViaCEP:', address); // <-- Adicione este log
            if (!address.erro) {
                setData(prev => ({
                    ...prev,
                    street: address.logradouro || '',
                    neighborhood: address.bairro || '',
                    city: address.localidade || '',
                    state: address.uf || '',
                    country: 'Brasil',
                }));
            }
        } catch (err) {
            console.error('Erro ao buscar endereço:', err);
            alert('Erro ao buscar endereço. Verifique o CEP informado.');
        }
    };

    useEffect(() => {
        if (data.postal_code && data.postal_code.replace(/\D/g, '').length === 8) {
            fetchAddressByCep(data.postal_code);
        }
    }, [data.postal_code]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setData(prev => ({ ...prev, images: Array.from(e.target.files!) }));
        }
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Por favor, preencha todos os campos obrigatórios!', { /* ... */ });
            return;
        }

        const validImages = data.images.filter(file => file && file.size > 0 && file.type.startsWith('image/'));
        setProcessing(true);

        const formData = new FormData();
        formData.append('name', data.name);
        validImages.forEach((file) => formData.append('images[]', file));
        formData.append('people_capacity', data.people_capacity);
        formData.append('postal_code', data.postal_code);
        formData.append('street', data.street);
        formData.append('neighborhood', data.neighborhood);
        formData.append('number', data.number);
        formData.append('complement', data.complement);
        formData.append('city', data.city);
        formData.append('state', data.state);
        formData.append('country', data.country);
        formData.append('type', data.type);
        formData.append('locality', data.locality);
        formData.append('description', data.description);
        data.amenities.forEach((item) => formData.append('amenities[]', item));
        data.services.forEach((item) => formData.append('services[]', item));

        try {
            await initSanctum(); // Garante o CSRF antes do POST

            const response = await api.post('/api/spaces', formData);
            if (response.status !== 201) {
                throw new Error('Erro ao cadastrar espaço');
            }

            setData({
                name: '',
                images: [],
                people_capacity: '',
                postal_code: '',
                street: '',
                neighborhood: '',
                number: '',
                complement: '',
                city: '',
                state: '',
                country: '',
                type: '',
                locality: '',
                amenities: [],
                services: [],
                description: '',
            });
            setErrors([]);
            setTimeout(() => {
                toast.success('Espaço cadastrado com sucesso!', { /* ... */ });
            }, 100);
            window.location.href = '/';
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                // err.response?.data.message, etc.
                toast.error('Erro ao cadastrar espaço: ' + (err.response?.data?.message || 'Tente novamente.'), { /* ... */ });
            } else {
                toast.error('Erro inesperado ao cadastrar espaço. Tente novamente.', { /* ... */ });
            }
            console.error('Erro ao cadastrar espaço:', err);
        } finally {
            setProcessing(false);
        }
    };

    const removeImage = (idx: number) => {
        setData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== idx)
        }));
    };

    const handleAddImages = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setData(prev => ({
                ...prev,
                images: [...prev.images, ...Array.from(e.target.files!)]
            }));
        }
    };

    const toggleAmenity = (amenity: string) => {
        setData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const toggleService = (service: string) => {
        setData(prev => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter(s => s !== service)
                : [...prev.services, service]
        }));
    };

    return (
        <>
            <Head title="Cadastrar Espaço" />
            <Header />
            <div>
                <div className="min-h-screen bg-[#fff6f1] py-10 px-4">
                    <div className="container mx-auto max-w-3xl">
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#4e2780] to-[#7c5ca3] bg-clip-text text-transparent mb-2 drop-shadow">
                                Cadastrar Espaço para Eventos
                            </h1>
                            <p className="text-[#4e2780]/70 text-lg">
                                Preencha os dados para cadastrar seu espaço e começar a receber reservas.
                            </p>
                        </div>

                        {/* Exibir erros de validação */}
                        {errors.length > 0 && (
                            <Card className="border-[#e57373] bg-[#fdeaea] mb-6">
                                <CardContent className="pt-4">
                                    <div className="text-[#b71c1c]">
                                        <h3 className="font-semibold mb-2">Campos obrigatórios não preenchidos:</h3>
                                        <ul className="list-disc list-inside space-y-1">
                                            {errors.map((error, index) => (
                                                <li key={index} className="text-sm">{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <form onSubmit={submit} className="space-y-10">
                            {/* Images Section */}
                            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center gap-2 text-xl text-[#4e2780] font-bold">
                                        <ImageIcon className="w-5 h-5 text-[#4e2780]" />
                                        Fotos do Espaço *
                                    </CardTitle>
                                    <CardDescription>
                                        Adicione fotos atrativas do seu espaço para chamar atenção dos clientes.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="border-2 border-dashed border-[#b39ddb] rounded-lg p-6 text-center hover:border-[#4e2780] transition-colors bg-[#f4e6f3]/30">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={e => {
                                                    handleFileChange(e);
                                                    e.target.value = '';
                                                }}
                                                disabled={processing}
                                                className="hidden"
                                                id="images-upload"
                                            />
                                            <Label htmlFor="images-upload" className="cursor-pointer flex flex-col items-center">
                                                <Upload className="w-10 h-10 text-[#7c5ca3] mx-auto mb-2 animate-bounce" />
                                                <span className="text-base font-semibold text-[#4e2780]">Clique ou arraste para adicionar fotos</span>
                                                <span className="text-xs text-[#4e2780]/60">PNG, JPG até 10MB cada</span>
                                            </Label>
                                        </div>

                                        {/* Image Preview Grid */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {data.images.map((file, idx) => (
                                                <div key={idx} className="relative group">
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={`Preview ${idx}`}
                                                        className="w-full h-24 object-cover rounded-lg border-2 border-[#b39ddb] shadow-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(idx)}
                                                        className="absolute -top-2 -right-2 bg-[#e57373] text-white rounded-full p-1 opacity-80 group-hover:opacity-100 transition-opacity hover:bg-[#b71c1c] shadow"
                                                        aria-label="Remover imagem"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}

                                            {/* Add More Button */}
                                            {data.images.length > 0 && (
                                                <label className="h-24 border-2 border-dashed border-[#b39ddb] rounded-lg flex items-center justify-center cursor-pointer hover:border-[#4e2780] hover:bg-[#f4e6f3] transition-colors group">
                                                    <div className="text-center">
                                                        <Upload className="w-7 h-7 text-[#7c5ca3] group-hover:text-[#4e2780] mx-auto mb-1" />
                                                        <span className="text-xs text-[#4e2780] font-medium">Adicionar</span>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        multiple
                                                        onChange={handleAddImages}
                                                        className="hidden"
                                                        disabled={processing}
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Basic Information */}
                            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center gap-2 text-xl text-[#4e2780] font-bold">
                                        <Home className="w-5 h-5 text-[#4e2780]" />
                                        Informações Básicas
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="name" className="text-sm font-semibold text-[#4e2780]">Nome do Espaço *</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                value={data.name}
                                                onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
                                                placeholder="Ex: Villa Elegante"
                                                className="bg-white text-[#4e2780] border border-[#b39ddb] placeholder:text-[#7c5ca3] focus:ring-2 focus:ring-[#b39ddb]"
                                                maxLength={80}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="type" className="text-sm font-semibold text-[#4e2780]">Tipo do Espaço *</Label>
                                            <Select value={data.type} onValueChange={(value) => setData(prev => ({ ...prev, type: value }))}>
                                                <SelectTrigger className="bg-white text-[#4e2780] border border-[#b39ddb] focus:ring-2 focus:ring-[#b39ddb] cursor-pointer">
                                                    <SelectValue placeholder="Selecione o tipo" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-background border-input">
                                                    {typeOptions.map(option => (
                                                        <SelectItem
                                                            key={option}
                                                            value={option}
                                                            className="text-foreground hover:bg-[#f4e6f3] cursor-pointer"
                                                        >
                                                            {option}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="locality" className="text-sm font-semibold text-[#4e2780]">Localidade *</Label>
                                            <Select value={data.locality} onValueChange={(value) => setData(prev => ({ ...prev, locality: value }))}>
                                                <SelectTrigger className="bg-white text-[#4e2780] border border-[#b39ddb] focus:ring-2 focus:ring-[#b39ddb] cursor-pointer">
                                                    <SelectValue placeholder="Selecione a localidade" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-background border-input">
                                                    {localityOptions.map(option => (
                                                        <SelectItem key={option} value={option} className="text-foreground hover:bg-[#f4e6f3] cursor-pointer">{option}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="type" className="text-sm font-semibold text-[#4e2780]">Capacidade *</Label>
                                            <Select value={data.people_capacity} onValueChange={(value) => setData(prev => ({ ...prev, people_capacity: value }))}>
                                                <SelectTrigger className="bg-white text-[#4e2780] border border-[#b39ddb] focus:ring-2 focus:ring-[#b39ddb] cursor-pointer">
                                                    <SelectValue placeholder="Capacidade máxima de pessoas" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-background border-input ">
                                                    {capacities.map((capacity, idx) => {
                                                        const label = idx === capacities.length - 1
                                                            ? `Mais de ${capacity} pessoas`
                                                            : `Até ${capacity} pessoas`;
                                                        return (
                                                            <SelectItem key={capacity} value={label} className="text-foreground hover:bg-[#f4e6f3] cursor-pointer">
                                                                {label}
                                                            </SelectItem>
                                                        );
                                                    })}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Address Section */}
                            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center gap-2 text-xl text-[#4e2780] font-bold">
                                        <MapPin className="w-5 h-5 text-[#7c5ca3]" />
                                        Endereço
                                    </CardTitle>
                                    <CardDescription>
                                        Informe o endereço completo do seu espaço para eventos.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2 text-sm font-semibold text-purple-700">
                                                <MapPin className="w-4 h-4" />
                                                CEP *
                                            </Label>
                                            <Input
                                                type="text"
                                                value={data.postal_code}
                                                onChange={e => setData(prev => ({ ...prev, postal_code: e.target.value }))}
                                                placeholder="00000-000"
                                                className="bg-white text-gray-800 border border-gray-300 placeholder:text-muted-foreground focus:ring-2 focus:ring-purple-400"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="street" className="text-sm font-semibold text-purple-700">Rua/Avenida *</Label>
                                            <Input
                                                id="street"
                                                type="text"
                                                value={data.street}
                                                onChange={e => setData(prev => ({ ...prev, street: e.target.value }))}
                                                placeholder="Ex: Rua das Flores"
                                                className="bg-white text-gray-800 border border-gray-300 placeholder:text-muted-foreground focus:ring-2 focus:ring-purple-400"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="number" className="text-sm font-semibold text-purple-700">Número *</Label>
                                            <Input
                                                id="number"
                                                type="text"
                                                value={data.number}
                                                onChange={e => setData(prev => ({ ...prev, number: e.target.value }))}
                                                placeholder="Ex: 123"
                                                className="bg-white text-gray-800 border border-gray-300 placeholder:text-muted-foreground focus:ring-2 focus:ring-purple-400"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="complement" className="text-sm font-semibold text-purple-700">Complemento</Label>
                                            <Input
                                                id="complement"
                                                type="text"
                                                value={data.complement}
                                                onChange={e => setData(prev => ({ ...prev, complement: e.target.value }))}
                                                placeholder="Ex: Bloco A, Apto 101"
                                                className="bg-white text-gray-800 border border-gray-300 placeholder:text-muted-foreground focus:ring-2 focus:ring-purple-400"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="neighborhood" className="text-sm font-semibold text-purple-700">Bairro *</Label>
                                            <Input
                                                id="neighborhood"
                                                type="text"
                                                value={data.neighborhood}
                                                onChange={e => setData(prev => ({ ...prev, neighborhood: e.target.value }))}
                                                placeholder="Ex: Centro"
                                                className="bg-white text-gray-800 border border-gray-300 placeholder:text-muted-foreground focus:ring-2 focus:ring-purple-400"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="city" className="text-sm font-semibold text-purple-700">Cidade *</Label>
                                            <Input
                                                id="city"
                                                type="text"
                                                value={data.city}
                                                onChange={e => setData(prev => ({ ...prev, city: e.target.value }))}
                                                placeholder="Ex: São Paulo"
                                                className="bg-white text-gray-800 border border-gray-300 placeholder:text-muted-foreground focus:ring-2 focus:ring-purple-400"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="state" className="text-sm font-semibold text-purple-700">Estado *</Label>
                                            <Input
                                                id="state"
                                                type="text"
                                                value={data.state}
                                                onChange={e => setData(prev => ({ ...prev, state: e.target.value }))}
                                                placeholder="Ex: SP"
                                                className="bg-white text-gray-800 border border-gray-300 placeholder:text-muted-foreground focus:ring-2 focus:ring-purple-400"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="country" className="text-sm font-semibold text-purple-700">País *</Label>
                                            <Input
                                                id="country"
                                                type="text"
                                                value={data.country}
                                                onChange={e => setData(prev => ({ ...prev, country: e.target.value }))}
                                                placeholder="Ex: Brasil"
                                                className="bg-white text-gray-800 border border-gray-300 placeholder:text-muted-foreground focus:ring-2 focus:ring-purple-400"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Amenities and Services */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Amenities */}
                                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-lg text-[#4e2780]">Comodidades *</CardTitle>
                                        <CardDescription>Selecione as comodidades disponíveis</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {amenitiesOptions.map(amenity => (
                                                <Badge
                                                    key={amenity}
                                                    variant={data.amenities.includes(amenity) ? "default" : "outline"}
                                                    className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150
        ${data.amenities.includes(amenity)
                                                            ? "bg-[#4e2780] text-white shadow"
                                                            : "bg-white text-[#4e2780] border-[#b39ddb] hover:bg-[#f4e6f3]"}
      `}
                                                    onClick={() => toggleAmenity(amenity)}
                                                    aria-pressed={data.amenities.includes(amenity)}
                                                    tabIndex={0}
                                                >
                                                    {amenity}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Services */}
                                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-lg text-[#4e2780]">Serviços *</CardTitle>
                                        <CardDescription>Selecione os serviços oferecidos</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {servicesOptions.map(service => (
                                                <Badge
                                                    key={service}
                                                    variant={data.services.includes(service) ? "default" : "outline"}
                                                    className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150
        ${data.services.includes(service)
                                                            ? "bg-[#4e2780] text-white shadow"
                                                            : "bg-white text-[#4e2780] border-[#b39ddb] hover:bg-[#f4e6f3]"}
      `}
                                                    onClick={() => toggleService(service)}
                                                    aria-pressed={data.services.includes(service)}
                                                    tabIndex={0}
                                                >
                                                    {service}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Description */}
                            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl text-[#4e2780]">Descrição do Espaço *</CardTitle>
                                    <CardDescription>
                                        Descreva seu espaço de forma atrativa e detalhada.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData(prev => ({ ...prev, description: e.target.value }))}
                                        placeholder="Descreva as características únicas do seu espaço, o ambiente, as facilidades oferecidas e o que torna especial para eventos..."
                                        className="min-h-[120px] bg-white text-[#4e2780] border border-[#b39ddb] placeholder:text-[#7c5ca3] focus:border-[#4e2780] focus:ring-2 focus:ring-[#b39ddb] rounded-md shadow-sm transition resize-none w-full pl-1.5 pr-1.5"
                                    />
                                </CardContent>
                            </Card>

                            {/* Submit Button */}
                            <Card className="border-0 shadow-xl bg-gradient-to-r from-[#4e2780] to-[#7c5ca3] text-white">
                                <CardContent className="pt-6">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-white text-[#4e2780] hover:bg-[#f4e6f3] h-14 text-lg font-bold shadow-lg transition-all duration-150 cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <>
                                                <LoaderCircle className="w-5 h-5 animate-spin mr-2" />
                                                Cadastrando...
                                            </>
                                        ) : (
                                            'Cadastrar Espaço'
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
