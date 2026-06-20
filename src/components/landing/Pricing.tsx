import { Check } from "@phosphor-icons/react";
import { FadeIn } from "./FadeIn";
import { SIGNUP_URL } from "./constants";

type Plan = {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
};

const PLANS: Plan[] = [
  {
    name: "Gratis",
    price: "RD$0",
    period: "/mes",
    features: [
      "1 tienda",
      "Hasta 5 productos",
      "Subdominio vya.do incluido",
      "Sin pasarela de pago",
    ],
    cta: "Empezar gratis",
  },
  {
    name: "Básico",
    price: "RD$990",
    period: "/mes",
    highlighted: true,
    badge: "Más popular",
    features: [
      "1 tienda",
      "Hasta 100 productos",
      "Pagos por transferencia incluidos",
      "Gestión de órdenes",
      "Soporte por WhatsApp",
    ],
    cta: "Empezar ahora",
  },
  {
    name: "Pro",
    price: "RD$2,490",
    period: "/mes",
    features: [
      "Productos ilimitados",
      "Dominio propio (.com/.do)",
      "Reportes avanzados",
      "Múltiples usuarios",
      "Soporte prioritario",
    ],
    cta: "Empezar ahora",
  },
];

export function Pricing() {
  return (
    <section id="precios" className="scroll-mt-20 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <FadeIn>
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-vya-text lg:text-3xl">
            Planes simples, sin sorpresas
          </h2>
        </FadeIn>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-5">
          {PLANS.map((plan, index) => (
            <li key={plan.name}>
              <FadeIn delayMs={index * 90} className="h-full">
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-6 lg:p-7 ${
                  plan.highlighted
                    ? "border-vya-yellow bg-vya-blue text-white shadow-xl shadow-vya-blue/20 ring-2 ring-vya-yellow"
                    : "border-gray-200 bg-white shadow-sm"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-vya-yellow px-3 py-1 text-xs font-extrabold text-vya-blue">
                    {plan.badge}
                  </span>
                )}
                <p
                  className={`text-sm font-bold uppercase tracking-wide ${
                    plan.highlighted ? "text-vya-yellow" : "text-vya-blue"
                  }`}
                >
                  Plan {plan.name}
                </p>
                <p className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold tracking-tight">{plan.price}</span>
                  <span
                    className={`text-sm font-medium ${
                      plan.highlighted ? "text-white/70" : "text-vya-text/50"
                    }`}
                  >
                    {plan.period}
                  </span>
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check
                        size={18}
                        weight="bold"
                        className={`mt-0.5 shrink-0 ${
                          plan.highlighted ? "text-vya-yellow" : "text-vya-blue"
                        }`}
                        aria-hidden
                      />
                      <span className={plan.highlighted ? "text-white/90" : "text-vya-text/75"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={SIGNUP_URL}
                  className={`mt-8 flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5 ${
                    plan.highlighted
                      ? "bg-vya-yellow text-vya-blue shadow-lg shadow-black/10"
                      : "bg-vya-blue text-white hover:bg-vya-blue/90"
                  }`}
                >
                  {plan.cta}
                </a>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>

        <FadeIn>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-vya-text/60">
            Todos los planes incluyen tu tienda en negocio.vya.do. Sin contratos. Cancela cuando
            quieras.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
