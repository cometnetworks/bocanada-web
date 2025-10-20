import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], variable: '--font-playfair' });
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata = {
  title: "Bocanada Club",
  description: "Fideliza y gana en Bocanada Cocina de Brasas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${inter.variable} font-sans bg-[#0B0B0B] text-white`}>
        <div
          className="min-h-screen bg-center bg-cover bg-fixed flex flex-col"
          style={{
            backgroundImage: "url('/brasas.jpg')",
          }}
        >
          <div className="flex-1 backdrop-blur-sm bg-black/60">
            {children}
          </div>
          <footer className="text-center py-4 text-sm text-white/60 border-t border-white/10 bg-black/50 backdrop-blur-sm">
            Bocanada Cocina de Brasas © 2025
          </footer>
        </div>
      </body>
    </html>
  );
}