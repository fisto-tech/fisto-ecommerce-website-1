import { mockTestimonials } from "../../mock/data";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          What our customers say
        </h2>
        <p className="text-base text-muted-foreground max-w-sm mx-auto">
          Don&apos;t just take our word for it. Read honest reviews from creatives and engineers worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockTestimonials.map((t) => (
          <div
            key={t.id}
            className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow relative"
          >
            <Quote className="absolute right-4 top-4 h-8 w-8 text-muted-foreground/10 shrink-0" />
            <p className="text-sm leading-relaxed text-muted-foreground flex-1 italic mb-6">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border bg-muted">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">{t.name}</h4>
                <p className="text-base text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
