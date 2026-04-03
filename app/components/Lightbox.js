'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';

const Lightbox = ({ isOpen, onClose, images, currentIndex, onNext, onPrev, onGoTo }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Body scroll'u engelle
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !images[currentIndex]) return null;

  const currentImage = images[currentIndex];
  const metaText = [currentImage.date, currentImage.source].filter(Boolean).join(' • ');

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      {/* Kapatma butonu */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all"
        aria-label="Kapat"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Ana görsel container */}
      <div className="h-full w-full flex items-center justify-center p-4 relative z-10">
        {/* In a flex container, give the media wrapper an explicit width so the `fill` image
            always has a non-zero containing block. */}
        <div className="relative w-[92vw] max-w-4xl max-h-full">
          <div className="relative w-full h-[70vh] rounded-t-lg overflow-hidden bg-black">
            <Image
              src={currentImage.image}
              alt={currentImage.title || 'Görsel'}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Bilgiler (resmin altında, alt alta) */}
          {(currentImage.title || metaText || (currentImage.link && currentImage.link !== '#')) && (
            <div className="rounded-b-lg bg-black/35 backdrop-blur-sm px-2 py-2 sm:px-4 sm:py-3 ring-1 ring-white/10">
              {currentImage.title && (
                <h2 className="text-white text-base sm:text-lg font-semibold leading-snug">
                  {currentImage.title}
                </h2>
              )}
              {metaText && (
                <p className="mt-1 text-white/75 text-xs sm:text-sm">
                  {metaText}
                </p>
              )}
              {currentImage.link && currentImage.link !== '#' && (
                <div className="mt-2">
                  <a
                    href={currentImage.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20 hover:bg-white/15 transition-colors"
                  >
                    Linke git
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sol navigation */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-4 transition-all z-50"
          aria-label="Önceki görsel"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Sağ navigation */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-4 transition-all z-50"
          aria-label="Sonraki görsel"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Thumbnail navigation - Alt */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm rounded-lg p-2 z-50">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                onGoTo && onGoTo(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                  ? 'bg-white'
                  : 'bg-white/40 hover:bg-white/60'
                }`}
              aria-label={`${index + 1}. görsele git`}
            />
          ))}
        </div>
      )}

      {/* Background click to close */}
      <div
        className="absolute inset-0 z-0"
        onClick={onClose}
      />
    </div>
  );
};

export default Lightbox;