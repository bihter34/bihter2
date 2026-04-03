import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Hakkında',
  description: 'Bihter Sabanoğlu&apos;nun biyografisi ve akademik geçmişi',
};

export default function AboutPage() {
  return (
    <div className="bg-white pt-32">

      {/* Biyografi ve Animasyon */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Portre */}
            <div className="relative w-3/4 h-auto">
              <Image
                src="/bihtersabanoglu.webp"
                alt="Bihter Sabanoğlu"
                width={800}
                height={1000}
                className="w-full h-auto rounded-lg shadow-lg"
                priority
              />
            </div>

            {/* Biyografi */}
            <div className="prose prose-lg text-gray-600 space-y-6 lg:mt-8">
              <p>
                1980 yılında İstanbul&apos;da doğan Bihter Sabanoğlu, Paris-İstanbul arasında 
                yaşayan yazar ve AICA üyesi sanat eleştirmenidir. Notre Dame de Sion 
                Fransız Kız Lisesi&apos;ni tamamladıktan sonra İstanbul Üniversitesi&apos;nde 
                eğitimine devam etmiştir.
              </p>
              
              <p>
                Paris III Sorbonne Üniversitesi&apos;nde İngiliz Dili ve Edebiyatı alanında 
                yüksek lisans derecesi alan Sabanoğlu, ardından Ecole du Louvre&apos;da 
                epigrafi, hiyeroglif çözümlemesi ve Bizans sanatı tarihi gibi farklı 
                disiplinlerde eğitim görmüştür. Halihazırda Sorbonne Paris III 
                Üniversitesi&apos;nde Bizans Sanat Tarihi üzerine doktorasını sürdürmektedir.
              </p>
              
              <p>
                Bağımsız tarih araştırmalarının yanı sıra sanat tarihi, çağdaş sanat 
                ve edebiyat üzerine yazdığı makaleler Toplumsal Tarih, Yıllık: Annual 
                of Istanbul Studies, Art Unlimited, Manifold, Sanat Kritik, Sanat 
                Dünyamız, T24 gibi dergiler, platformlar ve akademik mecralarda yayımlanmıştır.
              </p>
              
              <p>
                Arketon Yayınları için Jacques Derrida - Mimarlık ve Dekonstrüksiyon (2023) 
                ve Ricardo Porro - Mimarlıkta İçeriğin Beş Görünümü (2021) kitaplarının 
                editörlüğünü üstlenmiştir. 2022&apos;de ilk romanı &quot;Şüpheli Şeylerin Keşfi&quot;ni yayımlamıştır.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 