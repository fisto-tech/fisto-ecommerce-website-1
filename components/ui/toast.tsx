"use client";

import { useToastStore, ToastMessage } from "../../store/toast";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

export function Toaster() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}) {
  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="h-5 w-5 text-destructive shrink-0" />,
    info: <Info className="h-5 w-5 text-blue-500 shrink-0" />,
  };

  const bgStyles = {
    success: "border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 text-foreground",
    error: "border-destructive/20 bg-destructive/5 dark:bg-destructive-950/20 text-foreground",
    info: "border-blue-500/20 bg-blue-500/5 dark:bg-blue-950/20 text-foreground",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`flex items-start gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-md transition-all duration-300 ${bgStyles[toast.type]}`}
    >
      {icons[toast.type]}
      <p className="text-sm font-medium leading-relaxed flex-1">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="rounded-full p-0.5 text-muted-foreground hover:bg-secondary hover:text-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
      >
        <X className="h-4.5 w-4.5" />
      </button>
    </motion.div>
  );
}
