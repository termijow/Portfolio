// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import LenisSmoothScroll from '@/components/LenisSmoothScroll'; // Crearemos/verificaremos este
import Navbar from '@/components/layout/Navbar';             // Crearemos este
import Footer from '@/components/layout/Footer';             // Crearemos este

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
      <body>
        <LenisSmoothScroll>
          <Navbar />
          <main className="pt-16"> {/* Añadimos padding-top para que el contenido no quede debajo del Navbar fijo */}
            {children}
          </main>
          <Footer />
        </LenisSmoothScroll>
      </body>
    </html>
  );
}