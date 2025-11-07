import "./globals.css";
import { Roboto } from 'next/font/google';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const roboto = Roboto({
  weight: '500',
  subsets: ['latin'],
});

export const metadata = {
  title: "Bocanada Cocina de Brassa",
  description: "Cocina artesanal, vinos selectos y cortes a la brasa en CDMX.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${roboto.className} bg-black text-white`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}