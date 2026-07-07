"use client";

import * as React from "react";
import { useQuickViewStore } from "../../store/quickView";
import { useCartStore } from "../../store/cart";
import { useWishlistStore } from "../../store/wishlist";
import { useToastStore } from "../../store/toast";
import { Button } from "../ui/button";
import { formatPrice } from "../../lib/utils";
import { X, ShoppingBag, Heart, Star, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Rating } from "./rating";

export function QuickViewModal() {
  const [mounted, setMounted] = React.useState(false);
  const { isOpen, product, closeQuickView } = useQuickViewStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => product ? state.isInWishlist(product.id) : false);
  const addToast = useToastStore((state) => state.addToast);

  // Local state for options
  const [selectedColor, setSelectedColor] = React.useState("");
  const [selectedSize, setSelectedSize] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (product) {
      const colors = product.variants.filter((v) => v.type === "color").map((v) => v.value);
      const sizes = product.variants.filter((v) => v.type === "size").map((v) => v.value);
      setSelectedColor(colors.length > 0 ? colors[0] : "");
      setSelectedSize(sizes.length > 0 ? sizes[0] : "");
      setQuantity(1);
    }
  }, [product]);

  if (!mounted || !product) return null;

  const colors = product.variants.filter((v) => v.type === "color").map((v) => v.value);
  const sizes = product.variants.filter((v) => v.type === "size").map((v) => v.value);
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    addToast(`${product.name} added to bag`, "success");
    closeQuickView();
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    addToast(isInWishlist ? "Removed from wishlist" : "Added to wishlist", "success");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 md:p-10">
          {/* Backdrop Click */}
          <div className="absolute inset-0 cursor-default" onClick={closeQuickView} />

          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            className="relative w-full max-w-3xl bg-card border border-border rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] md:max-h-[70vh] z-10"
          >
            {/* Close button */}
            <button
              onClick={closeQuickView}
              className="absolute right-4 top-4 z-20 rounded-full p-1.5 bg-background/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors border shadow-sm"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            {/* Left Column: Product Images */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-full bg-muted border-r border-border/50 relative overflow-hidden shrink-0">
              <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover object-center" />
            </div>

            {/* Right Column: Actions */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">{product.brandName}</span>
                <h3 className="text-xl font-bold text-foreground leading-tight">{product.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Rating value={product.rating} count={product.reviewsCount} size="sm" />
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-foreground">{formatPrice(product.discountPrice || product.price)}</span>
                {product.discountPrice && (
                  <span className="text-sm text-muted-foreground line-through">{formatPrice(product.price)}</span>
                )}
              </div>

              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {product.description}
              </p>

              {/* Variant Selectors */}
              <div className="space-y-4">
                {/* Color */}
                {colors.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Color</span>
                    <div className="flex gap-1.5">
                      {colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setSelectedColor(c)}
                          className={`h-6 px-2.5 text-xs font-medium border rounded-full transition-all cursor-pointer ${
                            selectedColor === c
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:border-muted-foreground text-foreground"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size */}
                {sizes.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Size</span>
                    <div className="flex gap-1.5">
                      {sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`h-7 w-7 text-xs font-bold border rounded-md flex items-center justify-center transition-all cursor-pointer ${
                            selectedSize === s
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:border-muted-foreground text-foreground"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions panel */}
              <div className="flex items-center gap-3 pt-3 border-t">
                {/* Quantity */}
                <div className="flex h-10 border border-border rounded-lg items-center bg-muted/20 shrink-0">
                  <button
                    disabled={quantity <= 1 || isOutOfStock}
                    onClick={() => setQuantity(quantity - 1)}
                    className="h-full px-2.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-semibold font-mono">{quantity}</span>
                  <button
                    disabled={quantity >= product.stock || isOutOfStock}
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-full px-2.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
                  >
                    +
                  </button>
                </div>

                <Button disabled={isOutOfStock} className="flex-1 h-10 text-xs font-bold" onClick={handleAddToCart}>
                  <ShoppingBag className="h-4 w-4 mr-1.5" />
                  Add to Bag
                </Button>

                <Button variant="outline" className="h-10 px-2.5 hover:text-red-500 hover:border-red-500" onClick={handleWishlistToggle}>
                  <Heart className={`h-4 w-4 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
