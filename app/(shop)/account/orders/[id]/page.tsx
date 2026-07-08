"use client";

import * as React from "react";
import Link from "next/link";
import { formatPrice } from "../../../../../lib/utils";
import { Breadcrumb } from "../../../../../components/common/breadcrumb";
import { Button } from "../../../../../components/ui/button";
import { ArrowLeft, Package, Clock, Truck, ShieldCheck, AlertCircle, Download } from "lucide-react";
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

  const handleDownloadInvoice = () => {
    if (!order) return;

    const invoiceWindow = window.open("", "_blank");
    if (!invoiceWindow) {
      addToast("Please allow popups to download the invoice.", "error");
      return;
    }

    const itemsHtml = order.items
      .map(
        (item) => `
      <tr class="border-b border-slate-100 text-slate-700">
        <td class="py-3 font-semibold">${item.product.name}${
          item.selectedColor ? ` (${item.selectedColor})` : ""
        }</td>
        <td class="py-3 text-center">${item.quantity}</td>
        <td class="py-3 text-right">${formatPrice(item.product.discountPrice || item.product.price)}</td>
        <td class="py-3 text-right font-bold">${formatPrice(
          (item.product.discountPrice || item.product.price) * item.quantity
        )}</td>
      </tr>
    `
      )
      .join("");

    invoiceWindow.document.write(`
      <html>
      <head>
        <title>Invoice - ${order.id}</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #f8fafc;
          }
          @media print {
            body {
              background-color: #ffffff;
              padding: 0;
            }
            .no-print {
              display: none;
            }
            .print-border {
              border: none !important;
              box-shadow: none !important;
            }
          }
        </style>
      </head>
      <body class="p-4 sm:p-10">
        <div class="max-w-3xl mx-auto border border-slate-200 p-8 sm:p-12 rounded-2xl bg-white shadow-md print-border relative">
          <!-- Print Button for convenience -->
          <div class="no-print absolute top-6 right-6">
            <button onclick="window.print()" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-colors cursor-pointer">
              Print Invoice
            </button>
          </div>

          <!-- Header -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-8 mb-8 gap-4">
            <div>
              <h1 class="text-3xl font-extrabold tracking-tighter text-slate-900">FISTO<span class="text-indigo-600 font-light">.</span></h1>
              <p class="text-sm text-slate-500 mt-1">Premium E-Commerce Experience</p>
            </div>
            <div class="text-left sm:text-right">
              <h2 class="text-xl font-bold text-slate-900 uppercase tracking-wider">Invoice</h2>
              <p class="text-sm text-slate-500 mt-1 font-mono">ID: ${order.id}</p>
              <p class="text-sm text-slate-500">Date: ${order.date}</p>
            </div>
          </div>

          <!-- Details section -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Billed To</h3>
              <div class="text-sm text-slate-700 space-y-1">
                <p class="font-bold text-slate-950">${order.shippingAddress.name}</p>
                <p>${order.shippingAddress.addressLine1}</p>
                ${order.shippingAddress.addressLine2 ? `<p>${order.shippingAddress.addressLine2}</p>` : ""}
                <p>${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}</p>
                <p>${order.shippingAddress.country}</p>
              </div>
            </div>
            <div class="text-left sm:text-right">
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Payment Details</h3>
              <div class="text-sm text-slate-700 space-y-1">
                <p><span class="text-slate-400">Method:</span> ${order.paymentMethod}</p>
                <p><span class="text-slate-400">Status:</span> <span class="font-semibold text-emerald-600 uppercase text-xs px-2 py-0.5 rounded-full bg-emerald-50">${order.status}</span></p>
                <p><span class="text-slate-400">Tracking ID:</span> <span class="font-mono text-xs">${order.trackingNumber || "Pending"}</span></p>
              </div>
            </div>
          </div>

          <!-- Items Table -->
          <div class="overflow-x-auto mb-8">
            <table class="w-full text-sm text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-xs">
                  <th class="pb-3">Product Description</th>
                  <th class="pb-3 text-center w-16">Qty</th>
                  <th class="pb-3 text-right w-28">Unit Price</th>
                  <th class="pb-3 text-right w-28">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${itemsHtml}
              </tbody>
            </table>
          </div>

          <!-- Total summary -->
          <div class="flex justify-end">
            <div class="w-full sm:w-72 space-y-2.5 text-sm text-slate-500">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span class="font-medium text-slate-900">${formatPrice(order.subtotal)}</span>
              </div>
              <div class="flex justify-between text-emerald-600 font-medium">
                <span>Discount</span>
                <span>-${formatPrice(order.discount)}</span>
              </div>
              <div class="flex justify-between">
                <span>Sales Tax (10%)</span>
                <span class="font-medium text-slate-900">${formatPrice(order.tax)}</span>
              </div>
              <div class="flex justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
                <span>Total Due</span>
                <span>${formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="border-t border-slate-100 pt-8 mt-12 text-center text-xs text-slate-400 leading-relaxed">
            <p class="font-bold text-slate-500">Thank you for shopping at FISTO!</p>
            <p class="mt-1">For refund requests or support, visit fisto-ecommerce-website.app/support or email support@fisto.com</p>
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
      </html>
    `);
    invoiceWindow.document.close();
  };

  const getStepStatus = (step: number) => {
    const status = order.status;
    
    if (status === "cancelled" || status === "refunded") {
      return { active: false, completed: false, isError: true };
    }

    if (step === 1) {
      const isCompleted = ["processing", "shipped", "delivered"].includes(status);
      return { active: true, completed: isCompleted };
    }
    if (step === 2) {
      const isActive = ["processing", "shipped", "delivered"].includes(status);
      const isCompleted = ["shipped", "delivered"].includes(status);
      return { active: isActive, completed: isCompleted };
    }
    if (step === 3) {
      const isActive = ["shipped", "delivered"].includes(status);
      const isCompleted = ["delivered"].includes(status);
      return { active: isActive, completed: isCompleted };
    }
    if (step === 4) {
      const isActive = status === "delivered";
      const isCompleted = status === "delivered";
      return { active: isActive, completed: isCompleted };
    }
    return { active: false, completed: false };
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
          <Button variant="outline" className="cursor-pointer" onClick={handleDownloadInvoice}>
            <Download className="h-4 w-4 mr-2" />
            Download Invoice
          </Button>
          {(order.status === "pending" || order.status === "processing") && (
            <Button variant="outline" className="text-red-600 border-red-600/30 hover:bg-red-600/10 cursor-pointer" onClick={handleCancelOrder}>
              <AlertCircle className="h-4 w-4 mr-2" />
              Cancel Order
            </Button>
          )}
          {order.status === "delivered" && (
            <Button variant="outline" className="text-amber-600 border-amber-600/30 hover:bg-amber-600/10 cursor-pointer" onClick={handleRefundRequest}>
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
        {order.status === "cancelled" || order.status === "refunded" ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-700 text-sm font-semibold rounded-lg p-4 text-center">
            This order has been {order.status}. Stock has been restored.
          </div>
        ) : (
          <div className="flex items-center justify-between pt-6 max-w-xl mx-auto text-xs sm:text-sm text-center font-medium">
            <div className="flex flex-col items-center gap-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold ${
                getStepStatus(1).completed ? "bg-primary text-primary-foreground" : "bg-blue-600 text-white animate-pulse"
              }`}>
                {getStepStatus(1).completed ? "✓" : "1"}
              </div>
              <span className={getStepStatus(1).completed ? "text-muted-foreground font-semibold" : "text-foreground font-bold"}>Confirmed</span>
            </div>
            
            <div className={`flex-1 h-0.5 mx-2 ${getStepStatus(2).active ? "bg-primary" : "bg-secondary"}`} />
            
            <div className="flex flex-col items-center gap-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold ${
                getStepStatus(2).completed 
                  ? "bg-primary text-primary-foreground" 
                  : order.status === "processing"
                  ? "bg-blue-600 text-white animate-pulse"
                  : "bg-secondary text-muted-foreground"
              }`}>
                {getStepStatus(2).completed ? "✓" : "2"}
              </div>
              <span className={order.status === "processing" ? "text-blue-600 font-bold" : "text-muted-foreground"}>Processing</span>
            </div>
            
            <div className={`flex-1 h-0.5 mx-2 ${getStepStatus(3).active ? "bg-primary" : "bg-secondary"}`} />
            
            <div className="flex flex-col items-center gap-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold ${
                getStepStatus(3).completed 
                  ? "bg-primary text-primary-foreground" 
                  : order.status === "shipped"
                  ? "bg-blue-600 text-white animate-pulse"
                  : "bg-secondary text-muted-foreground"
              }`}>
                {getStepStatus(3).completed ? "✓" : "3"}
              </div>
              <span className={order.status === "shipped" ? "text-blue-600 font-bold" : "text-muted-foreground"}>Shipped</span>
            </div>
            
            <div className={`flex-1 h-0.5 mx-2 ${getStepStatus(4).active ? "bg-primary" : "bg-secondary"}`} />
            
            <div className="flex flex-col items-center gap-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold ${
                order.status === "delivered" 
                  ? "bg-emerald-600 text-white" 
                  : "bg-secondary text-muted-foreground"
              }`}>
                {order.status === "delivered" ? "✓" : "4"}
              </div>
              <span className={order.status === "delivered" ? "text-emerald-600 font-bold" : "text-muted-foreground"}>Delivered</span>
            </div>
          </div>
        )}
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
