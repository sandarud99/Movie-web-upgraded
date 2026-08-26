import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpotlightOverlay from "@/components/SpotlightOverlay";
import SmoothScrolling from "@/components/SmoothScrolling";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const BASE_URL = "https://9ineflix.com";
const SITE_NAME = "9ineflix";
const LOGO_URL = `${BASE_URL}/9ineflix-site-icon.png`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "9ineflix | Free Movies & TV Shows Online",
    template: "%s | 9ineflix",
  },
  description:
    "Watch free movies, TV shows, and anime online on 9ineflix. Stream the latest releases, trending titles, and top-rated content — all in one place.",
  keywords: [
    "watch movies online",
    "free streaming",
    "TV shows",
    "anime",
    "9ineflix",
    "free movies",
    "watch online",
  ],
  authors: [{ name: "9ineflix", url: BASE_URL }],
  creator: "9ineflix",
  publisher: "9ineflix",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: SITE_NAME,
    title: "9ineflix | Free Movies & TV Shows Online",
    description:
      "Watch free movies, TV shows, and anime online on 9ineflix. Stream the latest releases, trending titles, and top-rated content.",
    images: [
      {
        url: LOGO_URL,
        width: 512,
        height: 512,
        alt: "9ineflix Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "9ineflix | Free Movies & TV Shows Online",
    description:
      "Watch free movies, TV shows, and anime online on 9ineflix.",
    images: [LOGO_URL],
    creator: "@9ineflix",
  },
  icons: {
    icon: "/9ineflix-site-icon.png",
    apple: "/9ineflix-site-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "9ineflix",
    url: BASE_URL,
    description:
      "Watch free movies, TV shows, and anime online on 9ineflix.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "9ineflix",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
  };

  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${dmSans.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <SmoothScrolling>
          <Navbar />
          <SpotlightOverlay />
          {children}
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}
