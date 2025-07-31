
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Image } from "@/interfaces/space";

export const SpaceImageGallery = ({images}:{images : Image[]}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);

  images?.forEach((image) => {
    if (!image.image_path.startsWith('/storage/')) {
      image.image_path = `/storage/${image.image_path}`;
    }
  });

  const scrollToThumb = (idx: number) => {
    if (thumbsRef.current) {
      const thumb = thumbsRef.current.children[idx] as HTMLElement;
      if (thumb) {
        thumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  };

  const nextImage = () => {
    const next = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(next);
    scrollToThumb(next);
  };

  const prevImage = () => {
    const prev = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(prev);
    scrollToThumb(prev);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[400px] md:h-[500px] bg-gradient-brand-soft rounded-2xl flex items-center justify-center">
        <p className="text-brand-purple/60">Nenhuma imagem disponível</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Main Image Container */}
      <div className="relative group">
        <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-brand-soft shadow-brand">
          <img
            src={`${images[activeIndex].image_path}`}
            alt={`Imagem ${activeIndex + 1} de ${images.length}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Overlay with controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-brand-purple opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-brand-purple opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Zoom button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-brand-purple opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
            onClick={() => setIsZoomed(true)}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div
          ref={thumbsRef}
          className="flex gap-3 overflow-x-auto pb-2 px-1 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((img, idx) => (
            <button
              key={img.image_path}
              className={`
                flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden
                border-2 transition-all duration-300
                ${activeIndex === idx 
                  ? "border-brand-purple shadow-brand" 
                  : "border-transparent hover:border-brand-purple/50"
                }
              `}
              onClick={() => {
                setActiveIndex(idx);
                scrollToThumb(idx);
              }}
            >
              <img
                src={img.image_path}
                alt={`Miniatura ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-6xl max-h-full">
            <img
              src={images[activeIndex].image_path}
              alt={`Imagem ${activeIndex + 1} ampliada`}
              className="max-w-full max-h-full object-contain"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
              onClick={() => setIsZoomed(false)}
            >
              ×
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
