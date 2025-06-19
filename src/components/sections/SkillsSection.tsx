// src/components/sections/SkillsSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import { skillsList, Skill } from '@/data/skillsData'; // Ajusta la ruta

gsap.registerPlugin(ScrollTrigger, SplitText);

// Componente de Icono: Ajustes para responsividad y depuración de carga
const SkillIconDisplay = ({ name, iconSrc }: Skill) => (
  <div 
    className="skill-icon-item flex flex-col items-center justify-center p-1.5 
               bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 rounded-md
               transform transition-all duration-300 hover:scale-105 hover:bg-brand-white/10
               w-[70px] h-[70px]  
               xxs:w-20 xxs:h-20 
               xs:w-24 xs:h-24 
               sm:w-28 sm:h-28
               md:w-64 md:h-64" // Tamaños progresivos para el contenedor del ícono
  >
    <img 
      src={iconSrc} 
      alt={`${name} icon`} 
      className="object-contain mb-1 
                 w-58 h-58 
                 xxs:w-8 xxs:h-8 
                 xs:w-10 xs:h-10 
                 sm:w-12 sm:h-12
                 md:w-48 md:h-48" // Tamaños progresivos para el SVG
      onError={(e) => { 
        console.error(`Error al cargar SVG: ${iconSrc}. Verifica la ruta y el archivo SVG.`);
        const target = e.target as HTMLImageElement;
        target.style.border = '1px solid red'; // Visual cue for missing image
        // Opcional: Mostrar un texto de error en lugar del ícono
        // target.style.display = 'none';
        // if (target.parentElement) {
        //   const errorText = target.parentElement.querySelector('.error-text');
        //   if (!errorText) { // Evitar duplicados
        //     target.parentElement.insertAdjacentHTML('beforeend', `<p class="error-text text-red-500 text-[8px] absolute bottom-1">Error</p>`);
        //   }
        // }
      }}
    />
    <p 
      className="text-center break-words max-w-full leading-tight font-sans text-brand-white/80
                 text-[28px] 
                 xxs:text-[28px] 
                 xs:text-[28px] 
                 sm:text-[28px]" // Tamaños progresivos para el texto
    >
      {name}
    </p>
  </div>
);

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLHeadingElement>(null);
  const skillsContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleContainerRef.current || !titleTextRef.current || !skillsContentRef.current) return;

    let splitTitle: SplitText | null = null;
    let targetLetter: HTMLElement | null = null;

    // Lógica de SplitText (sin cambios)
    try {
      splitTitle = new SplitText(titleTextRef.current, { type: 'chars' });
      targetLetter = splitTitle.chars.length > 5 ? splitTitle.chars[5] as HTMLElement : titleTextRef.current;
    } catch (e) {
      console.warn("SplitText no disponible. Usando fallback para animación de título.");
      targetLetter = titleTextRef.current;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%', // Duración del pin
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          // markers: true,
        }
      });

      tl.set(titleTextRef.current, { opacity: 1, scale: 1 });
      tl.set(skillsContentRef.current, { opacity: 0, scale: 0.5, y: 100 });

      if (targetLetter) {
        if (splitTitle && splitTitle.chars && targetLetter !== titleTextRef.current) {
          const otherChars = splitTitle.chars.filter(char => char !== targetLetter);
          tl.to(otherChars, { opacity: 0, duration: 0.3, stagger:0.02 }, "<");
        }
        tl.to(targetLetter, {
          scale: targetLetter === titleTextRef.current ? 30 : 50, // Ajustar escala si es fallback
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut'
        }, "-=0.2");
      }

      tl.to(skillsContentRef.current, {
        opacity: 1, scale: 1, y: 0,
        duration: 0.8, ease: 'power3.out'
      }, "-=0.7");

      gsap.utils.toArray<HTMLElement>('.skill-icon-item').forEach((item, index) => {
        gsap.fromTo(item,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              // containerAnimation: tl,
              start: 'bottom 95%', // Se activa un poco antes de que esté completamente visible
              toggleActions: 'play none none none',
            },
            delay: index * 0.04 // Stagger un poco más rápido
          }
        );
      });
    }, sectionRef.current as Element);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-brand-black text-brand-white overflow-hidden"
    >
      {/* Contenedor del Título */}
      <div
        ref={titleContainerRef}
        className="h-screen w-full flex flex-col justify-center items-center sticky top-0 px-2" // Añadido px-2 para evitar que toque bordes en móviles
      >
        <h2
          ref={titleTextRef}
          className="font-heading font-black uppercase text-brand-white relative z-10 text-center"
          // Clamp más agresivo para asegurar visibilidad en móviles
          // Mínimo: 2rem (32px), Ideal: 15vw, Máximo: 9rem (144px)
          // Ajusta estos valores según tus preferencias visuales
          style={{ fontSize: 'clamp(2rem, 15vw, 9rem)' }} 
        >
          HABILIDADES
        </h2>
      </div>

      {/* Contenedor del Contenido de Habilidades */}
      <div
        ref={skillsContentRef}
        className="relative z-0 w-full py-12 sm:py-16 md:py-24" // Reducido padding vertical para pantallas pequeñas
      >
        <div className="container mx-auto px-1 xxs:px-2 xs:px-3 sm:px-6 lg:px-8"> {/* Padding del container más ajustado en móviles */}
          <h3 
            className="font-heading text-brand-red text-center mb-6 sm:mb-8 md:mb-12
                       text-xl xxs:text-2xl sm:text-3xl md:text-4xl" // Tamaño de fuente del subtítulo responsivo
          >
            Mis Herramientas y Tecnologías
          </h3>
          <div 
            className="flex flex-wrap justify-center items-stretch 
                       gap-1 xxs:gap-1.5 xs:gap-2 sm:gap-3 md:gap-4" // Gaps más pequeños en móviles
          >
            {skillsList.map((skill, index) => (
              <SkillIconDisplay key={index} name={skill.name} iconSrc={skill.iconSrc} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}