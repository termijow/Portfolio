// src/components/layout/Navbar.tsx
'use client'; // Para efectos de scroll y estado si se añaden menús móviles

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap'; // Para animaciones

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); // Cambia el fondo cuando se scrollea un poco
    };
    window.addEventListener('scroll', handleScroll);

    // Animación de entrada para el Navbar con GSAP
    if (navRef.current) {
      gsap.fromTo(
        navRef.current.children, // Anima los hijos directos del nav (logo, links)
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, delay: 0.5, duration: 0.7, ease: 'power3.out' }
      );
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'Sobre Mí' },
    { href: '#projects', label: 'Proyectos' },
    { href: '#skills', label: 'Habilidades' },
    { href: '#contact', label: 'Contacto' },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out h-16 flex items-center
                  ${isScrolled ? 'bg-brand-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo/Iniciales */}
        <Link href="/" className="text-2xl font-heading font-black text-brand-red hover:text-brand-white transition-colors">
          JDEC
        </Link>

        {/* Enlaces de Navegación (Escritorio) */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-brand-white hover:text-brand-red transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Botón de Menú Móvil (Placeholder) */}
        <div className="md:hidden">
          {/* Aquí iría un botón para abrir un menú en móviles */}
          <button className="text-brand-white hover:text-brand-red">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}