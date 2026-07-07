"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [zoomStyle, setZoomStyle] = React.useState<React.CSSProperties>({ display: "none" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: "block",
      backgroundImage: `url(${images[activeIndex]})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "200%",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" });
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Frame with Zoom */}
      <div
        className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-muted cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={images[activeIndex]}
          alt="Product details zoom frame"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-full w-full object-cover object-center transition-transform duration-300"
        />

        {/* Dynamic Zoom Lens Overlay */}
        <div
          style={zoomStyle}
          className="absolute inset-0 z-10 pointer-events-none border border-border/10 rounded-xl"
        />
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-muted transition-all",
                activeIndex === idx
                  ? "border-primary ring-2 ring-primary/10"
                  : "border-border hover:border-muted-foreground/60"
              )}
            >
              <Image
                src={img}
                alt={`Product thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="h-full w-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
