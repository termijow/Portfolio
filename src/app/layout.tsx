// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { /* ... */ };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <button className="bg-brand-red text-brand-white p-4 m-4">
          Botón de Prueba en Layout
        </button>
        {children}
      </body>
    </html>
  );
}