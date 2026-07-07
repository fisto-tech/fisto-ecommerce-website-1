"use client";

import * as React from "react";
import Link from "next/link";
import { useToastStore } from "../../store/toast";
import { ApiService } from "../../services/api";
import { Send } from "lucide-react";
import { Button } from "../ui/button";

export function Footer() {
  const addToast = useToastStore((state) => state.addToast);
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    try {
      const res = await ApiService.submitNewsletter(email);
      addToast(res.message, "success");
      setEmail("");
    } catch {
      addToast("Failed to subscribe. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="text-xl font-extrabold tracking-tighter text-foreground flex items-center gap-0.5">
              FISTO<span className="text-brand font-light">.</span>
            </Link>
            <p className="text-base text-muted-foreground leading-relaxed max-w-xs">
              Meticulously crafted items for developers, designers, and creators who value detail, aesthetics, and ergonomics.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Facebook">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Youtube">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C22 8.68 22 12 22 12s0 3.32-.42 4.814a2.477 2.477 0 01-1.768 1.768C18.32 19 12 19 12 19s-6.32 0-7.812-.418a2.477 2.477 0 01-1.768-1.768C2 15.32 2 12 2 12s0-3.32.418-4.814a2.477 2.477 0 011.768-1.768C5.68 5 12 5 12 5s6.32 0 7.812.418zM9.75 15.022L15.5 12 9.75 8.978v6.044z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Shop Collections</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/categories/audio-sound" className="text-muted-foreground hover:text-foreground transition-colors">
                  Audio & Sound
                </Link>
              </li>
              <li>
                <Link href="/categories/wearables" className="text-muted-foreground hover:text-foreground transition-colors">
                  Wearables
                </Link>
              </li>
              <li>
                <Link href="/categories/computer-gear" className="text-muted-foreground hover:text-foreground transition-colors">
                  Computer Gear
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support links */}
          <div>
            <h4 className="text-base font-bold uppercase tracking-wider text-muted-foreground mb-4">Company & Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help & FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Policies links */}
          <div>
            <h4 className="text-base font-bold uppercase tracking-wider text-muted-foreground mb-4">Policies & Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-base text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FISTO Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Designed with &hearts; for Creators</span>
            <div className="flex gap-2 text-muted-foreground opacity-60">
              {/* Payment badges placeholder */}
              <span>Visa</span>
              <span>Mastercard</span>
              <span>Amex</span>
              <span>Apple Pay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
