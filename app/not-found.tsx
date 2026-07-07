"use client";

import Link from "next/link";
import { Button } from "../components/ui/button";
import { MoveLeft, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24 px-4 text-center space-y-6 min-h-[70vh] animate-fadeIn">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-muted-foreground mb-2">
        <HelpCircle className="h-10 w-10" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Page Not Found</h1>
      <p className="text-base text-muted-foreground max-w-sm mx-auto leading-relaxed">
        We couldn&apos;t find the page you are looking for. It might have been relocated, or the URL might have been typed incorrectly.
      </p>
      <div className="flex gap-3 pt-2">
        <Link href="/">
          <Button size="sm">
            <MoveLeft className="h-4 w-4 mr-1.5" />
            Back to Home
          </Button>
        </Link>
        <Link href="/products">
          <Button variant="outline" size="sm">
            Browse Catalog
          </Button>
        </Link>
      </div>
    </div>
  );
}
