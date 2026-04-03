'use client';

import Link from 'next/link';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { ArrowLeft, SortAsc, SortDesc } from 'lucide-react';
import { events } from '@/data/events';
import Lightbox from '@/app/components/Lightbox';
import UnifiedMediaCard from '@/app/components/UnifiedMediaCard';

export default function EventsPage() {
  const [sortOrder, setSortOrder] = useState('desc');
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setEventsData(events || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = [...eventsData];

    // Tarihe göre sıralama - tarihi olmayanlar en sona
    filtered.sort((a, b) => {
      const aDate = a.date ? a.date.trim() : '';
      const bDate = b.date ? b.date.trim() : '';

      // Tarihi olmayanlar en sona
      if (!aDate && !bDate) return 0; // İkisi de tarihsiz, sıralama değişmez
      if (!aDate) return 1; // a tarihsiz, en sona
      if (!bDate) return -1; // b tarihsiz, en sona

      // Tarih formatlarını kontrol et ve parse et
      // "2023-09" gibi eksik tarihler için ayın son gününü kullan
      let aValue, bValue;
      
      if (aDate.match(/^\d{4}-\d{2}$/)) {
        // Sadece yıl-ay formatı (örn: "2023-09")
        const [year, monthStr] = aDate.split('-');
        const month = parseInt(monthStr); // "09" -> 9 (1-indexed, Eylül = 9. ay)
        // JavaScript'te month 0-indexed (0=Ocak, 11=Aralık)
        // "2023-09" için month=9, JavaScript'te bu Ekim (month 9 = 10. ay)
        // new Date(year, month, 0) bir önceki ayın son gününü verir
        // Yani new Date(2023, 9, 0) = Eylül'ün son günü (Ekim'in 0. günü)
        aValue = new Date(parseInt(year), month, 0); // Ayın son günü
      } else {
        aValue = new Date(aDate);
      }
      
      if (bDate.match(/^\d{4}-\d{2}$/)) {
        // Sadece yıl-ay formatı (örn: "2023-09")
        const [year, monthStr] = bDate.split('-');
        const month = parseInt(monthStr); // "09" -> 9 (1-indexed, Eylül = 9. ay)
        // JavaScript'te month 0-indexed (0=Ocak, 11=Aralık)
        // "2023-09" için month=9, JavaScript'te bu Ekim (month 9 = 10. ay)
        // new Date(year, month, 0) bir önceki ayın son gününü verir
        // Yani new Date(2023, 9, 0) = Eylül'ün son günü (Ekim'in 0. günü)
        bValue = new Date(parseInt(year), month, 0); // Ayın son günü
      } else {
        bValue = new Date(bDate);
      }

      // Geçersiz tarihleri kontrol et
      const aIsValid = !isNaN(aValue.getTime());
      const bIsValid = !isNaN(bValue.getTime());

      if (!aIsValid && !bIsValid) return 0;
      if (!aIsValid) return 1; // a geçersiz, en sona
      if (!bIsValid) return -1; // b geçersiz, en sona

      // Geçerli tarihleri karşılaştır
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    return filtered;
  }, [eventsData, sortOrder]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // YouTube linkini tespit et
  const isYouTubeLink = useCallback((link) => {
    if (!link || link === '#') return false;
    return link.includes('youtube.com') || link.includes('youtu.be') || link.includes('virginiawoolf.org.tr');
  }, []);

  // YouTube linkini tespit et (linkType kontrolü ile)
  const getLinkType = useCallback((event) => {
    if (event.linkType === 'youtube') return 'youtube';
    if (isYouTubeLink(event.link)) return 'youtube';
    return 'external';
  }, [isYouTubeLink]);

  // Lightbox için veri hazırlama
  const lightboxImages = useMemo(() => {
    return filteredAndSortedEvents.map(event => ({
      image: event.image,
      title: event.title,
      source: `${event.date !== '' ? formatDate(event.date) : ''} • ${event.location !== '' ? event.location : ''}`,
      link: event.link || '#',
      linkType: getLinkType(event)
    }));
  }, [filteredAndSortedEvents, getLinkType]);

  // Lightbox kontrol fonksiyonları
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === lightboxImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? lightboxImages.length - 1 : prev - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="bg-white min-h-screen pt-32">
      {/* Sıralama */}
      <section className="py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                title={sortOrder === 'asc' ? 'En yeni önce' : 'En eski önce'}
              >
                {sortOrder === 'asc' ? 'Eski önce' : 'Yeni önce'}
                {sortOrder === 'asc' ? (
                  <SortAsc className="ml-2 h-4 w-4" />
                ) : (
                  <SortDesc className="ml-2 h-4 w-4" />
                )}
              </button>
            </div>

            <div className="text-sm text-gray-500">
              {filteredAndSortedEvents.length} etkinlik
            </div>
          </div>
        </div>
      </section>

      {/* Etkinlikler Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                  <div className="aspect-[3/4] bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAndSortedEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Etkinlik bulunamadı.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedEvents.map((event, index) => (
                <UnifiedMediaCard
                  key={event.id}
                  imageSrc={event.image}
                  imageAlt={event.title}
                  title={event.title}
                  description={event.excerpt}
                  metaLines={[
                    event.time || null,
                    event.date ? formatDate(event.date) : null,
                    event.location || null,
                  ]}
                  externalHref={event.link && event.link !== '#' ? event.link : null}
                  externalLabel={event.link && event.link !== '#' ? (getLinkType(event) === 'youtube' ? "YouTube'da İzle" : 'Linke git') : undefined}
                  externalVariant={getLinkType(event) === 'youtube' ? 'youtube' : 'default'}
                  onOpen={() => openLightbox(index)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
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