// src/components/sections/ProjectsSection.tsx
'use client';

import { useRef, useEffect, useMemo } from 'react'; // useMemo para los datos de assets
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '@/data/projectsData';
import ProjectCard from '@/components/ui/ProjectCard';

gsap.registerPlugin(ScrollTrigger);

// SkillsData y SkillCard (sin cambios, asumo que ya los tienes como antes)
// ... (código de SkillCard y skillsData) ...
const skillsData = [
  { name: 'JavaScript', level: 90 }, { name: 'TypeScript', level: 85 },
  { name: 'React', level: 90 }, { name: 'Next.js', level: 80 },
  { name: 'Node.js', level: 85 }, { name: 'NestJS', level: 80 },
  { name: 'PostgreSQL', level: 75 }, { name: 'MongoDB', level: 70 },
  { name: 'HTML5', level: 95 }, { name: 'CSS3 & Tailwind', level: 90 },
  { name: 'Git & GitHub', level: 85 }, { name: 'Docker', level: 65 },
];
interface SkillCardProps { name: string; level: number; delay?: number; }
const SkillCard: React.FC<SkillCardProps> = ({ name, level, delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (cardRef.current && progressBarRef.current) {
      const cardEl = cardRef.current;
      const progressEl = progressBarRef.current;
      let anim: gsap.core.Tween | undefined, progressAnim: gsap.core.Tween | undefined;
      const st = ScrollTrigger.create({
        trigger: cardEl, start: 'top 90%', toggleActions: 'play none none reset',
        onEnter: () => {
          gsap.set(cardEl, { opacity: 0, y: 50, scale: 0.9 });
          gsap.set(progressEl, { width: '0%' });
          anim = gsap.to(cardEl, { opacity: 1, y: 0, scale: 1, duration: 0.8, delay, ease: 'power3.out' });
          progressAnim = gsap.to(progressEl, { width: `${level}%`, duration: 1.5, delay: delay + 0.3, ease: 'power2.inOut' });
        },
        onLeaveBack: () => { if (anim) anim.reverse(); if (progressAnim) progressAnim.reverse(); }
      });
      return () => { st.kill(); if (anim) anim.kill(); if (progressAnim) progressAnim.kill(); };
    }
  }, [name, level, delay]);
  return (
    <div ref={cardRef} className="bg-brand-black/15 opacity-0 backdrop-blur-lg p-6 rounded-2xl border border-brand-white/5 shadow-2xl group transition-all duration-300 ease-out hover:shadow-brand-red/25 hover:border-brand-red/40 hover:scale-[1.02]">
      <h3 className="text-xl font-heading text-brand-white mb-2 group-hover:text-brand-red transition-colors">{name}</h3>
      <div className="w-full bg-brand-white/20 rounded-full h-2.5">
        <div ref={progressBarRef} className="bg-brand-red h-2.5 rounded-full" style={{ width: '0%' }}></div>
      </div>
    </div>
  );
};


// Definición de tipos para los assets decorativos
type DecoAsset = {
  id: string;
  type: 'circle' | 'square' | 'rectangle' | 'line';
  styleType: 'glass' | 'solid-red' | 'solid-white' | 'line-red' | 'line-white';
  size: string; // Clases de Tailwind para w- y h- (ej: "w-20 h-20", "w-2 h-40")
  position: string; // Clases de Tailwind para top, left, right, bottom (ej: "top-[10%] left-[5%]")
  rotation?: string; // Clase de Tailwind para transform rotate (ej: "rotate-12", "-rotate-[25deg]")
  parallaxFactorX?: number; // Multiplicador para el parallax en X (negativo para dirección opuesta)
  parallaxFactorY?: number; // Multiplicador para el parallax en Y
  initialDelay?: number; // Delay para la animación de entrada
  zIndex?: string; // Clase z-index
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const horizontalScrollWrapperRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const topLeftGradientRef = useRef<HTMLDivElement>(null);

  // Usamos useMemo para los datos de los assets para que no se recreen en cada render
  const decorativeAssets = useMemo<DecoAsset[]>(() => [
    // Grupo 1: Glassmórficos con borde rojo (se moverán más)
    { id: 'dg1', type: 'square', styleType: 'glass', size: 'w-32 h-52 md:w-40 md:h-72', position: 'top-[8%] left-[-2%]', rotation: '-rotate-[35deg]', parallaxFactorX: -250, parallaxFactorY: 20, zIndex: 'z-0' },
    { id: 'dg2', type: 'circle', styleType: 'glass', size: 'w-40 h-40 md:w-56 md:h-56', position: 'bottom-[5%] right-[-5%]', parallaxFactorX: 180, parallaxFactorY: -70, zIndex: 'z-0' },
    { id: 'dg3', type: 'rectangle', styleType: 'glass', size: 'w-24 h-12 md:w-32 md:h-16', position: 'top-[55%] right-[-2%]', rotation: '-rotate-[10deg]', parallaxFactorX: 100, parallaxFactorY: 50, zIndex: 'z-0' },
    { id: 'dg4', type: 'circle', styleType: 'glass', size: 'w-16 h-16 md:w-20 md:h-20', position: 'top-[15%] right-[10%]', parallaxFactorX: -150, parallaxFactorY: -30, zIndex: 'z-0' },
    
    // Grupo 2: Sólidos (rojo o blanco, se moverán moderadamente)
    { id: 'ds1', type: 'square', styleType: 'solid-red', size: 'w-12 h-12 md:w-16 md:h-16', position: 'top-[45%] left-[5%]', rotation: 'rotate-[25deg]', parallaxFactorX: -120, zIndex: 'z-0' },
    { id: 'ds2', type: 'circle', styleType: 'solid-white', size: 'w-6 h-6 md:w-8 md:h-8', position: 'bottom-[15%] left-[20%]', parallaxFactorY: 150, zIndex: 'z-0' },
    { id: 'ds3', type: 'square', styleType: 'solid-red', styleOpacity: 'bg-brand-red/70', size: 'w-10 h-10', position: 'top-[8%] right-[25%]', parallaxFactorX: 80, zIndex: 'z-0' },
    { id: 'ds4', type: 'circle', styleType: 'solid-red', styleOpacity: 'bg-brand-red/20', size: 'w-52 h-52 md:w-72 md:h-72 filter blur-xl', position: 'bottom-[2%] left-[30%]', parallaxFactorX: -50, parallaxFactorY: -20, zIndex: '-z-1' }, // Detrás del gradiente principal
    
    // Grupo 3: Líneas (se moverán bastante)
    { id: 'dl1', type: 'line', styleType: 'line-red', size: 'w-2/5 h-0.5', position: 'top-[70%] left-[-15%]', parallaxFactorX: -280, zIndex: 'z-0' },
    { id: 'dl2', type: 'line', styleType: 'line-white', size: 'w-1/3 h-1', position: 'top-[30%] right-[-10%]', rotation: 'rotate-12', parallaxFactorX: 220, zIndex: 'z-0' },
    { id: 'dl3', type: 'line', styleType: 'line-red', size: 'w-1 h-32', position: 'bottom-[10%] left-[50%]', parallaxFactorY: -100, zIndex: 'z-0' },
    
    // Grupo 4: Pequeños y sutiles (parallax más lento o estáticos)
    { id: 'dp1', type: 'circle', styleType: 'glass', size: 'w-12 h-12', position: 'bottom-[30%] left-[45%]', parallaxFactorX: 30, zIndex: 'z-0' }, // Ex-decoShape7Ref
    { id: 'dp2', type: 'square', styleType: 'solid-red', size: 'w-8 h-8', position: 'top-[80%] right-[20%]', rotation: '-rotate-45', parallaxFactorX: -20, zIndex: 'z-0' },
    { id: 'dp3', type: 'circle', styleType: 'solid-white', size: 'w-4 h-4', position: 'top-[20%] left-[25%]', parallaxFactorY: 20, zIndex: 'z-0' },
    { id: 'dp4', type: 'rectangle', styleType: 'glass', size: 'w-24 h-8', position: 'bottom-[40%] right-[35%]', parallaxFactorX: 40, zIndex: 'z-0' },
    { id: 'dp5', type: 'line', styleType: 'line-white', size: 'w-16 h-0.5', position: 'top-[50%] left-[30%]', rotation: 'rotate-45', parallaxFactorX: -30, zIndex: 'z-0' },
    
    // Grupo 5: Elementos más estáticos o con parallax muy sutil (aparecen con la sección)
    { id: 'de1', type: 'square', styleType: 'glass', size: 'w-20 h-20', position: 'top-[85%] left-[80%]', rotation: 'rotate-12', zIndex: 'z-0', initialDelay: 0.5 },
    { id: 'de2', type: 'circle', styleType: 'solid-red', size: 'w-16 h-16', position: 'bottom-[80%] right-[70%]', zIndex: 'z-0', initialDelay: 0.6 },
    { id: 'de3', type: 'line', styleType: 'line-red', size: 'w-0.5 h-24', position: 'top-[10%] right-[40%]', zIndex: 'z-0', initialDelay: 0.7 },
  ], []);

  const assetRefs = useRef<(HTMLDivElement | null)[]>([]);
  assetRefs.current = []; // Limpiar en cada render para nuevas refs
  const addToAssetRefs = (el: HTMLDivElement | null) => {
    if (el && !assetRefs.current.includes(el)) {
      assetRefs.current.push(el);
    }
  };


  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !horizontalScrollWrapperRef.current || !projectsContainerRef.current || !topLeftGradientRef.current) {
      return;
    }
    
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 80, scale: 0.8 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reset' }
        }
      );

      let hScrollTween: gsap.core.Tween | undefined;
      const calculateScrollWidth = () => { /* ... (sin cambios) ... */ 
          if (projectsContainerRef.current) {
            const cards = Array.from(projectsContainerRef.current.children) as HTMLElement[];
            if (cards.length > 0) {
              const cardStyle = window.getComputedStyle(cards[0].parentElement!);
              const cardWidth = cards[0].offsetWidth;
              const marginRight = parseFloat(window.getComputedStyle(cards[0]).marginRight);
              
              let totalContentWidth = 0;
              cards.forEach((cardWrapper) => {
                  totalContentWidth += (cardWrapper as HTMLElement).offsetWidth;
              });
              return Math.max(0, totalContentWidth - window.innerWidth + (window.innerWidth * 0.5 - cards[cards.length -1].offsetWidth * 0.5) );
            }
          }
          return 0;
      };

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          let currentScrollWidth = 0;
          const setupHorizontalScroll = () => {
            currentScrollWidth = calculateScrollWidth();
            if (currentScrollWidth > 0 && projectsContainerRef.current && horizontalScrollWrapperRef.current) {
              if (hScrollTween) hScrollTween.kill();
              hScrollTween = gsap.to(projectsContainerRef.current, {
                x: () => -currentScrollWidth,
                ease: 'none',
                scrollTrigger: {
                  trigger: horizontalScrollWrapperRef.current,
                  start: 'top top',
                  end: () => `+=${currentScrollWidth * 1.2}`,
                  pin: true,
                  scrub: 1.5,
                  invalidateOnRefresh: true,
                  onUpdate: self => {
                    const progress = self.progress;
                    // Parallax para elementos decorativos
                    decorativeAssets.forEach((asset, index) => {
                      const el = assetRefs.current[index];
                      if (el && (asset.parallaxFactorX || asset.parallaxFactorY)) {
                        gsap.to(el, {
                          x: asset.parallaxFactorX ? progress * asset.parallaxFactorX : 0,
                          y: asset.parallaxFactorY ? progress * asset.parallaxFactorY : 0,
                          rotate: asset.rotation && (asset.id === 'dg1' || asset.id === 'ds1') ? parseFloat(asset.rotation.match(/-?\d+/)?.[0] || '0') + progress * (asset.parallaxFactorX || 0) / 10 : gsap.getProperty(el, "rotate"),
                          duration: 0.5,
                          ease: 'power1.out'
                        });
                      }
                    });
                    // Animación del gradiente de fondo principal
                    if (topLeftGradientRef.current) { // Usamos el nuevo gradiente de esquina
                      gsap.to(topLeftGradientRef.current, {
                          opacity: 0.7 + Math.sin(progress * Math.PI) * 0.3, // Pulsación sutil de opacidad
                          // x: progress * -50, // Movimiento sutil
                          // y: progress * -30,
                          duration:0.5, ease:'power1.out'
                      });
                    }
                  }
                }
              });
            } else if (hScrollTween) { hScrollTween.kill(); if (projectsContainerRef.current) gsap.set(projectsContainerRef.current, {x:0}); }
          };
          setupHorizontalScroll();
        },
        "(max-width: 767px)": () => { if (hScrollTween) hScrollTween.kill(); if(projectsContainerRef.current) gsap.set(projectsContainerRef.current, {x:0}); }
      });

      // Animación de entrada para todos los elementos decorativos
      assetRefs.current.forEach((el, index) => {
        if (el) {
          const assetConfig = decorativeAssets[index];
          gsap.fromTo(el,
            { opacity: 0, scale: 0.6, y: gsap.utils.random(40, 80) * (index % 2 === 0 ? 1 : -1), x: gsap.utils.random(20,50) * (index % 3 === 0 ? 1 : -1)},
            {
              opacity: (assetConfig.styleType === 'solid-red' && assetConfig.id === 'ds4') ? 0.15 : ((assetConfig.styleType === 'line-red' || assetConfig.styleType === 'line-white') ? 0.6 : 1) , // Ajustar opacidad final
              scale: 1, y: 0, x: 0,
              duration: 1.2, ease: 'expo.out', 
              delay: 0.5 + (assetConfig.initialDelay || index * 0.05), // Usar delay definido o stagger
              scrollTrigger: {
                trigger: el, // Trigger individual
                start: "top 95%",
                toggleActions: "play none none reset"
              }
            }
          );
        }
      });

    }, sectionRef.current!);

    const handleResize = () => { ScrollTrigger.refresh(); };
    window.addEventListener('resize', handleResize);
    return () => { ctx.revert(); window.removeEventListener('resize', handleResize); };
  }, [decorativeAssets]); // decorativeAssets como dependencia por useMemo

  // Clases base para estilos
  const bauhausGlassBase = "absolute bg-brand-black/15 backdrop-blur-lg border-2 border-brand-red/80 pointer-events-none opacity-0";
  const solidRedBase = "absolute bg-brand-red pointer-events-none opacity-0";
  const solidWhiteBase = "absolute bg-brand-white pointer-events-none opacity-0";
  const lineRedBase = "absolute bg-brand-red pointer-events-none opacity-0";
  const lineWhiteBase = "absolute bg-brand-white/70 pointer-events-none opacity-0";


  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-brand-black py-20 md:py-24 overflow-hidden"
    >
      {/* Gradiente Superior Izquierdo Fijo (o con parallax sutil) */}
      <div
        ref={topLeftGradientRef}
        className="absolute top-0 left-0 w-1/2 h-1/2 md:w-1/3 md:h-2/3 pointer-events-none -z-10 opacity-0" // GSAP maneja opacidad
        style={{
          backgroundImage: `radial-gradient(ellipse at top left, rgba(229,9,20,0.45) 0%, rgba(100,100,100,0.2) 40%, transparent 70%)`,
          // filter: 'blur(10px)' // Un blur sutil al propio gradiente puede ser interesante
        }}
        aria-hidden="true"
      ></div>

      {/* Renderizado de Elementos Decorativos */}
      {decorativeAssets.map((asset, index) => {
        let styleClasses = "";
        let extraStyle: React.CSSProperties = {};
        switch (asset.styleType) {
          case 'glass': styleClasses = `${bauhausGlassBase} ${asset.type === 'circle' ? 'rounded-full' : 'rounded-xl'}`; break;
          case 'solid-red': styleClasses = `${solidRedBase} ${asset.type === 'circle' ? 'rounded-full' : 'rounded-md'}`; break;
          case 'solid-white': styleClasses = `${solidWhiteBase} ${asset.type === 'circle' ? 'rounded-full' : 'rounded-md'}`; break;
          case 'line-red': styleClasses = `${lineRedBase}`; extraStyle = { transformOrigin: 'left center' }; break;
          case 'line-white': styleClasses = `${lineWhiteBase}`; extraStyle = { transformOrigin: 'left center' }; break;
        }
        return (
          <div
            key={asset.id}
            ref={addToAssetRefs}
            className={`${styleClasses} ${asset.size} ${asset.position} ${asset.rotation || ''} ${asset.zIndex || ''}`}
            style={extraStyle}
          ></div>
        );
      })}


      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2
          ref={titleRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[140px] font-heading font-black text-brand-white text-center mb-16 md:mb-24 opacity-0" // AÚN MÁS GRANDE
        >
          Proyectos<span className="text-brand-red">.</span>
        </h2>
      </div>

      <div
        ref={horizontalScrollWrapperRef}
        className="w-full md:h-[80vh] md:flex md:items-center md:overflow-visible relative z-10"
      >
        <div
          ref={projectsContainerRef}
          className="flex flex-nowrap md:items-center px-4 sm:px-6 lg:px-8"
          style={{ paddingRight: `calc(50vw - (${'30vw'} * 0.5))` }} // Ajustar 30vw al ancho de tarjeta xl
        >
          {projectsData.map((project, index) => (
            <div key={project.id} className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[40vw] lg:w-[33vw] xl:w-[30vw] max-w-xs sm:max-w-sm md:max-w-md mr-6 md:mr-8 last:mr-4 md:last:mr-0">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="h-[30vh] md:h-0"></div> 
    </section>
  );
}