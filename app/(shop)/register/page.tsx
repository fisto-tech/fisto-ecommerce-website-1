"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "../../../store/auth";
import { useToastStore } from "../../../store/toast";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registerUser = useAuthStore((state) => state.register);
  const addToast = useToastStore((state) => state.addToast);
  
  const redirectUrl = searchParams.get("redirect") || "/account";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await registerUser(data.firstName, data.lastName, data.email);
      if (res.success) {
        addToast(res.message, "success");
        router.push(redirectUrl);
      } else {
        addToast(res.message, "error");
      }
    } catch {
      addToast("Failed to create account.", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-6">
      <div className="rounded-xl border border-border bg-card p-8 shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Create an Account
          </h1>
          <p className="text-base text-muted-foreground">
            Sign up to start saving wishlists, earning rewards, and tracking orders.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="John"
              error={errors.firstName?.message}
              {...register("firstName")}
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              error={errors.lastName?.message}
              {...register("lastName")}
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <div className="space-y-1">
            <label className="text-base font-semibold uppercase tracking-wider text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full h-10 mt-2" isLoading={isSubmitting}>
            Create Account
          </Button>
        </form>

        <div className="text-center text-base text-muted-foreground pt-4 border-t">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-foreground hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <React.Suspense fallback={
      <div className="max-w-md mx-auto py-12 px-4 sm:px-6 text-center">
        <p className="text-muted-foreground animate-pulse">Loading registration form...</p>
      </div>
    }>
      <RegisterForm />
    </React.Suspense>
  );
}
