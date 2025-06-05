// src/components/LenisSmoothScroll.tsx
'use client'; // Este componente interactúa con el DOM y estado del navegador

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis'; // Asegúrate de tenerlo instalado
import { usePathname } from 'next/navigation';

interface LenisSmoothScrollProps {
  children: ReactNode;
}

export default function LenisSmoothScroll({ children }: LenisSmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Destruir la instancia anterior de Lenis si existe al cambiar de ruta o al desmontar
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }

    // Crear una nueva instancia de Lenis
    const newLenisInstance = new Lenis({
      lerp: 0.1, // Ajusta para la "suavidad"
      smoothWheel: true,
      // wrapper: window, // Por defecto es window, puedes especificar otro si es necesario
      // content: document.documentElement, // Por defecto es document.documentElement
    });
    lenisRef.current = newLenisInstance;

    // Scroll al inicio en cambio de ruta
    newLenisInstance.scrollTo(0, { immediate: true });

    function raf(time: number) {
      newLenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Limpieza al desmontar el componente
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [pathname]); // Re-ejecutar el efecto si cambia el pathname

  return <>{children}</>;
}