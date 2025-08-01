
import { ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {  useEffect, useState } from 'react';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import { usePage } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Space } from '@/interfaces/space';
import getSpace from '../helpers/get-space';
import { SpaceImageGallery } from '@/components/image/SpaceImageGallery';
import { api, initSanctum } from '@/api/api';

const SpaceReview = () => {
  const { id } = usePage().props as { [key: string]: any };

  const [space, setSpace] = useState<Space | null>(null);

  useEffect(() => {
    if (!id) {
      setSpace(null);
      return;
    }
    getSpace(id)
      .then(setSpace)
      .catch((error) => {
        console.error("Erro ao buscar espaço:", error);
        setSpace(null);
      });
  }, [id]);


  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoveredRating(starRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.warn("Por favor, selecione uma classificação antes de enviar sua avaliação.");
      return;
    }

    if (review.trim().length < 3) {
      toast.warning("O comentário deve ter pelo menos 3 caracteres.");
      return;
    }

    if (name.trim().length < 2) {
      toast.warning("Por favor, digite seu nome completo.");
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      toast.warning("Por favor, insira um e-mail válido.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would make the API call to submit the review
      const reviewData = {
        space_id: id,
        rating: rating,
        review: review.trim(),
        name: name.trim(),
        email: email.trim(),
      };

      console.log('Submitting review:', reviewData);

      await initSanctum();
      const response = await api.post(`/api/space/rating/${id}`, reviewData);
      if (response.status === 409) {
        toast.warning("Você já avaliou este espaço.");
      }
      if (response.status !== 201) {
        throw new Error("Failed to submit review");
      }


      toast.success("Sua avaliação foi enviada com sucesso!");

      // Navigate back to space details
      window.location.href = `/space/details/${id}`;
    } catch (error) {
      toast.error("Ocorreu um erro ao enviar sua avaliação. Por favor, tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingText = (stars: number) => {
    switch (stars) {
      case 1: return "Muito ruim";
      case 2: return "Ruim";
      case 3: return "Regular";
      case 4: return "Bom";
      case 5: return "Excelente";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream">
        <Header />
        <ToastContainer />
      {/* Navigation */}
      <div className="bg-white/80 glass-effect sticky top-0 z-40 border-b border-brand-purple/10">
        <div className="container mx-auto max-w-4xl px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => window.location.href = `/space/details/${id}`}
            className="text-brand-purple hover:bg-brand-purple/10 transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Espaço
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-purple">
              Avaliar Espaço
            </h1>
            <p className="text-brand-purple/70 text-lg">
              Compartilhe sua experiência em <span className="font-semibold">{space?.name}</span>
            </p>
          </div>
          <SpaceImageGallery images={space?.images || []} />

          {/* Review Form */}
          <Card className="border-0 shadow-brand bg-white rounded-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-brand-purple">
                Sua Avaliação
              </CardTitle>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-brand-purple">
                    Informações Pessoais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-brand-purple">
                        Nome Completo *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Digite seu nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-brand-purple/20 focus:border-brand-purple focus:ring-brand-purple rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-brand-purple">
                        Email *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-brand-purple/20 focus:border-brand-purple focus:ring-brand-purple rounded-xl"
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* Rating Stars */}
                <div className="space-y-4">
                  <label className="text-lg font-semibold text-brand-purple">
                    Classificação *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={() => handleStarHover(star)}
                        onMouseLeave={handleStarLeave}
                        className="p-1 transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 rounded"
                      >
                        <Star
                          className={`h-8 w-8 transition-colors duration-200 ${
                            star <= (hoveredRating || rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300 hover:text-yellow-300'
                          }`}
                        />
                      </button>
                    ))}
                    {(hoveredRating || rating) > 0 && (
                      <span className="ml-4 text-brand-purple font-medium">
                        {getRatingText(hoveredRating || rating)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Review Text */}
                <div className="space-y-4">
                  <label htmlFor="review" className="text-lg font-semibold text-brand-purple">
                    Seu Comentário *
                  </label>
                  <Textarea
                    id="review"
                    placeholder="Conte-nos sobre sua experiência neste espaço. O que você mais gostou? O que poderia ser melhorado?"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="min-h-[120px] resize-none border-brand-purple/20 focus:border-brand-purple focus:ring-brand-purple rounded-xl"
                    maxLength={500}
                  />
                  <div className="flex justify-between text-sm text-brand-purple/60">
                    <span>Mínimo 3 caracteres</span>
                    <span>{review.length}/500</span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting || rating === 0 || review.trim().length < 1}
                    className="flex-1 gradient-brand text-white font-semibold py-3 rounded-xl hover:shadow-brand-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="border-0 shadow-brand bg-gradient-brand-soft rounded-2xl">
            <CardContent className="p-6">
              <h3 className="font-semibold text-brand-purple mb-4">
                Diretrizes para Avaliações
              </h3>
              <ul className="space-y-2 text-brand-purple/70">
                <li className="flex items-start gap-2">
                  <span className="text-brand-purple mt-1">•</span>
                  Seja honesto e construtivo em sua avaliação
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-purple mt-1">•</span>
                  Foque na sua experiência com o espaço e suas facilidades
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-purple mt-1">•</span>
                  Evite linguagem ofensiva ou inadequada
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-purple mt-1">•</span>
                  Sua avaliação ajuda outros usuários a escolher o melhor espaço
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SpaceReview;
