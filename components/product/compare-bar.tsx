"use client";

import * as React from "react";
import { useCompareStore } from "../../store/compare";
import { useCartStore } from "../../store/cart";
import { useToastStore } from "../../store/toast";
import { Button } from "../ui/button";
import { formatPrice } from "../../lib/utils";
import { X, ArrowRightLeft, ShoppingBag, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CompareBar() {
  const [mounted, setMounted] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { compareItems, removeFromCompare, clearCompare } = useCompareStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const addToast = useToastStore((state) => state.addToast);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || compareItems.length === 0) return null;

  const handleAddToCart = (product: any) => {
    const defaultColor = product.variants.find((v: any) => v.type === "color")?.value;
    const defaultSize = product.variants.find((v: any) => v.type === "size")?.value;
    addToCart(product, 1, defaultColor, defaultSize);
    addToast(`${product.name} added to bag`, "success");
  };

  // Get unique spec names across all items to align table correctly
  const allSpecNames = Array.from(
    new Set(
      compareItems.flatMap((item) => item.specifications.map((s) => s.name))
    )
  );

  return (
    <>
      {/* Floating Compare Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-xl bg-card border border-border shadow-2xl rounded-2xl p-4 flex items-center justify-between gap-4 animate-slideUp">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
            <ArrowRightLeft className="h-4 w-4" />
          </div>
          <div className="flex gap-2 overflow-x-auto shrink-0 py-1">
            {compareItems.map((item) => (
              <div key={item.id} className="relative h-12 w-12 rounded-lg border bg-muted overflow-hidden group shrink-0">
                <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" />
                <button
                  onClick={() => removeFromCompare(item.id)}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
            ))}
          </div>
          <span className="text-xs font-semibold text-muted-foreground hidden sm:inline">
            {compareItems.length} of 3 selected
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={clearCompare} className="text-xs font-bold text-muted-foreground hover:text-foreground">
            Clear
          </Button>
          <Button size="sm" onClick={() => setIsModalOpen(true)} className="text-xs font-bold font-sans">
            Compare Now
          </Button>
        </div>
      </div>

      {/* Comparison Modal Dialog */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-card border border-border rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <ArrowRightLeft className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">Product Comparison</h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full p-1.5 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Comparison Grid Content */}
              <div className="flex-1 overflow-auto p-6">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-4 pr-4 w-1/4 font-bold text-muted-foreground uppercase tracking-wider text-xs">Features</th>
                      {compareItems.map((item) => (
                        <th key={item.id} className="p-4 w-1/4 align-top">
                          <div className="space-y-3">
                            <div className="relative aspect-square w-full rounded-xl bg-muted overflow-hidden border">
                              <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" />
                              <button
                                onClick={() => removeFromCompare(item.id)}
                                className="absolute right-2 top-2 p-1 bg-background/80 hover:bg-background rounded-full border border-border/40 shadow-sm text-muted-foreground hover:text-foreground transition-all"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{item.brandName}</span>
                              <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                              <p className="font-bold text-primary mt-1">{formatPrice(item.discountPrice || item.price)}</p>
                            </div>
                            <Button size="sm" className="w-full text-xs font-semibold" onClick={() => handleAddToCart(item)}>
                              <ShoppingBag className="h-3.5 w-3.5 mr-1" />
                              Add to Bag
                            </Button>
                          </div>
                        </th>
                      ))}
                      {/* Fill empty slots */}
                      {Array.from({ length: 3 - compareItems.length }).map((_, i) => (
                        <th key={i} className="p-4 w-1/4 border-dashed border-2 border-muted rounded-xl bg-muted/5 text-center align-middle text-xs text-muted-foreground font-medium italic">
                          Slot Empty. Add a product to compare.
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {/* Brand */}
                    <tr>
                      <td className="py-3 pr-4 font-bold text-muted-foreground text-xs uppercase tracking-wider">Brand</td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-4 text-foreground font-medium">{item.brandName}</td>
                      ))}
                      {Array.from({ length: 3 - compareItems.length }).map((_, i) => <td key={i} className="p-4"></td>)}
                    </tr>
                    {/* Rating */}
                    <tr>
                      <td className="py-3 pr-4 font-bold text-muted-foreground text-xs uppercase tracking-wider">Rating</td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-4">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-foreground">{item.rating}</span>
                            <span className="text-amber-500">★</span>
                            <span className="text-xs text-muted-foreground font-mono">({item.reviewsCount})</span>
                          </div>
                        </td>
                      ))}
                      {Array.from({ length: 3 - compareItems.length }).map((_, i) => <td key={i} className="p-4"></td>)}
                    </tr>
                    {/* Sizing Options */}
                    <tr>
                      <td className="py-3 pr-4 font-bold text-muted-foreground text-xs uppercase tracking-wider">Sizes</td>
                      {compareItems.map((item) => {
                        const sizes = item.variants.filter((v) => v.type === "size").map((v) => v.value);
                        return (
                          <td key={item.id} className="p-4 text-xs font-mono text-muted-foreground">
                            {sizes.join(", ") || "N/A"}
                          </td>
                        );
                      })}
                      {Array.from({ length: 3 - compareItems.length }).map((_, i) => <td key={i} className="p-4"></td>)}
                    </tr>
                    {/* Stock Status */}
                    <tr>
                      <td className="py-3 pr-4 font-bold text-muted-foreground text-xs uppercase tracking-wider">Stock Status</td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-4 text-xs">
                          <span className={`font-bold ${item.stock > 0 ? "text-emerald-600" : "text-red-500"}`}>
                            {item.stock > 0 ? `In Stock (${item.stock})` : "Out of Stock"}
                          </span>
                        </td>
                      ))}
                      {Array.from({ length: 3 - compareItems.length }).map((_, i) => <td key={i} className="p-4"></td>)}
                    </tr>
                    {/* Dynamic Specifications list */}
                    {allSpecNames.map((specName) => (
                      <tr key={specName}>
                        <td className="py-3 pr-4 font-bold text-muted-foreground text-xs uppercase tracking-wider">{specName}</td>
                        {compareItems.map((item) => {
                          const spec = item.specifications.find((s) => s.name === specName);
                          return (
                            <td key={item.id} className="p-4 text-foreground font-medium">
                              {spec ? spec.value : <span className="text-muted-foreground font-light text-xs italic">N/A</span>}
                            </td>
                          );
                        })}
                        {Array.from({ length: 3 - compareItems.length }).map((_, i) => <td key={i} className="p-4"></td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
