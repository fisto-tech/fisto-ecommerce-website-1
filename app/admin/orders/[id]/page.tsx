"use client";

import * as React from "react";
import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOrderStore } from "../../../../store/order";
import { useToastStore } from "../../../../store/toast";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { ArrowLeft, Save, ShoppingBag, Truck } from "lucide-react";
import { Order } from "../../../../types";

export default function AdminOrderEditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  
  const [mounted, setMounted] = React.useState(false);
  const { orders, updateOrderShipment } = useOrderStore();
  const { addToast } = useToastStore();
  
  const order = orders.find((o) => o.id === resolvedParams.id);

  const [formData, setFormData] = React.useState({
    status: "pending" as Order["status"],
    trackingNumber: "",
  });

  React.useEffect(() => {
    setMounted(true);
    if (order) {
      setFormData({
        status: order.status,
        trackingNumber: order.trackingNumber || "",
      });
    }
  }, [order]);

  if (!mounted) return null;

  if (!order) {
    return (
      <div className="min-h-screen p-10 text-center space-y-4">
        <h1 className="text-xl font-bold">Order not found</h1>
        <Link href="/admin/orders"><Button>Go Back</Button></Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrderShipment(order.id, formData.status, formData.trackingNumber);
    addToast(`Order ${order.id} status and shipment details updated!`, "success");
    router.push("/admin/orders");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 space-y-8">
      {/* Top Header */}
      <div className="flex items-center gap-3 border-b pb-4">
        <Link href="/admin/orders">
          <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Update Shipment details - {order.id}</h1>
          <p className="text-base text-muted-foreground">Modify delivery progress or apply tracking IDs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Update Form */}
        <div className="lg:col-span-2 border border-border rounded-xl bg-card shadow-sm p-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Order Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full flex h-10 rounded-md border border-border/60 bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled (Restore Stock)</option>
                <option value="refund_requested">Refund Requested</option>
                <option value="refunded">Refunded (Restore Stock)</option>
              </select>
            </div>

            <Input 
              label="Shipment Tracking Number" 
              name="trackingNumber" 
              value={formData.trackingNumber} 
              onChange={handleChange} 
              placeholder="e.g. TRK1039847198"
            />

            <div className="pt-4 border-t flex gap-4">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/orders")}>
                Cancel
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-1.5" />
                Save Updates
              </Button>
            </div>
          </form>
        </div>

        {/* Order Details Preview */}
        <div className="border border-border rounded-xl bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b pb-3 text-foreground font-semibold">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h3>Order Details</h3>
          </div>
          <div className="space-y-3 text-base">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer:</span>
              <span className="font-medium text-foreground">{order.shippingAddress.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-mono text-foreground text-sm">{order.userId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Date:</span>
              <span className="font-medium text-foreground">{order.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method:</span>
              <span className="font-medium text-foreground text-right max-w-[200px] text-xs">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-bold text-foreground">
              <span>Total Price:</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Delivery Address</h4>
            <div className="text-sm text-muted-foreground font-medium bg-muted/30 p-3 rounded-lg border">
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
