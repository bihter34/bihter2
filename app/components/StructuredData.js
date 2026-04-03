export default function StructuredData() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Bihter Sabanoğlu",
      "jobTitle": "Yazar ve Sanat Eleştirmeni",
      "description": "Bihter Sabanoğlu, Paris-İstanbul arasında yaşayan yazar ve AICA üyesi sanat eleştirmenidir. Bizans sanat tarihi, çağdaş sanat ve edebiyat alanlarında uzmanlaşmıştır.",
      "url": "https://bihtersabanoglu.com",
      "image": "https://bihtersabanoglu.com/bihtersabanoglu.webp",
      "sameAs": [
        "https://instagram.com/bihtersabanoglu",
        "https://univ-paris3.academia.edu/BihterSabanoglu"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Sorbonne Paris III Üniversitesi",
        "url": "https://www.univ-paris3.fr"
      },
      "alumniOf": [
        {
          "@type": "Organization",
          "name": "İstanbul Üniversitesi",
          "url": "https://istanbul.edu.tr"
        },
        {
          "@type": "Organization", 
          "name": "Paris III Sorbonne Üniversitesi",
          "url": "https://www.univ-paris3.fr"
        },
        {
          "@type": "Organization",
          "name": "Ecole du Louvre",
          "url": "https://www.ecoledulouvre.fr"
        },
        {
          "@type": "Organization",
          "name": "Notre Dame de Sion Fransız Kız Lisesi",
          "url": "https://www.nds.k12.tr"
        }
      ],
      "knowsAbout": [
        "Bizans Sanat Tarihi",
        "Çağdaş Sanat",
        "Edebiyat",
        "Epigrafi",
        "Hiyeroglif Çözümlemesi",
        "İngiliz Dili ve Edebiyatı",
        "Tarih Araştırmaları",
        "Mimarlık Tarihi"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Yazar ve Sanat Eleştirmeni",
        "occupationLocation": [
          {
            "@type": "Place",
            "name": "Paris, Fransa"
          },
          {
            "@type": "Place", 
            "name": "İstanbul, Türkiye"
          }
        ]
      },
      "address": [
        {
          "@type": "PostalAddress",
          "addressLocality": "Paris",
          "addressCountry": "FR"
        },
        {
          "@type": "PostalAddress",
          "addressLocality": "İstanbul",
          "addressCountry": "TR"
        }
      ],
      "nationality": "Turkish",
      "birthPlace": {
        "@type": "Place",
        "name": "İstanbul, Türkiye"
      },
      "birthDate": "1980",
      "memberOf": {
        "@type": "Organization",
        "name": "AICA",
        "url": "https://www.aicaturkey.org/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Arketon Yayınları"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Bihter Sabanoğlu",
      "url": "https://bihtersabanoglu.com",
      "description": "Bihter Sabanoğlu - Sorbonne Üniversitesi mezunu, AICA üyesi yazar ve sanat eleştirmeni. Edebiyat eleştirisi, çağdaş sanat ve Bizans sanat tarihi üzerine yazılar, podcastler ve etkinlikler.",
      "author": {
        "@type": "Person",
        "name": "Bihter Sabanoğlu"
      },
      "inLanguage": "tr",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://bihtersabanoglu.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "mainEntity": {
        "@type": "Person",
        "name": "Bihter Sabanoğlu"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://bihtersabanoglu.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Yazılar",
          "item": "https://bihtersabanoglu.com/articles"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Podcastler",
          "item": "https://bihtersabanoglu.com/podcasts"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Etkinlikler",
          "item": "https://bihtersabanoglu.com/events"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Kurgu",
          "item": "https://bihtersabanoglu.com/fiction"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "Basında",
          "item": "https://bihtersabanoglu.com/press"
        }
      ]
    }
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 