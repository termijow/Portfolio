// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import LenisSmoothScroll from '@/components/LenisSmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Juan Diego Estrada - Fullstack Developer',
  description: 'Portafolio de Juan Diego Estrada Ceballos, Desarrollador Fullstack.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      {/* Añade suppressHydrationWarning aquí si el error es por cz-shortcut-listen */}
      <body suppressHydrationWarning={true}> 
        <LenisSmoothScroll>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </LenisSmoothScroll>
      </body>
    </html>
  );
}