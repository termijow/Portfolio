// src/components/layout/Footer.tsx
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 bg-brand-black border-t border-brand-red/30 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm text-brand-white/70">
          © {currentYear} Juan Diego Estrada Ceballos.
        </p>
        <p className="text-xs text-brand-white/50 mt-1">
          Desarrollado con Next.js, React, Tailwind CSS, GSAP y Lenis.
        </p>
        {/* Podrías añadir enlaces a GitHub/LinkedIn aquí más adelante */}
      </div>
    </footer>
  );
}