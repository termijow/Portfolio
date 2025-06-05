// Podrías poner esto en src/data/projectsData.ts y luego importarlo
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string; // Para una vista detallada futura (opcional)
  image: string; // Ruta a la imagen en public/images/projects/
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  status?: 'En producción' | 'En desarrollo' | 'Concepto';
}

export const projectsData: Project[] = [
  {
    id: 'royalpainters',
    title: 'RoyalPainters.net',
    description: 'Web para empresa de pintura y remodelación en USA, enfocada en captación de clientes.',
    longDescription: 'Desarrollo frontend y colaboración en backend para mejorar la presencia online y la captación de leads para una empresa de servicios de pintura y remodelación en Estados Unidos. Se implementaron formularios de contacto optimizados y una galería de proyectos visualmente atractiva.',
    image: '/RoyalPainters.png', // Necesitarás crear esta imagen
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Node.js'], // Ejemplo
    liveUrl: 'https://royalpainters.net',
    status: 'En producción',
  },
  {
    id: 'tuportal',
    title: 'TuPortal',
    description: 'Plataforma de servicios para empresa de software en Meta, Colombia.',
    longDescription: 'Liderazgo en el desarrollo full-stack de una plataforma SaaS para una empresa de software local, gestionando desde la base de datos hasta la interfaz de usuario, con un enfoque en la escalabilidad y la experiencia de usuario.',
    image: '/RoyalPainters.png', // Necesitarás crear esta imagen
    technologies: ['NestJS', 'React', 'PostgreSQL', 'Docker', 'TypeScript'], // Ejemplo
    // liveUrl: '#', // Si aún no está en producción
    status: 'En desarrollo',
  },
  {
    id: 'queryforge',
    title: 'QueryForge',
    description: 'Editor visual de consultas SQL (DDL, MySQL) para simplificar estructuras complejas.',
    longDescription: 'Diseño y desarrollo de una herramienta innovadora que permite a los usuarios construir y entender consultas SQL complejas de forma visual, generando el código DDL y para joins en MySQL. El objetivo es facilitar el aprendizaje y la gestión de bases de datos.',
    image: '/RoyalPainters.png', // Necesitarás crear esta imagen
    technologies: ['React', 'TypeScript', 'GSAP', ' Zustand'], // Ejemplo, añade las reales
    status: 'En desarrollo',
  },
  {
    id: 'motifs',
    title: 'Motifs - Landing Page',
    description: 'Landing page atractiva para empresa de buzos prom, con optimización de procesos.',
    longDescription: 'Creación de una landing page con alto impacto visual para una marca de ropa enfocada en buzos de promoción estudiantil. Se integraron funcionalidades para optimizar la toma de pedidos y la comunicación con clientes, mejorando la conversión y la eficiencia operativa.',
    image: '/RoyalPainters.png', // Necesitarás crear esta imagen
    technologies: ['Next.js', 'Tailwind CSS', 'GSAP', 'Lenis'], // Ejemplo
    status: 'En desarrollo',
  },
  {
    id: 'motifs',
    title: 'Motifs - Landing Page',
    description: 'Landing page atractiva para empresa de buzos prom, con optimización de procesos.',
    longDescription: 'Creación de una landing page con alto impacto visual para una marca de ropa enfocada en buzos de promoción estudiantil. Se integraron funcionalidades para optimizar la toma de pedidos y la comunicación con clientes, mejorando la conversión y la eficiencia operativa.',
    image: '/RoyalPainters.png', // Necesitarás crear esta imagen
    technologies: ['Next.js', 'Tailwind CSS', 'GSAP', 'Lenis'], // Ejemplo
    status: 'En desarrollo',
  },
  {
    id: 'motifs',
    title: 'Motifs - Landing Page',
    description: 'Landing page atractiva para empresa de buzos prom, con optimización de procesos.',
    longDescription: 'Creación de una landing page con alto impacto visual para una marca de ropa enfocada en buzos de promoción estudiantil. Se integraron funcionalidades para optimizar la toma de pedidos y la comunicación con clientes, mejorando la conversión y la eficiencia operativa.',
    image: '/images/projects/motifs-preview.jpg', // Necesitarás crear esta imagen
    technologies: ['Next.js', 'Tailwind CSS', 'GSAP', 'Lenis'], // Ejemplo
    status: 'En desarrollo',
  },
  {
    id: 'motifs',
    title: 'Motifs - Landing Page',
    description: 'Landing page atractiva para empresa de buzos prom, con optimización de procesos.',
    longDescription: 'Creación de una landing page con alto impacto visual para una marca de ropa enfocada en buzos de promoción estudiantil. Se integraron funcionalidades para optimizar la toma de pedidos y la comunicación con clientes, mejorando la conversión y la eficiencia operativa.',
    image: '/images/projects/motifs-preview.jpg', // Necesitarás crear esta imagen
    technologies: ['Next.js', 'Tailwind CSS', 'GSAP', 'Lenis'], // Ejemplo
    status: 'En desarrollo',
  },  
];