"use client";

import * as React from "react";
import { Category, Brand } from "../../types";
import { PriceSlider } from "./price-slider";
import { Star, X } from "lucide-react";
import { Button } from "../ui/button";

interface FiltersProps {
  categories: Category[];
  brands: Brand[];
  selectedCategory: string;
  selectedBrand: string;
  selectedRating: number;
  maxPrice: number;
  priceLimit: number;
  onCategoryChange: (slug: string) => void;
  onBrandChange: (name: string) => void;
  onRatingChange: (rating: number) => void;
  onPriceChange: (price: number) => void;
  onReset: () => void;
  onClose?: () => void; // for mobile drawer close
}

export function FiltersSidebar({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  selectedRating,
  maxPrice,
  priceLimit,
  onCategoryChange,
  onBrandChange,
  onRatingChange,
  onPriceChange,
  onReset,
  onClose,
}: FiltersProps) {
  return (
    <div className="space-y-6">
      {/* Header for mobile */}
      {onClose && (
        <div className="flex items-center justify-between border-b pb-4 md:hidden">
          <h3 className="font-bold text-foreground">Filter Options</h3>
          <button onClick={onClose} aria-label="Close filters">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Category Section */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Categories
        </h4>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onCategoryChange("all")}
            className={`text-left text-sm py-1 px-2 rounded transition-colors ${
              selectedCategory === "all"
                ? "bg-secondary text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.slug)}
              className={`text-left text-sm py-1 px-2 rounded transition-colors ${
                selectedCategory === cat.slug
                  ? "bg-secondary text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Section */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Brands
        </h4>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onBrandChange("all")}
            className={`text-left text-sm py-1 px-2 rounded transition-colors ${
              selectedBrand === "all"
                ? "bg-secondary text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All Brands
          </button>
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => onBrandChange(brand.name)}
              className={`text-left text-sm py-1 px-2 rounded transition-colors ${
                selectedBrand.toLowerCase() === brand.name.toLowerCase()
                  ? "bg-secondary text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Slider */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Price Range
        </h4>
        <PriceSlider min={0} max={priceLimit} value={maxPrice} onChange={onPriceChange} />
      </div>

      {/* Rating Filter */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Minimum Rating
        </h4>
        <div className="flex flex-col gap-1">
          {[4, 3, 2].map((stars) => (
            <button
              key={stars}
              onClick={() => onRatingChange(stars)}
              className={`flex items-center gap-2 py-1 px-2 rounded text-left transition-colors ${
                selectedRating === stars
                  ? "bg-secondary text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex text-amber-400">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                ))}
                {Array.from({ length: 5 - stars }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 text-muted-foreground/30" />
                ))}
              </div>
              <span className="text-sm">&amp; Up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters button */}
      <Button variant="outline" size="sm" onClick={onReset} className="w-full">
        Reset Filters
      </Button>
    </div>
  );
}
