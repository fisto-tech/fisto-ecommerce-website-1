"use client";

import * as React from "react";
import { useToastStore } from "../../store/toast";
import { ApiService } from "../../services/api";
import { Button } from "../ui/button";

export function Newsletter() {
  const addToast = useToastStore((state) => state.addToast);
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    try {
      const res = await ApiService.submitNewsletter(email);
      addToast(res.message, "success");
      setEmail("");
    } catch {
      addToast("Failed to subscribe.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-border bg-card p-8 md:p-12 shadow-sm text-center">
      {/* Decorative background gradient */}
      <div className="absolute inset-0 -z-10 bg-radial-gradient from-primary/5 via-transparent to-transparent opacity-60 pointer-events-none" />

      <div className="max-w-xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Get 10% off your first order
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Subscribe to the FISTO journal. Receive product drops, special discounts, and community articles directly in your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-4 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-11 rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="submit" size="lg" className="h-11" isLoading={isLoading}>
            Subscribe
          </Button>
        </form>
        <p className="text-base text-muted-foreground pt-1">
          By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
