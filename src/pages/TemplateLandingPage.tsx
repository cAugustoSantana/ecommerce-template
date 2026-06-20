import { useEffect } from "react";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingHero } from "@/components/landing/LandingHero";
import { SocialProofBar } from "@/components/landing/SocialProofBar";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { FinalCta } from "@/components/landing/FinalCta";
import { LandingFooter } from "@/components/landing/LandingFooter";

const PAGE_TITLE = "VendeYa — Crea tu tienda online en República Dominicana";
const PAGE_DESCRIPTION =
  "Crea tu tienda online en minutos. Vende por internet desde República Dominicana. Sin conocimientos técnicos.";

export function TemplateLandingPage() {
  useEffect(() => {
    document.title = PAGE_TITLE;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", PAGE_DESCRIPTION);
    } else {
      const el = document.createElement("meta");
      el.name = "description";
      el.content = PAGE_DESCRIPTION;
      document.head.appendChild(el);
    }
  }, []);

  return (
    <div className="min-h-[100dvh] bg-white font-sans text-vya-text antialiased">
      <LandingNavbar />
      <main>
        <LandingHero />
        <SocialProofBar />
        <HowItWorks />
        <Features />
        <Pricing />
        <FinalCta />
      </main>
      <LandingFooter />
    </div>
  );
}
