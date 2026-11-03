"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { portfolioItems } from "@/data/content";
import { cn } from "@/lib/utils";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { PortfolioCategory } from "@/types";

const categories: { id: PortfolioCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "automation", label: "Automation" },
  { id: "marketing", label: "Marketing" },
  { id: "branding", label: "Branding" },
];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("all");

  const filtered = activeCategory === "all"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section className="section-padding relative overflow-hidden mt-0 md:mt-[-150px]" id="portfolio">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="container-custom mx-auto relative z-10">
        <SectionHeading
          title="Our Portfolio"
          subtitle="Recent Work"
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
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

        {/* Portfolio Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((item, i) => (
              <GlassCard key={item.id} glow="blue" className="p-0 overflow-hidden group cursor-pointer">
                <div className="relative h-48 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                  <div className="text-4xl font-bold gradient-text opacity-30 group-hover:opacity-50 transition-opacity">
                    {item.title.charAt(0)}
                  </div>
                  <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-lg glass flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 text-foreground" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-10">
          <Button href="/portfolio" variant="outline" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            View Full Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}
