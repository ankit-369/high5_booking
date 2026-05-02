import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: ReactNode;
  /** Override the inner card's max-width. Defaults to "max-w-2xl". */
  maxWidth?: string;
  /** Extra classes applied to the inner white card. */
  cardClassName?: string;
  /** Extra classes applied to the outer gradient container. */
  className?: string;
}

export default function PageWrapper({
  children,
  maxWidth = "max-w-2xl",
  cardClassName,
  className,
}: PageWrapperProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-sky-100",
        "flex items-start justify-center py-10 px-4",
        className
      )}
    >
      <div
        className={cn(
          "w-full rounded-2xl bg-white shadow-md",
          maxWidth,
          cardClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
