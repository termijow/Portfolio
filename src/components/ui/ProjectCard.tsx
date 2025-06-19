// src/components/ui/ProjectCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Si quieres animaciones por tarjeta
import type { Project } from '@/data/projectsData'; // Importa la interfaz

// Iconos simples para enlaces (puedes reemplazarlos con SVGs reales o una librería de iconos)
const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 000 1.5h5.69L3.97 13.03a.75.75 0 001.06 1.06L12 7.23v5.69a.75.75 0 001.5 0V5.5a.75.75 0 00-.75-.75H4.25z" clipRule="evenodd" />
  </svg>
);
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);


interface ProjectCardProps {
  project: Project;
  index: number; // Para stagger en animaciones
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animación de entrada para cada tarjeta
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%', // Inicia cuando el 85% superior de la tarjeta es visible
            toggleActions: 'play none none none', // Solo se reproduce una vez
            // markers: true, // Descomenta para depurar
          }
        }
      );
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="opacity-0 flex flex-col 
                 bg-brand-black/10 backdrop-blur-lg // CAMBIO: bg-brand-black/10 (o bg-brand-white/2 o /3 para más claro)
                 rounded-2xl shadow-2xl border border-brand-white/5 // CAMBIO: border-brand-white/5 (más sutil)
                 overflow-hidden group transition-all duration-300 ease-out 
                 hover:shadow-brand-red/25 hover:border-brand-red/40 hover:scale-[1.02]"
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src={project.image}
          alt={`Vista previa de ${project.title}`}
          fill // Reemplaza width y height para que llene el contenedor
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          sizes="max-width: 768px"
        />
        {project.status && (
          <span className="absolute top-3 right-3 bg-brand-red text-brand-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {project.status}
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-heading font-bold text-brand-white mb-2 group-hover:text-brand-red transition-colors">
          {project.title}
        </h3>
        <p className="text-brand-white/70 font-sans text-sm mb-4 flex-grow">
          {project.description}
        </p>

        <div className="mb-4">
          <p className="text-xs font-semibold text-brand-red uppercase mb-1">Tecnologías:</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="bg-brand-red/20 text-brand-red text-xs px-2 py-0.5 rounded-md">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-center space-x-4 pt-4 border-t border-brand-white/10">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-brand-white/80 hover:text-brand-red transition-colors text-sm font-medium"
            >
              <ExternalLinkIcon />
              <span>Ver Demo</span>
            </Link>
          )}
          {project.repoUrl && (
            <Link
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-brand-white/80 hover:text-brand-red transition-colors text-sm font-medium"
            >
              <GitHubIcon />
              <span>Ver Código</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}