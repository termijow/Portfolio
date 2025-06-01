'use client' // Necesario para useEffect y GSAP

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Button from '@/components/ui/Button' // Lo crearemos después

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Animación de entrada para el título, subtítulo y botón
    tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.2 })
      .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .fromTo(buttonRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 }, "-=0.4")

    // Podrías añadir una animación de fondo sutil con GSAP aquí
    // o elementos geométricos Bauhaus que se mueven
    gsap.to(heroRef.current, {
        // Ejemplo: un leve movimiento de fondo al hacer scroll si tienes una imagen
        // backgroundPositionY: "5%",
        // ease: "none",
        // scrollTrigger: {
        //   trigger: heroRef.current,
        //   start: "top top",
        //   end: "bottom top",
        //   scrub: true,
        // },
    });

  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center items-center text-center p-8 relative overflow-hidden"
      // Podrías tener un fondo con un degradado sutil o un patrón geométrico Bauhaus
      style={{ background: "linear-gradient(180deg, #0A0A0A 0%, #1C1C1C 100%)" }}
    >
      {/* Elementos decorativos Bauhaus (opcional) */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-red/30 rounded-full filter blur-2xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-4 border-brand-red/50 transform rotate-45 opacity-30"></div>


      <h1 ref={titleRef} className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter mb-4">
        Juan Diego <span className="text-brand-red">Estrada Ceballos</span>
      </h1>
      <p ref={subtitleRef} className="text-2xl md:text-3xl text-brand-white/80 font-light mb-8 max-w-2xl">
        Fullstack Developer transformando ideas en soluciones web <span className="text-brand-red font-semibold">innovadoras</span> y <span className="text-brand-red font-semibold">eficientes</span>.
      </p>
      <div ref={buttonRef}>
        <Button href="#projects" variant="primary" size="lg">
          Ver Mis Proyectos
        </Button>
      </div>
    </section>
  )
}