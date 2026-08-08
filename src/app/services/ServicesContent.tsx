"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { services, serviceCategories } from "@/data/services";
import { cn } from "@/lib/utils";
import {
  ArrowRight, Bot, Workflow, Server, MessageSquare, MessageCircle,
  Phone, GitBranch, Cpu, FileText, Briefcase, Zap, ShoppingCart,
  CreditCard, Package, Users, GraduationCap, HeartPulse, Calculator,
  Globe, Store, LayoutDashboard, Code, Smartphone, Monitor, Plug,
  Cloud, Building2, Palette, Megaphone, Share2, Search, MousePointerClick,
  Mail, FileEdit, Target, Image, Fingerprint,
  Sparkles, Video, Film, Frame, Clapperboard, Scissors, Pipette, Brain, BarChart3,
  PieChart, Wifi, Check, BrainCircuit
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot, Workflow, Server, MessageSquare, MessageCircle,
  Phone, GitBranch, Cpu, FileText, Briefcase, Zap, ShoppingCart,
  CreditCard, Package, Users, GraduationCap, HeartPulse, Calculator,
  Globe, Store, LayoutDashboard, Code, Smartphone, Monitor, Plug,
  Cloud, Building2, Palette, Megaphone, Share2, Search, MousePointerClick,
  Mail, FileEdit, Target, Image, Fingerprint,
  Sparkles, Video, Film, Frame, Clapperboard, Scissors, Pipette, Brain, BarChart3,
  PieChart, Wifi,
};

const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "ai-automation": BrainCircuit,
  "business-solutions": Briefcase,
  "software-development": Code,
  "digital-marketing": Megaphone,
  "design-branding": Palette,
  "video-editing": Clapperboard,
  "advanced-tech": Cpu,
};

export function ServicesContent() {
  const [activeCategory, setActiveCategory] = useState<string>("ai-automation");

  const filteredServices = services.filter((s) => s.category === activeCategory);

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
              Our Services
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Comprehensive <span className="gradient-text">Digital Services</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From AI-powered automation to stunning design — we offer end-to-end digital
              solutions that transform businesses and drive growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding pt-0">
        <div className="container-custom mx-auto px-4 md:px-6">
          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto">
            {serviceCategories.map((cat) => {
              const CatIcon = categoryIconMap[cat.id];
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "glass text-foreground/60 hover:text-foreground hover:bg-white/5"
                  )}
                >
                  {CatIcon && <CatIcon className="w-4 h-4" />}
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Services Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              id={activeCategory}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                <span className="gradient-text">
                  {serviceCategories.find(c => c.id === activeCategory)?.label}
                </span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => {
                  const Icon = iconMap[service.icon];
                  return (
                    <GlassCard key={service.id} glow="blue" className="p-6 group" hover={true}>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        {Icon && <Icon className="w-6 h-6 text-primary" />}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-2 mb-4">
                        {service.features.map((f) => (
                          <li key={f} className="text-xs text-muted-foreground flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding pt-0">
        <div className="container-custom mx-auto px-4 md:px-6">
          <GlassCard glow="cyan" className="p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We tailor every service to your unique business needs. Let&apos;s discuss your project.
            </p>
            <Button href="/contact" variant="gradient" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Book Free Consultation
            </Button>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
