// src/components/sections/SkillsSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText'; // Necesitarás GSAP Club para SplitText, o una alternativa
import { skillsList, Skill } from '@/data/skillsData'; // Importar los datos de skills
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger, SplitText); // Si usas SplitText oficial

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
  const titleTextRef = useRef<HTMLHeadingElement>(null); // Para el texto "HABILIDADES"
  const skillsContentRef = useRef<HTMLDivElement>(null); // Contenedor de las tarjetas de skills
  const skillsContentWrapperRef = useRef<HTMLDivElement>(null); // Este es el contenedor principal de skills


  useEffect(() => {
    if (!sectionRef.current || !titleContainerRef.current || !titleTextRef.current || !skillsContentRef.current) return;

    // Alternativa a SplitText si no tienes GSAP Club:
    // Podrías envolver cada letra en un <span> manualmente en el JSX
    // o usar una librería JS de terceros para dividir el texto.
    // Por simplicidad conceptual, asumiré que tienes una forma de acceder a las letras.
    // Si NO tienes SplitText, el efecto será más difícil de lograr exactamente como se describe.
    // En ese caso, podríamos escalar todo el título.

    let splitTitle: SplitText | null = null;
    let targetLetter: HTMLElement | null = null;

    // Intenta usar SplitText. Si falla, podríamos tener un fallback o un aviso.
    try {
      splitTitle = new SplitText(titleTextRef.current, { type: 'chars' });
      // Seleccionamos la letra central o una específica. Ej: la 'I' o la 'L'
      // "HABILIDADES" tiene 11 letras. La 6ta letra (índice 5) es 'I'.
      if (splitTitle.chars.length > 5) {
        targetLetter = splitTitle.chars[5] as HTMLElement; // La 'I'
      } else {
        targetLetter = titleTextRef.current; // Fallback: animar todo el título
      }
    } catch (e) {
      console.warn("SplitText no está disponible (requiere GSAP Club). El efecto de zoom de letra será diferente.");
      targetLetter = titleTextRef.current; // Fallback a animar todo el título
    }


    const ctx = gsap.context(() => {
      // Timeline principal para la animación de zoom y revelado
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',       // Cuando la parte superior de la sección llega a la parte superior de la ventana
          end: '+=200%',          // La animación durará el equivalente a 200% de la altura de la ventana de scroll
          scrub: 1,              // Vinculado al scroll, con 1s de suavizado
          pin: true,             // Fija la sección mientras dura la animación
          anticipatePin: 1,      // Ayuda a evitar saltos en algunos navegadores
          // markers: {startColor: "purple", endColor: "orange", indent: 200},
        }
      });

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

      // 1. Animación del Título "HABILIDADES"
      // Primero, el título está normal
      tl.set(titleTextRef.current, { opacity: 1, scale: 1 });
      tl.set(skillsContentRef.current, { opacity: 0, scale: 0.5, y: 100 }); // Contenido de skills oculto

      if (targetLetter) {
        // Hacer que las otras letras se desvanezcan (si tenemos SplitText)
        if (splitTitle && splitTitle.chars) {
          const otherChars = splitTitle.chars.filter(char => char !== targetLetter);
          tl.to(otherChars, { opacity: 0, duration: 0.3, stagger:0.02 }, "<"); // "<" para iniciar al mismo tiempo que la animación anterior
        }

        // 2. Zoom en la letra/título objetivo
        tl.to(targetLetter, {
          scale: 50,            // Escala masiva
          opacity: 0,          // Se desvanece mientras escala
          duration: 1,         // Duración relativa dentro del scrub
          ease: 'power2.inOut'
        }, "-=0.2"); // Empieza un poco antes de que las otras letras terminen de desvanecerse
      } else { // Fallback si no hay targetLetter (ej. no SplitText)
         tl.to(titleTextRef.current, {
          scale: 30,
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut'
        }, "<");
      }


      // 3. Revelar el contenido de las habilidades
      // Este contenido aparece "desde dentro" de la letra que se expande
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
    }, sectionRef.current); // Fin del contexto GSAP

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-brand-black text-brand-white overflow-hidden" // min-h-screen para el título, la altura real será mayor
    >
      {/* Contenedor del Título para el efecto de Pinning y Zoom */}
      <div
        ref={titleContainerRef}
        className="h-screen w-full flex flex-col justify-center items-center sticky top-0" // Sticky y top-0 son importantes para el pin
      >
        <h2
          ref={titleTextRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[180px] font-heading font-black uppercase text-brand-white relative z-10"
          // El z-index es para que el título esté sobre el contenido de skills durante la transición
          // Podrías necesitar ajustar el tamaño de fuente con Tailwind o style para que sea ENORME
          // style={{ fontSize: 'clamp(4rem, 20vw, 15rem)'}} // Tamaño de fuente responsivo masivo
        >
          {/* Si no usas SplitText, y quieres animar letra por letra, necesitas spans manuales:
          <span>H</span><span>A</span><span>B</span><span>I</span><span>L</span><span className="target-letter">I</span><span>D</span><span>A</span><span>D</span><span>E</span><span>S</span>
          Y luego seleccionar '.target-letter' en GSAP
          */}
          HABILIDADES
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
    </section>
  );
}