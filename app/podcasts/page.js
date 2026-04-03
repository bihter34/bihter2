'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Play, ExternalLink, Calendar, Clock, Filter, SortAsc, SortDesc, Youtube } from 'lucide-react';
import { podcasts } from '@/data/podcasts';

export default function PodcastsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' veya 'desc'
  const [podcastsData, setPodcastsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setPodcastsData(podcasts || []);
      
      var uniqueCategories = [...new Set(podcasts.map(podcast => podcast.category))];
      uniqueCategories.reverse();
      setCategoriesData(uniqueCategories);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredAndSortedPodcasts = useMemo(() => {
    let filtered = podcastsData;
    
    // Kategori filtreleme
    if (selectedCategory !== 'Tümü') {
      filtered = filtered.filter(podcast => podcast.category === selectedCategory);
    }
    
    // Sadece tarihe göre sıralama
    filtered.sort((a, b) => {
      const aValue = new Date(a.date);
      const bValue = new Date(b.date);
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return filtered;
  }, [podcastsData, selectedCategory, sortOrder]);

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
              {filteredAndSortedPodcasts.length} podcast
            </div>
          </div>
        </div>
      </section>

      {/* Podcastler Listesi */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Ana İçerik */}
            <div className="flex-1">
              {loading ? (
                <div className="space-y-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : filteredAndSortedPodcasts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    Seçilen kriterlere uygun podcast bulunamadı.
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredAndSortedPodcasts.map((podcast) => (
                    <article
                      key={podcast.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Podcast Kapak Resmi */}
                        <div className="flex-shrink-0 sm:w-32">
                          <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto sm:mx-0">
                            <Image
                              src={podcast.image}
                              alt={podcast.title}
                              fill
                              className="rounded-lg object-cover shadow-sm"
                              sizes="128px"
                            />
                          </div>
                        </div>

                        {/* Podcast İçeriği */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{new Date(podcast.date).toLocaleDateString('tr-TR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{podcast.duration}</span>
                          </div>

                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {podcast.title}
                          </h2>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <a
                                href={podcast.platformUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white transition-colors ${
                                  podcast.platform === 'YouTube' 
                                    ? 'bg-red-600 hover:bg-red-700' 
                                    : podcast.platform === 'iVoox'
                                    ? 'bg-orange-600 hover:bg-orange-700'
                                    : 'bg-green-600 hover:bg-green-700'
                                }`}
                              >
                                {podcast.platform === 'YouTube' ? (
                                  <Youtube className="h-4 w-4 mr-2" />
                                ) : (
                                  <Play className="h-4 w-4 mr-2" />
                                )}
                                {podcast.platform === 'YouTube' ? 'YouTube\'da İzle' : `${podcast.platform}'da Dinle`}
                              </a>
                            </div>

                            <a
                              href={podcast.platformUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              aria-label={`${podcast.platform} linki`}
                            >
                              <ExternalLink className="h-5 w-5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar - sadece detay sayfalarında gösterilecek */}
          </div>
        </div>
      </section>

      {/* Platform Bilgileri */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Podcast Platformları
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Spotify</h3>
                <p className="text-gray-600 mb-4">
                  Edebiyat ve sanat üzerine söyleşiler, eleştiriler ve analizler
                </p>
                <a
                  href="https://open.spotify.com/show/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                >
                  Spotify&apos;da takip et
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">iVoox</h3>
                <p className="text-gray-600 mb-4">
                  Kültür, felsefe ve sanat üzerine derinlemesine söyleşiler
                </p>
                <a
                  href="https://www.ivoox.com/podcast-example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                >
                  iVoox&apos;ta takip et
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
} 