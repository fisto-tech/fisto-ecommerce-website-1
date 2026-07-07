"use client";

import * as React from "react";
import Link from "next/link";
import { formatPrice } from "../../../../../lib/utils";
import { Breadcrumb } from "../../../../../components/common/breadcrumb";
import { Button } from "../../../../../components/ui/button";
import { ArrowLeft, Package, Clock, Truck, ShieldCheck } from "lucide-react";
import { use } from "react";

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Mock order details
  const mockOrder = {
    id,
    date: "2026-07-06",
    status: "processing",
    trackingNumber: "TRK98327189",
    paymentMethod: "Credit Card (Ending in 4444)",
    subtotal: 79,
    discount: 10,
    tax: 6.9,
    total: 75.9,
    shippingAddress: {
      name: "John Customer",
      addressLine1: "120 Vercel Way",
      addressLine2: "Suite 400",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      country: "United States",
    },
    items: [
      {
        id: "prod-3",
        name: "Kore MagSafe Wireless Charger",
        slug: "kore-magsafe-wireless-charger",
        price: 59,
        quantity: 1,
        color: "Matte Black",
        image: "https://images.unsplash.com/photo-1622445262465-2481c4574875?q=80&w=200&auto=format&fit=crop",
      },
      {
        id: "prod-8",
        name: "Nox Stealth Leather Phone Case",
        slug: "nox-stealth-leather-phone-case",
        price: 29,
        quantity: 1,
        color: "Chestnut Brown",
        image: "https://images.unsplash.com/photo-1601597111158-2fceff270190?q=80&w=200&auto=format&fit=crop",
      }
    ]
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "My Account", href: "/account" },
          { label: "Orders", href: "/account/orders" },
          { label: id },
        ]}
      />

      <div className="flex items-center gap-4">
        <Link href="/account/orders">
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-3xl font-mono">
            {id}
          </h1>
          <p className="text-base text-muted-foreground">Placed on {mockOrder.date}</p>
        </div>
      </div>

      {/* Progress tracker bar */}
      <div className="border border-border rounded-xl bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between text-base font-semibold pb-4 border-b">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-blue-500" />
            Status: <span className="text-blue-500 font-bold uppercase">{mockOrder.status}</span>
          </span>
          <span className="font-mono text-muted-foreground">Tracking #: {mockOrder.trackingNumber}</span>
        </div>

        {/* Step progress graphic */}
        <div className="flex items-center justify-between pt-6 max-w-lg mx-auto text-sm sm:text-sm text-center font-medium">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">✓</div>
            <span className="text-foreground">Confirmed</span>
          </div>
          <div className="flex-1 h-0.5 bg-primary mx-2" />
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold animate-pulse">2</div>
            <span className="text-blue-500">Processing</span>
          </div>
          <div className="flex-1 h-0.5 bg-secondary mx-2" />
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-secondary text-muted-foreground flex items-center justify-center font-bold">3</div>
            <span className="text-muted-foreground">Shipped</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Order Items list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="border border-border rounded-xl bg-card p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-foreground">Order Items</h3>
            <div className="divide-y">
              {mockOrder.items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-muted">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.slug}`} className="hover:underline">
                      <h4 className="text-base font-semibold text-foreground truncate">{item.name}</h4>
                    </Link>
                    <p className="text-base text-muted-foreground">Color: {item.color} | Qty {item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shipping Address & Summary details */}
        <div className="space-y-4">
          {/* Order Totals Card */}
          <div className="border border-border rounded-xl bg-card p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-foreground">Totals Breakdown</h3>
            <div className="space-y-2 text-base text-muted-foreground">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(mockOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span>-{formatPrice(mockOrder.discount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Sales Tax</span>
                <span>{formatPrice(mockOrder.tax)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-sm font-bold text-foreground">
                <span>Total Charge</span>
                <span>{formatPrice(mockOrder.total)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="border border-border rounded-xl bg-card p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-foreground">Shipping Details</h3>
            <div className="text-base text-muted-foreground leading-relaxed">
              <p className="font-semibold text-foreground">{mockOrder.shippingAddress.name}</p>
              <p>{mockOrder.shippingAddress.addressLine1}</p>
              <p>{mockOrder.shippingAddress.addressLine2}</p>
              <p>{mockOrder.shippingAddress.city}, {mockOrder.shippingAddress.state} {mockOrder.shippingAddress.postalCode}</p>
              <p>{mockOrder.shippingAddress.country}</p>
              <p className="mt-2 text-sm text-foreground font-mono uppercase">Payment: {mockOrder.paymentMethod}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
