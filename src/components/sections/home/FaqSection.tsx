"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems } from "@/data/content";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All" },
  { id: "general", label: "General" },
  { id: "pricing", label: "Pricing" },
  { id: "ai", label: "AI" },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? faqItems
    : faqItems.filter((item) => item.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="section-padding relative overflow-hidden mt-0 md:mt-[-120px]" id="faq">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="container-custom mx-auto relative z-10">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="FAQ"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "glass text-foreground/60 hover:text-foreground hover:bg-white/5"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.map((faq) => (
                <div
                  key={faq.id}
                  className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/20 border border-transparent"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                  >
                    <span className="text-sm md:text-base font-medium pr-4">{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 md:w-5 md:h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300",
                        openId === faq.id && "rotate-180 text-primary"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-5 md:pb-6">
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
