'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Kurgu', href: '/fiction' },
  { name: 'Yazılar', href: '/articles' },
  { name: 'Podcastler', href: '/podcasts' },
  { name: 'Basında', href: '/press' },
  { name: 'Etkinlikler', href: '/events' },
  { name: 'Hakkında', href: '/about' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Navbar'ı gizle/göster
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Aşağı scroll - navbar'ı gizle
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Yukarı scroll - navbar'ı göster
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Mobile menu açıldığında body scroll'u engelle
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = 'unset';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [mobileMenuOpen]);

  return (
    <nav className={`bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-playfair font-bold text-gray-900 hover:text-gray-700 transition-colors drop-shadow-sm">
              Bihter Sabanoğlu
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 group ${
                      isActive 
                        ? 'text-gray-900' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                    {/* Aktif durum için alt çizgi */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                    )}
                    {/* Hover durumunda alt çizgi (aktif değilse) */}
                    {!isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Ana menüyü aç</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-[9999] bg-white transition-all duration-300 ease-in-out overflow-hidden touch-none ${
        mobileMenuOpen 
          ? 'opacity-100 visible translate-x-0' 
          : 'opacity-0 invisible translate-x-full'
      }`}>
        <div className="flex flex-col w-full h-full bg-white">
          {/* Header with close button */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
            <div className="text-3xl font-playfair font-bold text-gray-900 cursor-pointer" onClick={() => router.push('/')}>
              Bihter Sabanoğlu
            </div>
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          {/* Navigation items */}
          <div className="flex-1 px-4 py-8 space-y-2 bg-white flex flex-col">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-4 text-xl font-medium transition-all duration-200 rounded-lg ${
                    isActive 
                      ? 'text-gray-900 bg-gray-100 border-l-4 border-gray-900' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-l-4 border-transparent hover:border-gray-300'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
} 