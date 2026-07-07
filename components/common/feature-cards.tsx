"use client";

import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";
import { StaggerContainer, StaggerItem } from "../ui/animate-on-scroll";

const features = [
  {
    icon: <Truck className="h-7 w-7 text-foreground" />,
    title: "Free Express Shipping",
    desc: "Complimentary shipping on all orders over $100. Dispatched within 24 hours.",
    color: "from-emerald-500/10 to-emerald-500/5",
    iconBg: "bg-emerald-500/10",
  },
  {
    icon: <RotateCcw className="h-7 w-7 text-foreground" />,
    title: "30-Day Free Returns",
    desc: "Not fully satisfied? Return any unused items in original boxes for a full refund.",
    color: "from-blue-500/10 to-blue-500/5",
    iconBg: "bg-blue-500/10",
  },
  {
    icon: <ShieldCheck className="h-7 w-7 text-foreground" />,
    title: "2-Year Warranty",
    desc: "We stand behind our materials. Guaranteed product quality and support.",
    color: "from-sky-500/10 to-sky-500/5",
    iconBg: "bg-sky-500/10",
  },
  {
    icon: <Headphones className="h-7 w-7 text-foreground" />,
    title: "24/7 Expert Support",
    desc: "Our friendly support specialists are available around the clock to assist you.",
    color: "from-amber-500/10 to-amber-500/5",
    iconBg: "bg-amber-500/10",
  },
];

export function FeatureCards() {
  return (
    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {features.map((f, i) => (
        <StaggerItem key={i}>
          <div
            className={`card-hover flex flex-col gap-4 rounded-2xl border border-border bg-gradient-to-br ${f.color} bg-card p-6 shadow-sm h-full`}
          >
            <div className={`w-fit rounded-xl ${f.iconBg} p-3`}>{f.icon}</div>
            <div className="space-y-1.5">
              <h4 className="text-base font-bold tracking-tight text-foreground">{f.title}</h4>
              <p className="text-base text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          </div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
