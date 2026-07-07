"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { useCartStore } from "../../store/cart";
import { useWishlistStore } from "../../store/wishlist";
import { useAuthStore } from "../../store/auth";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Compass,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Drawer } from "../ui/drawer";
import { formatPrice } from "../../lib/utils";

export function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme, setTheme } = useTheme();
  
  const cartItems = useCartStore((state) => state.items);
  const discountRate = useCartStore((state) => state.discountRate);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const cartTotals = React.useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => {
      const itemPrice = item.product.discountPrice || item.product.price;
      return acc + itemPrice * item.quantity;
    }, 0);

    const discount = subtotal * discountRate;
    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = taxableAmount * 0.1;
    const total = taxableAmount + tax;

    return { subtotal, discount, tax, total };
  }, [cartItems, discountRate]);
  
  const wishlistItems = useWishlistStore((state) => state.items);
  const { user, isAuthenticated, logout } = useAuthStore();

  const [searchQuery, setSearchQuery] = React.useState(searchParams.get("q") || "");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = React.useState<"shop" | "brands" | null>(null);

  // Sync search query from URL
  React.useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 px-4 py-2 text-center text-sm font-medium text-white tracking-wide">
        SUMMER SALE: USE CODE <span className="font-bold underline">FISTO10</span> FOR 10% OFF + FREE SHIPPING ON ORDERS OVER $100
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-extrabold tracking-tighter text-foreground flex items-center gap-0.5">
            FISTO<span className="text-brand font-light">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Shop Mega Menu Trigger */}
            <div
              className="relative py-4"
              onMouseEnter={() => setActiveMegaMenu("shop")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Shop <ChevronDown className="h-4 w-4" />
              </button>

              <AnimatePresence>
                {activeMegaMenu === "shop" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full z-50 w-[500px] rounded-xl border border-border bg-card p-6 shadow-xl"
                  >
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Categories</h4>
                        <ul className="space-y-2.5">
                          <li>
                            <Link href="/products" className="text-base font-medium text-foreground hover:text-primary transition-colors flex items-center justify-between group">
                              Shop All Products <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                            </Link>
                          </li>
                          <li>
                            <Link href="/categories/audio-sound" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                              Audio & Sound
                            </Link>
                          </li>
                          <li>
                            <Link href="/categories/wearables" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                              Wearables
                            </Link>
                          </li>
                          <li>
                            <Link href="/categories/computer-gear" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                              Computer Gear
                            </Link>
                          </li>
                          <li>
                            <Link href="/categories/desk-accessories" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                              Desk Accessories
                            </Link>
                          </li>
                          <li>
                            <Link href="/categories/lifestyle-apparel" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                              Lifestyle Apparel
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-muted p-4 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-foreground">Featured Drop</h4>
                          <p className="text-base text-muted-foreground mt-1">Check out the Aura Studio Pro ANC wireless headphones.</p>
                        </div>
                        <Link href="/products/aura-studio-pro-anc-headphones" className="text-base font-semibold text-primary underline-offset-4 hover:underline mt-4 block">
                          Shop Now &rarr;
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Brands Mega Menu Trigger */}
            <div
              className="relative py-4"
              onMouseEnter={() => setActiveMegaMenu("brands")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Brands <ChevronDown className="h-4 w-4" />
              </button>

              <AnimatePresence>
                {activeMegaMenu === "brands" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full z-50 w-[240px] rounded-xl border border-border bg-card p-4 shadow-xl"
                  >
                    <ul className="space-y-2">
                      <li>
                        <Link href="/products?brand=aura" className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-secondary">
                          Aura Acoustics
                        </Link>
                      </li>
                      <li>
                        <Link href="/products?brand=velo" className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-secondary">
                          Velo Wearables
                        </Link>
                      </li>
                      <li>
                        <Link href="/products?brand=kore" className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-secondary">
                          Kore Peripherals
                        </Link>
                      </li>
                      <li>
                        <Link href="/products?brand=nox" className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-secondary">
                          Nox Protective
                        </Link>
                      </li>
                      <li>
                        <Link href="/products?brand=sol" className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-secondary">
                          Sol Sustainable
                        </Link>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="hidden sm:flex relative max-w-xs w-[180px] lg:w-[220px]">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 rounded-full border border-input bg-muted/40 pl-9 pr-3 text-sm focus:bg-background focus:ring-1 focus:ring-ring focus:outline-none transition-all"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </form>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="h-6 w-6" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground animate-scaleIn">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Account / Login */}
          {isAuthenticated ? (
            <Link
              href="/account"
              className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              aria-label="My Account"
            >
              <User className="h-6 w-6" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              aria-label="Sign In"
            >
              <User className="h-6 w-6" />
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background px-4 py-4"
          >
            <form onSubmit={handleSearchSubmit} className="relative w-full mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-muted/60 pl-10 pr-4 text-sm focus:outline-none"
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            </form>
            <nav className="flex flex-col gap-3">
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold py-1.5 border-b border-border/40"
              >
                Shop All Products
              </Link>
              <div className="flex flex-col gap-2 pl-3">
                <Link href="/categories/audio-sound" onClick={() => setIsMobileMenuOpen(false)} className="text-base text-muted-foreground">
                  Audio & Sound
                </Link>
                <Link href="/categories/wearables" onClick={() => setIsMobileMenuOpen(false)} className="text-base text-muted-foreground">
                  Wearables
                </Link>
                <Link href="/categories/computer-gear" onClick={() => setIsMobileMenuOpen(false)} className="text-base text-muted-foreground">
                  Computer Gear
                </Link>
                <Link href="/categories/desk-accessories" onClick={() => setIsMobileMenuOpen(false)} className="text-base text-muted-foreground">
                  Desk Accessories
                </Link>
                <Link href="/categories/lifestyle-apparel" onClick={() => setIsMobileMenuOpen(false)} className="text-base text-muted-foreground">
                  Lifestyle Apparel
                </Link>
              </div>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold py-1.5 border-b border-border/40 mt-2"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold py-1.5 border-b border-border/40"
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
