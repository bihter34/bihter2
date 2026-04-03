'use client';

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Lightbox from '@/app/components/Lightbox';
import UnifiedMediaCard from '@/app/components/UnifiedMediaCard';
import press from '@/data/press';

export default function PressPage() {
  const [selectedYear, setSelectedYear] = useState('Tümü');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPress, setSelectedPress] = useState(null);

  const years = useMemo(() => {
    const yearSet = new Set();
    press.forEach((item) => {
      if (typeof item.date === 'string') {
        const match = item.date.match(/(20\d{2})/);
        if (match) yearSet.add(match[1]);
      }
    });
    const list = Array.from(yearSet).sort((a, b) => Number(b) - Number(a));
    list.unshift('Tümü');
    return list;
  }, []);

  // Filtrelenmiş liste
  const filteredPress = useMemo(() => {
    if (selectedYear === 'Tümü') return press;
    return press.filter((item) => {
      if (typeof item.date !== 'string') return false;
      const match = item.date.match(/(20\d{2})/);
      return match ? match[1] === selectedYear : false;
    });
  }, [selectedYear]);

  // Lightbox için görüntü listesi (seçili basın öğesinin görselleri)
  const lightboxImages = useMemo(() => {
    if (!selectedPress) return [];
    return (selectedPress.images || []).map((img) => ({
      image: img.src,
      title: selectedPress.title,
      date: selectedPress.date || null,
      source: 'Basında',
      link: selectedPress.link || '#',
    }));
  }, [selectedPress]);

  const openLightbox = (item, imgIndex = 0) => {
    setSelectedPress(item);
    setCurrentImageIndex(imgIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const nextImage = () => setCurrentImageIndex((p) => (p === lightboxImages.length - 1 ? 0 : p + 1));
  const prevImage = () => setCurrentImageIndex((p) => (p === 0 ? lightboxImages.length - 1 : p - 1));
  const goToImage = (i) => setCurrentImageIndex(i);

  return (
    <div className="bg-white min-h-screen pt-32">
      {/* Filtreler */}
      <section className="py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                title="Yıla göre filtrele"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-500">{filteredPress.length} içerik</div>
          </div>
        </div>
      </section>

      {/* Liste */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPress.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Seçilen yılda içerik bulunamadı.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredPress.map((item) => (
                <div key={item.id} className="space-y-4">
                  {/* Görseller */}
                  <div className="grid grid-cols-1 gap-4">
                    {item.images && item.images.map((img, imgIndex) => (
                      <div
                        key={`${item.id}-${img.subId}`}
                        onClick={() => openLightbox(item, imgIndex)}
                      >
                        <UnifiedMediaCard
                          imageSrc={img.src}
                          imageAlt={`${item.title} - ${img.subId}`}
                          title={item.title}
                          metaLines={[item.date || '—']}
                          externalHref={item.link}
                          externalLabel={item.link ? 'Linke git' : undefined}
                          onOpen={() => openLightbox(item, imgIndex)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={lightboxImages}
        currentIndex={currentImageIndex}
        onNext={nextImage}
        onPrev={prevImage}
        onGoTo={goToImage}
      />
    </div>
  );
}