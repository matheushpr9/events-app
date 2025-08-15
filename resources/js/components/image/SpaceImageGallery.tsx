import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, X as CloseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Image } from "@/interfaces/space";

export const SpaceImageGallery = ({ images }: { images: Image[] }) => {
    const fixedImages = images?.map((img) => ({
        ...img,
        image_path: img.image_path.startsWith('/storage/')
            ? img.image_path
            : `/storage/${img.image_path}`,
    })) || [];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const thumbsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isZoomed) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsZoomed(false);
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "ArrowRight") nextImage();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
        // eslint-disable-next-line
    }, [isZoomed, activeIndex]);

    const scrollToThumb = (idx: number) => {
        if (thumbsRef.current) {
            const thumb = thumbsRef.current.children[idx] as HTMLElement;
            if (thumb) {
                thumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            }
        }
    };

    const nextImage = () => {
        const next = activeIndex === fixedImages.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(next);
        scrollToThumb(next);
    };

    const prevImage = () => {
        const prev = activeIndex === 0 ? fixedImages.length - 1 : activeIndex - 1;
        setActiveIndex(prev);
        scrollToThumb(prev);
    };

    if (!fixedImages || fixedImages.length === 0) {
        return (
            <div className="w-full h-[300px] sm:h-[400px] bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] rounded-2xl flex items-center justify-center">
                <p className="text-[#4e2780]/60">Nenhuma imagem disponível</p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            {/* Main Image Container */}
            <div className="relative group">
                <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br from-[#ede7f6] to-[#f4e6f3] shadow-md">
                    <img
                        src={fixedImages[activeIndex].image_path}
                        alt={`Imagem ${activeIndex + 1} de ${fixedImages.length}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        draggable={false}
                    />

                    {/* Overlay with controls (sempre visível no mobile) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Navigation arrows */}
                    {fixedImages.length > 1 && (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#4e2780] opacity-80 focus:opacity-100 transition-all duration-300 shadow-lg z-10"
                                onClick={prevImage}
                                aria-label="Imagem anterior"
                                tabIndex={0}
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#4e2780] opacity-80 focus:opacity-100 transition-all duration-300 shadow-lg z-10"
                                onClick={nextImage}
                                aria-label="Próxima imagem"
                                tabIndex={0}
                            >
                                <ChevronRight className="h-6 w-6" />
                            </Button>
                        </>
                    )}

                    {/* Zoom button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 hover:bg-white text-[#4e2780] opacity-80 focus:opacity-100 transition-all duration-300 shadow-lg z-10"
                        onClick={() => setIsZoomed(true)}
                        aria-label="Ampliar imagem"
                        tabIndex={0}
                    >
                        <ZoomIn className="h-5 w-5" />
                    </Button>

                    {/* Image counter */}
                    {fixedImages.length > 1 && (
                        <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium z-10">
                            {activeIndex + 1} / {fixedImages.length}
                        </div>
                    )}
                </div>
            </div>

            {/* Thumbnails */}
            {fixedImages.length > 1 && (
                <div
                    ref={thumbsRef}
                    className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 px-1 scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {fixedImages.map((img, idx) => (
                        <button
                            key={img.image_path}
                            className={`
                flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden
                border-2 transition-all duration-300
                ${activeIndex === idx
                                    ? "border-[#4e2780] shadow-md"
                                    : "border-transparent hover:border-[#4e2780]/50"
                                }
              `}
                            onClick={() => {
                                setActiveIndex(idx);
                                scrollToThumb(idx);
                            }}
                            aria-label={`Selecionar imagem ${idx + 1}`}
                            tabIndex={0}
                        >
                            <img
                                src={img.image_path}
                                alt={`Miniatura ${idx + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                draggable={false}
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Zoom Modal */}
            {isZoomed && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 sm:p-4"
                    onClick={() => setIsZoomed(false)}
                    tabIndex={-1}
                    aria-modal="true"
                    role="dialog"
                >
                    <div
                        className="relative max-w-full max-h-full flex items-center justify-center"
                        onClick={e => e.stopPropagation()}
                    >
                        <img
                            src={fixedImages[activeIndex].image_path}
                            alt={`Imagem ${activeIndex + 1} ampliada`}
                            className="max-w-[90vw] max-h-[80vh] object-contain"
                            draggable={false}
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white/20 hover:bg-white/30 text-white"
                            onClick={() => setIsZoomed(false)}
                            aria-label="Fechar zoom"
                            tabIndex={0}
                        >
                            <CloseIcon className="h-7 w-7" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
