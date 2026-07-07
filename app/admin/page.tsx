"use client";

import * as React from "react";
import Link from "next/link";
import { formatPrice } from "../../lib/utils";
import {
  TrendingUp,
  Package,
  Users,
  DollarSign,
  ArrowLeft,
  Settings,
  Plus,
  RefreshCw,
} from "lucide-react";
import { Button } from "../../components/ui/button";

export default function AdminPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const kpis = [
    { label: "Total Revenue", value: "$48,932.00", change: "+12.5%", icon: <DollarSign className="h-4.5 w-4.5 text-foreground" /> },
    { label: "Active Orders", value: "329", change: "+8.2%", icon: <Package className="h-4.5 w-4.5 text-foreground" /> },
    { label: "Registered Users", value: "1,248", change: "+18.3%", icon: <Users className="h-4.5 w-4.5 text-foreground" /> },
    { label: "Conversion Rate", value: "3.4%", change: "+2.1%", icon: <TrendingUp className="h-4.5 w-4.5 text-foreground" /> },
  ];

  const recentOrders = [
    { id: "ORD-984F7E21", customer: "Sophia Kim", total: 249, status: "completed", date: "2 mins ago" },
    { id: "ORD-A109F2B8", customer: "David G.", total: 79, status: "pending", date: "15 mins ago" },
    { id: "ORD-B483C2A9", customer: "Elena Rostova", total: 129, status: "processing", date: "1 hour ago" },
    { id: "ORD-D392E184", customer: "Julian F.", total: 59, status: "completed", date: "4 hours ago" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-base text-muted-foreground">Store analytics, inventory control, and customer logs.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/products">
            <Button size="sm" variant="outline">
              <Package className="h-4 w-4 mr-1.5" />
              Products
            </Button>
          </Link>
          <Link href="/admin/employees">
            <Button size="sm" variant="outline">
              <Users className="h-4 w-4 mr-1.5" />
              Employees
            </Button>
          </Link>
          <Link href="/admin/products/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="border rounded-xl bg-card p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
              <div className="rounded-lg bg-secondary p-2">{kpi.icon}</div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold">{kpi.value}</span>
              <span className="text-sm text-emerald-600 font-bold">{kpi.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Graphic Analytics and Orders list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart using SVG */}
        <div className="lg:col-span-2 border rounded-xl bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Weekly Revenue Trend</h3>
            <span className="text-base text-muted-foreground">Updated hourly</span>
          </div>

          <div className="h-64 relative flex items-end pt-4">
            {/* Grid Lines */}
            <div className="absolute inset-x-0 top-1/4 border-b border-border/40" />
            <div className="absolute inset-x-0 top-2/4 border-b border-border/40" />
            <div className="absolute inset-x-0 top-3/4 border-b border-border/40" />

            {/* Custom SVG Line Graph */}
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              {/* Soft Gradient Under Line */}
              <defs>
                <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 5,80 Q 20,40 35,60 T 65,30 T 95,15 L 95,100 L 5,100 Z"
                fill="url(#chart-grad)"
              />
              <path
                d="M 5,80 Q 20,40 35,60 T 65,30 T 95,15"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Data points */}
              <circle cx="5" cy="80" r="2.5" fill="var(--color-primary)" />
              <circle cx="20" cy="45" r="2.5" fill="var(--color-primary)" />
              <circle cx="35" cy="60" r="2.5" fill="var(--color-primary)" />
              <circle cx="50" cy="45" r="2.5" fill="var(--color-primary)" />
              <circle cx="65" cy="30" r="2.5" fill="var(--color-primary)" />
              <circle cx="80" cy="22" r="2.5" fill="var(--color-primary)" />
              <circle cx="95" cy="15" r="2.5" fill="var(--color-primary)" />
            </svg>

            {/* X Axis labels */}
            <div className="absolute bottom-0 inset-x-0 flex justify-between px-1 text-base text-muted-foreground font-mono uppercase tracking-wider">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Recent logs */}
        <div className="border rounded-xl bg-card p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b pb-3">Recent Sales Logs</h3>
          <div className="space-y-4">
            {recentOrders.map((ord) => (
              <div key={ord.id} className="flex items-center justify-between text-sm border-b pb-3 last:border-0 last:pb-0">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-foreground">{ord.customer}</h4>
                  <p className="text-base text-muted-foreground font-mono">{ord.id} | {ord.date}</p>
                </div>
                <div className="text-right space-y-1">
                  <span className="font-bold text-foreground">{formatPrice(ord.total)}</span>
                  <p>
                    <span className={`rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider ${
                      ord.status === "completed" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                    }`}>
                      {ord.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
