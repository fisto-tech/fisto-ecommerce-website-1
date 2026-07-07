"use client";

import { Product } from "../../types";
import { ProductCard } from "./product-card";
import { Search } from "lucide-react";
import { Button } from "../ui/button";

interface ProductGridProps {
  products: Product[];
  onResetFilters?: () => void;
}

export function ProductGrid({ products, onResetFilters }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl border border-dashed border-border bg-muted/20">
        <Search className="h-10 w-10 text-muted-foreground/50 mb-4" />
        <h3 className="text-base font-semibold text-foreground">No products found</h3>
        <p className="text-base text-muted-foreground mt-1 max-w-sm">
          We couldn&apos;t find any items matching your current filters or search query. Try broadening your criteria.
        </p>
        {onResetFilters && (
          <Button onClick={onResetFilters} variant="outline" size="sm" className="mt-5">
            Reset All Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
