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

  // Referencias para elementos decorativos adicionales
  const decoCircleBottomRef = useRef<HTMLDivElement>(null);
  const decoLineTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageContainerRef.current || !textCardRef.current || !titleRef.current || !paragraphsContainerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // Animación para la imagen
      if (imageContainerRef.current) {
        gsap.fromTo(imageContainerRef.current,
          { opacity: 0, x: -100, scale: 0.9, rotate: -5 },
          {
            opacity: 1, x: 0, scale: 1, rotate: 0, ease: 'power2.out',
            scrollTrigger: {
              trigger: imageContainerRef.current, // O sectionRef.current
              start: 'top 85%', // Empieza a animar cuando el 85% superior del elemento entra en vista
              end: 'top 50%',   // Termina de animar cuando el 50% superior está en vista
              scrub: 1.5,        // Vincula al scroll, con 1.5s de suavizado
              // markers: {startColor: "blue", endColor: "blue"},
            }
          }
        );
      }

      // Animación para la tarjeta de texto
      if (textCardRef.current) {
        gsap.fromTo(textCardRef.current,
          { opacity: 0, x: 100, scale: 0.95 },
          {
            opacity: 1, x: 0, scale: 1, ease: 'power2.out',
            scrollTrigger: {
              trigger: textCardRef.current, // O sectionRef.current
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1.5,
              // markers: {startColor: "green", endColor: "green"},
            }
          }
        );
      }

      // Animación para el título DENTRO de la tarjeta
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, ease: 'power1.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 90%', // Empieza un poco más tarde que la tarjeta
              end: 'top 60%',
              scrub: 1,
              // markers: {startColor: "red", endColor: "red"},
            }
          }
        );
      }

      // Animación para los párrafos (individualmente con stagger si se quiere, o el contenedor)
      const paragraphs = paragraphsContainerRef.current?.children;
      if (paragraphs && paragraphs.length > 0) {
        // Animar cada párrafo individualmente con scrub y un ligero stagger en el start/end
        Array.from(paragraphs).forEach((p, i) => {
          gsap.fromTo(p,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0, ease: 'power1.out',
              scrollTrigger: {
                trigger: p,
                start: `top ${90 - i * 5}%`, // Stagger visual en el inicio
                end: `top ${65 - i * 5}%`,
                scrub: 1,
                // markers: true, // Puede ser mucho marker
              }
            }
          );
        });
      }
      
      // Animaciones para elementos decorativos con scrub
      if (decoCircleBottomRef.current) {
         gsap.fromTo(decoCircleBottomRef.current,
          { opacity: 0, y: 50, scale: 0.5 },
          {
            opacity: 1, y: 0, scale: 1, ease: 'power1.out',
            scrollTrigger: {
              trigger: sectionRef.current, // Basado en la sección general
              start: 'top 60%',
              end: 'top 30%',
              scrub: 2,
            }
          }
        );
      }
      if (decoLineTopRef.current) {
        gsap.fromTo(decoLineTopRef.current,
          { width: '0%', opacity: 0 }, // GSAP maneja '0%' a un valor numérico si es necesario
          {
            width: '30%', opacity: 1, ease: 'none', // 'none' para que siga exactamente el scroll
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'top 40%',
              scrub: true, // Scrub directo
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const aboutText = [
    `Soy un Desarrollador Fullstack con un fuerte interés en el desarrollo web. Poseo habilidades para trabajar eficientemente en equipos y una actitud de aprendizaje constante.`,
    `Estoy comprometido con la mejora de mis habilidades y la producción de código de alta calidad. Me entusiasma tener la oportunidad de trabajar en proyectos desafiantes y mejorar mis habilidades como Desarrollador Fullstack.`,
    `Actualmente estudio tecnología en desarrollo de software en la universidad Minuto de Dios (2024-2026) y he completado cursos especializados en Platzi y Udemy, incluyendo desarrollo backend escalable con NestJS.`
  ];
  // Si quieres usar Lorem Ipsum para probar:
  // const aboutText = [
  //   `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
  //   `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  //   `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`
  // ];


  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 overflow-hidden bg-brand-black" // Fondo negro base
    >
      {/* Gradiente desde abajo */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 md:h-2/3 bg-gradient-to-t from-brand-red/20 via-brand-red/5 to-transparent pointer-events-none"
        aria-hidden="true"
      ></div>

      {/* Elementos Decorativos */}
      <div // Círculo glass con borde rojo en la parte inferior izquierda
        ref={decoCircleBottomRef}
        className="absolute bottom-10 left-[-5%] md:left-5 w-40 h-40 sm:w-56 sm:h-56 
                   bg-brand-black/30 backdrop-blur-md border-2 border-brand-red rounded-full 
                   opacity-0 pointer-events-none transform -translate-x-1/2"
      ></div>
      <div // Línea roja en la parte superior, debajo del título de sección (implícito)
        ref={decoLineTopRef}
        className="absolute top-[calc(5rem)] md:top-[calc(7rem)] left-0 h-0.5 sm:h-1 bg-brand-red opacity-0"
        style={{ width: '0%' }} // GSAP controlará el ancho
      ></div>


      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"> {/* z-10 para estar sobre el gradiente y decoraciones */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">
          
          <div ref={imageContainerRef} className="md:col-span-2 flex justify-center items-center opacity-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 group cursor-pointer"> {/* 'group' para efectos hover si se añaden */}
              <div className="absolute inset-0 bg-brand-red transform rotate-6 rounded-2xl shadow-lg transition-all duration-300 ease-out group-hover:rotate-3 group-hover:scale-105"></div>
              <div className="absolute inset-2 sm:inset-3 overflow-hidden rounded-xl shadow-xl transition-all duration-300 ease-out group-hover:shadow-2xl">
                <Image
                  src="/pfp.jpg" // Reemplaza con tu ruta
                  alt="Foto de perfil de Juan Diego Estrada"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <div ref={textCardRef} className="md:col-span-3 opacity-0">
            <div className="bg-brand-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-10 shadow-xl border border-brand-white/10
                            transition-all duration-300 ease-out hover:shadow-2xl hover:border-brand-white/20 hover:scale-[1.01]"> {/* Efecto hover sutil */}
              <h2 ref={titleRef} className="text-3xl sm:text-4xl font-heading font-bold text-brand-white mb-6 opacity-0">
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