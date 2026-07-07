"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCartStore } from "../../../store/cart";
import { useAuthStore } from "../../../store/auth";
import { useToastStore } from "../../../store/toast";
import { ApiService } from "../../../services/api";
import { formatPrice } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Select } from "../../../components/ui/select";
import { Breadcrumb } from "../../../components/common/breadcrumb";
import { ShieldCheck, Truck, CreditCard, ChevronRight, CheckCircle2 } from "lucide-react";

// Form validation schema with Zod
const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  addressLine1: z.string().min(5, "Address must be at least 5 characters"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  postalCode: z.string().min(4, "Postal code must be at least 4 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be exactly 16 digits"),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Expiry must be MM/YY"),
  cardCvc: z.string().regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [orderId, setOrderId] = React.useState("");
  
  const { items, getTotals, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const addToast = useToastStore((state) => state.addToast);

  // Sync initial user details if logged in
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: user?.email || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      addressLine1: user?.address?.addressLine1 || "",
      addressLine2: user?.address?.addressLine2 || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      postalCode: user?.address?.postalCode || "",
      country: user?.address?.country || "United States",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-6">
        <Breadcrumb items={[{ label: "Checkout" }]} />
        <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
        <div className="h-64 border rounded-xl animate-pulse" />
      </div>
    );
  }

  const totals = getTotals();

  const handleCheckoutSubmit = async (data: CheckoutFormValues) => {
    if (items.length === 0) {
      addToast("Your bag is empty", "error");
      return;
    }

    try {
      const order = await ApiService.createOrder({
        userId: user?.id || "guest",
        items,
        subtotal: totals.subtotal,
        discount: totals.discount,
        tax: totals.tax,
        total: totals.total,
        shippingAddress: {
          name: `${data.firstName} ${data.lastName}`,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
        },
        paymentMethod: "Credit Card (Ending in " + data.cardNumber.slice(-4) + ")",
      });

      setOrderId(order.id);
      setIsSuccess(true);
      clearCart();
      addToast("Order placed successfully!", "success");
    } catch {
      addToast("Checkout failed. Please try again.", "error");
    }
  };

  // If checkout is completed successfully
  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-6 animate-fadeIn">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 mb-2">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">Thank you for your order!</h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Your order has been received and is being processed. We will email you shipping updates once dispatch completes.
        </p>
        <div className="rounded-xl border border-border p-4 bg-muted/20 text-sm text-left space-y-1.5 font-mono">
          <div><span className="text-muted-foreground">Order ID:</span> <span className="font-bold">{orderId}</span></div>
          <div><span className="text-muted-foreground">Estimated Delivery:</span> 3 - 5 business days</div>
        </div>
        <div className="pt-4 flex flex-col gap-2">
          <Button onClick={() => router.push("/account")}>
            Track Order In My Account
          </Button>
          <Button variant="outline" onClick={() => router.push("/products")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  // If cart is empty during page load
  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h1 className="text-xl font-bold tracking-tight">Your shopping bag is empty</h1>
        <p className="text-base text-muted-foreground">Add items to your bag before checking out.</p>
        <Button onClick={() => router.push("/products")}>
          Go to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ label: "Checkout" }]} />
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Secure Checkout</h1>
        <p className="text-base text-muted-foreground">Complete your order securely. All fields are required unless marked optional.</p>
      </div>

      <form onSubmit={handleSubmit(handleCheckoutSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Checkout Details Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Details Card */}
          <div className="border border-border rounded-2xl bg-card p-7 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-2 border-b border-border">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white text-sm font-bold">1</span>
              <h3 className="text-base font-bold text-foreground tracking-tight">Contact Information</h3>
            </div>
            <Input
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>

          {/* Shipping Address Card */}
          <div className="border border-border rounded-2xl bg-card p-7 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-2 border-b border-border">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white text-sm font-bold">2</span>
              <h3 className="text-base font-bold text-foreground tracking-tight">Shipping Details</h3>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Input
                label="First Name"
                placeholder="Rajesh"
                error={errors.firstName?.message}
                {...register("firstName")}
              />
              <Input
                label="Last Name"
                placeholder="Kumar"
                error={errors.lastName?.message}
                {...register("lastName")}
              />
            </div>
            <Input
              label="Address Line 1"
              placeholder="Plot 42, MG Road"
              error={errors.addressLine1?.message}
              {...register("addressLine1")}
            />
            <Input
              label="Address Line 2 (Optional)"
              placeholder="Apartment / Floor / Landmark"
              error={errors.addressLine2?.message}
              {...register("addressLine2")}
            />
            <div className="grid grid-cols-2 gap-5">
              <Input
                label="City"
                placeholder="Mumbai"
                error={errors.city?.message}
                {...register("city")}
              />
              <Input
                label="State"
                placeholder="Maharashtra"
                error={errors.state?.message}
                {...register("state")}
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Input
                label="PIN Code"
                placeholder="400001"
                error={errors.postalCode?.message}
                {...register("postalCode")}
              />
              <Select
                label="Country"
                options={[
                  { value: "India", label: "🇮🇳 India" },
                  { value: "United States", label: "🇺🇸 United States" },
                  { value: "United Kingdom", label: "🇬🇧 United Kingdom" },
                  { value: "Australia", label: "🇦🇺 Australia" },
                  { value: "Canada", label: "🇨🇦 Canada" },
                  { value: "Singapore", label: "🇸🇬 Singapore" },
                  { value: "UAE", label: "🇦🇪 UAE" },
                ]}
                error={errors.country?.message}
                {...register("country")}
              />
            </div>
          </div>

          {/* Mock Payment Details Card */}
          <div className="border border-border rounded-2xl bg-card p-7 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-2 border-b border-border">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white text-sm font-bold">3</span>
              <h3 className="text-base font-bold text-foreground tracking-tight">Payment Details</h3>
              <CreditCard className="h-5 w-5 text-muted-foreground ml-auto" />
            </div>

            <Input
              label="Card Number"
              placeholder="4111 2222 3333 4444"
              maxLength={16}
              error={errors.cardNumber?.message}
              hint="16-digit number on the front of your card"
              {...register("cardNumber")}
            />

            <div className="grid grid-cols-2 gap-5">
              <Input
                label="Expiry Date"
                placeholder="MM/YY"
                maxLength={5}
                error={errors.cardExpiry?.message}
                {...register("cardExpiry")}
              />
              <Input
                label="CVC / CVV"
                placeholder="321"
                maxLength={4}
                error={errors.cardCvc?.message}
                hint="3 or 4 digits on card back"
                {...register("cardCvc")}
              />
            </div>
          </div>
        </div>

        {/* Right Side: Order Review Panel */}
        <div className="space-y-4">
          <div className="border border-border rounded-xl bg-card p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-foreground">Order Review</h3>

            {/* Order Items Summary */}
            <div className="max-h-[220px] overflow-y-auto divide-y divide-border/40 pr-1 space-y-3">
              {items.map((item) => {
                const itemPrice = item.product.discountPrice || item.product.price;
                return (
                  <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-3 pt-3 first:pt-0">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border bg-muted">
                      <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-foreground truncate">{item.product.name}</h4>
                      <p className="text-base text-muted-foreground">Qty {item.quantity} {item.selectedColor && `| ${item.selectedColor}`}</p>
                    </div>
                    <span className="text-sm font-bold text-foreground">{formatPrice(itemPrice * item.quantity)}</span>
                  </div>
                );
              })}
            </div>

            {/* Price Calculations */}
            <div className="border-t border-border pt-4 space-y-2 text-base text-muted-foreground">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-foreground">{formatPrice(totals.subtotal)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span>-{formatPrice(totals.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="font-semibold text-foreground">{formatPrice(totals.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-sm font-bold text-foreground">
                <span>Total Amount</span>
                <span>{formatPrice(totals.total)}</span>
              </div>
            </div>

            <Button type="submit" variant="brand" className="w-full h-12 font-bold text-base rounded-xl" isLoading={isSubmitting}>
              Place Order · {formatPrice(totals.total)}
            </Button>
          </div>

          <div className="rounded-xl border bg-muted/15 p-4 text-base text-muted-foreground space-y-2 leading-relaxed">
            <div className="flex items-center gap-1.5 text-foreground font-semibold">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" />
              <span>Secure Transactions</span>
            </div>
            <p>Your payment data is fully encrypted. FISTO uses advanced SSL protection. We never store raw credit card numbers on our servers.</p>
          </div>
        </div>
      </form>
    </div>
  );
}
