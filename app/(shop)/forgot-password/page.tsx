"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToastStore } from "../../../store/toast";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const addToast = useToastStore((state) => state.addToast);
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotFormValues) => {
    // Simulate latency
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    addToast("Password reset link sent to " + data.email, "success");
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-6">
      <div className="rounded-xl border border-border bg-card p-8 shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Reset Password
          </h1>
          <p className="text-base text-muted-foreground">
            We will send you an email with a secure link to reset your password.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-lg bg-emerald-500/10 p-4 border border-emerald-500/20 text-sm text-emerald-600 font-medium leading-relaxed">
            ✓ Check your inbox! We have dispatched recovery instructions to your email address. Follow the link to select a new password.
            <div className="mt-4">
              <Link href="/login">
                <Button size="sm" className="w-full">Back to Sign In</Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
            />

            <Button type="submit" className="w-full h-10 mt-2" isLoading={isSubmitting}>
              Send Reset Link
            </Button>
          </form>
        )}

        {!submitted && (
          <div className="text-center text-base text-muted-foreground pt-4 border-t">
            Remember your password?{" "}
            <Link href="/login" className="font-bold text-foreground hover:underline">
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
