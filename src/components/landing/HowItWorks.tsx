import { ShareNetwork, Storefront, UploadSimple } from "@phosphor-icons/react";
import { FadeIn } from "./FadeIn";

const STEPS = [
  {
    icon: Storefront,
    title: "Crea tu cuenta",
    desc: "30 segundos, elige el nombre de tu tienda y tu link negocio.vya.do queda listo.",
  },
  {
    icon: UploadSimple,
    title: "Sube tus productos",
    desc: "Agrega fotos, precios y descripción en minutos desde tu celular.",
  },
  {
    icon: ShareNetwork,
    title: "Comparte y vende",
    desc: "Comparte tu link por WhatsApp, Instagram o donde quieras. Tus clientes compran.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-20 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <FadeIn>
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-vya-text lg:text-3xl">
            Vende online en 3 pasos
          </h2>
        </FadeIn>

        <div className="relative mt-12">
          <div
            className="pointer-events-none absolute left-[16.666%] right-[16.666%] top-6 hidden border-t-2 border-dashed border-vya-blue/20 lg:block"
            aria-hidden
          />
          <ol className="grid gap-8 lg:grid-cols-3 lg:gap-6">
            {STEPS.map(({ icon: Icon, title, desc }, index) => (
              <li key={title}>
                <FadeIn delayMs={index * 100}>
                  <div className="relative flex flex-col items-center text-center">
                    <span className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-vya-blue text-lg font-extrabold text-white shadow-md shadow-vya-blue/20">
                      {index + 1}
                    </span>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-vya-yellow/20 text-vya-blue">
                      <Icon size={26} weight="duotone" aria-hidden />
                    </div>
                    <h3 className="text-lg font-bold text-vya-text">{title}</h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-vya-text/65">
                      {desc}
                    </p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
