// src/components/sections/AboutSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registramos el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Usamos el contexto de GSAP para una limpieza más fácil
    const ctx = gsap.context(() => {
      // Timeline para la animación de la sección
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%', // Inicia la animación cuando el 60% superior de la sección entra en la vista
          end: 'bottom 80%',
          toggleActions: 'play none none none',
          // markers: true, // Descomenta para depurar las posiciones del trigger
        },
      });

      // 1. Animación de la columna de la imagen
      tl.fromTo(imageContainerRef.current,
        { opacity: 0, x: -100, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out' }
      );

      // 2. Animación de la tarjeta de texto (desde el lado opuesto)
      tl.fromTo(textCardRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
        "<0.2" // Inicia 0.2s después de la animación de la imagen
      );

      // 3. Animación del contenido DENTRO de la tarjeta (título y párrafos)
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        "-=0.7" // Se superpone con la animación de la tarjeta
      );
      if (paragraphsRef.current) {
        tl.fromTo(paragraphsRef.current.children, // Anima cada párrafo hijo
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out' },
          "-=0.5"
        );
      }

    }, sectionRef); // El contexto se aplica a los elementos dentro de sectionRef

    // Función de limpieza del contexto
    return () => ctx.revert();
  }, []);

  // Tu información, refinada para el portafolio
  const aboutText = [
    `Soy un Desarrollador Fullstack con un gran interés en la creación de soluciones web impactantes. Me especializo en trabajar eficientemente en equipo, manteniendo una actitud de aprendizaje constante y un compromiso con la producción de código de alta calidad.`,
    `Busco la oportunidad de enfrentar proyectos desafiantes donde pueda aplicar mis habilidades en tecnologías como React, Next.js, Node.js y NestJS, y continuar creciendo profesionalmente.`,
    `Actualmente, aplico principios de diseño de software como SOLID, KISS y DRY en el desarrollo de APIs RESTful y en la arquitectura de aplicaciones escalables.`
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 overflow-hidden bg-brand-black" // Fondo negro base
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">
          
          {/* Columna de la Imagen (Ocupa 2 de 5 columnas en md) */}
          <div ref={imageContainerRef} className="md:col-span-2 flex justify-center items-center opacity-0">
            {/* Contenedor con estilo Bauhaus para la imagen */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              {/* Forma de fondo (cuadrado rotado) */}
              <div className="absolute inset-0 bg-brand-red transform rotate-6 rounded-2xl"></div>
              {/* Contenedor de la imagen */}
              <div className="absolute inset-2 sm:inset-3 overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/pfp.jpg" // Asegúrate de que esta ruta sea correcta
                  alt="Foto de perfil de Juan Diego Estrada"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover" // object-cover para que la imagen llene el contenedor
                />
              </div>
            </div>
          </div>

          {/* Columna de Texto (Ocupa 3 de 5 columnas en md) */}
          <div ref={textCardRef} className="md:col-span-3 opacity-0">
            {/* Tarjeta Glassmórfica */}
            <div className="bg-brand-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-10 shadow-xl border border-brand-white/10">
              <h2 ref={titleRef} className="text-3xl sm:text-4xl font-heading font-bold text-brand-white mb-6 opacity-0">
                Sobre Mí
              </h2>
              <div ref={paragraphsRef} className="space-y-4 text-brand-white/80 font-sans text-base md:text-lg leading-relaxed opacity-0">
                {aboutText.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}