"use client";

import * as React from "react";
import Link from "next/link";
import { formatPrice } from "../../../../lib/utils";
import { Breadcrumb } from "../../../../components/common/breadcrumb";
import { Button } from "../../../../components/ui/button";
import { ArrowLeft, Package, Eye } from "lucide-react";

export default function OrdersPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const mockOrders = [
    { id: "ORD-984F7E21", date: "2026-06-24", total: 249, status: "delivered", itemsCount: 1 },
    { id: "ORD-A109F2B8", date: "2026-07-06", total: 79, status: "processing", itemsCount: 2 },
    { id: "ORD-C398E192", date: "2026-05-10", total: 119, status: "delivered", itemsCount: 1 },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "My Account", href: "/account" },
          { label: "Orders" },
        ]}
      />

      <div className="flex items-center gap-4">
        <Link href="/account">
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-3xl">My Orders</h1>
          <p className="text-base text-muted-foreground">List of all orders placed on your account.</p>
        </div>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b bg-muted/20 text-muted-foreground uppercase font-bold tracking-wider">
                <th className="p-4">Order ID</th>
                <th className="p-4">Date Placed</th>
                <th className="p-4">Items Count</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-muted/10 transition-colors font-medium">
                  <td className="p-4 font-mono font-bold text-foreground">{ord.id}</td>
                  <td className="p-4">{ord.date}</td>
                  <td className="p-4">{ord.itemsCount} {ord.itemsCount === 1 ? "item" : "items"}</td>
                  <td className="p-4 font-bold">{formatPrice(ord.total)}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-2 py-0.5 text-sm font-bold uppercase tracking-wider ${
                      ord.status === "delivered" ? "bg-emerald-500/10 text-emerald-600" : "bg-blue-500/10 text-blue-600"
                    }`}>
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <Link href={`/account/orders/${ord.id}`}>
                      <Button variant="ghost" size="sm" className="h-8 py-0 px-2 cursor-pointer">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
