import { LandingLogo } from "./LandingLogo";
import { WHATSAPP_URL } from "./constants";

const FOOTER_LINKS = [
  { label: "Términos de uso", href: "#" },
  { label: "Privacidad", href: "#" },
  { label: "Contacto", href: "#" },
] as const;

export function LandingFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 lg:flex-row lg:items-start lg:justify-between lg:px-6">
        <div>
          <LandingLogo compact />
          <p className="mt-3 text-sm text-vya-text/60">
            © 2025 VendeYa. Hecho en República Dominicana 🇩🇴
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm font-semibold text-vya-text/60 transition-colors hover:text-vya-blue"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm font-bold text-green-700 transition-colors hover:bg-green-100"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
