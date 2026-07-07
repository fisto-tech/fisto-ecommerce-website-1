"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAdminAuthStore } from "../../../store/adminAuth";
import { useToastStore } from "../../../store/toast";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAdminLoggedIn } = useAdminAuthStore();
  const { addToast } = useToastStore();
  
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (isAdminLoggedIn) {
      router.push("/admin");
    }
  }, [isAdminLoggedIn, router]);

  if (!mounted) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      login();
      addToast("Successfully logged in to Admin panel", "success");
      router.push("/admin");
    } else {
      addToast("Invalid credentials", "error");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md border border-border rounded-xl bg-card shadow-sm p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Admin Portal</h1>
          <p className="text-sm text-muted-foreground">Sign in to manage the store</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input 
            label="Username" 
            name="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            required
          />
          <Input 
            label="Password" 
            name="password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin123"
            required
          />
          <Button type="submit" className="w-full mt-2">
            Sign In
          </Button>
        </form>
        
        <div className="text-center text-xs text-muted-foreground">
          <p>Demo Credentials: <b>admin</b> / <b>admin123</b></p>
        </div>
      </div>
    </div>
  );
}
