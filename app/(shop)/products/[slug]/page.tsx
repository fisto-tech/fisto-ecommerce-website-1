import * as React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApiService } from "../../../../services/api";
import { ProductDetailClient } from "../../../../components/product/product-detail-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await ApiService.getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    return {
      title: "Product Not Found | FISTO",
    };
  }

  const priceVal = product.discountPrice || product.price;

  return {
    title: `${product.name} | FISTO`,
    description: product.description,
    openGraph: {
      title: `${product.name} | FISTO`,
      description: product.description,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | FISTO`,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = await ApiService.getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await ApiService.getRelatedProducts(product.id, product.categoryId);
  const reviews = await ApiService.getReviews(product.id);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
      initialReviews={reviews}
    />
  );
}
