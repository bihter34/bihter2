'use client';

import StructuredData from './components/StructuredData';
import HeroSection from './components/HeroSection';
import RecentArticlesSection from './components/RecentArticlesSection';
import BookSection from './components/BookSection';
import PressSection from './components/PressSection';

export default function Home() {
  return (
    <div className="bg-white page-transition">
      <StructuredData />
      <HeroSection />
      <BookSection />
      <RecentArticlesSection />
      <PressSection />
    </div>
  );
}
