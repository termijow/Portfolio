'use client' // Si tiene interactividad como menú hamburguesa o efectos de scroll

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    // GSAP para animar la entrada del Navbar
    gsap.fromTo(".navbar-item",
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, delay: 0.5, ease: "power3.out" }
    );
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#about', label: 'Sobre Mí' },
    { href: '#skills', label: 'Habilidades' },
    { href: '#projects', label: 'Proyectos' },
    { href: '#education', label: 'Educación' },
    { href: '#contact', label: 'Contacto' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300
                  ${isScrolled ? 'bg-brand-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="navbar-item text-2xl font-heading font-bold text-brand-red hover:text-brand-white transition-colors">
          JDEC
        </Link>
        <div className="space-x-4 hidden md:flex">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="navbar-item text-brand-white hover:text-brand-red transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
        {/* Aquí podrías añadir un botón para menú hamburguesa en móviles */}
      </div>
    </nav>
  )
}