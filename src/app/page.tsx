// src/app/page.tsx
import TestButton from '@/components/ui/TestButton'; // Asegúrate que @ sea src

export default function HomePage() {
  return (
    // Añadimos un fondo con un gradiente o imagen al contenedor principal
    // para que el glassmorfismo tenga algo que "desenfocar"
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8 space-y-8"
      style={{
        // Ejemplo con un gradiente radial complejo
        background: 'radial-gradient(circle at top left, #FF3B30 10%, transparent 40%), radial-gradient(circle at bottom right, #0A0A0A 50%, #E50914 100%)',
        // O un gradiente lineal simple
        // background: 'linear-gradient(to bottom right, #0A0A0A, #4A0404, #0A0A0A)',
        // O incluso una imagen de fondo (asegúrate de tener una en public/images)
        // backgroundImage: 'url(/images/background-pattern.jpg)',
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
      }}
    >
      <main className="w-full max-w-3xl bg-brand-black/30 backdrop-blur-sm p-8 rounded-xl shadow-2xl"> {/* Un contenedor para el contenido principal, ligeramente transparente */}
        <h1 className="text-center mb-6">Prueba de Tema del Portafolio</h1>

        <p className="text-lg text-center">
          Este es un párrafo con la fuente de cuerpo (Open Sans).
          El fondo general debería ser <span className="font-bold text-brand-red">negro (brand-black)</span>
          y el texto principal <span className="font-bold text-brand-red">blanco (brand-white)</span>.
        </p>

        <h2 className="mt-6 text-center">Subtítulo (Montserrat y Rojo)</h2>

        <div className="test-red-card my-6 mx-auto w-fit"> {/* Centramos la tarjeta roja */}
          <p>Esta es una tarjeta con fondo rojo (brand-red) y texto blanco (brand-white).</p>
        </div>

        <div className="glassmorphic-card w-full max-w-md mx-auto my-6"> {/* Centramos la tarjeta glass */}
          <h3 className="text-brand-white mb-2">Tarjeta Glassmórfica</h3>
          <p className="text-brand-white/80">
            Contenido dentro de una tarjeta con efecto glass.
            Ahora deberías ver el fondo desenfocado a través de esta tarjeta.
          </p>
        </div>

        <section> {/* Centramos los botones */}
          <h4 className="mb-4">Otro encabezado h4</h4>
          <button className=" p-4">
            Botón Rojo
          </button>
          <button className="ml-4 border border-brand-red text-brand-red hover:bg-brand-red hover:text-brand-white font-bold py-2 px-4 rounded transition-colors duration-300">
            Botón Contorno Rojo
          </button>
          <TestButton/><TestButton/><TestButton/><TestButton/><TestButton/>
          <button className="bg-brand-red text-brand-white/80">
  Botón Rojo Súper Simple
</button>
        </section>
      </main>
    </div>
  );
}