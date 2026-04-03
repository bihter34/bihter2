'use client';

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, SortAsc, SortDesc, ExternalLink, Download } from 'lucide-react';
import { writings } from '@/data/writings';

export default function ArticlesPage() {
  const [sortOrder, setSortOrder] = useState('desc');
  const [writingsData, setWritingsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setWritingsData(writings || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  const sortedWritings = useMemo(() => {
    let sorted = [...writingsData];

    // Sadece tarihe göre sıralama
    sorted.sort((a, b) => {
      const aValue = new Date(a.date);
      const bValue = new Date(b.date);

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sorted;
  }, [writingsData, sortOrder]);

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
              {sortedWritings.length} yazı
            </div>
          </div>
        </div>
      </section>

      {/* Yazılar Listesi */}
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
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : sortedWritings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    Henüz yazı bulunmuyor.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedWritings.map((writing) => (
                    <article
                      key={writing.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden group"
                    >
                      {/* Card Header */}
                      <div className="p-6">
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-3">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{new Date(writing.date).toLocaleDateString('tr-TR', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}</span>
                          </div>

                          {/* Yayın mecrası */}
                          {writing.publication && (
                            <span className="bg-gray-100 px-2 py-1 rounded-full">
                              {writing.publication}
                            </span>
                          )}

                          {(writing.readTime || writing.readingTime) && (
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{writing.readTime || writing.readingTime}</span>
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
                          <a
                            href={writing.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-start"
                          >
                            <span className="flex-1">{writing.title}</span>
                            {/* <ExternalLink className="h-4 w-4 ml-2 mt-1 flex-shrink-0 text-gray-400" /> */}
                          </a>
                        </h3>
                      </div>

                      {/* Card Footer */}
                      <div className="px-6 pb-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <a
                              href={writing.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors hover:underline"
                            >
                              Devamını Oku
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>

                          </div>

                          {/* PDF İndir Butonu */}
                          {writing.pdfLink && (
                            <a
                              href={writing.pdfLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 text-xs bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100 transition-colors font-medium"
                              title="PDF'i indir"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              PDF İndir
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 