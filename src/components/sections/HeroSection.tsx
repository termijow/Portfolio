  // src/components/sections/HeroSection.tsx
  'use client';

  import { useEffect, useRef } from 'react';
  import { gsap } from 'gsap';
  import Link from 'next/link';

  export default function HeroSection() {
    const heroRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const glassPanelRef = useRef<HTMLDivElement>(null);

    // Elementos decorativos Bauhaus con estilo glass y borde rojo
    const decoShape1Ref = useRef<HTMLDivElement>(null); // Cuadrado
    const decoShape2Ref = useRef<HTMLDivElement>(null); // Círculo
    const decoShape3Ref = useRef<HTMLDivElement>(null); // Otro Cuadrado/Rectángulo
    const decoShape4Ref = useRef<HTMLDivElement>(null); // Otro Círculo

    // Otros elementos decorativos
    const decoRedSolidCircleRef = useRef<HTMLDivElement>(null); // Círculo rojo sólido
    // const decoLinesContainerRef = useRef<HTMLDivElement>(null); // Eliminamos las líneas

    useEffect(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Animación del panel glassmórfico central
      if (glassPanelRef.current) {
        tl.fromTo(glassPanelRef.current,
          { opacity: 0, y: 30, scale: 0.95, filter: 'blur(8px)' },
          { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.2, delay: 0.5 }
        );
      }

      // 2. Animaciones de texto y CTA
      const textDelay = "<0.4";
      if (nameRef.current) tl.fromTo(nameRef.current, { opacity: 0, y: 60, skewX: -8 }, { opacity: 1, y: 0, skewX: 0, duration: 0.9 }, textDelay);
      if (titleRef.current) tl.fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.6");
      if (subtitleRef.current) tl.fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5");
      if (ctaRef.current) tl.fromTo(ctaRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 }, "-=0.4");

      // 3. Animaciones para elementos decorativos Bauhaus
      const decoElements = [
        { ref: decoShape1Ref, delay: 0.7, from: { opacity: 0, x: -60, rotate: -45, scale: 0.5 }, to: { opacity: 1, x: 0, rotate: -15, scale: 1, ease: 'elastic.out(1, 0.6)' } },
        { ref: decoShape2Ref, delay: 0.8, from: { opacity: 0, y: 50, scale: 0.3 }, to: { opacity: 1, y: 0, scale: 1, ease: 'elastic.out(1, 0.7)' } },
        { ref: decoShape3Ref, delay: 0.9, from: { opacity: 0, x: 70, rotate: 30, scale: 0.6 }, to: { opacity: 1, x: 0, rotate: 10, scale: 1, ease: 'back.out(1.4)' } },
        { ref: decoShape4Ref, delay: 1.0, from: { opacity: 0, y: -50, scale: 0.4 }, to: { opacity: 1, y: 0, scale: 1, ease: 'elastic.out(1, 0.5)' } },
        { ref: decoRedSolidCircleRef, delay: 1.1, from: { opacity: 0, scale: 0.2 }, to: { opacity: 1, scale: 1, ease: 'elastic.out(1, 0.5)' } },
      ];

      decoElements.forEach(elConfig => {
        if (elConfig.ref.current) {
          gsap.fromTo(elConfig.ref.current, elConfig.from, { ...elConfig.to, duration: 1.3, delay: elConfig.delay });
        }
      });

      // 4. Interacciones con el Mouse (Parallax)
      const parallaxTargets = [
        { el: glassPanelRef.current, intensity: 8 }, // Panel principal se mueve menos
        { el: decoShape1Ref.current, intensity: 25, invertX: true },
        { el: decoShape2Ref.current, intensity: 30, invertY: true },
        { el: decoShape3Ref.current, intensity: 20 },
        { el: decoShape4Ref.current, intensity: 35, invertX: true, invertY: true },
        { el: decoRedSolidCircleRef.current, intensity: 15, invertY: true },
      ];

      const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current) return;
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = heroRef.current;
        const xPercent = (clientX / offsetWidth - 0.5);
        const yPercent = (clientY / offsetHeight - 0.5);

        parallaxTargets.forEach(target => {
          if (target.el) {
            const finalIntensity = target.intensity;
            const xMove = xPercent * finalIntensity * (target.invertX ? -1 : 1);
            const yMove = yPercent * finalIntensity * (target.invertY ? -1 : 1);
            
            gsap.to(target.el, {
              x: xMove,
              y: yMove,
              rotate: target.el === decoShape1Ref.current || target.el === decoShape3Ref.current ? xPercent * 5 : 0,
              duration: 0.7,
              ease: 'power1.out',
              overwrite: 'auto'
            });
          }
        });
      };

      if (heroRef.current) {
        heroRef.current.addEventListener('mousemove', handleMouseMove);
      }

    const currentHeroRef = heroRef.current; 
    if (currentHeroRef) {
      currentHeroRef.addEventListener('mousemove', handleMouseMove);
    }

      return () => {
      if (currentHeroRef) { // Usar la variable local
        currentHeroRef.removeEventListener('mousemove', handleMouseMove);
      };
    }
  },[]);

    // Clases comunes para las formas decorativas glass con borde rojo
    const bauhausGlassShapeBase = "absolute bg-brand-black/20 backdrop-blur-md border-2 border-brand-red rounded-lg opacity-0 pointer-events-none";

    return (
      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{
          // Nuevo gradiente: Rojo/Gris en la esquina superior izquierda, desvaneciéndose hacia negro
          background: `
            radial-gradient(circle at 5% 15%, rgba(229, 9, 20, 0.40) 40%, rgba(100, 100, 100, 0.05) 55%, rgba(229, 9, 20, 0.4) 100%, transparent 80%),
            #0A0A0A 
          `,
        }}
      >
        {/* 1. Panel Glassmórfico Central (donde irá el texto) */}
        <div
          ref={glassPanelRef}
          className="relative w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[55%] max-w-3xl
                    p-6 sm:p-8 md:p-10
                    bg-brand-white/5 backdrop-blur-lg rounded-3xl shadow-2xl
                    border border-brand-white/10 opacity-0"
        >
          {/* Contenido Principal */}
          <div className="relative z-10">
            <h1 ref={nameRef} className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-heading font-black uppercase tracking-tighter opacity-0">
              Juan Diego <span className="text-brand-red">Estrada</span>
            </h1>
            <h2 ref={titleRef} className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-brand-white mt-1 mb-4 sm:mb-6 opacity-0">
              Fullstack Developer
            </h2>
            <p ref={subtitleRef} className="text-sm xs:text-base sm:text-lg md:text-xl text-brand-white/80 font-sans max-w-md sm:max-w-lg md:max-w-xl mx-auto mb-8 sm:mb-10 opacity-0">
              Transformando ideas en soluciones web <span className="text-brand-red font-semibold">innovadoras</span>.
               {/* y <span className="text-brand-red font-semibold">eficientes</span>. */}
            </p>
            <div ref={ctaRef} className="opacity-0">
              <Link
                href="#projects"
                className="inline-block bg-brand-red hover:bg-red-600 text-brand-white font-bold font-sans py-2.5 px-6 sm:py-3 sm:px-8 rounded text-base sm:text-lg
                          transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 focus:ring-offset-brand-black
                          shadow-lg hover:shadow-brand-red/40"
              >
                Ver Mis Proyectos
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Elementos Decorativos Bauhaus (Fuera del panel glass) */}
        {/* Forma 1: Cuadrado glass con borde rojo */}
        <div
          ref={decoShape1Ref}
          className={`${bauhausGlassShapeBase} top-[8%] left-[5%] w-20 h-20 sm:w-28 sm:h-28 transform -rotate-15`}
        ></div>

        {/* Forma 2: Círculo glass con borde rojo */}
        <div
          ref={decoShape2Ref}
          className={`${bauhausGlassShapeBase} bottom-[12%] right-[7%] w-24 h-24 sm:w-32 sm:h-32 rounded-full`}
        ></div>

        {/* Forma 3: Rectángulo glass con borde rojo */}
        <div
          ref={decoShape3Ref}
          className={`${bauhausGlassShapeBase} top-[65%] left-[12%] w-32 h-16 sm:w-40 sm:h-20 transform rotate-10 rounded-md`}
        ></div>

        {/* Forma 4: Círculo mediano glass con borde rojo */}
        <div
          ref={decoShape4Ref}
          className={`${bauhausGlassShapeBase} top-[15%] right-[10%] w-16 h-16 sm:w-20 sm:h-20 rounded-full`}
        ></div>
        
        {/* Círculo rojo sólido para contraste */}
        <div
          ref={decoRedSolidCircleRef}
          className="absolute bottom-[25%] left-[20%] w-10 h-10 sm:w-12 sm:h-12 bg-brand-red rounded-full shadow-lg pointer-events-none opacity-0"
        ></div>

      </section>
    );
  }