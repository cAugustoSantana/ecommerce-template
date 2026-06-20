import { Bank, DeviceMobile, LinkSimple, WhatsappLogo } from "@phosphor-icons/react";
import { FadeIn } from "./FadeIn";

const FEATURES = [
  {
    icon: Bank,
    title: "Pagos por transferencia",
    desc: "Tus clientes ven tus datos bancarios, envían el comprobante y tú confirmas el pago fácilmente.",
  },
  {
    icon: LinkSimple,
    title: "Tu propio link",
    desc: "Tu tienda en negocio.vya.do lista desde el primer día.",
  },
  {
    icon: DeviceMobile,
    title: "Gestión desde el celular",
    desc: "Administra productos, órdenes y ventas desde tu teléfono.",
  },
  {
    icon: WhatsappLogo,
    title: "Soporte por WhatsApp",
    desc: "Estamos contigo por WhatsApp cuando lo necesites.",
  },
] as const;

export function Features() {
  return (
    <section id="caracteristicas" className="scroll-mt-20 bg-gray-50 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <FadeIn>
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-vya-text lg:text-3xl">
            Todo lo que necesitas para vender online
          </h2>
        </FadeIn>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }, index) => (
            <li key={title}>
              <FadeIn delayMs={index * 80} className="h-full">
                <div className="h-full rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-vya-blue/10 text-vya-blue">
                  <Icon size={24} weight="duotone" aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-vya-text">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-vya-text/65">{desc}</p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
