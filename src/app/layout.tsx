// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css'; // Asegúrate de que esta importación esté presente

export const metadata: Metadata = {
  title: 'Test Tailwind App',
  description: 'Testing Tailwind v4 setup',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}