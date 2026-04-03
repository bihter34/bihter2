'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import UnifiedMediaCard from './UnifiedMediaCard';
import Lightbox from './Lightbox';
import { press } from '@/data/press';

export default function PressSection() {
  const sliderRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [pressImages, setPressImages] = useState([]);

  useEffect(() => {
    const flattenedImages = press.flatMap((item) => 
      item.images.map((image) => ({
        ...image,
        pressItemId: item.id,
        pressItemTitle: item.title,
        pressItemDate: item.date,
        pressItemLink: item.link
      }))
    );
    setPressImages(flattenedImages);
  }, []);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === pressImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? pressImages.length - 1 : prev - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollLeft -= scrollAmount;
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollLeft += scrollAmount;
    }
  };

  if (pressImages.length === 0) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Basında</h2>
            <p>Yükleniyor...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Basında
            </h2>
          </div>
        </div>
        
        <div className="relative w-full max-w-none px-4">
          {/* Slider Container */}
          <div 
            ref={sliderRef}
            className="overflow-x-auto scrollbar-hide"
            style={{ 
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="flex gap-4 md:gap-6 pb-4" style={{ minWidth: 'max-content' }}>
              {pressImages.map((image, index) => (
                <div 
                  key={`${image.pressItemId}-${image.subId}`} 
                  className="flex-shrink-0 w-64 md:w-72 lg:w-80"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <UnifiedMediaCard
                    imageSrc={image.src}
                    imageAlt={image.pressItemTitle}
                    title={image.pressItemTitle}
                    metaLines={[image.pressItemDate].filter(Boolean)}
                    externalHref={image.pressItemLink}
                    onOpen={() => openLightbox(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white rounded-full p-3 transition-all z-20 shadow-lg"
            aria-label="Önceki"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white rounded-full p-3 transition-all z-20 shadow-lg"
            aria-label="Sonraki"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Daha fazla göster butonu */}
          <div className="text-center mt-8">
            <Link
              href="/press"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              Tüm basın haberlerini görüntüle
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={pressImages.map(img => ({
          image: img.src,
          title: img.pressItemTitle,
          date: img.pressItemDate || null,
          source: 'Basında',
          link: img.pressItemLink
        }))}
        currentIndex={currentImageIndex}
        onNext={nextImage}
        onPrev={prevImage}
        onGoTo={goToImage}
      />
    </>
  );
}