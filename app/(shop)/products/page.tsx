"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../../services/api";
import { FiltersSidebar } from "../../../components/product/filters";
import { ProductGrid } from "../../../components/product/product-grid";
import { Skeleton } from "../../../components/ui/skeleton";
import { Breadcrumb } from "../../../components/common/breadcrumb";
import { Button } from "../../../components/ui/button";
import { SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { Drawer } from "../../../components/ui/drawer";

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filter States
  const [selectedCategory, setSelectedCategory] = React.useState(searchParams.get("category") || "all");
  const [selectedBrand, setSelectedBrand] = React.useState(searchParams.get("brand") || "all");
  const [selectedRating, setSelectedRating] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(30000);
  const [sort, setSort] = React.useState<"price-asc" | "price-desc" | "rating" | "latest">("latest");
  const [search, setSearch] = React.useState(searchParams.get("q") || "");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  // Sync category and brand from URL queries
  React.useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "all");
    setSelectedBrand(searchParams.get("brand") || "all");
    setSearch(searchParams.get("q") || "");
  }, [searchParams]);

  // Fetch Categories & Brands
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: ApiService.getCategories,
  });

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: ApiService.getBrands,
  });

  // Fetch Filtered Products
  const { data: products = [], isLoading } = useQuery({
    queryKey: [
      "products",
      { category: selectedCategory, brand: selectedBrand, rating: selectedRating, maxPrice, sort, search },
    ],
    queryFn: () =>
      ApiService.getProducts({
        category: selectedCategory,
        brand: selectedBrand,
        rating: selectedRating,
        maxPrice,
        sort,
        search,
      }),
  });

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedBrand("all");
    setSelectedRating(0);
    setMaxPrice(30000);
    setSort("latest");
    setSearch("");
    router.push("/products");
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb
        items={[
          { label: "Shop", href: "/products" },
          ...(selectedCategory !== "all"
            ? [{ label: selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) }]
            : []),
        ]}
      />

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Desktop Sidebar (Left side, hidden on mobile) */}
        <aside className="hidden md:block w-64 shrink-0 sticky top-24 border border-border rounded-xl p-6 bg-card">
          <FiltersSidebar
            categories={categories}
            brands={brands}
            selectedCategory={selectedCategory}
            selectedBrand={selectedBrand}
            selectedRating={selectedRating}
            maxPrice={maxPrice}
            priceLimit={30000}
            onCategoryChange={setSelectedCategory}
            onBrandChange={setSelectedBrand}
            onRatingChange={setSelectedRating}
            onPriceChange={setMaxPrice}
            onReset={handleResetFilters}
          />
        </aside>

        {/* Main Content Area (Right side) */}
        <div className="flex-1 w-full space-y-6">
          {/* Controls toolbar */}
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div className="space-y-0.5">
              <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {search ? `Search results for "${search}"` : "All Products"}
              </h1>
              <p className="text-base text-muted-foreground">
                Showing {products.length} {products.length === 1 ? "result" : "results"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile filter trigger */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMobileFiltersOpen(true)}
                className="md:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-1.5" />
                Filters
              </Button>

              {/* Sorting option select */}
              <select
                value={sort}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSort(e.target.value as any)
                }
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none"
              >
                <option value="latest">Sort by: Latest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Sort by: Rating</option>
              </select>

              {/* View toggle */}
              <div className="hidden sm:flex border rounded-md p-1 items-center gap-1 bg-muted/20">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1 rounded ${viewMode === "grid" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
                  aria-label="Grid View"
                >
                  <Grid3X3 className="h-4.5 w-4.5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1 rounded ${viewMode === "list" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
                  aria-label="List View"
                >
                  <List className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid / Skeleton loading */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4 rounded-xl border border-border p-4 bg-card">
                  <Skeleton className="aspect-square w-full rounded-lg" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className={viewMode === "list" ? "space-y-4" : ""}>
              {viewMode === "list" ? (
                // Custom List layout
                <div className="flex flex-col gap-4">
                  {products.map((p) => {
                    const price = p.discountPrice || p.price;
                    return (
                      <div key={p.id} className="flex gap-4 p-4 border rounded-xl bg-card hover:shadow-md transition-shadow">
                        <div className="h-28 w-28 sm:h-36 sm:w-36 shrink-0 relative rounded-lg overflow-hidden border bg-muted">
                          <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div className="space-y-1">
                            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{p.brandName}</span>
                            <h3 className="text-base font-semibold text-foreground">{p.name}</h3>
                            <p className="text-base text-muted-foreground line-clamp-2 pr-4">{p.description}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-baseline gap-2">
                              <span className="text-base font-bold">{price}</span>
                              {p.discountPrice && <span className="text-base text-muted-foreground line-through">{p.price}</span>}
                            </div>
                            <Button size="sm" onClick={() => router.push(`/products/${p.slug}`)}>
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {products.length === 0 && <ProductGrid products={[]} onResetFilters={handleResetFilters} />}
                </div>
              ) : (
                <ProductGrid products={products} onResetFilters={handleResetFilters} />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Filter (Sliders sheet sliding in) */}
      <Drawer isOpen={isMobileFiltersOpen} onClose={() => setIsMobileFiltersOpen(false)} side="left">
        <FiltersSidebar
          categories={categories}
          brands={brands}
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          selectedRating={selectedRating}
          maxPrice={maxPrice}
          priceLimit={30000}
          onCategoryChange={(cat) => {
            setSelectedCategory(cat);
            setIsMobileFiltersOpen(false);
          }}
          onBrandChange={(b) => {
            setSelectedBrand(b);
            setIsMobileFiltersOpen(false);
          }}
          onRatingChange={(r) => {
            setSelectedRating(r);
            setIsMobileFiltersOpen(false);
          }}
          onPriceChange={setMaxPrice}
          onReset={() => {
            handleResetFilters();
            setIsMobileFiltersOpen(false);
          }}
          onClose={() => setIsMobileFiltersOpen(false)}
        />
      </Drawer>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <React.Suspense fallback={<div className="h-[60vh] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>}>
      <ProductsContent />
    </React.Suspense>
  );
}
