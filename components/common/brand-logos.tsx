import { mockBrands } from "../../mock/data";

export function BrandLogos() {
  return (
    <div className="space-y-4 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
        Curated Brands We House
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50 dark:opacity-40">
        {mockBrands.map((brand) => (
          <span
            key={brand.id}
            className="text-lg md:text-xl font-black tracking-tighter text-foreground hover:opacity-100 transition-opacity select-none"
          >
            {brand.logo}
          </span>
        ))}
      </div>
    </div>
  );
}
