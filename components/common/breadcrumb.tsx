import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "../../lib/utils";

interface BreadcrumbLink {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbLink[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex py-3 text-muted-foreground", className)}>
      <ol className="inline-flex items-center space-x-1.5 md:space-x-2 text-sm font-medium">
        {/* Home Link */}
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </li>

        {/* Dynamic Items */}
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center">
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 mx-1" />
              {isLast || !item.href ? (
                <span className="text-foreground font-semibold truncate max-w-[120px] sm:max-w-none">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-foreground transition-colors truncate">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
