"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../../../services/api";
import { ProductGrid } from "../../../../components/product/product-grid";
import { Breadcrumb } from "../../../../components/common/breadcrumb";
import { Skeleton } from "../../../../components/ui/skeleton";
import { use } from "react";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  // Fetch Categories to get current Category name
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: ApiService.getCategories,
  });

  const currentCategory = categories.find((c) => c.slug === slug);
  const categoryName = currentCategory ? currentCategory.name : slug.charAt(0).toUpperCase() + slug.slice(1);

  // Fetch products by category
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", { category: slug }],
    queryFn: () => ApiService.getProducts({ category: slug }),
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb
        items={[
          { label: "Shop", href: "/products" },
          { label: categoryName },
        ]}
      />

      <div className="space-y-2 border-b border-border/60 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
          {categoryName}
        </h1>
        {currentCategory && (
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            {currentCategory.description}
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4 rounded-xl border border-border p-4 bg-card">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
