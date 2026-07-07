import { Breadcrumb } from "../../../components/common/breadcrumb";

export const metadata = {
  title: "Refund Policy | FISTO",
  description: "Learn about FISTO's refund, returns, and exchanges guidelines.",
};

export default function RefundPolicyPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Breadcrumb items={[{ label: "Refund & Return Policy" }]} />

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">Refund & Return Policy</h1>
      <p className="text-xs text-muted-foreground">Last updated: July 7, 2026</p>

      <div className="space-y-4 text-xs text-muted-foreground leading-relaxed border-t pt-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">1. Return Window</h2>
        <p>
          We offer a comprehensive 30-day return window for all items purchased directly from the FISTO store. The items must be returned unused, in original packaging, and with all accessories.
        </p>

        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">2. Refund Processing</h2>
        <p>
          Once your return is received and inspected at our studio, we will process your refund to the original payment method within 5-7 business days.
        </p>

        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">3. Damaged or Faulty Items</h2>
        <p>
          If your product arrives damaged or faulty, please contact support@fisto.design immediately. Faulty items are covered under our 2-Year warranty program and will be replaced free of charge.
        </p>
      </div>
    </div>
  );
}
