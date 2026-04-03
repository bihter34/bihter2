import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="bg-white pt-16">
      <div className="w-full">
        {/* Full viewport height, excluding fixed navbar (~pt-16 = 4rem) */}
        <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            {/* Mobile: prefer WebM */}
            <source src="/heroAnimation.webm" type="video/webm" media="(max-width: 767px)" />
            {/* Default / desktop fallback */}
            <source src="/heroAnimation.mp4" type="video/mp4" />
            <Image
              src="/bihtersabanoglu.webp"
              alt="Bihter Sabanoğlu"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          
          {/* Navigation Links */}
          <div className="hidden absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-8 drop-shadow-lg">
                Bihter Sabanoğlu
              </h1>
              <p className="text-xl md:text-2xl mb-12 drop-shadow-lg">
                Yazar ve Sanat Eleştirmeni
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/articles" 
                  className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-30"
                >
                  Yazılar
                </Link>
                <Link 
                  href="/podcasts" 
                  className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-30"
                >
                  Podcastler
                </Link>
                <Link 
                  href="/events" 
                  className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-30"
                >
                  Etkinlikler
                </Link>
                <Link 
                  href="/fiction" 
                  className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-30"
                >
                  Kurgu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}