"use client";

import * as React from "react";
import Link from "next/link";
import { useOrderStore } from "../../../store/order";
import { Button } from "../../../components/ui/button";
import { formatPrice } from "../../../lib/utils";
import { ArrowLeft, Edit, Calendar, Package, ShoppingBag } from "lucide-react";

export default function AdminOrdersPage() {
  const [mounted, setMounted] = React.useState(false);
  const { orders } = useOrderStore();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Manage Orders</h1>
            <p className="text-base text-muted-foreground">Monitor and update customer orders, shipment status, and tracking info.</p>
          </div>
        </div>
      </div>

      <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 border-b border-border/50 text-muted-foreground font-bold tracking-wider uppercase">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Tracking Number</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground italic">
                    No orders placed yet.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-4 font-mono font-bold text-primary">{order.id}</td>
                    <td className="p-4 text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {order.date}
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-foreground">{order.shippingAddress.name}</p>
                        <p className="text-xs text-muted-foreground">{order.shippingAddress.city}, {order.shippingAddress.country}</p>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-foreground">{formatPrice(order.total)}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        order.status === "delivered" 
                          ? "bg-emerald-500/10 text-emerald-600" 
                          : order.status === "cancelled" || order.status === "refunded"
                          ? "bg-red-500/10 text-red-600"
                          : order.status === "refund_requested"
                          ? "bg-amber-500/10 text-amber-600"
                          : "bg-blue-500/10 text-blue-600"
                      }`}>
                        {order.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-muted-foreground">{order.trackingNumber || "Pending"}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end">
                        <Link href={`/admin/orders/${order.id}`}>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Edit className="h-3.5 w-3.5" />
                            Update Shipment
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
