// src/components/sections/SkillsSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText'; // Necesitarás GSAP Club para SplitText, o una alternativa

gsap.registerPlugin(ScrollTrigger, SplitText); // Si usas SplitText oficial

// Lista de tus habilidades
const skillsData = [
  { name: 'JavaScript', level: 90, category: 'Frontend & Backend' },
  { name: 'TypeScript', level: 85, category: 'Frontend & Backend' },
  { name: 'React', level: 90, category: 'Frontend' },
  { name: 'Next.js', level: 85, category: 'Frontend' },
  { name: 'Node.js', level: 80, category: 'Backend' },
  { name: 'NestJS', level: 80, category: 'Backend' },
  { name: 'PostgreSQL', level: 75, category: 'Database' },
  { name: 'MongoDB', level: 70, category: 'Database' },
  { name: 'Git & GitHub', level: 90, category: 'Tools' },
  { name: 'Docker', level: 65, category: 'Tools' },
  { name: 'HTML5', level: 95, category: 'Frontend' },
  { name: 'CSS3 & Tailwind', level: 90, category: 'Frontend' },
];

// Componente para una tarjeta de habilidad individual
const SkillCard = ({ name, level, category }: { name: string; level: number; category: string }) => (
  <div className="skill-card bg-brand-white/5 backdrop-blur-md border border-brand-white/10 rounded-xl p-6 shadow-lg
                  hover:border-brand-red/50 transition-all duration-300 transform hover:-translate-y-1">
    <h4 className="text-xl font-heading text-brand-red mb-2">{name}</h4>
    <p className="text-sm text-brand-white/70 mb-3 font-sans">{category}</p>
    <div className="w-full bg-brand-black/30 rounded-full h-2.5">
      <div
        className="bg-brand-red h-2.5 rounded-full"
        style={{ width: `${level}%` }}
      ></div>
    </div>
    <p className="text-xs text-brand-white/60 mt-2 text-right font-sans">{level}%</p>
  </div>
);

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLHeadingElement>(null); // Para el texto "HABILIDADES"
  const skillsContentRef = useRef<HTMLDivElement>(null); // Contenedor de las tarjetas de skills

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
      tl.to(skillsContentRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,       // Duración relativa
        ease: 'power3.out'
      }, "-=0.7"); // Se superpone significativamente con el zoom out de la letra

      // 4. Animación de entrada para las tarjetas de skills individuales
      // Se activará después de que skillsContentRef sea visible
      // Usaremos un trigger separado para esto, o un delay dentro de la misma timeline
      // si la duración del pin es suficiente. Por ahora, lo haremos simple:
      gsap.utils.toArray('.skill-card').forEach((card: any, index) => { // "any" aquí por simplicidad, podrías tiparlo mejor
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%', // Cuando la tarjeta entra en vista
              // scrub: true, // Podrías añadir scrub aquí también si quieres
              toggleActions: 'play none none none', // Solo se reproduce una vez
            },
            delay: index * 0.1 // Stagger manual, ya que el trigger es por tarjeta
          }
        );
      });

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

      {/* Contenedor del Contenido de Habilidades (inicialmente oculto y escalado) */}
      <div
        ref={skillsContentRef}
        className="relative z-0 w-full py-16 md:py-24" // z-0 para estar detrás del título durante la transición
        // La altura de esta sección se sumará a la duración del pin
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-4xl font-heading text-brand-red mb-12 md:mb-16 text-center">
            Mis Herramientas y Tecnologías
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {skillsData.map((skill, index) => (
              <SkillCard key={index} name={skill.name} level={skill.level} category={skill.category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}