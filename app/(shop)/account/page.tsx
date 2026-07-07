"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "../../../store/auth";
import { useOrderStore } from "../../../store/order";
import { useToastStore } from "../../../store/toast";
import { formatPrice } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Breadcrumb } from "../../../components/common/breadcrumb";
import { LogOut, Package, User as UserIcon, MapPin, Eye } from "lucide-react";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().optional(),
  addressLine1: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  postalCode: z.string().min(4, "Postal code must be at least 4 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function AccountPage() {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  const { user, isAuthenticated, logout, updateProfile } = useAuthStore();
  const addToast = useToastStore((state) => state.addToast);

  // Sync react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    values: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
      addressLine1: user?.address?.addressLine1 || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      postalCode: user?.address?.postalCode || "",
      country: user?.address?.country || "",
    },
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-64 border rounded-xl animate-pulse" />;
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <UserIcon className="h-12 w-12 text-muted-foreground/35 mx-auto" />
        <h1 className="text-xl font-bold tracking-tight">Access Denied</h1>
        <p className="text-base text-muted-foreground">You must be logged in to view your dashboard.</p>
        <Link href="/login">
          <Button>Sign In Now</Button>
        </Link>
      </div>
    );
  }

  const handleProfileSubmit = (data: ProfileFormValues) => {
    updateProfile({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: {
        name: `${data.firstName} ${data.lastName}`,
        addressLine1: data.addressLine1,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
      },
    });
    setIsEditing(false);
    addToast("Profile details updated successfully", "success");
  };

  const handleLogout = () => {
    logout();
    addToast("Logged out successfully", "success");
    router.push("/");
  };

  const { orders } = useOrderStore();
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "My Account" }]} />

      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Welcome, {user.firstName}
          </h1>
          <p className="text-base text-muted-foreground">Manage your settings and track purchases.</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:border-red-500">
          <LogOut className="h-4 w-4 mr-1.5" />
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Profile Card & Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-border rounded-xl bg-card p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <UserIcon className="h-4.5 w-4.5" />
                Personal Profile
              </h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm text-primary font-bold hover:underline cursor-pointer"
                >
                  Edit details
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit(handleProfileSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="First Name" error={errors.firstName?.message} {...register("firstName")} />
                  <Input label="Last Name" error={errors.lastName?.message} {...register("lastName")} />
                </div>
                <Input label="Phone Number" error={errors.phone?.message} {...register("phone")} />
                
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground pt-2">Default Shipping Address</h4>
                <Input label="Address Line 1" error={errors.addressLine1?.message} {...register("addressLine1")} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="City" error={errors.city?.message} {...register("city")} />
                  <Input label="State" error={errors.state?.message} {...register("state")} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Postal / Zip Code" error={errors.postalCode?.message} {...register("postalCode")} />
                  <Input label="Country" error={errors.country?.message} {...register("country")} />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button type="submit" size="sm">Save Changes</Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
                <div className="space-y-2">
                  <div>
                    <span className="text-muted-foreground uppercase font-semibold">Full Name:</span>
                    <p className="text-sm font-bold text-foreground mt-0.5">{user.firstName} {user.lastName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground uppercase font-semibold">Email:</span>
                    <p className="text-sm font-bold text-foreground mt-0.5">{user.email}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground uppercase font-semibold">Phone:</span>
                    <p className="text-sm font-bold text-foreground mt-0.5">{user.phone || "Not provided"}</p>
                  </div>
                </div>

                <div className="space-y-2 border-l border-border/60 pl-0 md:pl-6">
                  <span className="text-muted-foreground uppercase font-semibold flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Default Shipping Address
                  </span>
                  {user.address ? (
                    <div className="text-base font-medium text-foreground space-y-0.5 mt-1">
                      <p>{user.address.name}</p>
                      <p>{user.address.addressLine1}</p>
                      {user.address.addressLine2 && <p>{user.address.addressLine2}</p>}
                      <p>
                        {user.address.city}, {user.address.state} {user.address.postalCode}
                      </p>
                      <p>{user.address.country}</p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic mt-1">No default address saved yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Orders Sidebar List */}
        <div className="border border-border rounded-xl bg-card p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 border-b pb-3">
            <Package className="h-4.5 w-4.5" />
            Recent Orders
          </h3>

          <div className="space-y-4">
            {recentOrders.length === 0 ? (
              <p className="text-sm text-muted-foreground italic text-center py-4">No recent orders found.</p>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/10 transition-colors">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-foreground font-mono">{order.id}</h4>
                    <p className="text-base text-muted-foreground">{order.date} | {formatPrice(order.total)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-2 py-0.5 text-sm font-bold uppercase tracking-wider ${
                      order.status === "delivered" ? "bg-emerald-500/10 text-emerald-600" : 
                      order.status === "refund_requested" ? "bg-amber-500/10 text-amber-600" :
                      order.status === "refunded" ? "bg-red-500/10 text-red-600" :
                      "bg-blue-500/10 text-blue-600"
                    }`}>
                      {order.status.replace("_", " ")}
                    </span>
                    <Link href={`/account/orders/${order.id}`}>
                      <button className="text-muted-foreground hover:text-foreground cursor-pointer" aria-label="View order details">
                        <Eye className="h-4 w-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          <Link href="/account/orders" className="block text-center mt-2">
            <Button variant="outline" size="sm" className="w-full">
              View All Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
