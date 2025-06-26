export interface Skill {
  name: string;
  iconSrc: string;
}

const iconFileNames = [
  'css3-original',
  'docker-original',
  'github-original',
  'git-original',
  'html5-original',
  'javascript-original',
  'mongodb-original',
  'nestjs-original',
  'nextjs-original',
  'nodejs-original',
  'postgresql-original',
  'react-original',
  'tailwindcss-original',
  'typescript-original',
];

const formatSkillName = (fileName: string): string => {
  const name = fileName.replace('-original', '').replace('-plain', '');
  
  if (name === 'css3') return 'CSS3';
  if (name === 'html5') return 'HTML5';
  if (name === 'javascript') return 'JavaScript';
  if (name === 'typescript') return 'TypeScript';
  if (name === 'nodejs') return 'Node.js';
  if (name === 'nextjs') return 'Next.js';
  if (name === 'nestjs') return 'NestJS';
  if (name === 'postgresql') return 'PostgreSQL';
  if (name === 'mongodb') return 'MongoDB';
  if (name === 'tailwindcss') return 'Tailwind CSS';
  if (name === 'github') return 'GitHub';

  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const skillsList: Skill[] = iconFileNames.map(fileName => ({
  name: formatSkillName(fileName),
  iconSrc: `/images/skills/${fileName}.svg`,
}));