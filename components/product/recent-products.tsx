"use client";

import * as React from "react";
import { useRecentlyViewedStore } from "../../store/recentlyViewed";
import { ProductCarousel } from "./product-carousel";

export function RecentlyViewed() {
  const [mounted, setMounted] = React.useState(false);
  const items = useRecentlyViewedStore((state) => state.items);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || items.length === 0) return null;

  return (
    <div className="border-t border-border/60 pt-10 mt-16">
      <ProductCarousel products={items} title="Recently Viewed" />
    </div>
  );
}
