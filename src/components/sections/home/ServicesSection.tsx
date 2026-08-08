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
  Sparkles, Brain, BarChart3, PieChart, Wifi, Clapperboard,
  Laptop, Camera, Film, Scissors, Pipette, Video
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot, Workflow, Server, MessageSquare, MessageCircle,
  Phone, GitBranch, Cpu, FileText, Briefcase, Zap, ShoppingCart,
  CreditCard, Package, Users, GraduationCap, HeartPulse, Calculator,
  Globe, Store, LayoutDashboard, Code, Smartphone, Monitor, Plug,
  Cloud, Building2, Palette, Megaphone, Share2, Search, MousePointerClick,
  Mail, FileEdit, Target, Image, Fingerprint,
  Sparkles, Brain, BarChart3, PieChart, Wifi, Clapperboard,
  Laptop, Camera, Film, Scissors, Pipette, Video
};

const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "ai-automation": Laptop,
  "business-solutions": Briefcase,
  "software-development": Code,
  "digital-marketing": Megaphone,
  "design-branding": Palette,
  "video-editing": Video,
  "advanced-tech": Cpu,
};

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("ai-automation");

  const filteredServices = services.filter((s) => s.category === activeCategory);

  return (
    <section className="section-padding relative overflow-hidden mt-[-100px]" id="services">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[96px]" />
      </div>
      <div className="container-custom mx-auto relative z-10 ">
        <SectionHeading
          title="Our Services"
          subtitle="What We Offer"
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
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
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredServices.map((service, i) => {
              const Icon = iconMap[service.icon];
              return (
                <GlassCard key={service.id} glow="blue" className="p-6 group cursor-pointer" hover={true}>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    {Icon && <Icon className="w-6 h-6 text-primary" />}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    {service.features.slice(0, 3).map((f) => (
                      <li key={f} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary/50" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-1 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </GlassCard>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-10">
          <Button href="/services" variant="outline" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
