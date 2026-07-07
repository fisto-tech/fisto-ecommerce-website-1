import { Breadcrumb } from "../../../components/common/breadcrumb";

export const metadata = {
  title: "About Us | FISTO",
  description: "Learn about FISTO's design philosophy, craft standards, and sustainable commitment.",
};

export default function AboutPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <Breadcrumb items={[{ label: "About" }]} />

      <div className="space-y-4 text-center pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Crafting Detail.
        </h1>
        <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
          FISTO is a modern design studio creating hardware peripherals, audio wear, and desk accessories for developers, creators, and professionals who prioritize precision.
        </p>
      </div>

      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-muted border">
        <img
          src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1200&auto=format&fit=crop"
          alt="Studio keyboard workspace"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="space-y-6 text-base text-muted-foreground leading-relaxed pt-4">
        <h2 className="text-base font-bold text-foreground uppercase tracking-wider">Our Philosophy</h2>
        <p>
          We believe the tools you interface with daily dictate the standard of your output. Average tools breed average thinking. We configure every angle, choose every alloy, and audit every key switch click to ensure your physical environment inspires focus.
        </p>
        <p>
          Drawing visual inspiration from Apple&apos;s functional minimalism, Nike&apos;s performance-driven ergonomics, and Stripe&apos;s digital clarity, FISTO builds products that look elegant and feel robust.
        </p>

        <h2 className="text-base font-bold text-foreground uppercase tracking-wider pt-4">Sustainable Commitment</h2>
        <p>
          Every item in our collection utilizes recyclable materials where possible: plant-based cellulose acetates for sunglasses, biodegradable cardboard packages, and heavy organic cotton canvas for commuter totes. We offset 100% of carbon emissions generated during express transit, partnering directly with environmental restoration trusts.
        </p>
      </div>
    </div>
  );
}
