import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ApiService } from "../../services/api";
import { ProductCarousel } from "../../components/product/product-carousel";
import { ProductCard } from "../../components/product/product-card";
import { FeatureCards } from "../../components/common/feature-cards";
import { BrandLogos } from "../../components/common/brand-logos";
import { Testimonials } from "../../components/common/testimonials";
import { FAQAccordion } from "../../components/common/faq";
import { Newsletter } from "../../components/common/newsletter";
import { FlashSaleCountdown } from "../../components/common/flash-sale";
import { ArrowRight, ShoppingBag, Award, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/button";

export const revalidate = 3600; // Cache page for 1 hour

export default async function HomePage() {
  const products = await ApiService.getProducts();
  const categories = await ApiService.getCategories();

  const featuredProducts = products.filter((p) => p.isFeatured);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const latestProducts = products.slice(0, 4);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* 1. Hero Section */}
      <section className="relative rounded-2xl overflow-hidden bg-zinc-950 text-white min-h-[500px] md:min-h-[600px] flex items-center p-6 md:p-12">
        {/* Decorative Blur Backgrounds */}
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-emerald-600/10 blur-3xl" />
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="max-w-2xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-base font-semibold uppercase tracking-wider text-emerald-400">
            <Sparkles className="h-4.5 w-4.5" />
            Designed For The Detail-Oriented
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-white leading-tight">
            Refined tools for everyday work.
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
            A curated house of acoustic electronics, ergonomic desk setups, and accessories designed to elevate your daily routine. Crafted with sustainable materials.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/products">
              <Button size="lg" className="bg-white text-black hover:bg-white/90">
                Shop Collection
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Feature Cards Section */}
      <section className="border-y border-border/40 py-10">
        <FeatureCards />
      </section>

      {/* 3. Featured Categories */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Browse by Category</h2>
            <p className="text-base text-muted-foreground">Find the exact segment optimized for your setup.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group relative flex flex-col items-center text-center p-4 rounded-xl border border-border bg-card hover:shadow-md transition-all duration-300"
            >
              <div className="relative h-16 w-16 mb-3 rounded-full overflow-hidden bg-muted group-hover:scale-105 transition-transform">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <h3 className="text-base font-semibold text-foreground tracking-tight group-hover:underline line-clamp-1">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Featured Products Carousel */}
      <section>
        <ProductCarousel products={featuredProducts} title="Featured Collections" />
      </section>

      {/* 5. Promotional split banner */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl overflow-hidden relative min-h-[300px] flex items-center bg-zinc-100 dark:bg-zinc-900 border p-8">
          <div className="space-y-4 max-w-xs relative z-10">
            <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Brand Focus</span>
            <h3 className="text-2xl font-bold tracking-tight">Kore Ergonomics</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Milled aluminum stands and tactile keyboards engineered to minimize desktop clutter and neck strain.
            </p>
            <Link href="/products?brand=kore" className="inline-block pt-2">
              <Button size="sm" variant="outline">Explore Peripherals</Button>
            </Link>
          </div>
          <div className="absolute right-4 bottom-0 w-44 h-44 opacity-20 dark:opacity-30 pointer-events-none">
            <Award className="w-full h-full text-foreground" />
          </div>
        </div>

        <div className="rounded-xl overflow-hidden relative min-h-[300px] flex items-center bg-zinc-950 text-white p-8">
          <div className="space-y-4 max-w-xs relative z-10">
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-400">Acoustic Space</span>
            <h3 className="text-2xl font-bold tracking-tight">Aura Soundlabs</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tune out distraction with precision acoustic engineering. High fidelity active noise canceling.
            </p>
            <Link href="/products?brand=aura" className="inline-block pt-2">
              <Button size="sm" className="bg-white text-black hover:bg-white/90">Shop Earwear</Button>
            </Link>
          </div>
          <div className="absolute right-4 bottom-0 w-44 h-44 opacity-10 pointer-events-none">
            <ShoppingBag className="w-full h-full text-white" />
          </div>
        </div>
      </section>

      {/* 6. Flash Sale section */}
      <section>
        <FlashSaleCountdown />
      </section>

      {/* 7. Best Sellers grid */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Best Selling Peripherals</h2>
          <p className="text-base text-muted-foreground">Our highest-rated products trusted by engineers worldwide.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. Brand Logos Marquee */}
      <section className="py-6 border-y border-border/40">
        <BrandLogos />
      </section>

      {/* 9. Customer Testimonials */}
      <section>
        <Testimonials />
      </section>

      {/* 10. FAQ Accordion */}
      <section>
        <FAQAccordion />
      </section>

      {/* 11. Newsletter Card */}
      <section>
        <Newsletter />
      </section>
    </div>
  );
}
