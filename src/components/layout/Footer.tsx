export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 text-center bg-brand-black border-t border-brand-red/30">
      <div className="container mx-auto">
        <p className="text-brand-white/70">
          © {currentYear} Juan Diego Estrada Ceballos. Todos los derechos reservados.
        </p>
        <p className="text-sm text-brand-white/50 mt-2">
          Diseñado con ♥ y código.
        </p>
        {/* Podrías añadir iconos de redes sociales aquí */}
      </div>
    </footer>
  )
}