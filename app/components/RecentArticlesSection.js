'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { writings } from '@/data/writings';

export default function RecentArticlesSection() {
  const [recentWritings, setRecentWritings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWritings = async () => {
      try {
        const sortedWritings = writings.sort((a, b) => new Date(b.date) - new Date(a.date));
        const recent = sortedWritings.slice(0, 3);

        setRecentWritings(recent);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchWritings();
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Son Yazılar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </>
          ) : recentWritings.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">Henüz yazı bulunmuyor.</p>
            </div>
          ) : (
            recentWritings.map((writing) => (
              <article key={writing.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(writing.date).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    <a
                      href={writing.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-700 transition-colors inline-flex items-center"
                    >
                      {writing.title}
                      {/* <ExternalLink className="ml-2 h-4 w-4 text-gray-400" /> */}
                    </a>
                  </h3>
                  {writing.excerpt && (
                    <p className="text-gray-600 mb-4">
                      {typeof writing.excerpt === 'string' && writing.excerpt.length > 150
                        ? writing.excerpt.substring(0, 150) + '...'
                        : writing.excerpt
                      }
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <a
                      href={writing.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-flex items-center hover:underline"
                    >
                      Devamını Oku
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </a>

                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/articles"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Tüm yazıları görüntüle
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}