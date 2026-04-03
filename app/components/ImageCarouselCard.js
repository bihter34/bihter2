'use client';

import React from 'react';
import Image from 'next/image';

const ImageCarouselCard = ({ image, title, date, link, onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="block rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] relative group cursor-pointer w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
      aria-label={title ? `${title} görselini aç` : 'Görseli aç'}
    >
      {/* Ana Görsel - Dikey Format */}
      <div className="relative h-[500px] w-full">
        <Image
          src={image}
          alt={title || 'Basın görseli'}
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />

        {/* Alt kısımda metin overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
          {date && (
            <p className="text-xs text-white/80 mb-1 line-clamp-1">
              {date}
            </p>
          )}
          {title && (
            <h3 className="text-sm font-semibold text-white line-clamp-2">
              {title}
            </h3>
          )}
          {link && link !== '#' && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-2 inline-block text-[11px] text-white/90 underline underline-offset-2"
            >
              Habere git
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCarouselCard;