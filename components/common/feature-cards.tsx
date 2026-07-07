import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

export function FeatureCards() {
  const features = [
    {
      icon: <Truck className="h-6 w-6 text-foreground shrink-0" />,
      title: "Free Express Shipping",
      desc: "Complementary shipping on all orders over $100. Dispatched within 24 hours.",
    },
    {
      icon: <RotateCcw className="h-6 w-6 text-foreground shrink-0" />,
      title: "30-Day Free Returns",
      desc: "Not fully satisfied? Return any unused items in original boxes for a full refund.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-foreground shrink-0" />,
      title: "2-Year Warranty",
      desc: "We stand behind our materials. Guaranteed product quality and support.",
    },
    {
      icon: <Headphones className="h-6 w-6 text-foreground shrink-0" />,
      title: "24/7 Expert Support",
      desc: "Our friendly support specialists are available around the clock to assist you.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((f, i) => (
        <div
          key={i}
          className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="rounded-lg bg-secondary p-2.5">{f.icon}</div>
          <div className="space-y-1">
            <h4 className="text-base font-semibold tracking-tight text-foreground">{f.title}</h4>
            <p className="text-base text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
