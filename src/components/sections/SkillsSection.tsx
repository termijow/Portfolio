// src/components/sections/SkillsSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// SkillsData y SkillCard (sin cambios)
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
        onLeaveBack: () => { 
            // Al salir hacia arriba, reseteamos explícitamente para la próxima entrada
            if (anim) anim.progress(0).pause(); // Vuelve al inicio y pausa
            if (progressAnim) progressAnim.progress(0).pause();
            gsap.set(cardEl, { opacity: 0, y: 50, scale: 0.9 }); // Re-establecer estado inicial
            gsap.set(progressEl, { width: '0%' });
        }
      });
      return () => { st.kill(); if (anim) anim.kill(); if (progressAnim) progressAnim.kill(); };
    }
  }, [name, level, delay]);
  return (
    <div ref={cardRef} className="bg-brand-black/50 opacity-0 backdrop-blur-md p-6 rounded-xl border-2 border-brand-red/70 shadow-lg">
      <h3 className="text-xl font-heading text-brand-white mb-2">{name}</h3>
      <div className="w-full bg-brand-white/20 rounded-full h-2.5">
        <div ref={progressBarRef} className="bg-brand-red h-2.5 rounded-full" style={{ width: '0%' }}></div>
      </div>
    </div>
  );
};


export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const letterIRef = useRef<HTMLSpanElement>(null);
  const skillsContentWrapperRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  const titleText = "HABILIDADES";
  const iIndex = titleText.indexOf("I");
  let otherLettersSpans: HTMLSpanElement[] = [];

  useEffect(() => {
    if (!sectionRef.current || !titleWrapperRef.current || !letterIRef.current || !skillsContentWrapperRef.current || !portalRef.current) {
      return;
    }

    if (titleWrapperRef.current) {
        otherLettersSpans = Array.from(titleWrapperRef.current.children).filter((_, index) => index !== iIndex) as HTMLSpanElement[];
    }

    const ctx = gsap.context(() => {
      // Animación inicial del título (antes del pin)
      const initialTitleAnimation = gsap.fromTo(titleWrapperRef.current!.children, 
        { opacity: 0, y: 80, scale: 0.5 }, 
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 1, ease: 'expo.out',
          paused: true // Inicia pausada, ScrollTrigger la controlará
        }
      );
      ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reset', // REINICIA la animación del título al salir/entrar
          animation: initialTitleAnimation, // Vincula la animación
          onEnter: () => initialTitleAnimation.play(),
          onLeaveBack: () => initialTitleAnimation.progress(0).pause(), // Resetea y pausa al salir hacia arriba
      });


      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=3500',
          pin: true,
          scrub: 1.2,
          // markers: { startColor: "green", endColor: "red", indent: 200 },
          invalidateOnRefresh: true, // Importante para recalcular en resize
          onEnter: () => { // Al entrar en la zona de pin
            gsap.set(titleWrapperRef.current, { display: 'flex' }); // Asegurar que el título sea visible
            gsap.set(portalRef.current, { display: 'block', opacity:0, width:0, height:0, top:'50%', left:'50%', xPercent:-50, yPercent:-50 }); // Resetear portal
            gsap.set(skillsContentWrapperRef.current, { opacity: 0, scale: 0.9}); // Resetear skills content
          },
          onLeaveBack: () => { // Al salir de la zona de pin hacia arriba
            masterTl.progress(0).pause(); // Resetea la masterTl
            gsap.set(titleWrapperRef.current, { display: 'flex', opacity:1, scale:1, x:0, y:0 }); // Restaurar título
            // Las letras individuales del título se resetearán por la animación inicial del título
            gsap.set(portalRef.current, { display: 'none', opacity: 0 }); // Ocultar portal
            gsap.set(skillsContentWrapperRef.current, { opacity: 0 }); // Ocultar skills
            initialTitleAnimation.progress(0).pause(); // Asegurar que la animación inicial del título también se resetee
          }
        }
      });

      let targetX = 0, targetY = 0, initialTitleScale = 1;
      let iRectInitial: DOMRect | undefined;

      // 1. Zoom al título
      masterTl.to(titleWrapperRef.current, {
        onStart: () => {
          if (titleWrapperRef.current && letterIRef.current && portalRef.current) {
            iRectInitial = letterIRef.current.getBoundingClientRect();
            const viewportCenterX = window.innerWidth / 2;
            const viewportCenterY = window.innerHeight / 2;
            targetX = viewportCenterX - (iRectInitial.left + iRectInitial.width / 2);
            targetY = viewportCenterY - (iRectInitial.top + iRectInitial.height / 2);
            initialTitleScale = gsap.getProperty(titleWrapperRef.current, "scale") as number || 1;

            gsap.set(portalRef.current, { // Posicionar portal invisiblemente sobre la I
                display: 'block', // Asegurar que sea block para obtener dimensiones
                position: 'fixed',
                top: iRectInitial.top, left: iRectInitial.left,
                width: iRectInitial.width, height: iRectInitial.height,
                backgroundColor: 'rgba(245, 245, 245, 0.98)',
                opacity: 0, zIndex: 40, borderRadius: '3px',
            });
          }
        },
        x: () => targetX / initialTitleScale,
        y: () => targetY / initialTitleScale,
        scale: 4.5,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0);

      // 2. Desvanecer OTRAS letras
      if (otherLettersSpans.length > 0) {
        masterTl.to(otherLettersSpans, {
          opacity: 0, duration: 0.25, ease: 'power1.in'
        }, "<0.15");
      }

      // 3. La 'I' original se desvanece Y el portal aparece
      masterTl.to(letterIRef.current, {
        opacity: 0, duration: 0.2, ease: 'power1.in'
      }, "<0.1"); 

      masterTl.to(portalRef.current, { // Portal se vuelve visible
        opacity: 1, duration: 0.05,
      }, "<");

      // 4. Expandir el portal
      masterTl.to(portalRef.current, {
        top: '50%', left: '50%', xPercent: -50, yPercent: -50,
        width: '100vw', height: '100vh',
        borderRadius: '0%',
        duration: 0.7, ease: 'expo.inOut',
      }, ">-0.05");

      // 5. El titleWrapper se desvanece (ya no necesitamos el blur)
      masterTl.to(titleWrapperRef.current, {
          opacity: 0, duration: 0.3, ease: 'power1.in',
          onComplete: () => {
              if(titleWrapperRef.current) gsap.set(titleWrapperRef.current, {display: 'none'});
          }
      }, "<0.2");

      // 6. Hacer aparecer el contenido de habilidades
      gsap.set(skillsContentWrapperRef.current, { // Estado inicial
        opacity: 0, scale: 0.9,
        position: 'absolute', top: '50%', left: '50%', xPercent: -50, yPercent: -50,
        width: '90%', maxWidth: '1024px', zIndex: 45,
      });
      masterTl.to(skillsContentWrapperRef.current, {
        opacity: 1, scale: 1,
        duration: 0.6, ease: 'power3.out'
      }, ">-0.4");

      // 7. Desvanecer el portal
      masterTl.to(portalRef.current, {
        opacity: 0, duration: 0.5, ease: 'power1.inOut',
        onComplete: () => {
          if (portalRef.current) gsap.set(portalRef.current, { display: 'none' });
        }
      }, ">-0.2");

    }, sectionRef.current!);

    return () => ctx.revert();
  }, [iIndex]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full min-h-[350vh] py-16 md:py-24 bg-brand-black"
      style={{ overflowX: 'hidden' }}
    >
      <div ref={portalRef} className="fixed pointer-events-none opacity-0"></div> {/* opacity-0 inicial aquí */}

      <div className="h-screen flex flex-col items-center justify-center container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleWrapperRef}
          className="text-6xl sm:text-8xl md:text-9xl lg:text-[150px] xl:text-[170px] font-heading font-black text-center text-brand-white select-none relative z-30"
          style={{ lineHeight: '0.9em', willChange: 'transform, opacity' }}
        >
          {titleText.split('').map((char, index) => (
            <span
              key={index}
              ref={el => { if (index === iIndex && el) letterIRef.current = el; }}
              className="inline-block opacity-0"
              style={{ willChange: 'transform, opacity' }}
            >
              {char}
            </span>
          ))}
        </div>

        <div
          ref={skillsContentWrapperRef}
          className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center opacity-0 z-20"
        >
          <div className="w-full max-w-4xl p-4 sm:p-6">
            <h2 className="text-3xl sm:text-4xl font-heading text-brand-white text-center mb-8 md:mb-10">
              Mis Herramientas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-10">
              {skillsData.map((skill, index) => (
                <SkillCard key={skill.name} name={skill.name} level={skill.level} delay={index * 0.04} />
              ))}
              <div className="bg-brand-black/50 opacity-0 backdrop-blur-md p-6 rounded-xl border-2 border-brand-red/70 shadow-lg flex flex-col justify-center items-center text-center">
                  <h3 className="text-xl font-heading text-brand-white mb-2">Principios</h3>
                  <p className="text-brand-white/70 font-sans text-sm">SOLID, KISS, DRY</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}