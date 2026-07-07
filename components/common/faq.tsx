"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockFaqs } from "../../mock/data";

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <p className="text-base text-muted-foreground">
          Got questions? We have answers. Find everything you need to know about FISTO.
        </p>
      </div>

      <div className="border border-border rounded-xl divide-y divide-border overflow-hidden">
        {mockFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="bg-card">
              <button
                onClick={() => toggle(idx)}
                className="flex w-full items-center justify-between p-5 text-left text-base font-semibold text-foreground hover:bg-muted/40 transition-colors"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-4.5 w-4.5 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="p-5 pt-0 text-base text-muted-foreground leading-relaxed border-t border-border/10 bg-muted/10">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
