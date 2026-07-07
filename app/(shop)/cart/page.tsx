"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../../store/cart";
import { useToastStore } from "../../../store/toast";
import { formatPrice } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { Breadcrumb } from "../../../components/common/breadcrumb";
import { ShoppingBag, ArrowRight, Trash2, Tag } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const [promoInput, setPromoInput] = React.useState("");

  const { items, discountCode, discountRate, updateQuantity, removeFromCart, applyDiscount, getTotals } =
    useCartStore();
  const addToast = useToastStore((state) => state.addToast);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-6">
        <Breadcrumb items={[{ label: "Shopping Bag" }]} />
        <h1 className="text-2xl font-bold tracking-tight">Shopping Bag</h1>
        <div className="h-64 border rounded-xl animate-pulse" />
      </div>
    );
  }

  const totals = getTotals();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const res = applyDiscount(promoInput.trim());
    if (res.success) {
      addToast(res.message, "success");
      setPromoInput("");
    } else {
      addToast(res.message, "error");
    }
  };

  if (items.length === 0) {
    return (
      <div className="space-y-6">
        <Breadcrumb items={[{ label: "Shopping Bag" }]} />
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <h1 className="text-xl font-bold tracking-tight">Your shopping bag is empty</h1>
          <p className="text-base text-muted-foreground mt-1 max-w-sm">
            Looks like you haven&apos;t added anything to your bag yet.
          </p>
          <Button className="mt-6" onClick={() => router.push("/products")}>
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Shopping Bag" }]} />

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Shopping Bag
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart items listing (Left) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="border border-border rounded-xl bg-card overflow-hidden">
            <div className="divide-y divide-border/60">
              {items.map((item) => {
                const itemPrice = item.product.discountPrice || item.product.price;
                return (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex flex-col sm:flex-row gap-4 p-5"
                  >
                    {/* Item Image */}
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border bg-muted">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                            {item.product.brandName}
                          </span>
                          <Link href={`/products/${item.product.slug}`} className="hover:underline">
                            <h3 className="text-base font-semibold text-foreground line-clamp-1">
                              {item.product.name}
                            </h3>
                          </Link>
                          {item.selectedColor || item.selectedSize ? (
                            <p className="text-base text-muted-foreground mt-1">
                              {item.selectedColor && `Color: ${item.selectedColor}`}
                              {item.selectedColor && item.selectedSize && "  |  "}
                              {item.selectedSize && `Size: ${item.selectedSize}`}
                            </p>
                          ) : null}
                        </div>
                        <span className="text-sm font-bold text-foreground shrink-0">
                          {formatPrice(itemPrice)}
                        </span>
                      </div>

                      {/* Item Actions */}
                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Counter */}
                        <div className="flex h-8 border border-border rounded-md items-center bg-muted/15">
                          <button
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                            className="h-full px-2.5 text-muted-foreground hover:text-foreground text-sm"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-base font-semibold font-mono">
                            {item.quantity}
                          </span>
                          <button
                            disabled={item.quantity >= item.product.stock}
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                            className="h-full px-2.5 text-muted-foreground hover:text-foreground text-sm"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove item button */}
                        <button
                          onClick={() =>
                            removeFromCart(
                              item.product.id,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="text-muted-foreground hover:text-destructive flex items-center gap-1.5 text-sm cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cart Summary (Right) */}
        <div className="space-y-4">
          {/* Summary Card */}
          <div className="border border-border rounded-xl bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-foreground">Order Summary</h2>

            <div className="space-y-2.5 text-base text-muted-foreground">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-foreground">{formatPrice(totals.subtotal)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount ({discountCode})</span>
                  <span>-{formatPrice(totals.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Tax (10%)</span>
                <span className="font-medium text-foreground">{formatPrice(totals.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-sm font-bold text-foreground">
                <span>Total Amount</span>
                <span>{formatPrice(totals.total)}</span>
              </div>
            </div>

            <Button className="w-full mt-2 font-semibold h-11" onClick={() => router.push("/checkout")}>
              Proceed to Checkout
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>

          {/* Promo code Card */}
          <div className="border border-border rounded-xl bg-card p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-base font-semibold text-foreground">
              <Tag className="h-4.5 w-4.5 text-muted-foreground" />
              <span>Apply Discount Coupon</span>
            </div>

            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon code (e.g. FISTO10)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="flex-1 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <Button type="submit" variant="outline" size="sm" className="h-9 px-3 shrink-0">
                Apply
              </Button>
            </form>

            {discountRate > 0 && (
              <p className="text-sm text-emerald-600 font-semibold uppercase tracking-wider">
                ✓ Coupon Code active: {Math.round(discountRate * 100)}% Discount Applied.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
