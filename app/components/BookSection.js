import Image from 'next/image';
import { ExternalLink, Download, Instagram } from 'lucide-react';

export default function BookSection() {
  return (
    <section className="py-16 bg-white pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl shadow-xl border border-emerald-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Kitap Kapağı */}
              <div className="relative p-12 lg:p-16 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-600">
                <div className="relative">
                  <Image
                    src="/dr.jpeg"
                    alt="Şüpheli Şeylerin Keşfi - Bihter Sabanoğlu"
                    width={280}
                    height={420}
                    className="w-72 h-auto rounded-xl shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-700 hover:scale-105"
                  />
                  {/* Dekoratif elementler */}
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute top-1/2 -right-4 w-8 h-8 bg-white/30 rounded-full blur-lg"></div>
                </div>
              </div>

              {/* Sağ Taraf - Minimal Bilgi ve Satın Al */}
              <div className="p-12 lg:p-16 flex flex-col justify-center items-center text-center">
                <div className="mb-16">
                  <h3 className="text-4xl font-bold text-gray-900 mb-4">
                    Şüpheli Şeylerin Keşfi
                  </h3>
                  <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full"></div>
                </div>

                <div className="mb-8 flex flex-col items-center space-y-4">
                  <a
                    href="https://www.kitapyurdu.com/kitap/supheli-seylerin-kesfi/606867.html&filter_name=%C5%9F%C3%BCpheli+%C5%9Feylerin+ke%C5%9Ffi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-emerald-700 text-lg font-semibold rounded-2xl text-emerald-700 bg-white hover:bg-emerald-700 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Satın Al
                    <ExternalLink className="ml-3 h-5 w-5" />
                  </a>

                  <div className="flex flex-col items-center space-y-2">
                    <a
                      href="https://drive.google.com/file/d/16ktJBRvgqmJkXXvnh64d138b_AsPOrPP/view?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 border border-emerald-300 text-base font-medium rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      ŞŞK Harita
                    </a>
                    <p className="text-xs text-gray-500">
                      <a href="https://www.instagram.com/sehirdedektifi" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-600 inline-flex items-center">
                        <Instagram className="mr-1 h-4 w-4" /> Gizem Kıygı - Harita editörü
                      </a>
                    </p>
                    <p className="text-xs text-gray-500">
                      <a href="#" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-600 inline-flex items-center">
                        Gülzade Şentürk - Harita illüstrasyon
                      </a>
                    </p>

                    <p className="text-xs text-gray-500">
                      ⚠️ Büyük dosya (~400MB)
                    </p>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}