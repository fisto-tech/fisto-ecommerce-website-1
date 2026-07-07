"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ApiService } from "../../services/api";
import { useProductStore } from "../../store/product";
import { ProductCarousel } from "../../components/product/product-carousel";
import { ProductCard } from "../../components/product/product-card";
import { FeatureCards } from "../../components/common/feature-cards";
import { BrandLogos } from "../../components/common/brand-logos";
import { Testimonials } from "../../components/common/testimonials";
import { FAQAccordion } from "../../components/common/faq";
import { Newsletter } from "../../components/common/newsletter";
import { FlashSaleCountdown } from "../../components/common/flash-sale";
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "../../components/ui/animate-on-scroll";
import { ArrowRight, ShoppingBag, Sparkles, Zap } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function HomePage() {
  const { products } = useProductStore();
  const [categories, setCategories] = React.useState<any[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    ApiService.getCategories().then(setCategories);
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-zinc-950" />;
  }

  const featuredProducts = products.filter((p) => p.isFeatured);
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <div className="space-y-20 md:space-y-28">

      {/* 1. Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-zinc-950 text-white min-h-[540px] md:min-h-[640px] flex items-center px-8 md:px-14">
        {/* Animated Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-600/25 blur-3xl float-orb pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-emerald-600/15 blur-3xl float-orb-slow pointer-events-none" />
        <div className="absolute top-10 left-1/2 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl float-orb-slower pointer-events-none" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />

        <div className="max-w-2xl space-y-7 relative z-10">
          <AnimateOnScroll variant="fade-up" delay={0}>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/15 px-4 py-1.5 text-base font-semibold uppercase tracking-wider text-indigo-300">
              <Sparkles className="h-4 w-4" />
              Designed for the Detail-Oriented
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={0.1}>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-white leading-[1.08]">
              Refined tools<br />for everyday work.
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={0.18}>
            <p className="text-lg text-zinc-300 leading-relaxed max-w-lg">
              A curated house of acoustic electronics, ergonomic desk setups, and accessories designed to elevate your daily routine — crafted from sustainable materials.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={0.26}>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/products">
                <Button size="lg" variant="brand" className="font-bold px-7 rounded-xl shadow-lg">
                  Shop Collection
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl">
                  Our Story
                </Button>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 2. Feature Cards Section */}
      <AnimateOnScroll variant="fade-up">
        <section className="border-y border-border/40 py-12">
          <FeatureCards />
        </section>
      </AnimateOnScroll>

      {/* 3. Featured Categories */}
      <section className="space-y-8">
        <AnimateOnScroll variant="fade-up">
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Browse by Category</h2>
            <p className="text-base text-muted-foreground">Find the exact segment optimized for your setup.</p>
          </div>
        </AnimateOnScroll>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <StaggerItem key={cat.id}>
              <Link
                href={`/categories/${cat.slug}`}
                className="card-hover group flex flex-col items-center text-center p-5 rounded-2xl border border-border bg-card hover:border-primary/30"
              >
                <div className="relative h-16 w-16 mb-3 rounded-2xl overflow-hidden bg-muted group-hover:scale-105 transition-transform duration-300">
                  <Image src={cat.image} alt={cat.name} fill sizes="64px" className="object-cover" />
                </div>
                <h3 className="text-sm font-bold text-foreground tracking-tight line-clamp-1 link-underline">
                  {cat.name}
                </h3>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 4. Featured Products Carousel */}
      <AnimateOnScroll variant="fade-up">
        <section>
          <ProductCarousel products={featuredProducts} title="Featured Collections" />
        </section>
      </AnimateOnScroll>

      {/* 5. Promotional Split Banners */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimateOnScroll variant="fade-left">
          <div className="card-hover rounded-2xl overflow-hidden relative min-h-[300px] flex items-center bg-zinc-50 dark:bg-zinc-900 border border-border p-8 h-full">
            <div className="space-y-4 max-w-xs relative z-10">
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Brand Focus</span>
              <h3 className="text-2xl font-bold tracking-tight">Kore Ergonomics</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Milled aluminum stands and tactile keyboards engineered to minimize desktop clutter and neck strain.
              </p>
              <Link href="/products?brand=kore" className="inline-block pt-2">
                <Button size="sm" variant="outline" className="rounded-xl cursor-pointer">Explore Peripherals</Button>
              </Link>
            </div>
            <div className="absolute right-6 bottom-6 text-8xl font-black text-foreground/5 select-none pointer-events-none tracking-tighter">
              KORE
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-right">
          <div className="card-hover rounded-2xl overflow-hidden relative min-h-[300px] flex items-center bg-zinc-950 text-white p-8 h-full">
            <div className="absolute top-1/2 right-8 w-56 h-56 rounded-full bg-emerald-500/10 blur-2xl float-orb pointer-events-none -translate-y-1/2" />
            <div className="space-y-4 max-w-xs relative z-10">
              <span className="text-sm font-bold uppercase tracking-widest text-emerald-400">Acoustic Space</span>
              <h3 className="text-2xl font-bold tracking-tight">Aura Soundlabs</h3>
              <p className="text-base text-zinc-400 leading-relaxed">
                Tune out distraction with precision acoustic engineering. High-fidelity active noise canceling.
              </p>
              <Link href="/products?brand=aura" className="inline-block pt-2">
                <Button size="sm" className="bg-white text-black hover:bg-white/92 rounded-xl cursor-pointer">Shop Earwear</Button>
              </Link>
            </div>
            <div className="absolute right-6 bottom-6 text-8xl font-black text-white/5 select-none pointer-events-none tracking-tighter">
              AURA
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* 6. Flash Sale */}
      <AnimateOnScroll variant="scale-up">
        <section>
          <FlashSaleCountdown />
        </section>
      </AnimateOnScroll>

      {/* 7. Best Sellers Grid */}
      <section className="space-y-8">
        <AnimateOnScroll variant="fade-up">
          <div className="flex items-end justify-between">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                <Zap className="h-4 w-4 text-amber-500" />
                Top Picks
              </div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Best Selling Peripherals</h2>
              <p className="text-base text-muted-foreground">Our highest-rated products trusted by engineers worldwide.</p>
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-1.5 text-base font-semibold text-muted-foreground hover:text-foreground transition-colors link-underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </AnimateOnScroll>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.slice(0, 4).map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 8. Brand Logos */}
      <AnimateOnScroll variant="fade-in">
        <section className="py-8 border-y border-border/40">
          <BrandLogos />
        </section>
      </AnimateOnScroll>

      {/* 9. Testimonials */}
      <AnimateOnScroll variant="fade-up">
        <section>
          <Testimonials />
        </section>
      </AnimateOnScroll>

      {/* 10. FAQ */}
      <AnimateOnScroll variant="fade-up">
        <section>
          <FAQAccordion />
        </section>
      </AnimateOnScroll>

      {/* 11. Newsletter */}
      <AnimateOnScroll variant="scale-up">
        <section>
          <Newsletter />
        </section>
      </AnimateOnScroll>

    </div>
  );
}
