import { Breadcrumb } from "../../../components/common/breadcrumb";

export const metadata = {
  title: "Shipping Policy | FISTO",
  description: "Learn about FISTO's shipping rates, timelines, and transit options.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Breadcrumb items={[{ label: "Shipping Policy" }]} />

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">Shipping Policy</h1>
      <p className="text-xs text-muted-foreground">Last updated: July 7, 2026</p>

      <div className="space-y-4 text-xs text-muted-foreground leading-relaxed border-t pt-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">1. Shipping Rates & Timelines</h2>
        <p>
          We offer complimentary express shipping on all orders over $100. Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days.
        </p>

        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">2. International Shipments</h2>
        <p>
          We deliver internationally to over 50 countries. Shipping charges and import duties are calculated dynamically at checkout based on your delivery address.
        </p>

        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">3. Order Tracking</h2>
        <p>
          Once your order has been dispatched from our warehouse, you will receive an email containing tracking coordinates. You can also view shipping status from your FISTO Account dashboard.
        </p>
      </div>
    </div>
  );
}
