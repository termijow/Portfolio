// src/components/sections/SkillsSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image'; // Para los iconos SVG
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText'; // Asumiendo que tienes GSAP Club
import { skillsList, Skill } from '@/data/skillsData'; // Importar los datos de skills

gsap.registerPlugin(ScrollTrigger, SplitText);

//-------------------------------------------------------------------
// NUEVO: Componente para cada Icono de Habilidad
//-------------------------------------------------------------------
interface SkillIconItemProps {
  skill: Skill;
  index: number; // Para variar tamaños o delays si es necesario
}

const SkillIconItem: React.FC<SkillIconItemProps> = ({ skill, index }) => {
  // Tamaños variados para los iconos
  const sizes = ['w-16 h-16 sm:w-20 sm:h-20', 'w-20 h-20 sm:w-24 sm:h-24', 'w-14 h-14 sm:w-16 sm:h-16'];
  const randomSize = sizes[index % sizes.length];

  return (
    <div
      className={`skill-icon-item relative ${randomSize} flex flex-col items-center justify-center 
                  p-2 opacity-0 transform transition-transform duration-300 ease-out hover:scale-110 group cursor-pointer`}
      title={skill.name}
      // La animación de opacidad y transformación inicial la manejará GSAP desde SkillsSection
    >
      <Image
        src={skill.iconSrc}
        alt={skill.name}
        width={96} // Ancho base, Tailwind lo sobrescribirá
        height={96}// Alto base
        className="object-contain w-full h-full drop-shadow-lg" // drop-shadow para un poco de profundidad
      />
      <span
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap
                   text-xs font-sans text-brand-white bg-brand-red px-2 py-0.5 rounded-md 
                   opacity-0 group-hover:opacity-100 group-hover:bottom-[-22px] transition-all duration-300 ease-out"
      >
        {skill.name}
      </span>
    </div>
  );
};
//-------------------------------------------------------------------
// FIN Componente SkillIconItem
//-------------------------------------------------------------------


export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLHeadingElement>(null);
  const skillsContentWrapperRef = useRef<HTMLDivElement>(null); // Este es el contenedor principal de skills
  // const portalRef = useRef<HTMLDivElement>(null); // Si ya no usas el portal blanco/gris, puedes quitar esta ref

  useEffect(() => {
    // Quitamos la referencia a portalRef si ya no se usa en la animación de entrada
    if (!sectionRef.current || !titleContainerRef.current || !titleTextRef.current || !skillsContentWrapperRef.current) {
      return;
    }

    let splitTitle: SplitText | null = null;
    let targetLetter: HTMLElement | null = null;
    let otherChars: HTMLElement[] = [];

    try {
      splitTitle = new SplitText(titleTextRef.current, { type: 'chars' });
      const iCharIndex = titleTextRef.current.innerText.indexOf("I");
      if (iCharIndex !== -1 && splitTitle.chars.length > iCharIndex) {
        targetLetter = splitTitle.chars[iCharIndex] as HTMLElement;
        otherChars = splitTitle.chars.filter((_, index) => index !== iCharIndex);
      } else {
        targetLetter = titleTextRef.current;
      }
    } catch (e) {
      console.warn("SplitText no disponible. Animando título completo.", e);
      targetLetter = titleTextRef.current;
    }

    const ctx = gsap.context(() => {
      // Animación inicial de entrada del título (letras)
      if (splitTitle && splitTitle.chars) {
        gsap.fromTo(splitTitle.chars,
          { opacity: 0, y: 80, scale: 0.7, rotateX: -90, transformOrigin: "50% 50% -30px" },
          {
            opacity: 1, y: 0, scale: 1, rotateX: 0, stagger: 0.05, duration: 0.8, ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reset',
            }
          }
        );
      } else if (titleTextRef.current) { // Fallback para el título completo
        gsap.fromTo(titleTextRef.current, {opacity:0, y:80, scale:0.7}, {opacity:1, y:0, scale:1, duration:0.8, ease:'back.out(1.4)', scrollTrigger:{trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reset'}});
      }


      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2000', // Ajusta la duración del pin
          scrub: 1,
          pin: titleContainerRef.current, // Pinea el contenedor del título
          // markers: {startColor: "purple", endColor: "orange", indent: 200},
          onLeave: () => {
            gsap.set(titleContainerRef.current, { opacity: 0, display:'none' }); // Asegurar que el título se oculte
            gsap.set(skillsContentWrapperRef.current, { opacity: 1 }); // Asegurar que el contenido sea visible
          },
          onEnterBack: () => {
            gsap.set(titleContainerRef.current, { opacity: 1, display:'flex'});
            if (splitTitle && splitTitle.chars) gsap.set(splitTitle.chars, {opacity:1}); else if(titleTextRef.current) gsap.set(titleTextRef.current, {opacity:1});
            gsap.set(skillsContentWrapperRef.current, { opacity: 0 });
          },
        }
      });

      // 1. Desvanecer otras letras si SplitText está activo
      if (splitTitle && otherChars.length > 0) {
        masterTl.to(otherChars, { opacity: 0, duration: 0.3, stagger:0.02 }, 0.2); // Inicia un poco después del pin
      }

      // 2. Zoom en la letra/título objetivo (la "I")
      // El targetLetter se escala y se desvanece, dando paso al skillsContentWrapperRef
      if (targetLetter) {
        masterTl.to(targetLetter, {
          scale: 30, // Escala masiva
          opacity: 0,
          duration: 0.8, // Duración relativa
          ease: 'power2.inOut'
        }, (splitTitle && otherChars.length > 0) ? "<0.1" : 0.2 ); // Sincronizar con la desaparición de otras letras o empezar un poco después
      }

      // 3. Revelar el contenedor de habilidades (skillsContentWrapperRef)
      // Este aparece "desde dentro" o "a través" de la "I" que se expande y desvanece
      masterTl.fromTo(skillsContentWrapperRef.current,
        { opacity: 0, scale: 0.2, y: 50 }, // Empieza pequeño y debajo
        {
          opacity: 1, scale: 1, y: 0,
          duration: 1, // Duración relativa
          ease: 'power3.out'
        }, 
        targetLetter ? "-=0.6" : 0.5 // Superponer con el desvanecimiento de la 'I', o empezar después si no hay 'I'
      );

      // 4. Animación de entrada para los iconos individuales DENTRO de skillsContentWrapperRef
      // Se activa cuando skillsContentWrapperRef ya es visible por la masterTl
      if (skillsContentWrapperRef.current) {
        const icons = Array.from(skillsContentWrapperRef.current.querySelectorAll('.skill-icon-item'));
        if (icons.length > 0) {
            gsap.set(icons, {opacity:0, scale:0, rotate:0, y:0, x:0}); // Resetear estado inicial de iconos

            // Usamos un ScrollTrigger separado para los iconos, para que se activen
            // cuando el contenedor de skills ya esté en su posición final y visible.
            ScrollTrigger.create({
                trigger: skillsContentWrapperRef.current,
                start: 'top 70%', // O 'center center', 'top center', etc.
                // end: 'bottom top', // Podría tener un end si quieres que se desvanezcan al salir
                toggleActions: 'play none none reset', // Para que se re-animen
                onEnter: () => {
                    gsap.to(icons, {
                        opacity:1, scale:1, 
                        rotate: () => gsap.utils.random(-20, 20), 
                        y: () => gsap.utils.random(-15, 15), // Pequeña dispersión vertical
                        x: () => gsap.utils.random(-15, 15), // Pequeña dispersión horizontal
                        duration: 1.2,
                        stagger: { each: 0.08, from: 'random', grid:'auto' },
                        ease: 'elastic.out(1, 0.7)',
                    });
                },
                onLeaveBack: () => { // Al scrollear hacia arriba, resetear los iconos
                    gsap.set(icons, {opacity:0, scale:0, rotate:0, y:0, x:0});
                }
            });
        }
      }
    }, sectionRef.current!);

    return () => ctx.revert();
  }, []); // No añadir iIndex si titleCharsRef se llena dentro del useEffect

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full min-h-[250vh] py-10 bg-brand-black text-brand-white" // Ajustar min-h
      style={{ overflowX: 'hidden' }}
    >
      {/* Contenedor del Título para el Pinning y Zoom */}
      <div
        ref={titleContainerRef}
        className="h-screen w-full flex flex-col justify-center items-center sticky top-0 z-20" // z-index para estar sobre el contenido de skills inicialmente
      >
        <h2
          ref={titleTextRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[160px] font-heading font-black uppercase text-brand-white text-center"
          style={{ lineHeight: '0.9em', willChange: 'transform, opacity' }}
        >
          HABILIDADES {/* SplitText se encargará de esto */}
        </h2>
      </div>

      {/* Contenedor del Contenido de Habilidades */}
      {/* Este div se posiciona para ocupar el espacio "detrás" del título pineado */}
      <div
        ref={skillsContentWrapperRef}
        className="relative w-full opacity-0" // GSAP lo hará visible. z-10 para estar detrás del título al inicio.
        style={{ marginTop: '-100vh' }} // Truco para superponer con el contenedor pineado
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 min-h-screen flex flex-col justify-center items-center">
            <h3 className="text-4xl sm:text-5xl font-heading text-brand-white text-center mb-12 md:mb-16">
                Mis Herramientas
            </h3>
            {/* Contenedor donde se mapean los SkillIcon */}
            <div
              className="relative flex flex-wrap justify-center items-center 
                         gap-x-8 gap-y-12 md:gap-x-12 md:gap-y-16 lg:gap-x-16 lg:gap-y-20 
                         max-w-3xl xl:max-w-4xl mx-auto p-4"
            >
              {skillsList.map((skill, index) => (
                // La clase 'skill-icon-item' es crucial para la selección por GSAP
                // La opacidad inicial de los iconos la maneja GSAP
                <SkillIconItem key={skill.name} skill={skill} index={index} />
              ))}
              {/* Tarjeta de Principios con la misma clase para animarse */}
              <div className="skill-icon-item opacity-0 bg-brand-black/50 backdrop-blur-md p-6 rounded-xl border-2 border-brand-red/70 shadow-lg flex flex-col justify-center items-center text-center w-full max-w-[200px] sm:max-w-[250px] aspect-square">
                  <h4 className="text-lg font-heading text-brand-white mb-2">Principios</h4>
                  <p className="text-brand-white/70 font-sans text-sm">SOLID, KISS, DRY</p>
              </div>
            </div>
        </div>
      </div>
       
       {/* Assets decorativos de fondo (ejemplos) */}
       <div className="absolute top-[10%] left-[15%] w-12 h-24 bg-brand-red/5 rounded-lg -rotate-45 filter blur-xs -z-10 opacity-50"></div>
       <div className="absolute bottom-[15%] right-[10%] w-16 h-16 bg-brand-white/5 rounded-full filter blur-sm -z-10 opacity-30"></div>
    </section>
  );
}