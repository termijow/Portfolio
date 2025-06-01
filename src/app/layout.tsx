// src/app/layout.tsx (temporalmente simplificado)
import './styles/globals.css' // Solo esto

export const metadata = {
  title: 'Test Tailwind',
  description: 'Probando configuración de Tailwind',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}