import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { ChevronLeft, ChevronRight, X, Maximize2, Download, Images } from 'lucide-react';

interface ImageGalleryProps {
  carId: string;
  refNumber: string;
  make: string;
  model: string;
}

export default function ImageGallery({ carId, refNumber, make, model }: ImageGalleryProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    async function fetchImages() {
      try {
        const { data, error } = await supabase
          .from('car_images')
          .select('*')
          .eq('car_id', carId)
          .order('sort_order');
        if (error) throw error;
        if (data && data.length > 0) {
          setImages(data.map((img: { url: string }) => img.url));
        } else {
          const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'txb1wiw1';
          const fallback = Array.from({ length: 4 }, (_, i) =>
            `https://res.cloudinary.com/${cloudName}/image/upload/cars/${refNumber.toLowerCase()}-${i + 1}`
          );
          setImages(fallback);
        }
      } catch {
        setImages([]);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [carId, refNumber]);

  const prev = useCallback(() => setActiveIndex(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActiveIndex(i => (i + 1) % images.length), [images.length]);
  const lbPrev = useCallback(() => setLightboxIndex(i => (i - 1 + images.length) % images.length), [images.length]);
  const lbNext = useCallback(() => setLightboxIndex(i => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') lbPrev();
      if (e.key === 'ArrowRight') lbNext();
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, lbPrev, lbNext]);

  const handleDownloadAll = () => {
    images.forEach((url, i) => {
      const a = document.createElement('a');
      a.href = url;
      a.download = `${make}-${model}-${refNumber}-${i + 1}.jpg`;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.click();
    });
  };

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  if (loading) {
    return <div className="aspect-[16/9] bg-gray-100 animate-pulse rounded-sm" />;
  }

  const validImages = images.filter((_, i) => !imageErrors[i]);
  if (validImages.length === 0) {
    return (
      <div className="aspect-[16/9] bg-gray-100 border border-gray-200 flex items-center justify-center rounded-sm">
        <span className="font-serif text-2xl text-gray-300 font-medium">{make} {model}</span>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <div className="relative aspect-[16/9] bg-black overflow-hidden rounded-sm group">
          {/* Photo count badge */}
          <div className="absolute top-3 left-3 z-10 bg-black/70 text-white text-xs font-semibold px-2.5 py-1 rounded-sm flex items-center gap-1.5 backdrop-blur-sm">
            <Images size={12} />
            {images.length} Photos
          </div>

          <img
            src={images[activeIndex]}
            alt={`${make} ${model} - View ${activeIndex + 1}`}
            onError={() => setImageErrors(prev => ({ ...prev, [activeIndex]: true }))}
            className="w-full h-full object-contain"
          />

          {/* Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center rounded-sm transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center rounded-sm transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* View All button */}
          <button
            onClick={() => openLightbox(activeIndex)}
            className="absolute bottom-3 right-3 z-10 bg-black/60 hover:bg-black/80 text-white text-xs font-medium px-3 py-1.5 flex items-center gap-1.5 rounded-sm backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <Maximize2 size={12} /> View All
          </button>

          {/* Dot indicators */}
          {images.length > 1 && images.length <= 20 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === activeIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`flex-shrink-0 w-16 h-12 relative overflow-hidden rounded-sm border-2 transition-all ${
                  activeIndex === idx
                    ? 'border-[#C8102E] opacity-100'
                    : 'border-transparent opacity-60 hover:opacity-90 hover:border-gray-300'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onError={() => setImageErrors(prev => ({ ...prev, [idx]: true }))}
                  className="w-full h-full object-cover"
                />
                {imageErrors[idx] && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <span className="text-[8px] text-gray-400">N/A</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Download All */}
        <div className="flex justify-end">
          <button
            onClick={handleDownloadAll}
            className="text-xs text-gray-500 hover:text-[#C8102E] flex items-center gap-1.5 transition-colors"
          >
            <Download size={13} /> Download All Photos
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 z-50 text-white/70 text-sm font-medium">
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Image */}
          <div className="relative max-w-5xl max-h-[85vh] w-full px-16" onClick={e => e.stopPropagation()}>
            <img
              src={images[lightboxIndex]}
              alt={`${make} ${model} - ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain mx-auto block"
            />
          </div>

          {/* Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); lbPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center rounded-full transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); lbNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center rounded-full transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
                className={`flex-shrink-0 w-14 h-10 overflow-hidden rounded-sm border-2 transition-all ${
                  idx === lightboxIndex ? 'border-[#C8102E] opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
