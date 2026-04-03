import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import BookSection from '../components/BookSection';
import GallerySection from '../components/GallerySection';

export const metadata = {
  title: 'Kurgu',
  description: '',
  keywords: [
    'Bihter Sabanoğlu kurgu',
    'edebiyat kurgu',
  ],
};

export default function KurguPage() {
  return (
    <div className="bg-white min-h-screen">
      <BookSection />
      <GallerySection />
    </div>
  );
} 