// src/app/page.tsx
// Por ahora, importaremos las secciones aunque no existan, para planificar
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
// import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      {/* Aquí es donde irán tus secciones */}
      {/* <HeroSection /> */}
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <div id="placeholder-content" className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-heading text-brand-red">Contenido Principal Próximamente...</h1>
      </div>
      <div id="about" className="min-h-screen bg-brand-black flex items-center justify-center"> {/* Placeholder para scroll */}
        <h2 className="text-3xl font-heading text-brand-white">Sección Sobre Mí</h2>
      </div>
      <div id="projects" className="min-h-screen bg-gray-900 flex items-center justify-center"> {/* Placeholder para scroll */}
        <h2 className="text-3xl font-heading text-brand-white">Sección Proyectos</h2>
      </div>

      
        {/* <ContactSection /> */}
    </>
  );
}