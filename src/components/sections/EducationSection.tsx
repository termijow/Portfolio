// src/components/sections/EducationSection.tsx
'use client';

import { useRef, useEffect, useMemo } from 'react'; // Añadido useMemo
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { educationData, EducationItem } from '@/data/educationData';

gsap.registerPlugin(ScrollTrigger);

// EducationCard (sin cambios respecto a la última versión que te di)
// ... (Pega aquí el código completo del componente EducationCard que ya tenías)
interface EducationCardProps { item: EducationItem;  isLeftAligned: boolean; }
const EducationCard: React.FC<EducationCardProps> = ({ item, isLeftAligned }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current,
      { opacity: 0, x: isLeftAligned ? -80 : 80, y: 50, scale: 0.95 },
      {
        opacity: 1, x: 0, y: 0, scale: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current, start: 'top 85%', toggleActions: 'play none none reset',
        }
      }
    );
  }, [isLeftAligned]);
  return (
    <div ref={cardRef} className={`relative mb-12 md:mb-16 opacity-0 w-full md:w-[45%] ${isLeftAligned ? 'md:mr-auto' : 'md:ml-auto'}`}>
      <div className={`absolute top-0 h-full bg-brand-red/30 hidden md:block group-hover:bg-brand-red transition-colors duration-300 rounded-full ${isLeftAligned ? '-right-6 lg:-right-8' : '-left-6 lg:-left-8'}`}>
        {item.icon && (
            <div className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 p-1 bg-brand-black rounded-full border-2 border-brand-red shadow-lg ${isLeftAligned ? 'left-full -translate-x-1/2' : 'right-full translate-x-1/2'}`}>
                <Image src={item.icon} alt={`${item.institution || item.title} logo`} width={48} height={48} className="object-contain w-full h-full rounded-full"/>
            </div>
        )}
      </div>
      <div className="bg-brand-black/40 backdrop-blur-lg rounded-xl p-6 md:p-8 shadow-xl border border-brand-white/10 hover:border-brand-red/50 hover:shadow-brand-red/20 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            <h3 className="text-xl md:text-2xl font-heading font-bold text-brand-red">{item.title}</h3>
            {item.institution && (<p className="text-sm text-brand-white/70 font-sans mt-1 sm:mt-0 sm:ml-4 shrink-0">{item.institution}</p>)}
        </div>
        <p className="text-xs text-brand-white/60 font-sans mb-4">{item.period}</p>
        {typeof item.description === 'string' ? (<p className="text-brand-white/80 font-sans text-sm md:text-base leading-relaxed">{item.description}</p>) : (item.description.map((desc, i) => (<p key={i} className="text-brand-white/80 font-sans text-sm md:text-base leading-relaxed mb-2 last:mb-0">{desc}</p>)))}
        {item.technologies && item.technologies.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold text-brand-red uppercase mb-1.5">Tecnologías Clave:</p>
            <div className="flex flex-wrap gap-2">
              {item.technologies.map(tech => (<span key={tech} className="bg-brand-red/20 text-brand-red/90 text-xs px-2.5 py-1 rounded-md font-medium">{tech}</span>))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// Definición de tipos y datos para los assets decorativos
type DecoAssetEducation = {
  id: string;
  type: 'circle' | 'square' | 'rectangle' | 'line';
  styleType: 'glass' | 'solid-red' | 'solid-white' | 'line-red' | 'line-white';
  size: string; 
  position: string; 
  rotation?: string; 
  parallaxDepth?: number; // Factor para parallax sutil (0 a 1, 0 = no se mueve, 1 = se mueve con el scroll)
  initialDelay?: number; 
  zIndex?: string;
  blur?: string; // Ej: 'blur-sm', 'blur-md'
  styleOpacity?: string; // Para clases de opacidad como 'bg-brand-red/30'
};

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const backgroundGradientRef = useRef<HTMLDivElement>(null); // Para animar el gradiente

  const decorativeAssetsEducation = useMemo<DecoAssetEducation[]>(() => [
    // Assets distribuidos por la sección
    { id: 'edg1', type: 'square', styleType: 'glass', size: 'w-28 h-40 md:w-32 md:h-48', position: 'top-[10%] left-[5%]', rotation: 'rotate-12', parallaxDepth: 0.2, zIndex: '-z-1', blur: 'blur-sm' },
    { id: 'eds1', type: 'circle', styleType: 'solid-red', size: 'w-16 h-16', position: 'top-[15%] right-[8%]', parallaxDepth: 0.1, zIndex: '-z-1', styleOpacity: 'bg-brand-red/50' },
    { id: 'edl1', type: 'line', styleType: 'line-white', size: 'w-1/3 h-0.5', position: 'top-[25%] left-[-5%]', parallaxDepth: 0.3, zIndex: '-z-1', styleOpacity: 'bg-white/20' },
    { id: 'edg2', type: 'circle', styleType: 'glass', size: 'w-36 h-36 md:w-44 md:h-44', position: 'top-[30%] right-[2%]', rotation: '-rotate-12', parallaxDepth: 0.15, zIndex: '-z-1' },
    { id: 'eds2', type: 'rectangle', styleType: 'solid-red', size: 'w-8 h-24', position: 'top-[50%] left-[10%]', parallaxDepth: 0.25, zIndex: '-z-1' },
    { id: 'edw1', type: 'square', styleType: 'solid-white', size: 'w-10 h-10', position: 'top-[60%] right-[15%]', rotation: 'rotate-45', parallaxDepth: 0.1, zIndex: '-z-1', styleOpacity: 'bg-white/30' },
    { id: 'edl2', type: 'line', styleType: 'line-red', size: 'w-0.5 h-28', position: 'top-[70%] left-[2%]', parallaxDepth: 0.35, zIndex: '-z-1' },
    { id: 'edg3', type: 'circle', styleType: 'glass', size: 'w-20 h-20', position: 'bottom-[25%] left-[8%]', parallaxDepth: 0.2, zIndex: '-z-1' },
    { id: 'eds3', type: 'square', styleType: 'solid-red', size: 'w-12 h-12 filter blur-md', position: 'bottom-[15%] right-[10%]', parallaxDepth: 0.1, zIndex: '-z-1', styleOpacity: 'bg-brand-red/20' }, // Con blur
    { id: 'edl3', type: 'line', styleType: 'line-white', size: 'w-1/4 h-0.5', position: 'bottom-[5%] right-[-3%]', parallaxDepth: 0.25, zIndex: '-z-1', styleOpacity: 'bg-white/15' },
    // Añade más hasta llegar a 15-20, variando posiciones y estilos
    { id: 'edg4', type: 'rectangle', styleType: 'glass', size: 'w-40 h-16', position: 'bottom-[40%] left-[30%]', rotation: 'rotate-6', parallaxDepth: 0.1, zIndex: '-z-1' },
    { id: 'eds4', type: 'circle', styleType: 'solid-red', size: 'w-24 h-24', position: 'top-[5%] right-[35%]', parallaxDepth: 0.2, zIndex: '-z-1', styleOpacity: 'bg-brand-red/40' },
    { id: 'edw2', type: 'line', styleType: 'line-white', size: 'w-16 h-1', position: 'bottom-[45%] right-[40%]', parallaxDepth: 0.15, zIndex: '-z-1', styleOpacity: 'bg-white/25' },
    { id: 'edg5', type: 'square', styleType: 'glass', size: 'w-16 h-16', position: 'top-[75%] left-[15%]', parallaxDepth: 0.25, zIndex: '-z-1', blur: 'blur-xs' },
    { id: 'eds5', type: 'circle', styleType: 'solid-red', size: 'w-5 h-5', position: 'top-[35%] left-[40%]', parallaxDepth: 0.3, zIndex: '-z-1' },
  ], []);

  const assetEducationRefs = useRef<(HTMLDivElement | null)[]>([]);
  assetEducationRefs.current = [];
  const addToAssetEducationRefs = (el: HTMLDivElement | null) => {
    if (el && !assetEducationRefs.current.includes(el)) {
      assetEducationRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !timelineLineRef.current || !backgroundGradientRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 60, scale:0.9 },
        { opacity: 1, y: 0, scale:1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reset' }
        }
      );

      gsap.fromTo(timelineLineRef.current,
        { height: '0%', opacity:0 },
        { height: '100%', opacity:1, duration: 1, ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current, start: 'top 50%', end: 'bottom 70%', scrub: 1.5,
          }
        }
      );

      // Animación de entrada para los assets decorativos
      assetEducationRefs.current.forEach((el, index) => {
        if (el) {
          const assetConfig = decorativeAssetsEducation[index];
          gsap.fromTo(el,
            { opacity: 0, scale: 0.7, y: gsap.utils.random(30, 60) * (index % 2 === 0 ? 1 : -1), x: gsap.utils.random(20,40) * (index % 3 === 0 ? 1 : -1)},
            {
              opacity: (assetConfig.styleOpacity && assetConfig.styleType.includes('solid')) ? 1 : (assetConfig.styleType.includes('line') ? 0.6 : 0.8), // Ajusta opacidad final basada en styleOpacity o tipo
              scale: 1, y: 0, x: 0,
              duration: 1.5, ease: 'expo.out', 
              delay: 0.2 + (assetConfig.initialDelay || index * 0.03),
              scrollTrigger: {
                trigger: el, start: "top 95%", toggleActions: "play none none reset"
              }
            }
          );

          // Parallax sutil para los assets
          if (assetConfig.parallaxDepth && typeof assetConfig.parallaxDepth === 'number') {
            gsap.to(el, {
              yPercent: -assetConfig.parallaxDepth * 20, // Mueve hasta un 20% de su altura
              xPercent: gsap.utils.random(-5, 5) * assetConfig.parallaxDepth, // Ligero movimiento lateral
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current, // Parallax relativo al scroll de toda la sección
                start: "top bottom", // Empieza cuando la parte superior de la sección toca la parte inferior de la ventana
                end: "bottom top", // Termina cuando la parte inferior de la sección toca la parte superior de la ventana
                scrub: 1.5 + assetConfig.parallaxDepth // Diferente scrub para variar
              }
            });
          }
        }
      });
      
      // Animación del gradiente de fondo principal de la sección (opcional)
      gsap.to(backgroundGradientRef.current, {
          backgroundPosition: `30% 70%`, // Mueve el centro del gradiente
          ease: "none",
          scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
          }
      });


    }, sectionRef.current);

    return () => ctx.revert();
  }, [decorativeAssetsEducation]); // decorativeAssetsEducation como dependencia

  const bauhausGlassBase = "absolute bg-brand-black/20 backdrop-blur-md border border-brand-red/60 pointer-events-none opacity-0";
  const solidRedBase = "absolute bg-brand-red pointer-events-none opacity-0";
  const solidWhiteBase = "absolute bg-brand-white pointer-events-none opacity-0";
  const lineRedBase = "absolute bg-brand-red pointer-events-none opacity-0";
  const lineWhiteBase = "absolute bg-brand-white/70 pointer-events-none opacity-0";

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-brand-black overflow-hidden"
    >
      {/* Gradiente de Fondo Envolvente */}
      <div
        ref={backgroundGradientRef} 
        className="absolute inset-0 -z-20 pointer-events-none" // -z-20 para estar bien atrás
        style={{
          backgroundImage: `
            radial-gradient(ellipse 100% 80% at 10% 10%, rgba(229,9,20,0.25) 0%, transparent 50%),
            radial-gradient(ellipse 90% 70% at 95% 90%, rgba(100,100,100,0.15) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(229,9,20,0.07) 0%, transparent 40%),
            #0A0A0A`, // Fondo base negro
          backgroundSize: '150% 150%', // Más sutil que en proyectos
          backgroundPosition: '50% 50%', // Posición inicial
        }}
        aria-hidden="true"
      ></div>

      {/* Renderizado de Elementos Decorativos */}
      {decorativeAssetsEducation.map((asset) => {
        let styleClasses = "";
        let extraStyle: React.CSSProperties = {};
        let finalOpacityClass = asset.styleOpacity ? '' : 'opacity-0'; // GSAP controla la opacidad, pero styleOpacity puede definir un bg con alfa

        switch (asset.styleType) {
          case 'glass': styleClasses = `${bauhausGlassBase} ${asset.type === 'circle' ? 'rounded-full' : 'rounded-xl'} ${asset.blur || ''}`; break;
          case 'solid-red': styleClasses = `${solidRedBase} ${asset.type === 'circle' ? 'rounded-full' : 'rounded-md'} ${asset.blur || ''} ${asset.styleOpacity || 'bg-brand-red'}`; break;
          case 'solid-white': styleClasses = `${solidWhiteBase} ${asset.type === 'circle' ? 'rounded-full' : 'rounded-md'} ${asset.blur || ''} ${asset.styleOpacity || 'bg-brand-white'}`; break;
          case 'line-red': styleClasses = `${lineRedBase} ${asset.styleOpacity || 'bg-brand-red'}`; extraStyle = { transformOrigin: 'center center' }; break;
          case 'line-white': styleClasses = `${lineWhiteBase} ${asset.styleOpacity || 'bg-brand-white/70'}`; extraStyle = { transformOrigin: 'center center' }; break;
        }
        if (asset.styleOpacity) finalOpacityClass = ''; // Si styleOpacity ya define la opacidad del bg, no necesitamos opacity-0 general

        return (
          <div
            key={asset.id}
            ref={addToAssetEducationRefs}
            className={`${styleClasses} ${asset.size} ${asset.position} ${asset.rotation || ''} ${asset.zIndex || ''} ${finalOpacityClass}`}
            style={extraStyle}
          ></div>
        );
      })}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"> {/* z-10 para estar sobre el fondo y assets de fondo */}
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-brand-white text-center mb-16 md:mb-24 opacity-0"
        >
          Formación <span className="text-brand-red">&</span> Crecimiento
        </h2>

        <div className="relative">
          <div
            ref={timelineLineRef}
            className="absolute left-1/2 top-0 w-1 bg-brand-red/30 hidden md:block rounded-full opacity-0"
            style={{ height: '0%', transform: 'translateX(-50%)' }}
          ></div>

          {educationData.map((item, index) => (
            <div key={item.id} className="md:flex md:justify-between md:items-start group">
              {index % 2 !== 0 && <div className="hidden md:block md:w-[45%]"></div>}
              <EducationCard
                item={item}
                isLeftAligned={index % 2 === 0}
              />
              {index % 2 === 0 && <div className="hidden md:block md:w-[45%]"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}