import { FadeIn } from "./FadeIn";
import { SIGNUP_URL } from "./constants";

export function FinalCta() {
  return (
    <section className="bg-vya-blue py-16 lg:py-20">
      <FadeIn className="mx-auto max-w-3xl px-4 text-center lg:px-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-white lg:text-4xl">
          ¿Listo para vender online?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80 lg:text-lg">
          Únete a los negocios dominicanos que ya venden en VendeYa. Empieza gratis hoy.
        </p>
        <a
          href={SIGNUP_URL}
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-vya-yellow px-8 py-4 text-base font-bold text-vya-blue shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5 sm:w-auto"
        >
          Crear mi tienda gratis
        </a>
        <p className="mt-4 text-sm font-medium text-white/70">Sin tarjeta de crédito requerida</p>
      </FadeIn>
    </section>
  );
}
