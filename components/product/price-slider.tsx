"use client";

import * as React from "react";
import { formatPrice } from "../../lib/utils";

interface PriceSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (val: number) => void;
}

export function PriceSlider({ min, max, value, onChange }: PriceSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-base font-semibold">
        <span className="text-muted-foreground">Max Price</span>
        <span className="text-foreground font-mono">{formatPrice(value)}</span>
      </div>

      <div className="relative flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div className="flex justify-between text-base text-muted-foreground font-mono">
        <span>{formatPrice(min)}</span>
        <span>{formatPrice(max)}</span>
      </div>
    </div>
  );
}
