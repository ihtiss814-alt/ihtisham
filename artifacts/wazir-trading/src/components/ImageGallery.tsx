import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { ChevronLeft, ChevronRight, X, Maximize2, Download, Images, Camera } from 'lucide-react';

interface ImageGalleryProps {
  carId: string;
  refNumber: string;
  make: string;
  model: string;
}

type ImgStatus = 'pending' | 'loaded' | 'error';

export default function ImageGallery({ carId, refNumber, make, model }: ImageGalleryProps) {
  const [candidates, setCandidates] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<ImgStatus[]>([]);
  const [fetching, setFetching] = useState(true);

  // activeIndex is an index into the `valid` array (loaded images only)
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  /* ── fetch candidate URLs ── */
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setFetching(true);
      setCandidates([]);
      setStatuses([]);
      setActiveIdx(0);

      try {
        const { data, error } = await supabase
          .from('car_images')
          .select('image_url, display_order, is_primary')
          .eq('car_id', carId)
          .order('display_order');

        if (cancelled) return;

        if (!error && data && data.length > 0) {
          const urls = data.map((r: { image_url: string }) => r.image_url);
          setCandidates(urls);
          setStatuses(urls.map(() => 'pending' as ImgStatus));
        } else {
          // Cloudinary fallback — try up to 12 images
          const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'txb1wiw1';
          const urls = Array.from({ length: 12 }, (_, i) =>
            `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_1200/cars/${refNumber.toLowerCase()}-${i + 1}`
          );
          setCandidates(urls);
          setStatuses(urls.map(() => 'pending' as ImgStatus));
        }
      } catch {
        if (!cancelled) { setCandidates([]); setStatuses([]); }
      } finally {
        if (!cancelled) setFetching(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [carId, refNumber]);

  /* ── status updaters ── */
  const markLoaded = useCallback((i: number) => {
    setStatuses(prev => {
      const next = [...prev];
      next[i] = 'loaded';
      return next;
    });
  }, []);

  const markError = useCallback((i: number) => {
    setStatuses(prev => {
      const next = [...prev];
      next[i] = 'error';
      return next;
    });
  }, []);

  /* ── derived ── */
  // Only images that loaded successfully
  const valid = candidates
    .map((url, i) => ({ url, origIdx: i }))
    .filter((_, i) => statuses[i] === 'loaded');

  const totalResolved = statuses.filter(s => s !== 'pending').length;
  const allResolved = totalResolved === candidates.length;
  const noImages = allResolved && valid.length === 0;

  // Clamp activeIdx
  const safeActive = valid.length > 0 ? Math.min(activeIdx, valid.length - 1) : 0;

  /* ── navigation ── */
  const prev = useCallback(() => setActiveIdx(i => (i - 1 + Math.max(valid.length, 1)) % Math.max(valid.length, 1)), [valid.length]);
  const next = useCallback(() => setActiveIdx(i => (i + 1) % Math.max(valid.length, 1)), [valid.length]);
  const lbPrev = useCallback(() => setLightboxIdx(i => (i - 1 + Math.max(valid.length, 1)) % Math.max(valid.length, 1)), [valid.length]);
  const lbNext = useCallback(() => setLightboxIdx(i => (i + 1) % Math.max(valid.length, 1)), [valid.length]);

  const openLightbox = (idx: number) => { setLightboxIdx(idx); setLightboxOpen(true); };

  /* ── keyboard ── */
  useEffect(() => {
    if (!lightboxOpen) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') lbPrev();
      if (e.key === 'ArrowRight') lbNext();
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [lightboxOpen, lbPrev, lbNext]);

  /* ── download ── */
  const handleDownloadAll = () => {
    valid.forEach(({ url }, i) => {
      const a = document.createElement('a');
      a.href = url;
      a.download = `${make}-${model}-${refNumber}-${i + 1}.jpg`;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.click();
    });
  };

  /* ── hidden preloader: renders all candidate <img> tags off-screen ── */
  const Preloader = (
    <div className="hidden" aria-hidden="true">
      {candidates.map((url, i) => (
        <img
          key={url + i}
          src={url}
          alt=""
          onLoad={() => markLoaded(i)}
          onError={() => markError(i)}
        />
      ))}
    </div>
  );

  /* ── loading skeleton ── */
  if (fetching || (candidates.length > 0 && valid.length === 0 && !allResolved)) {
    return (
      <>
        {Preloader}
        <div className="space-y-3">
          <div className="aspect-[16/9] bg-gray-100 animate-pulse rounded-sm flex items-center justify-center">
            <Camera size={32} className="text-gray-300" />
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="w-16 h-12 bg-gray-100 animate-pulse rounded-sm flex-shrink-0" />
            ))}
          </div>
        </div>
      </>
    );
  }

  /* ── no images ── */
  if (noImages || candidates.length === 0) {
    return (
      <>
        {Preloader}
        <div className="aspect-[16/9] bg-gray-50 border border-gray-200 flex flex-col items-center justify-center rounded-sm gap-3">
          <Camera size={40} className="text-gray-200" />
          <div className="text-center">
            <p className="font-serif text-lg text-gray-300 font-medium">{make} {model}</p>
            <p className="text-xs text-gray-300 mt-1">Photos coming soon</p>
          </div>
        </div>
      </>
    );
  }

  const activeImage = valid[safeActive];

  return (
    <>
      {Preloader}
      <div className="space-y-3">

        {/* ── Main image ── */}
        <div className="relative aspect-[16/9] bg-black overflow-hidden rounded-sm group">

          {/* Photo count badge */}
          <div className="absolute top-3 left-3 z-10 bg-black/70 text-white text-xs font-semibold px-2.5 py-1 rounded-sm flex items-center gap-1.5 backdrop-blur-sm">
            <Images size={12} />
            {valid.length} {valid.length === 1 ? 'Photo' : 'Photos'}
          </div>

          {/* Main image */}
          {activeImage && (
            <img
              key={activeImage.url}
              src={activeImage.url}
              alt={`${make} ${model} — photo ${safeActive + 1} of ${valid.length}`}
              className="w-full h-full object-contain transition-opacity duration-300"
            />
          )}

          {/* Prev arrow */}
          {valid.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/60 hover:bg-black/85 text-white flex items-center justify-center rounded-sm transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/60 hover:bg-black/85 text-white flex items-center justify-center rounded-sm transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {/* View All / Fullscreen */}
          <button
            onClick={() => openLightbox(safeActive)}
            className="absolute bottom-3 right-3 z-10 bg-black/60 hover:bg-black/85 text-white text-xs font-medium px-3 py-1.5 flex items-center gap-1.5 rounded-sm backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <Maximize2 size={12} /> View Fullscreen
          </button>

          {/* Counter pill */}
          {valid.length > 1 && (
            <div className="absolute bottom-3 left-3 z-10 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all">
              {safeActive + 1} / {valid.length}
            </div>
          )}

          {/* Dot indicators (≤ 15 images) */}
          {valid.length > 1 && valid.length <= 15 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {valid.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  aria-label={`Go to photo ${idx + 1}`}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${idx === safeActive ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Thumbnail strip ── */}
        {valid.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scroll-smooth">
            {valid.map(({ url }, idx) => (
              <button
                key={url}
                onClick={() => setActiveIdx(idx)}
                aria-label={`View photo ${idx + 1}`}
                className={`flex-shrink-0 w-16 h-12 relative overflow-hidden rounded-sm border-2 transition-all duration-150 ${
                  idx === safeActive
                    ? 'border-[#C8102E] opacity-100 shadow-sm'
                    : 'border-transparent opacity-55 hover:opacity-90 hover:border-gray-300'
                }`}
              >
                <img
                  src={url}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* ── Download All ── */}
        {valid.length > 0 && (
          <div className="flex justify-end">
            <button
              onClick={handleDownloadAll}
              className="text-xs text-gray-400 hover:text-[#C8102E] flex items-center gap-1.5 transition-colors"
            >
              <Download size={13} /> Download All Photos ({valid.length})
            </button>
          </div>
        )}
      </div>

      {/* ══ Lightbox ══ */}
      {lightboxOpen && valid.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/96 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 z-50 text-white/70 text-sm font-medium">
            {lightboxIdx + 1} / {valid.length}
          </div>

          {/* Car label */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 text-white/50 text-xs font-medium tracking-wide hidden sm:block">
            {make} {model} · REF #{refNumber}
          </div>

          {/* Main lightbox image */}
          <div
            className="relative max-w-5xl max-h-[80vh] w-full px-16"
            onClick={e => e.stopPropagation()}
          >
            <img
              key={valid[lightboxIdx]?.url}
              src={valid[lightboxIdx]?.url}
              alt={`${make} ${model} — ${lightboxIdx + 1}`}
              className="max-w-full max-h-[80vh] object-contain mx-auto block"
            />
          </div>

          {/* Lightbox arrows */}
          {valid.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); lbPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 text-white flex items-center justify-center rounded-full transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={26} />
              </button>
              <button
                onClick={e => { e.stopPropagation(); lbNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 text-white flex items-center justify-center rounded-full transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={26} />
              </button>
            </>
          )}

          {/* Lightbox thumbnail strip */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4 pb-1">
            {valid.map(({ url }, idx) => (
              <button
                key={url}
                onClick={e => { e.stopPropagation(); setLightboxIdx(idx); }}
                aria-label={`View photo ${idx + 1}`}
                className={`flex-shrink-0 w-14 h-10 overflow-hidden rounded-sm border-2 transition-all ${
                  idx === lightboxIdx ? 'border-[#C8102E] opacity-100' : 'border-transparent opacity-45 hover:opacity-80'
                }`}
              >
                <img src={url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
