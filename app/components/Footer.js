import Link from 'next/link';
import Image from 'next/image';
import { Mail, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            {new Date().getFullYear()} Bihter Sabanoğlu
          </p>
          <div className="flex space-x-4">
            <a
              href="mailto:bihtersabanoglu@gmail.com"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="E-posta"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com/bihtersabanoglu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://univ-paris3.academia.edu/BihterSabanoglu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Academia"
            >
              <Image
                src="/academiaLogo.avif"
                alt="Academia"
                width={20}
                height={20}
                className="h-5 w-5"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 