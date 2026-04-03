import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: {
    default: "Bihter Sabanoğlu",
    template: "%s | Bihter Sabanoğlu"
  },
  description: "Bihter Sabanoğlu - Sorbonne Üniversitesi mezunu, AICA üyesi yazar ve sanat eleştirmeni. Edebiyat eleştirisi, çağdaş sanat ve Bizans sanat tarihi üzerine yazılar, podcastler ve etkinlikler.",
  keywords: [
    "Bihter Sabanoğlu",
    "yazar",
    "edebiyat eleştirisi",
    "Türk edebiyatı",
    "podcast",
    "Sorbonne Üniversitesi",
    "Bizans sanat tarihi",
    "çağdaş sanat",
    "AICA üyesi",
    "Paris",
    "İstanbul",
    "akademik yazılar",
  ],
  authors: [{ name: "Bihter Sabanoğlu" }],
  creator: "Bihter Sabanoğlu",
  publisher: "Bihter Sabanoğlu",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bihtersabanoglu.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://bihtersabanoglu.com',
    title: 'Bihter Sabanoğlu',
    description: 'Bihter Sabanoğlu - Sorbonne Üniversitesi mezunu, AICA üyesi yazar ve sanat eleştirmeni. Edebiyat eleştirisi, çağdaş sanat ve Bizans sanat tarihi üzerine yazılar, podcastler ve etkinlikler.',
    siteName: 'Bihter Sabanoğlu',
    images: [
      {
        url: 'https://bihtersabanoglu.com/bihtersabanoglu.jpg',
        width: 1200,
        height: 630,
        alt: 'Bihter Sabanoğlu',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '',
    yandex: '',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#BDB395" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Bihter Sabanoğlu" />
        <meta name="msapplication-TileColor" content="#BDB395" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
      </head>
      <body className={`${inter.variable} ${playfairDisplay.variable} font-sans antialiased overflow-x-hidden`}>
        <div className="min-h-screen flex flex-col max-w-full overflow-x-hidden">
          <Navbar />
          <main className="flex-1 w-full max-w-full overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
