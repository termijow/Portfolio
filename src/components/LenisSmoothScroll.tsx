'use client' // Este componente interactúa con el DOM y estado del navegador

import { ReactNode, useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { usePathname } from 'next/navigation' // Para reiniciar en cambio de ruta

interface LenisSmoothScrollProps {
  children: ReactNode
}

export default function LenisSmoothScroll({ children }: LenisSmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true }) // Reinicia scroll en cambio de ruta
    }
  }, [pathname])

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // Cuanto menor, más suave (y más "lag")
      smoothWheel: true,
      // Otros parámetros de Lenis si los necesitas
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}