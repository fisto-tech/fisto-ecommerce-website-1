"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "../../types";
import { useCartStore } from "../../store/cart";
import { useWishlistStore } from "../../store/wishlist";
import { useToastStore } from "../../store/toast";
import { Rating } from "./rating";
import { formatPrice } from "../../lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const addToast = useToastStore((state) => state.addToast);

  // Prevent hydration mismatch: wishlist state is persisted in localStorage,
  // so it's unknown on the server. Only apply wishlist-dependent classes after mount.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);

  const inWishlist = mounted && isInWishlist;

  const { id, name, slug, price, discountPrice, rating, reviewsCount, images, brandName, isLatest, isBestSeller } = product;

  const currentPrice = discountPrice || price;
  const hasDiscount = !!discountPrice;
  const discountPercent = hasDiscount ? Math.round(((price - discountPrice) / price) * 100) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultColor = product.variants.find((v) => v.type === "color")?.value;
    const defaultSize = product.variants.find((v) => v.type === "size")?.value;
    addToCart(product, 1, defaultColor, defaultSize);
    addToast(`${name} added to your bag`, "success");
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    addToast(inWishlist ? "Removed from wishlist" : "Added to wishlist", "success");
  };

  return (
    <motion.div
      className="card-hover group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      {/* Product Image Panel */}
      <Link href={`/products/${slug}`} className="relative aspect-square w-full overflow-hidden bg-muted block">
        <motion.div
          className="h-full w-full"
          variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={images[0]}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="h-full w-full object-cover object-center"
            priority={product.isFeatured}
          />
        </motion.div>

        {/* Dark overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-black/20"
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.3 }}
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          {hasDiscount && (
            <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-sm font-bold text-white uppercase tracking-wider shadow-md">
              {discountPercent}% OFF
            </span>
          )}
          {isLatest && (
            <span className="rounded-full bg-sky-500 px-2.5 py-1 text-sm font-bold text-white uppercase tracking-wider shadow-md">
              New
            </span>
          )}
          {isBestSeller && (
            <span className="rounded-full bg-amber-500 px-2.5 py-1 text-sm font-bold text-white uppercase tracking-wider shadow-md">
              Popular
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 z-10"
          variants={{
            rest: { opacity: 0, y: 12 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <button
            onClick={handleAddToCart}
            className="w-full bg-white text-black hover:bg-white/95 active:scale-[0.97] text-base font-semibold py-2.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <ShoppingBag className="h-5 w-5" />
            Quick Add
          </button>
        </motion.div>

        {/* Wishlist Heart */}
        <motion.button
          onClick={handleWishlistToggle}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/90 backdrop-blur-sm p-2 text-foreground shadow-md hover:bg-white hover:scale-110 transition-all cursor-pointer"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          whileTap={{ scale: 0.85 }}
        >
          <Heart
            className={`h-5 w-5 transition-all duration-200 ${
              inWishlist ? "fill-red-500 text-red-500" : "text-foreground"
            }`}
          />
        </motion.button>
      </Link>

      {/* Info Section */}
      <div className="flex flex-1 flex-col p-4 space-y-1.5">
        <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          {brandName}
        </span>
        <Link href={`/products/${slug}`} className="link-underline">
          <h3 className="text-base font-semibold tracking-tight text-foreground line-clamp-1">
            {name}
          </h3>
        </Link>

        <Rating value={rating} count={reviewsCount} />

        {/* Price Row */}
        <div className="flex items-baseline gap-2 pt-1 mt-auto">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(currentPrice)}
          </span>
          {hasDiscount && (
            <span className="text-base text-muted-foreground line-through">
              {formatPrice(price)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
