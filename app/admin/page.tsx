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
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 8900 },
  { name: 'Sat', revenue: 4390 },
  { name: 'Sun', revenue: 3490 },
];

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
          <Link href="/admin/users">
            <Button size="sm" variant="outline">
              <Users className="h-4 w-4 mr-1.5" />
              Users
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

          <div className="h-64 relative pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)' }}
                  itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} dy={10} />
              </AreaChart>
            </ResponsiveContainer>
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
