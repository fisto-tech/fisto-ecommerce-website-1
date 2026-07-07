"use client";

import * as React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  side = "right",
  className,
}: DrawerProps) {
  // Prevent background scrolling while open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const slideVariants = {
    hidden: { x: side === "right" ? "100%" : "-100%" },
    visible: { x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={cn("fixed inset-0 z-50 flex", side === "right" ? "justify-end" : "justify-start")}>
          {/* Backdrop Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "relative z-10 flex h-full w-full max-w-md flex-col bg-card shadow-2xl",
              side === "right" ? "border-l border-border" : "border-r border-border",
              className
            )}
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-4">
              {title ? (
                <h3 className="text-lg font-semibold tracking-tight text-card-foreground">
                  {title}
                </h3>
              ) : (
                <div />
              )}
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors cursor-pointer"
                aria-label="Close panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
