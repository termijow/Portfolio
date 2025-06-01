// src/app/page.tsx (temporalmente simplificado)
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl text-brand-white mb-4">Página de Prueba Tailwind</h1>
      <div className="test-class-blue">
        Esto debería tener fondo azul (test-blue) y texto blanco.
      </div>
      <div className="bg-brand-black p-4 mt-4">
        <p className="text-brand-white">Este div usa bg-brand-black y text-brand-white directamente.</p>
      </div>
      <div className="bg-red-500 p-4 mt-4"> {/* Prueba con un color estándar de Tailwind */}
        <p className="text-white">Este div usa bg-red-500 (color estándar).</p>
      </div>
    </div>
  );
}