"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import { useProductStore } from "../../../../store/product";
import { ApiService } from "../../../../services/api";
import { ProductDetailClient } from "../../../../components/product/product-detail-client";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const { products } = useProductStore();
  const [mounted, setMounted] = React.useState(false);

  const [relatedProducts, setRelatedProducts] = React.useState<any[]>([]);
  const [reviews, setReviews] = React.useState<any[]>([]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const product = products.find((p) => p.slug === resolvedParams.slug);

  React.useEffect(() => {
    if (product) {
      ApiService.getRelatedProducts(product.id, product.categoryId).then(setRelatedProducts);
      ApiService.getReviews(product.id).then(setReviews);
    }
  }, [product]);

  if (!mounted) return <div className="min-h-screen bg-background" />;
  
  if (!product) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
      </div>
    );
  }

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
      initialReviews={reviews}
    />
  );
}
