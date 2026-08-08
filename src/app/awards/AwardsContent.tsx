"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { awards } from "@/data/content";
import { cn } from "@/lib/utils";
import {
  Trophy,
  Award,
  Medal,
  Star,
  Shield,
  ExternalLink,
  Calendar,
  Building2,
  Filter,
} from "lucide-react";
import type { AwardCategory } from "@/types";

const categories: { id: AwardCategory | "all"; label: string }[] = [
  { id: "all", label: "All Awards" },
  { id: "industry", label: "Industry Awards" },
  { id: "platform", label: "Platform Verified" },
  { id: "client", label: "Client Recognition" },
  { id: "recognition", label: "Media & Certifications" },
];

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  industry: Trophy,
  platform: Shield,
  client: Star,
  recognition: Medal,
};

const categoryGradients: Record<string, string> = {
  industry: "from-yellow-500/20 to-amber-500/5 border-yellow-500/20",
  platform: "from-blue-500/20 to-cyan-500/5 border-blue-500/20",
  client: "from-emerald-500/20 to-green-500/5 border-emerald-500/20",
  recognition: "from-purple-500/20 to-pink-500/5 border-purple-500/20",
};

const categoryBadgeColors: Record<string, string> = {
  industry: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  platform: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  client: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  recognition: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
};

const iconColorMap: Record<string, string> = {
  industry: "text-yellow-500",
  platform: "text-blue-500",
  client: "text-emerald-500",
  recognition: "text-purple-500",
};

// Stats derived from awards data
const awardStats = [
  { icon: Award, value: awards.length, suffix: "", label: "Total Awards & Recognitions" },
  { icon: Building2, value: new Set(awards.map((a) => a.issuer)).size, suffix: "", label: "Unique Issuers & Platforms" },
  { icon: Calendar, value: new Set(awards.map((a) => a.year)).size, suffix: "", label: "Years of Recognition" },
  { icon: Star, value: awards.filter((a) => a.category === "client").length, suffix: "", label: "Client Recognitions" },
];

export function AwardsContent() {
  const [activeCategory, setActiveCategory] = useState<AwardCategory | "all">("all");

  const filtered =
    activeCategory === "all"
      ? awards
      : awards.filter((award) => award.category === activeCategory);

  // Group by year
  const groupedByYear = filtered.reduce<Record<string, typeof awards>>((acc, award) => {
    if (!acc[award.year]) acc[award.year] = [];
    acc[award.year].push(award);
    return acc;
  }, {});

  const years = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <>
      {/* Page Header */}
      <section className="relative pt-32 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="container-custom mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <Trophy className="w-4 h-4" />
              <span>Our Recognitions</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Awards & <span className="gradient-text">Recognition</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We take pride in the trust our clients and industry bodies place in us.
              Every award and recognition fuels our passion to innovate and deliver excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="section-padding pt-0">
        <div className="container-custom mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {awardStats.map((stat) => (
              <GlassCard
                key={stat.label}
                glow="blue"
                className="text-center p-5 md:p-6"
                hover={true}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold gradient-text">
                  {stat.value}{stat.suffix}
                </div>
                <p className="text-xs text-muted-foreground font-medium mt-1">
                  {stat.label}
                </p>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section>
        <div className="container-custom mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <Filter className="w-4 h-4 text-muted-foreground mr-1" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeCategory === cat.id
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground border border-white/10"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Grid */}
      <section className="section-padding pt-0 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/3 left-0 w-[300px] h-[300px] bg-accent/3 rounded-full blur-[128px]" />
        </div>

        <div className="container-custom mx-auto px-4 md:px-6 relative z-10">
          {years.length === 0 ? (
            <div className="text-center py-20">
              <Trophy className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No awards found for this category.</p>
            </div>
          ) : (
            years.map((year) => (
              <motion.div
                key={year}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-12 last:mb-0"
              >
                {/* Year Badge */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold">
                    <Calendar className="w-4 h-4" />
                    <span>{year}</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                </div>

                {/* Awards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {groupedByYear[year].map((award) => {
                      const CatIcon = categoryIcons[award.category] || Trophy;
                      const borderGradient = categoryGradients[award.category] || categoryGradients.industry;
                      const badgeColor = categoryBadgeColors[award.category] || categoryBadgeColors.industry;
                      const iconColor = iconColorMap[award.category] || "text-yellow-500";

                      return (
                        <motion.div
                          key={award.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                          <GlassCard
                            glow="blue"
                            className={cn(
                              "p-6 relative overflow-hidden group",
                              "border-l-2",
                              borderGradient
                            )}
                            hover={true}
                          >
                            {/* Icon */}
                            <div className={cn("w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300", iconColor)}>
                              <CatIcon className="w-6 h-6" />
                            </div>

                            {/* Title & Issuer */}
                            <h3 className="text-lg font-semibold mb-1">
                              {award.title}
                            </h3>
                            <p className="text-sm text-primary font-medium mb-3">
                              {award.issuer}
                            </p>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                              {award.description}
                            </p>

                            {/* Badge + Link */}
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <span className={cn(
                                "inline-block text-xs font-medium px-2.5 py-0.5 rounded-full",
                                badgeColor
                              )}>
                                {award.badge}
                              </span>
                              {award.link && (
                                <a
                                  href={award.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                                >
                                  Verify
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </GlassCard>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))
          )}

          {/* Empty state for no results */}
          {years.length === 0 && activeCategory !== "all" && (
            <div className="text-center py-20">
              <Trophy className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No awards yet</h3>
              <p className="text-muted-foreground">
                We haven&apos;t received any awards in this category yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="section-padding pt-0">
        <div className="container-custom mx-auto px-4 md:px-6">
          <SectionHeading
            title="Trusted & Verified"
            subtitle="Partners & Certifications"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16"
          >
            {[
              { name: "Google Partner", icon: "G", color: "from-blue-500 to-blue-600" },
              { name: "Clutch Top Rated", icon: "C", color: "from-red-500 to-red-600" },
              { name: "GoodFirms", icon: "GF", color: "from-green-500 to-emerald-600" },
              { name: "Trustpilot", icon: "TP", color: "from-teal-500 to-teal-600" },
              { name: "Pasha Group", icon: "PG", color: "from-purple-500 to-purple-600" },
              { name: "DesignRush", icon: "DR", color: "from-orange-500 to-orange-600" },
            ].map((badge) => (
              <div
                key={badge.name}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-lg shadow-lg transition-transform duration-300 group-hover:scale-110",
                  badge.color
                )}>
                  {badge.icon}
                </div>
                <span className="text-xs text-muted-foreground font-medium text-center">
                  {badge.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
