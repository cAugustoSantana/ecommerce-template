import { Link } from "react-router-dom";
import { ArrowRight, Check, Globe, Lock, ShoppingBag } from "@phosphor-icons/react";
import { FadeIn } from "./FadeIn";
import { SIGNUP_URL } from "./constants";
import { routes } from "@shared/routes";

export function LandingHero() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-6 lg:py-20">
        <FadeIn>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-vya-text sm:text-4xl lg:text-5xl">
            Tu tienda online, lista en minutos.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-vya-text/70 lg:text-lg">
            Crea tu tienda en VendeYa y vende desde hoy. Sin conocimientos técnicos. Sin
            complicaciones.
          </p>
          <a
            href={SIGNUP_URL}
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-vya-yellow px-8 py-4 text-base font-bold text-vya-blue shadow-lg shadow-vya-yellow/30 transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            Crear mi tienda gratis
          </a>
          <Link
                to={routes.demo}
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-vya-blue hover:underline"
          >
            Ver ejemplo de tienda
            <ArrowRight size={16} weight="bold" aria-hidden />
          </Link>
          <ul className="mt-8 flex flex-col gap-2 text-sm font-medium text-vya-text/75 sm:flex-row sm:flex-wrap sm:gap-x-5">
            <li className="inline-flex items-center gap-2">
              <Check size={18} weight="bold" className="text-vya-blue" aria-hidden />
              Sin tarjeta de crédito
            </li>
            <li className="inline-flex items-center gap-2">
              <Check size={18} weight="bold" className="text-vya-blue" aria-hidden />
              Listo en minutos
            </li>
            <li className="inline-flex items-center gap-2">
              <Check size={18} weight="bold" className="text-vya-blue" aria-hidden />
              Cancela cuando quieras
            </li>
          </ul>
        </FadeIn>

        <FadeIn delayMs={120} className="lg:justify-self-end">
          <div className="mx-auto w-full max-w-md animate-float rounded-2xl border border-gray-200 bg-gray-50 p-3 shadow-xl shadow-vya-blue/10">
            <div className="mb-3 flex items-center gap-2 rounded-lg bg-white px-3 py-2.5 shadow-sm">
              <span className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </span>
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-gray-100 px-3 py-1.5 text-xs text-vya-text/70">
                <Lock size={12} weight="bold" className="shrink-0 text-green-600" aria-hidden />
                <Globe size={12} weight="bold" className="shrink-0" aria-hidden />
                <span className="truncate font-semibold text-vya-blue">minegocio.vya.do</span>
              </div>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <div className="flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br from-vya-blue/5 to-vya-yellow/10">
                <ShoppingBag size={48} weight="duotone" className="text-vya-blue/40" aria-hidden />
              </div>
              <p className="mt-3 text-sm font-bold text-vya-text">Camiseta Premium</p>
              <p className="text-xs text-vya-text/60">Talla M · Negro</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-extrabold text-vya-blue">RD$1,500</span>
                <span className="rounded-lg bg-vya-blue px-3 py-1.5 text-xs font-bold text-white">
                  Agregar
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
