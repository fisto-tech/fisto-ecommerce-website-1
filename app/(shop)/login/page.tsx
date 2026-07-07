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

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);
  const addToast = useToastStore((state) => state.addToast);
  
  const redirectUrl = searchParams.get("redirect") || "/account";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await login(data.email);
      if (res.success) {
        addToast(res.message, "success");
        router.push(redirectUrl);
      } else {
        addToast(res.message, "error");
      }
    } catch {
      addToast("An error occurred during login.", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:py-16">
      <div className="rounded-xl border border-border bg-card p-8 shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Sign in to FISTO
          </h1>
          <p className="text-base text-muted-foreground">
            Enter your email and password to access your account dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-base font-semibold uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-base text-muted-foreground hover:underline hover:text-primary"
              >
                Forgot?
              </Link>
            </div>
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
            Sign In
          </Button>
        </form>

        <div className="text-center text-base text-muted-foreground pt-4 border-t">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-bold text-foreground hover:underline">
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={
      <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:py-16 text-center">
        <p className="text-muted-foreground animate-pulse">Loading login form...</p>
      </div>
    }>
      <LoginForm />
    </React.Suspense>
  );
}
