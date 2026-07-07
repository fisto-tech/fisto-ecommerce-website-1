import { Breadcrumb } from "../../../components/common/breadcrumb";

export const metadata = {
  title: "Privacy Policy | FISTO",
  description: "Learn how FISTO protects your personal details and manages transactions securely.",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Breadcrumb items={[{ label: "Privacy Policy" }]} />

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">Privacy Policy</h1>
      <p className="text-base text-muted-foreground">Last updated: July 7, 2026</p>

      <div className="space-y-4 text-base text-muted-foreground leading-relaxed border-t pt-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">1. Information We Collect</h2>
        <p>
          We collect billing details, shipping addresses, email addresses, and phone numbers during order creation or journal newsletter signups to fulfill orders, verify transactions, and notify you of delivery updates.
        </p>

        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">2. Payment Security</h2>
        <p>
          FISTO uses industry-standard encryption protocols. Payment processing is managed securely; we do not store raw credit card details or CVVs directly on our databases.
        </p>

        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">3. Third Party Integrations</h2>
        <p>
          Shipping logistics, order dispatching, and transaction audits require sharing relevant identifiers with authorized shipping companies (e.g. FedEx, UPS) and payment gateways (e.g. Stripe).
        </p>
      </div>
    </div>
  );
}
