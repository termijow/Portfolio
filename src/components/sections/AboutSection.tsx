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
  const paragraphsContainerRef = useRef<HTMLDivElement>(null);

  // Referencias para elementos decorativos
  const decoCircleBottomRef = useRef<HTMLDivElement>(null);
  const decoLineTopRef = useRef<HTMLDivElement>(null);
  const decoSquareTopRightRef = useRef<HTMLDivElement>(null);
  const decoThinRectBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Helper para crear animaciones con scrub (CON TIPADO CORREGIDO)
      const createScrubAnimation = <T extends HTMLElement>(
        targetRef: React.RefObject<T | null>,
        fromVars: gsap.TweenVars,
        toVars: gsap.TweenVars,
        start = "top 85%",
        end = "top 50%",
        scrub: boolean | number = 1.5
      ) => {
        if (targetRef.current) {
          gsap.fromTo(targetRef.current, fromVars, {
            ...toVars,
            ease: 'none',
            scrollTrigger: {
              trigger: targetRef.current,
              start,
              end,
              scrub,
              // markers: true, // Descomentar para depurar este trigger específico
            }
          });
        }
      };
      
      // Animación para la imagen
      createScrubAnimation(imageContainerRef, { opacity: 0, x: -80, scale: 0.9, rotate: -3 }, { opacity: 1, x: 0, scale: 1, rotate: 0 });
      
      // Animación para la tarjeta de texto
      createScrubAnimation(textCardRef, { opacity: 0, x: 80, scale: 0.95 }, { opacity: 1, x: 0, scale: 1 });

      // Animación para el título DENTRO de la tarjeta
      createScrubAnimation(titleRef, { opacity: 0, y: 25 }, { opacity: 1, y: 0 }, "top 90%", "top 60%", 1);

      // Animación para los párrafos
      const paragraphs = paragraphsContainerRef.current?.children;
      if (paragraphs && paragraphs.length > 0) {
        Array.from(paragraphs).forEach((p, i) => {
          if (p instanceof HTMLElement) {
            gsap.fromTo(p,
              { opacity: 0, y: 15 },
              {
                opacity: 1, y: 0, ease: 'none',
                scrollTrigger: {
                  trigger: p,
                  start: `top ${90 - i * 7}%`,
                  end: `top ${70 - i * 7}%`,
                  scrub: 1,
                }
              }
            );
          }
        });
      }
      
      // Animaciones para elementos decorativos con scrub
      createScrubAnimation(decoCircleBottomRef, { opacity: 0, y: 40, scale: 0.6 }, { opacity: 1, y: 0, scale: 1 }, "top 70%", "top 30%", 2);
      createScrubAnimation(decoLineTopRef, { width: '0%', opacity: 0 }, { width: '25%', opacity: 0.7 }, "top 75%", "top 45%", true);
      createScrubAnimation(decoSquareTopRightRef, { opacity: 0, x: 50, rotate: 45, scale: 0.5 }, { opacity: 1, x: 0, rotate: 15, scale: 1 }, "top 80%", "top 40%", 1.8);
      createScrubAnimation(decoThinRectBottomRef, { opacity: 0, height: '0px', y: 30 }, { opacity: 0.8, height: '60px', y: 0 }, "top 70%", "top 35%", 2);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const aboutText = [
    `Soy un Desarrollador Fullstack especializado el desarrollo web. Poseo habilidades para trabajar eficientemente en equipos y una actitud de aprendizaje constante.`,
    `Estoy comprometido mejorar mis habilidades y producir software de calidad. Me entusiasma tener la oportunidad de trabajar en proyectos desafiantes y mejorar mis habilidades como Desarrollador Fullstack.`,
    `Actualmente soy estudiante de tecnología en desarrollo de software en la universidad Minuto de Dios (2024-2026) y he completado cursos especializados en Platzi y Udemy, incluyendo desarrollo backend escalable con NestJS.`
  ];

  const bauhausGlassShapeBase = "absolute bg-brand-black/20 backdrop-blur-md border-2 border-brand-red pointer-events-none";

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 overflow-hidden bg-brand-black"
    >
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 md:h-2/3 bg-gradient-to-t from-brand-red/20 via-brand-red/10 to-transparent pointer-events-none -z-10"
        aria-hidden="true"
      ></div>

      <div
        ref={decoCircleBottomRef}
        className={`${bauhausGlassShapeBase} bottom-10 left-[-3%] md:left-2 w-36 h-36 sm:w-48 sm:h-48 rounded-full transform -translate-x-1/2`}
      ></div>
      <div
        ref={decoLineTopRef}
        className="absolute top-[calc(4rem)] md:top-[calc(6rem)] left-0 h-0.5 sm:h-1 bg-brand-red"
        style={{ width: '0%' }}
      ></div>
      <div
        ref={decoSquareTopRightRef}
        className={`${bauhausGlassShapeBase} top-[10%] right-[5%] w-20 h-20 sm:w-24 sm:h-24 rounded-lg transform rotate-15`}
      ></div>
      <div
        ref={decoThinRectBottomRef}
        className="absolute bottom-[5%] right-[25%] w-2 sm:w-2.5 h-auto bg-brand-red rounded-sm pointer-events-none" // GSAP animará height, no necesita h-0
        style={{ height: '0px'}} // Estado inicial para GSAP
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-0">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">
          
          <div ref={imageContainerRef} className="md:col-span-2 flex justify-center items-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 group cursor-pointer">
              <div className="absolute inset-0 bg-brand-red transform rotate-6 rounded-2xl shadow-lg transition-all duration-300 ease-out group-hover:rotate-3 group-hover:scale-105"></div>
              <div className="absolute inset-2 sm:inset-3 overflow-hidden rounded-xl shadow-xl transition-all duration-300 ease-out group-hover:shadow-2xl">
                <Image
                  src="/pfp.jpg" 
                  alt="Foto de perfil de Juan Diego Estrada"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <div ref={textCardRef} className="md:col-span-3">
            <div className="bg-brand-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-10 shadow-xl border border-brand-white/10
                            transition-all duration-300 ease-out hover:shadow-2xl hover:border-brand-white/20 hover:scale-[1.01]">
              <h2 ref={titleRef} className="text-3xl sm:text-4xl font-heading font-bold text-brand-white mb-6">
                Sobre Mí
              </h2>
              <div 
                ref={paragraphsContainerRef} 
                className="space-y-4 text-brand-white/80 font-sans text-base md:text-lg leading-relaxed"
              >
                {aboutText.map((paragraph, index) => (
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