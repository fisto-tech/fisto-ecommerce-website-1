"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ApiService } from "../../../services/api";
import { useToastStore } from "../../../store/toast";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Breadcrumb } from "../../../components/common/breadcrumb";
import { Mail, MapPin, Phone } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const addToast = useToastStore((state) => state.addToast);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await ApiService.submitContact(data);
      addToast(res.message, "success");
      reset();
    } catch {
      addToast("Failed to send message.", "error");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumb items={[{ label: "Contact" }]} />

      <div className="space-y-2 border-b pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">Contact Us</h1>
        <p className="text-base text-muted-foreground">Have questions about order tracking or custom corporate drops? Reach out.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pt-4">
        {/* Contact details */}
        <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
          <div className="flex gap-3">
            <Mail className="h-5 w-5 text-foreground shrink-0" />
            <div>
              <h4 className="font-bold text-foreground mb-0.5">Email Support</h4>
              <p>support@fisto.design</p>
              <p>Replies within 24 hours.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="h-5 w-5 text-foreground shrink-0" />
            <div>
              <h4 className="font-bold text-foreground mb-0.5">Phone Lines</h4>
              <p>+1 (555) 198-2843</p>
              <p>Mon - Fri, 9am - 5pm PST.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 text-foreground shrink-0" />
            <div>
              <h4 className="font-bold text-foreground mb-0.5">Studio Headquarters</h4>
              <p>FISTO Inc.</p>
              <p>120 Vercel Way, Suite 400</p>
              <p>San Francisco, CA 94107</p>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="md:col-span-2 border rounded-xl bg-card p-6 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Your Name"
                placeholder="John Doe"
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                label="Email Address"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-base font-semibold uppercase tracking-wider text-muted-foreground">
                Message Content
              </label>
              <textarea
                rows={5}
                placeholder="Describe your inquiry..."
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                {...register("message")}
              />
              {errors.message && (
                <p className="text-sm text-destructive">{errors.message.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-10" isLoading={isSubmitting}>
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
