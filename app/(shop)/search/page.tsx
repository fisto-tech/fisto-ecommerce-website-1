"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../../services/api";
import { ProductGrid } from "../../../components/product/product-grid";
import { Skeleton } from "../../../components/ui/skeleton";
import { Breadcrumb } from "../../../components/common/breadcrumb";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  // Fetch search results
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", { search: query }],
    queryFn: () => ApiService.getProducts({ search: query }),
    enabled: !!query,
  });

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Search Results" },
        ]}
      />

      <div className="border-b border-border/60 pb-6">
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-3xl">
          Search Results
        </h1>
        <p className="text-base text-muted-foreground mt-1">
          {query ? `Showing results for "${query}"` : "Enter a search query in the search bar above."}
        </p>
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
        <div>
          {query ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-16 text-muted-foreground text-sm italic">
              Please enter keywords to search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <React.Suspense fallback={<div className="h-[40vh] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>}>
      <SearchContent />
    </React.Suspense>
  );
}
