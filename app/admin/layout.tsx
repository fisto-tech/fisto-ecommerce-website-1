"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdminAuthStore } from "../../store/adminAuth";
import { Navbar } from "../../components/layout/navbar";
import { Footer } from "../../components/layout/footer";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAdminLoggedIn } = useAdminAuthStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted) {
      const isLoginPage = pathname === "/admin/login";
      if (!isAdminLoggedIn && !isLoginPage) {
        router.push("/admin/login");
      }
    }
  }, [mounted, isAdminLoggedIn, pathname, router]);

  if (!mounted) return null;

  // Don't render children if we are supposed to be logged in but aren't (prevents flash of content)
  if (!isAdminLoggedIn && pathname !== "/admin/login") {
    return null; 
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
