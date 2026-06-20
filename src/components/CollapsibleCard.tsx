import { useId, useState, type ReactNode } from "react";
import { CaretDown } from "@phosphor-icons/react";

type Props = {
  title: string;
  icon?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
  printHidden?: boolean;
};

export function CollapsibleCard({
  title,
  icon,
  defaultOpen = false,
  children,
  className = "",
  printHidden = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <section
      className={`overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ${
        printHidden ? "print:hidden" : ""
      } ${className}`}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-gray-50/80 lg:p-5"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="flex min-w-0 items-center gap-2 text-base font-bold text-gray-900 lg:text-lg">
          {icon}
          <span className="truncate">{title}</span>
        </span>
        <CaretDown
          size={18}
          weight="bold"
          className={`shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open ? (
        <div id={panelId} className="border-t border-gray-100 px-4 pb-4 lg:px-5 lg:pb-5">
          {children}
        </div>
      ) : null}
    </section>
  );
}
