"use client";

import * as React from "react";
import Link from "next/link";
import { formatPrice } from "../../../../../lib/utils";
import { Breadcrumb } from "../../../../../components/common/breadcrumb";
import { Button } from "../../../../../components/ui/button";
import { ArrowLeft, Package, Clock, Truck, ShieldCheck, AlertCircle } from "lucide-react";
import { use } from "react";
import { useOrderStore } from "../../../../../store/order";
import { useToastStore } from "../../../../../store/toast";

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { orders, requestRefund, cancelOrder } = useOrderStore();
  const { addToast } = useToastStore();

  if (!mounted) return null;
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h1 className="text-xl font-bold tracking-tight">Order Not Found</h1>
        <p className="text-base text-muted-foreground">We couldn't find an order with this ID.</p>
        <Link href="/account/orders">
          <Button>Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const handleRefundRequest = () => {
    const result = requestRefund(id);
    if (result.success) {
      addToast(result.message, "success");
    } else {
      addToast(result.message, "error");
    }
  };

  const handleCancelOrder = () => {
    const result = cancelOrder(id);
    if (result.success) {
      addToast(result.message, "success");
    } else {
      addToast(result.message, "error");
    }
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
          <p className="text-base text-muted-foreground">Placed on {order.date}</p>
        </div>
        <div className="ml-auto flex gap-3">
          {(order.status === "pending" || order.status === "processing") && (
            <Button variant="outline" className="text-red-600 border-red-600/30 hover:bg-red-600/10" onClick={handleCancelOrder}>
              <AlertCircle className="h-4 w-4 mr-2" />
              Cancel Order
            </Button>
          )}
          {order.status === "delivered" && (
            <Button variant="outline" className="text-amber-600 border-amber-600/30 hover:bg-amber-600/10" onClick={handleRefundRequest}>
              <AlertCircle className="h-4 w-4 mr-2" />
              Request Refund
            </Button>
          )}
        </div>
      </div>

      {/* Progress tracker bar */}
      <div className="border border-border rounded-xl bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between text-base font-semibold pb-4 border-b">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-blue-500" />
            Status: <span className={`font-bold uppercase ${order.status === "refund_requested" ? "text-amber-500" : order.status === "refunded" || order.status === "cancelled" ? "text-red-500" : "text-blue-500"}`}>{order.status.replace("_", " ")}</span>
          </span>
          <span className="font-mono text-muted-foreground">Tracking #: {order.trackingNumber || "Pending"}</span>
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
              {order.items.map((item) => (
                <div key={item.product.id + item.selectedColor + item.selectedSize} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-muted">
                    <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product.slug}`} className="hover:underline">
                      <h4 className="text-base font-semibold text-foreground truncate">{item.product.name}</h4>
                    </Link>
                    <p className="text-base text-muted-foreground">
                      {item.selectedColor ? `Color: ${item.selectedColor} | ` : ""}Qty {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-bold">{formatPrice((item.product.discountPrice || item.product.price) * item.quantity)}</span>
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
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Sales Tax</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-sm font-bold text-foreground">
                <span>Total Charge</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="border border-border rounded-xl bg-card p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-foreground">Shipping Details</h3>
            <div className="text-base text-muted-foreground leading-relaxed">
              <p className="font-semibold text-foreground">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.addressLine1}</p>
              <p>{order.shippingAddress.addressLine2}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.country}</p>
              <p className="mt-2 text-sm text-foreground font-mono uppercase">Payment: {order.paymentMethod}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
