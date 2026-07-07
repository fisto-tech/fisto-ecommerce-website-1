"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Product, Review } from "../../types";
import { useCartStore } from "../../store/cart";
import { useWishlistStore } from "../../store/wishlist";
import { useRecentlyViewedStore } from "../../store/recentlyViewed";
import { useToastStore } from "../../store/toast";
import { ApiService } from "../../services/api";
import { ProductGallery } from "./product-gallery";
import { ProductCarousel } from "./product-carousel";
import { RecentlyViewed } from "./recent-products";
import { Rating } from "./rating";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Breadcrumb } from "../common/breadcrumb";
import { formatPrice } from "../../lib/utils";
import { Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, Star } from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
  initialReviews: Review[];
}

const reviewSchema = z.object({
  userName: z.string().min(2, "Name must be at least 2 characters"),
  rating: z.number().min(1, "Please select a rating between 1 and 5").max(5),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export function ProductDetailClient({
  product,
  relatedProducts,
  initialReviews,
}: ProductDetailClientProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const addToast = useToastStore((state) => state.addToast);
  const addRecentlyViewed = useRecentlyViewedStore((state) => state.addProduct);

  // States
  const [selectedColor, setSelectedColor] = React.useState<string>("");
  const [selectedSize, setSelectedSize] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState(1);
  const [reviews, setReviews] = React.useState<Review[]>(initialReviews);
  const [activeTab, setActiveTab] = React.useState<"description" | "specifications">("description");

  // Colors and sizes derived from variants
  const colors = product.variants.filter((v) => v.type === "color").map((v) => v.value);
  const sizes = product.variants.filter((v) => v.type === "size").map((v) => v.value);

  // Form setup for review submission
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { userName: "", rating: 5, comment: "" },
  });

  const ratingValue = watch("rating");

  // Track recently viewed product
  React.useEffect(() => {
    addRecentlyViewed(product);
    // Initialize default variants
    if (colors.length > 0) setSelectedColor(colors[0]);
    if (sizes.length > 0) setSelectedSize(sizes[0]);
  }, [product, addRecentlyViewed, colors, sizes]);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    addToast(`${product.name} added to your bag`, "success");
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    addToast(
      isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      "success"
    );
  };

  const onSubmitReview = async (data: ReviewFormValues) => {
    try {
      const newReview = await ApiService.submitReview(product.id, data);
      setReviews([newReview, ...reviews]);
      addToast("Review submitted successfully!", "success");
      reset();
    } catch {
      addToast("Failed to submit review.", "error");
    }
  };

  const priceVal = product.discountPrice || product.price;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumb
        items={[
          { label: "Products", href: "/products" },
          { label: product.categorySlug.charAt(0).toUpperCase() + product.categorySlug.slice(1), href: `/categories/${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      {/* Main Split Info View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Side: Media Gallery */}
        <div>
          <ProductGallery images={product.images} />
        </div>

        {/* Right Side: Product Details & Cart Actions */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              {product.brandName}
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <Rating value={product.rating} count={reviews.length} size="md" />
              <span className="text-base text-muted-foreground">|</span>
              <span className={`text-base font-semibold ${isOutOfStock ? "text-red-500" : "text-emerald-600"}`}>
                {isOutOfStock ? "Out of Stock" : `In Stock (${product.stock} units remaining)`}
              </span>
            </div>
          </div>

          {/* Price Tag */}
          <div className="flex items-baseline gap-3 border-y border-border/50 py-4">
            <span className="text-3xl font-extrabold text-foreground">
              {formatPrice(priceVal)}
            </span>
            {product.discountPrice && (
              <span className="text-base text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <p className="text-base text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Variant Selectors */}
          <div className="space-y-4 pt-2">
            {/* Color selection */}
            {colors.length > 0 && (
              <div className="space-y-2">
                <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Color: <span className="text-foreground normal-case font-medium">{selectedColor}</span>
                </span>
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`h-7 px-3 text-sm font-medium border rounded-full transition-all ${
                        selectedColor === c
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border hover:border-muted-foreground/60 text-foreground"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selection */}
            {sizes.length > 0 && (
              <div className="space-y-2">
                <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Size: <span className="text-foreground normal-case font-medium">{selectedSize}</span>
                </span>
                <div className="flex gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`h-9 w-9 text-sm font-bold border rounded-lg flex items-center justify-center transition-all ${
                        selectedSize === s
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border hover:border-muted-foreground/60 text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quantity & Buy Panel */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-border/50">
            {/* Quantity control */}
            <div className="flex h-11 border border-border rounded-lg items-center bg-muted/20">
              <button
                disabled={quantity <= 1 || isOutOfStock}
                onClick={() => setQuantity(quantity - 1)}
                className="h-full px-3 text-muted-foreground hover:text-foreground disabled:opacity-30"
              >
                -
              </button>
              <span className="w-10 text-center text-base font-semibold font-mono">{quantity}</span>
              <button
                disabled={quantity >= product.stock || isOutOfStock}
                onClick={() => setQuantity(quantity + 1)}
                className="h-full px-3 text-muted-foreground hover:text-foreground disabled:opacity-30"
              >
                +
              </button>
            </div>

            {/* Actions */}
            <Button
              className="flex-1 h-11 font-semibold"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4.5 w-4.5 mr-2" />
              Add to Bag
            </Button>

            <Button
              variant="outline"
              className="h-11 px-3 border-border hover:text-red-500 hover:border-red-500"
              onClick={handleWishlistToggle}
              aria-label="Wishlist Toggle"
            >
              <Heart className={`h-4.5 w-4.5 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>

          {/* Delivery & Warranty Props */}
          <div className="grid grid-cols-3 gap-4 border-t border-border/50 pt-6 text-sm sm:text-base text-muted-foreground">
            <div className="flex flex-col items-center text-center gap-1.5 p-2 rounded-lg bg-muted/10">
              <Truck className="h-5 w-5 text-foreground/80" />
              <span className="font-semibold text-foreground">Free Shipping</span>
              <span>On orders over $100</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5 p-2 rounded-lg bg-muted/10">
              <RefreshCw className="h-5 w-5 text-foreground/80" />
              <span className="font-semibold text-foreground">30-Day Returns</span>
              <span>Hassle-free refunds</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5 p-2 rounded-lg bg-muted/10">
              <ShieldCheck className="h-5 w-5 text-foreground/80" />
              <span className="font-semibold text-foreground">2-Year Warranty</span>
              <span>Guaranteed support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Panels: Description vs. Specifications */}
      <div className="border-t border-border/60 pt-8">
        <div className="flex gap-4 border-b border-border/60 pb-3 mb-6">
          <button
            onClick={() => setActiveTab("description")}
            className={`text-sm font-bold pb-2 relative transition-colors ${
              activeTab === "description" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Details
            {activeTab === "description" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("specifications")}
            className={`text-sm font-bold pb-2 relative transition-colors ${
              activeTab === "specifications" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Specifications
            {activeTab === "specifications" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>

        {activeTab === "description" ? (
          <p className="text-base text-muted-foreground leading-relaxed max-w-3xl whitespace-pre-line">
            {product.longDescription}
          </p>
        ) : (
          <div className="max-w-xl border rounded-lg overflow-hidden divide-y">
            {product.specifications.map((spec, i) => (
              <div key={i} className="flex p-3 text-sm bg-card">
                <span className="w-1/3 text-muted-foreground font-semibold uppercase tracking-wider">{spec.name}</span>
                <span className="w-2/3 text-foreground font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div className="border-t border-border/60 pt-10">
        <h2 className="text-lg font-bold tracking-tight text-foreground mb-6">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Review Stats */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-extrabold text-foreground">{product.rating}</span>
              <div>
                <Rating value={product.rating} />
                <span className="text-base text-muted-foreground">Based on {reviews.length} reviews</span>
              </div>
            </div>

            {/* Simulated bar chart percentages */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const total = reviews.length || 1;
                const starCount = reviews.filter((r) => r.rating === stars).length;
                const percent = Math.round((starCount / total) * 100);
                return (
                  <div key={stars} className="flex items-center gap-3 text-sm">
                    <span className="w-3 text-right text-muted-foreground">{stars}</span>
                    <Star className="h-3 w-3 text-amber-400 fill-amber-400 shrink-0" />
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div style={{ width: `${percent}%` }} className="h-full bg-amber-400 rounded-full" />
                    </div>
                    <span className="w-8 text-right text-muted-foreground">{percent}%</span>
                  </div>
                );
              })}
            </div>

            {/* Write a Review card wrapper */}
            <div className="border border-border rounded-xl p-5 bg-muted/10 space-y-4">
              <h3 className="text-sm font-bold text-foreground">Write a Review</h3>
              
              <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-4">
                {/* Rating selection stars */}
                <div className="space-y-1">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setValue("rating", star)}
                        className="text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star className={`h-6 w-6 ${ratingValue >= star ? "fill-amber-400" : "text-muted-foreground/30"}`} />
                      </button>
                    ))}
                  </div>
                  {errors.rating && (
                    <p className="text-sm text-destructive">{errors.rating.message}</p>
                  )}
                </div>

                <Input
                  label="Your Name"
                  placeholder="Enter name"
                  error={errors.userName?.message}
                  {...register("userName")}
                />

                <div className="space-y-1.5">
                  <label className="text-base font-semibold uppercase tracking-wider text-muted-foreground">
                    Review Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Share your experiences with this product..."
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    {...register("comment")}
                  />
                  {errors.comment && (
                    <p className="text-sm text-destructive">{errors.comment.message}</p>
                  )}
                </div>

                <Button type="submit" size="sm" className="w-full" isLoading={isSubmitting}>
                  Submit Review
                </Button>
              </form>
            </div>
          </div>

          {/* Reviews Comments list */}
          <div className="lg:col-span-2 space-y-6">
            {reviews.length === 0 ? (
              <p className="text-base text-muted-foreground italic">No reviews yet. Be the first to share your thoughts!</p>
            ) : (
              <div className="divide-y divide-border/50 space-y-6">
                {reviews.map((rev) => (
                  <div key={rev.id} className="pt-6 first:pt-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-foreground">{rev.userName}</h4>
                      <span className="text-base text-muted-foreground font-mono">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Rating value={rev.rating} />
                      {rev.verifiedPurchase && (
                        <span className="rounded-full bg-emerald-500/10 text-emerald-600 px-2 py-0.5 text-sm font-bold uppercase tracking-wider">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-border/60 pt-10">
          <ProductCarousel products={relatedProducts} title="Related Products" />
        </div>
      )}

      {/* Recently Viewed */}
      <RecentlyViewed />
    </div>
  );
}
