type Props = {
  compact?: boolean;
};

export function LandingLogo({ compact = false }: Props) {
  return (
    <div className={`flex items-center gap-2 ${compact ? "" : "gap-2.5"}`}>
      <span
        className={`font-extrabold tracking-tight text-vya-blue ${compact ? "text-lg" : "text-xl"}`}
      >
        VendeYa
      </span>
      <span className="rounded-md bg-vya-yellow px-2 py-0.5 text-xs font-extrabold tracking-wide text-vya-blue">
        VYA
      </span>
    </div>
  );
}
