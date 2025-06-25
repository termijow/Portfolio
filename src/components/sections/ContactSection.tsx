// src/components/sections/ContactSection.tsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiPhone } from 'react-icons/fi'; // Ejemplo con react-icons

gsap.registerPlugin(ScrollTrigger);

// Iconos SVG Simples (puedes reemplazarlos)
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" /><path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" /></svg>;
const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.75c0-1.4-.975-2.5-2.25-2.5S11.5 13.85 11.5 15.25V19h-3v-9h2.9v1.35C12.4 10.635 13.8 10 15.25 10c2.5 0 3.75 1.5 3.75 4.25z"></path></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.145l.002-.001L10 18.41l.287.348.002.001.018.008.006.004a5.714 5.714 0 00.281-.145l.002-.001C10.503 18.664 16.5 13.5 16.5 10a6.5 6.5 0 10-13 0c0 3.5 5.997 8.664 6.192 8.933zM10 11.75a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5z" clipRule="evenodd" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.578a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.578.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5h-1.528a1.5 1.5 0 01-1.465-1.175l-.716-3.578a1.5 1.5 0 011.052-1.767l.933-.267c.41-.117.643-.555.48-.95a11.542 11.542 0 00-6.254-6.254c-.395-.163-.833.07-.95.48l-.267.933a1.5 1.5 0 01-1.767 1.052l-3.578-.716A1.5 1.5 0 013.5 2H2z" clipRule="evenodd" /></svg>;


export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contactItemsRef = useRef<(HTMLAnchorElement | HTMLParagraphElement | null)[]>([]);
  contactItemsRef.current = []; // Limpiar en cada render

  const addToRefs = (el: HTMLAnchorElement | HTMLParagraphElement | null) => {
    if (el && !contactItemsRef.current.includes(el)) {
      contactItemsRef.current.push(el);
    }
  };

  // Elementos decorativos
  const decoCircleRef = useRef<HTMLDivElement>(null);
  const decoLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !cardRef.current ) return;

    const ctx = gsap.context(() => {
      // Animación del título
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reset' }
        }
      );

      // Animación de la tarjeta glassmórfica
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 70, scale: 0.95, filter: 'blur(5px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 80%', toggleActions: 'play none none reset' }
        }
      );

      // Animación escalonada de los items de contacto DENTRO de la tarjeta
      const validItems = contactItemsRef.current.filter(el => el !== null);
      if (validItems.length > 0) {
        gsap.fromTo(validItems,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out', delay: 0.5, // Delay para esperar a la tarjeta
            scrollTrigger: { trigger: cardRef.current, start: 'top 70%', toggleActions: 'play none none reset' }
          }
        );
      }

      // Animación elementos decorativos
      if (decoCircleRef.current) {
        gsap.fromTo(decoCircleRef.current,
            {opacity:0, scale:0.5, x: -50},
            {opacity:1, scale:1, x:0, duration:1, ease: 'elastic.out(1,0.7)',
            scrollTrigger: {trigger: decoCircleRef.current, start: 'top 90%', toggleActions: 'play none none reset'}
            }
        );
      }
      if (decoLineRef.current) {
        gsap.fromTo(decoLineRef.current,
            {width: '0%', opacity:0},
            {width: '80px', opacity:1, duration:1.2, ease: 'power3.out',
            scrollTrigger: {trigger: decoLineRef.current, start: 'top 85%', toggleActions: 'play none none reset'}
            }
        );
      }

    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    { 
      icon: <MailIcon />, 
      text: 'juandestradac@gmail.com', 
      href: 'mailto:juandestradac@gmail.com',
      label: 'Enviar correo electrónico'
    },
    { 
      icon: <LinkedinIcon />, 
      text: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/juan-diego-estrada-9154981b7/', // Reemplaza con tu URL real
      label: 'Perfil de LinkedIn',
      target: '_blank'
    },
    { 
      icon: <GithubIcon />, 
      text: 'GitHub', 
      href: 'https://github.com/termijow/', // Reemplaza con tu URL real
      label: 'Perfil de GitHub',
      target: '_blank'
    },
    { 
      icon: <MapPinIcon />, 
      text: 'Colombia', 
      type: 'text'
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-brand-black overflow-hidden"
    >
      {/* Gradiente de fondo */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-70"
        style={{
          backgroundImage: `radial-gradient(circle at 100% 0%, rgba(229,9,20,0.2) 0%, transparent 40%), 
                           radial-gradient(circle at 0% 100%, rgba(100,100,100,0.1) 0%, transparent 50%),
                           #0A0A0A`
        }}
      ></div>

      {/* Elementos Decorativos Bauhaus */}
      <div ref={decoCircleRef} className="absolute top-[15%] left-[5%] w-24 h-24 md:w-32 md:h-32 bg-brand-red/10 rounded-full filter blur-lg opacity-0 -z-1"></div>
      <div ref={decoLineRef} className="absolute bottom-[10%] right-[5%] h-1 w-0 bg-brand-red opacity-0 -z-1"></div>


      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-brand-white text-center mb-12 md:mb-16 opacity-0"
        >
          Contactame<span className="text-brand-red">.</span>
        </h2>

        <div
          ref={cardRef}
          className="max-w-2xl mx-auto bg-brand-black/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-brand-white/10 p-8 sm:p-10 md:p-12 opacity-0"
        >


          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              item.type === 'text' ? (
                <p
                  key={index}
                  ref={addToRefs}
                  className="flex items-center text-brand-white/90 hover:text-brand-white transition-colors duration-300 text-base sm:text-lg opacity-0"
                >
                  <span className="mr-3 text-brand-red shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </p>
              ) : (
                <a
                  key={index}
                  ref={addToRefs}
                  href={item.href}
                  target={item.target || '_self'}
                  rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                  aria-label={item.label}
                  className="flex items-center text-brand-white/90 hover:text-brand-red transition-colors duration-300 text-base sm:text-lg group opacity-0"
                >
                  <span className="mr-3 text-brand-red group-hover:scale-110 transition-transform duration-300 shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </a>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}