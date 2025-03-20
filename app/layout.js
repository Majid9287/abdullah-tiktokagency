import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/components/modal-context";
import JoinModal from "@/components/join-modal";
import { siteMetadata } from './metadata'
import { favicons } from './favicon';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://abdullahagency.uk'),
  title: {
    default: 'Abdullah Agency - Premier TikTok Live Agency',
    template: `%s | Abdullah Agency`
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: siteMetadata.authors,
  icons: {
    icon: favicons.icon,
    apple: favicons.apple,
    other: favicons.other
  },
  manifest: favicons.manifest,
  openGraph: {
    title: 'Abdullah Agency - Transform Your TikTok Presence',
    description: siteMetadata.description,
    url: 'https://abdullahagency.uk',
    siteName: 'Abdullah Agency',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: 'https://abdullahagency.uk/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Abdullah Agency - TikTok Live Agency'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdullah Agency - TikTok Live Agency',
    description: siteMetadata.description,
    images: ['https://abdullahagency.uk/twitter-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
  alternates: {
    canonical: 'https://abdullahagency.uk'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#8B5CF6" />
        <meta name="msapplication-TileColor" content="#8B5CF6" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
        <ModalProvider> <Header />{" "}
          
            <main className="flex-grow">
              {children}
              <JoinModal />
            </main>
          
          <Footer /></ModalProvider>
        </div>
      </body>
    </html>
  );
}

import "./globals.css";
