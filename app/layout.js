import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/components/modal-context";
import JoinModal from "@/components/join-modal";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Abdullah Agency - TikTok Live Agency",
  description: "Join the best TikTok Live Agency and grow your presence",
 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
