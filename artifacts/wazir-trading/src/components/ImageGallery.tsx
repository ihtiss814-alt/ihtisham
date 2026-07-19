import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface CarImage {
  id: string;
  car_id: string;
  url: string;
  sort_order: number;
}

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
          setImages(data.map(img => img.url));
        } else {
          // Fallback to Cloudinary if no images in DB
          const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'txb1wiw1';
          const fallbackImages = [
            `https://res.cloudinary.com/${cloudName}/image/upload/cars/${refNumber.toLowerCase()}-1`,
            `https://res.cloudinary.com/${cloudName}/image/upload/cars/${refNumber.toLowerCase()}-2`,
            `https://res.cloudinary.com/${cloudName}/image/upload/cars/${refNumber.toLowerCase()}-3`,
            `https://res.cloudinary.com/${cloudName}/image/upload/cars/${refNumber.toLowerCase()}-4`,
          ];
          setImages(fallbackImages);
        }
      } catch (err) {
        console.error("Failed to load images", err);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [carId, refNumber]);

  if (loading) {
    return <div className="aspect-[16/9] bg-muted animate-pulse rounded-sm"></div>;
  }

  if (images.length === 0 || imageErrors[activeIndex]) {
    return (
      <div className="aspect-[16/9] bg-secondary/10 border border-border flex items-center justify-center rounded-sm">
        <span className="font-serif text-2xl text-secondary/40 font-medium">
          {make} {model}
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-[16/9] bg-black overflow-hidden rounded-sm relative">
        <img
          src={images[activeIndex]}
          alt={`${make} ${model} - View ${activeIndex + 1}`}
          onError={() => setImageErrors(prev => ({ ...prev, [activeIndex]: true }))}
          className="w-full h-full object-contain"
        />
      </div>
      
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`aspect-video relative overflow-hidden rounded-sm border-2 transition-all ${
                activeIndex === idx ? 'border-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                onError={() => setImageErrors(prev => ({ ...prev, [idx]: true }))}
                className="w-full h-full object-cover"
              />
              {imageErrors[idx] && (
                 <div className="absolute inset-0 bg-secondary/10 flex items-center justify-center">
                    <span className="text-[10px] text-muted-foreground">No image</span>
                 </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
