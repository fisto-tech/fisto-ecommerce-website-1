import { Navbar } from "../../components/layout/navbar";
import { Footer } from "../../components/layout/footer";
import { CompareBar } from "../../components/product/compare-bar";
import { QuickViewModal } from "../../components/product/quick-view-modal";
import { BackToTop } from "../../components/common/back-to-top";
import { Suspense } from "react";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<div className="h-16 border-b bg-background" />}>
        <Navbar />
      </Suspense>
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
      <CompareBar />
      <QuickViewModal />
      <BackToTop />
    </div>
  );
}
