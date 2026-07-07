"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "../../types";
import { ProductCard } from "./product-card";

interface ProductCarouselProps {
  products: Product[];
  title?: string;
}

export function ProductCarousel({ products, title }: ProductCarouselProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const scrollAmount = clientWidth * 0.75;
      const targetScroll =
        direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      
      containerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  if (products.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Title & Controls */}
      <div className="flex items-center justify-between">
        {title && (
          <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
        )}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll("left")}
            className="rounded-full border border-border bg-background p-2 text-foreground hover:bg-secondary transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="rounded-full border border-border bg-background p-2 text-foreground hover:bg-secondary transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Overflow Slider Container */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[280px] shrink-0 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
