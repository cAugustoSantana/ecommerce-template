import { FadeIn } from "./FadeIn";

const BUSINESSES = [
  "Boutique Caribe",
  "TechRD Store",
  "Sabores del Cibao",
  "Moda Tropical",
  "Accesorios 829",
] as const;

export function SocialProofBar() {
  return (
    <section className="border-y border-gray-100 bg-gray-50 py-8" aria-label="Negocios en VYA">
      <FadeIn className="mx-auto max-w-6xl px-4 lg:px-6">
        <p className="text-center text-sm font-semibold text-vya-text/60">
          Negocios dominicanos que ya venden en VYA
        </p>
        <div className="mt-5 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {BUSINESSES.map((name) => (
            <span
              key={name}
              className="shrink-0 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-vya-text/80 shadow-sm"
            >
              {name}
            </span>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
