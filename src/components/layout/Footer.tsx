"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/data/content";
import { serviceCategories } from "@/data/services";

const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
];

const quickLinks = navLinks.filter(l => l.label !== "Home" && l.label !== "Services");
const topServices = serviceCategories.slice(0, 4);

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-background overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-[96px]" />
      </div>

      <div className="container-custom mx-auto px-4 md:px-6 pt-16 pb-8 relative z-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 group mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/25">
                ASIT
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight gradient-text">AI Solution IT</span>
                <span className="text-[10px] text-muted-foreground leading-tight -mt-0.5">Innovate · Automate · Scale</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
              Transforming businesses with AI, automation, and digital innovation.
              We build world-class software solutions that drive growth and efficiency.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="group flex items-center gap-1 px-3 py-1.5 rounded-lg glass text-xs text-muted-foreground hover:text-foreground transition-all hover:bg-white/5"
                >
                  {social.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/0 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2.5">
              {topServices.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/services#${cat.id}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/0 group-hover:bg-primary transition-colors" />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:aisolutionit26@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  aisolutionit26@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+601119903482" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  +447418354297
                </a>
              </li>
              <li>
                <span className="text-sm text-muted-foreground flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Mart Lot 5796-B ,Jalan imam haji omar kampung sungai pinang ,4920 pulau indah,Selangor</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Divider */}
        <div className="py-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 max-w-md w-full">
            <label className="text-sm font-medium text-foreground mb-2 block">Stay updated</label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button size="sm" variant="gradient" className="flex-shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            No spam. Unsubscribe anytime.
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} AI Solution IT. All rights reserved. |
            <Link href="#" className="hover:text-primary ml-1">Privacy Policy</Link> |
            <Link href="#" className="hover:text-primary ml-1">Terms of Service</Link>
          </p>
          <p className="text-xs text-muted-foreground">
            Built with AI & ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
