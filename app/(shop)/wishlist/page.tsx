"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWishlistStore } from "../../../store/wishlist";
import { useCartStore } from "../../../store/cart";
import { useToastStore } from "../../../store/toast";
import { formatPrice } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { Breadcrumb } from "../../../components/common/breadcrumb";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);

  const { items, removeFromWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const addToast = useToastStore((state) => state.addToast);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-6">
        <Breadcrumb items={[{ label: "Wishlist" }]} />
        <h1 className="text-2xl font-bold tracking-tight">Wishlist</h1>
        <div className="h-64 border rounded-xl animate-pulse" />
      </div>
    );
  }

  const handleAddToCart = (product: any) => {
    // Choose default variant options
    const defaultColor = product.variants.find((v: any) => v.type === "color")?.value;
    const defaultSize = product.variants.find((v: any) => v.type === "size")?.value;
    
    addToCart(product, 1, defaultColor, defaultSize);
    addToast(`${product.name} added to your bag`, "success");
  };

  if (items.length === 0) {
    return (
      <div className="space-y-6">
        <Breadcrumb items={[{ label: "Wishlist" }]} />
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Heart className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <h1 className="text-xl font-bold tracking-tight">Your wishlist is empty</h1>
          <p className="text-base text-muted-foreground mt-1 max-w-sm">
            Save items to your wishlist by clicking the heart icon on cards.
          </p>
          <Button className="mt-6" onClick={() => router.push("/products")}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Wishlist" }]} />

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        My Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((product) => {
          const priceVal = product.discountPrice || product.price;
          return (
            <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300">
              <Link href={`/products/${product.slug}`} className="relative aspect-square w-full bg-muted">
                <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
              </Link>
              <div className="p-4 flex flex-1 flex-col justify-between space-y-2">
                <div>
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{product.brandName}</span>
                  <Link href={`/products/${product.slug}`} className="hover:underline">
                    <h3 className="text-base font-semibold text-foreground line-clamp-1">{product.name}</h3>
                  </Link>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-sm font-bold">{formatPrice(priceVal)}</span>
                    {product.discountPrice && <span className="text-base text-muted-foreground line-through">{formatPrice(product.price)}</span>}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2 mt-auto">
                  <Button size="sm" className="flex-1 text-sm" onClick={() => handleAddToCart(product)}>
                    <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
                    Add to Bag
                  </Button>
                  <Button variant="outline" size="sm" className="px-2" onClick={() => removeFromWishlist(product.id)} aria-label="Remove item">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
