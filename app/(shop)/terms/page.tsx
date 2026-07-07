import { Breadcrumb } from "../../../components/common/breadcrumb";

export const metadata = {
  title: "Terms of Service | FISTO",
  description: "Review FISTO's purchasing agreements, shipping guarantees, and return policies.",
};

export default function TermsPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Breadcrumb items={[{ label: "Terms of Service" }]} />

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">Terms of Service</h1>
      <p className="text-base text-muted-foreground">Last updated: July 7, 2026</p>

      <div className="space-y-4 text-base text-muted-foreground leading-relaxed border-t pt-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">1. Agreement to Terms</h2>
        <p>
          By accessing and purchasing from FISTO, you agree to comply with our shipping, billing, and returns policies. Custom components and accessories are subject to stock availability.
        </p>

        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">2. Purchases & Pricing</h2>
        <p>
          All product listings are described as accurately as possible. We reserve the right to modify prices or discontinue items without notice. Dispatches are finalized upon validation of credit card funds.
        </p>

        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">3. Shipments & Returns</h2>
        <p>
          Returns are accepted within 30 days of shipment receipt for unused items in original boxes. Buyers are responsible for selecting the correct variant selections during checkout.
        </p>
      </div>
    </div>
  );
}
