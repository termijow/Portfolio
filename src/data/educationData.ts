// Podrías poner esto en src/data/educationData.ts
export interface EducationItem {
  id: string;
  type: 'university' | 'course' | 'self-taught';
  title: string;
  institution?: string; // Para universidad o plataforma de curso
  period: string;
  description: string | string[]; // Puede ser un string o un array de párrafos
  icon?: string; // Ruta a un icono (opcional)
  technologies?: string[]; // Para cursos o autoaprendizaje
}

export const educationData: EducationItem[] = [
  {
    id: 'uniminuto',
    type: 'university',
    title: 'Tecnología en Desarrollo de Software',
    institution: 'Universidad Minuto de Dios (UNIMINUTO)',
    period: '2024 - 2026 (Cursando)',
    description: 'Formación en los fundamentos del Desarrollo de Software, Metodologías ágiles, Bases de datos y Desarrollo Web.',
    icon: '/uniminuto-logo.jpeg',
    technologies: ['Java', 'MySQL', 'JavaScript', 'React', 'Node.js', 'HTML', 'CSS'],

  },
  {
    id: 'platzi-fsjs',
    type: 'course',
    title: 'Full Stack Developer con JavaScript',
    institution: 'Platzi',
    period: 'Finalizado en 2023',
    description: 'Desarrollo de habilidades full-stack utilizando JavaScript, desde el frontend con React hasta el backend con Node.js.',
    icon: '/platzi-logo.png', // Necesitarás este logo
    technologies: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS'],
  },
  {
    id: 'udemy-nest',
    type: 'course',
    title: 'Nest: Desarrollo de Backend Escalable con Node',
    institution: 'Udemy (Fernando Herrera)',
    period: 'Finalizado en 2023',
    description: 'Curso avanzado enfocado en el desarrollo de APIs escalables con NestJS y TypeORM, aplicando principios sólidos de arquitectura backend y buenas prácticas de desarrollo.',
    icon: '/udemy-logo.webp', // Necesitarás este logo
    technologies: ['NestJS', 'Node.js', 'TypeScript', 'TypeORM', 'JWT'],
  },
  // Podrías tener otro curso de Udemy aquí si es relevante
  // {
  //   id: 'udemy-otro',
  //   type: 'course',
  //   title: 'Otro Curso de Udemy',
  //   institution: 'Udemy (Fernando Herrera)',
  //   period: 'Finalizado en 202X',
  //   description: 'Descripción del curso.',
  //   icon: '/images/icons/udemy-logo.png',
  //   technologies: ['Tec1', 'Tec2'],
  // },
  {
    id: 'self-taught',
    type: 'self-taught',
    title: 'Aprendizaje Autodidacta Continuo',
    period: 'Desde 2022 - Presente',
    description: [
      'Desarrollo de APIs RESTful integrando tecnologías como MongoDB, PostgreSQL y Docker para la gestión de datos y contenedores.',
      'Aplicación de principios de diseño de software como SOLID, KISS y DRY',
      'Dominio de herramientas modernas tanto en backend (NestJS) como en frontend (React, Next.js), experimentando con nuevas tecnologías y tendencias de la industria.'
    ],
    technologies: ['MongoDB', 'PostgreSQL', 'Docker', 'REST APIs', 'SOLID', 'KISS', 'DRY', 'NextJS'],
  },
];