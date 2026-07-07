"use client";

import * as React from "react";
import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProductStore } from "../../../../store/product";
import { useToastStore } from "../../../../store/toast";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { ArrowLeft, Save } from "lucide-react";
import { Product } from "../../../../types";

export default function AdminProductEditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === "new";
  const router = useRouter();
  
  const [mounted, setMounted] = React.useState(false);
  const { products, addProduct, updateProduct } = useProductStore();
  const { addToast } = useToastStore();
  
  const existingProduct = isNew ? null : products.find((p) => p.id === resolvedParams.id);

  const [formData, setFormData] = React.useState({
    name: "",
    price: "",
    discountPrice: "",
    description: "",
    stock: "",
    categoryId: "cat-1",
    categorySlug: "headphones",
    brandId: "brand-1",
    brandName: "Aura",
    image: "",
  });

  React.useEffect(() => {
    setMounted(true);
    if (existingProduct) {
      setFormData({
        name: existingProduct.name,
        price: existingProduct.price.toString(),
        discountPrice: existingProduct.discountPrice ? existingProduct.discountPrice.toString() : "",
        description: existingProduct.description,
        stock: existingProduct.stock.toString(),
        categoryId: existingProduct.categoryId,
        categorySlug: existingProduct.categorySlug,
        brandId: existingProduct.brandId,
        brandName: existingProduct.brandName,
        image: existingProduct.images[0] || "",
      });
    }
  }, [existingProduct]);

  if (!mounted) return null;

  if (!isNew && !existingProduct) {
    return (
      <div className="min-h-screen p-10 text-center space-y-4">
        <h1 className="text-xl font-bold">Product not found</h1>
        <Link href="/admin/products"><Button>Go Back</Button></Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const newProductData: Partial<Product> = {
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, ''),
      price: parseFloat(formData.price) || 0,
      discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
      description: formData.description,
      stock: parseInt(formData.stock) || 0,
      categoryId: formData.categoryId,
      categorySlug: formData.categorySlug,
      brandId: formData.brandId,
      brandName: formData.brandName,
      images: [formData.image],
    };

    if (isNew) {
      const newId = `prod-${Math.floor(Math.random() * 10000)}`;
      addProduct({
        ...newProductData,
        id: newId,
        longDescription: formData.description,
        features: [],
        specifications: [],
        colors: [],
        sizes: [],
        rating: 0,
        reviewsCount: 0,
        isFeatured: false,
        isBestSeller: false,
        isNewArrival: true,
      } as Product);
      addToast("Product added successfully!", "success");
    } else {
      updateProduct(resolvedParams.id, newProductData);
      addToast("Product updated successfully!", "success");
    }

    router.push("/admin/products");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 space-y-8">
      {/* Top Header */}
      <div className="flex items-center gap-3 border-b pb-4">
        <Link href="/admin/products">
          <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight">{isNew ? "Add New Product" : "Edit Product"}</h1>
        </div>
      </div>

      <div className="max-w-2xl border border-border rounded-xl bg-card shadow-sm p-6">
        <form onSubmit={handleSave} className="space-y-6">
          <Input 
            label="Product Name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Price (₹)" 
              name="price" 
              type="number" 
              value={formData.price} 
              onChange={handleChange} 
              required 
            />
            <Input 
              label="Discount Price (₹) - Optional" 
              name="discountPrice" 
              type="number" 
              value={formData.discountPrice} 
              onChange={handleChange} 
            />
          </div>

          <Input 
            label="Stock Quantity" 
            name="stock" 
            type="number" 
            value={formData.stock} 
            onChange={handleChange} 
            required 
          />

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows={4}
              className="w-full flex min-h-[80px] rounded-md border border-border/60 bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required 
            />
          </div>

          <Input 
            label="Image URL" 
            name="image" 
            value={formData.image} 
            onChange={handleChange} 
            placeholder="https://..." 
            required 
          />

          <div className="pt-4 border-t flex gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-1.5" />
              {isNew ? "Create Product" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
