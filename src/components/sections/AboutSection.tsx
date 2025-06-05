// src/components/sections/AboutSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphsContainerRef = useRef<HTMLDivElement>(null); // Cambié el nombre de la ref para el contenedor de párrafos

  useEffect(() => {
    // Es buena práctica verificar que las referencias existan antes de usarlas en GSAP
    if (!sectionRef.current || !imageContainerRef.current || !textCardRef.current || !titleRef.current || !paragraphsContainerRef.current) {
      // console.warn("AboutSection: Una o más referencias no están disponibles.");
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%', 
          end: 'bottom 80%',
          toggleActions: 'play none none none',
          // markers: true, 
        },
      });

      tl.fromTo(imageContainerRef.current,
        { opacity: 0, x: -100, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out' }
      );

      tl.fromTo(textCardRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
        "<0.2" // Inicia 0.2s DESPUÉS del inicio de la animación anterior
      );

      tl.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        "-=0.7" // Superposición: Inicia 0.7s ANTES de que termine la animación anterior (la de textCardRef)
      );
      
      // Animación de los párrafos hijos del contenedor
      // Asegúrate de que paragraphsContainerRef.current.children sea un HTMLCollection válido
      const paragraphs = paragraphsContainerRef.current?.children;
      if (paragraphs && paragraphs.length > 0) {
        tl.fromTo(paragraphs, // GSAP puede tomar directamente un HTMLCollection
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out' },
          "-=0.5" // Superposición
        );
      }

    }, sectionRef); // Alcance del contexto de GSAP

    return () => ctx.revert(); // Limpieza de GSAP
  }, []); // El array de dependencias vacío asegura que se ejecute una vez después del montaje

  const aboutText = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 overflow-hidden bg-brand-black"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">
          
          {/* Columna de la Imagen */}
          <div ref={imageContainerRef} className="md:col-span-2 flex justify-center items-center opacity-0"> {/* GSAP controlará la opacidad */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              <div className="absolute inset-0 bg-brand-red transform rotate-6 rounded-2xl shadow-lg"></div>
              <div className="absolute inset-2 sm:inset-3 overflow-hidden rounded-xl shadow-xl">
                <Image
                  src="/pfp.jpg" // Asegúrate que la ruta sea correcta, ej: /images/pfp.jpg si está en public/images
                  alt="Foto de perfil de Juan Diego Estrada"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Columna de Texto (Tarjeta Glassmórfica) */}
          <div ref={textCardRef} className="md:col-span-3 opacity-0"> {/* GSAP controlará la opacidad */}
            <div className="bg-brand-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-10 shadow-xl border border-brand-white/10">
              <h2 ref={titleRef} className="text-3xl sm:text-4xl font-heading font-bold text-brand-white mb-6 opacity-0"> {/* GSAP controlará la opacidad */}
                Sobre Mí
              </h2>
              {/* Contenedor para los párrafos, para la referencia de GSAP */}
              <div 
                ref={paragraphsContainerRef} 
                className="space-y-4 text-brand-white/80 font-sans text-base md:text-lg leading-relaxed"
              >
                {aboutText.map((paragraph, index) => (
                  // Quitamos opacity-0 de aquí, GSAP lo manejará con el fromTo
                  <p key={index}> 
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}