import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "@shared/routes";
import { List, X } from "@phosphor-icons/react";
import { LandingLogo } from "./LandingLogo";
import { SIGNUP_URL } from "./constants";

const LINKS = [
  { href: "#caracteristicas", label: "Características" },
  { href: "#precios", label: "Precios" },
  { href: "#como-funciona", label: "Cómo funciona" },
] as const;

export function LandingNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white transition-shadow ${
        scrolled ? "border-gray-200 shadow-sm" : "border-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-6"
        aria-label="Principal"
      >
        <Link to={routes.home} className="shrink-0">
          <LandingLogo />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm font-semibold text-vya-text/70 transition-colors hover:text-vya-blue"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={SIGNUP_URL}
          className="hidden rounded-lg bg-vya-yellow px-4 py-2.5 text-sm font-bold text-vya-blue transition-transform hover:-translate-y-0.5 md:inline-flex"
        >
          Crear mi tienda gratis
        </a>

        <button
          type="button"
          className="inline-flex rounded-lg p-2 text-vya-text md:hidden"
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 md:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-vya-text/80 hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={SIGNUP_URL}
            className="mt-3 flex w-full items-center justify-center rounded-lg bg-vya-yellow px-4 py-3 text-sm font-bold text-vya-blue"
          >
            Crear mi tienda gratis
          </a>
        </div>
      )}
    </header>
  );
}
