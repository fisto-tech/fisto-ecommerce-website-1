"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
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

  const { id, name, slug, price, discountPrice, rating, reviewsCount, images, brandName, isLatest, isBestSeller } = product;

  const currentPrice = discountPrice || price;
  const hasDiscount = !!discountPrice;
  const discountPercent = hasDiscount ? Math.round(((price - discountPrice) / price) * 100) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Choose default color/size if available
    const defaultColor = product.variants.find((v) => v.type === "color")?.value;
    const defaultSize = product.variants.find((v) => v.type === "size")?.value;

    addToCart(product, 1, defaultColor, defaultSize);
    addToast(`${name} added to your bag`, "success");
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    addToast(
      isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      "success"
    );
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-border/80">
      {/* Product Image Panel */}
      <Link href={`/products/${slug}`} className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image
          src={images[0]}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          priority={product.isFeatured}
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          {hasDiscount && (
            <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-sm font-bold text-white uppercase tracking-wider">
              {discountPercent}% OFF
            </span>
          )}
          {isLatest && (
            <span className="rounded-full bg-blue-500 px-2.5 py-1 text-sm font-bold text-white uppercase tracking-wider">
              New
            </span>
          )}
          {isBestSeller && (
            <span className="rounded-full bg-amber-500 px-2.5 py-1 text-sm font-bold text-white uppercase tracking-wider">
              Popular
            </span>
          )}
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          <button
            onClick={handleAddToCart}
            className="w-full bg-background/95 hover:bg-background text-foreground text-base font-semibold py-2.5 px-4 rounded-lg shadow-md flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-350 active:scale-[0.97] cursor-pointer"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Quick Add
          </button>
        </div>

        {/* Wishlist Heart Action */}
        <button
          onClick={handleWishlistToggle}
          className="absolute right-3 top-3 z-10 rounded-full bg-background/90 p-2 text-muted-foreground shadow-sm hover:bg-background hover:text-red-500 transition-colors cursor-pointer"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-4 w-4 transition-transform active:scale-125 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
        </button>
      </Link>

      {/* Info Section */}
      <div className="flex flex-1 flex-col p-4 space-y-1.5">
        <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          {brandName}
        </span>
        <Link href={`/products/${slug}`} className="hover:underline">
          <h3 className="text-base font-semibold tracking-tight text-foreground line-clamp-1">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <Rating value={rating} count={reviewsCount} />

        {/* Price Row */}
        <div className="flex items-baseline gap-2 pt-1 mt-auto">
          <span className="text-base font-bold text-foreground">
            {formatPrice(currentPrice)}
          </span>
          {hasDiscount && (
            <span className="text-base text-muted-foreground line-through">
              {formatPrice(price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
