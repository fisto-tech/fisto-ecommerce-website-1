"use client";

import * as React from "react";
import { ArrowRight, Flame } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export function FlashSaleCountdown() {
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({ hours: 14, minutes: 32, seconds: 45 });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(interval);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-red-500/10 via-amber-500/5 to-transparent p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="space-y-3 max-w-md text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 dark:bg-red-500/25 px-3 py-1 text-sm font-bold text-red-500 uppercase tracking-wide">
          <Flame className="h-4 w-4 fill-red-500" />
          Limited Flash Sale
        </div>
        <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Mid-Year Tech Clearance
        </h3>
        <p className="text-base text-muted-foreground leading-relaxed">
          Grab 30% off selected peripherals, chargers, and accessories. Offers end once the timer hits zero.
        </p>
      </div>

      {/* Timer Display */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="flex gap-2">
          {Object.entries(timeLeft).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-card border border-border text-lg font-bold text-foreground font-mono shadow-sm">
                {formatNumber(value)}
              </div>
              <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground mt-1">
                {key}
              </span>
            </div>
          ))}
        </div>

        <Link href="/products?sort=latest">
          <Button className="font-semibold" size="sm">
            Shop Deals
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
