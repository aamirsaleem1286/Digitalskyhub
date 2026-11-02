"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/data/content";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Type for nav links with optional children
  interface NavLinkItem {
    readonly label: string;
    readonly href: string;
    readonly children?: readonly { readonly label: string; readonly href: string; readonly description?: string }[];
  }
  const typedNavLinks = navLinks as readonly NavLinkItem[];
  const hasChildren = (link: NavLinkItem): link is NavLinkItem & { readonly children: NonNullable<NavLinkItem["children"]> } =>
    !!link.children && link.children.length > 0;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "glass-strong shadow-lg shadow-black/5"
            : "bg-transparent"
        )}
      >
        <nav className="container-custom mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
                ASIT
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight gradient-text">AI Solution IT</span>
                <span className="text-[10px] text-muted-foreground leading-tight -mt-0.5">Innovate · Automate · Scale</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {typedNavLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => hasChildren(link) && setActiveMegaMenu(link.label)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <a
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1",
                      "text-foreground/70 hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    {link.label}
                    {hasChildren(link) && (
                      <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeMegaMenu === link.label && "rotate-180")} />
                    )}
                  </a>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {hasChildren(link) && activeMegaMenu === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-72 glass-strong rounded-2xl border border-white/10 shadow-2xl shadow-black/20 overflow-hidden"
                      >
                        <div className="p-3">
                          {link.children!.map((child) => (
                            <a
                              key={child.label}
                              href={child.href}
                              className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/mega"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/mega:bg-primary/20 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-foreground group-hover/mega:text-primary transition-colors">
                                  {child.label}
                                </div>
                                {child.description && (
                                  <div className="text-xs text-muted-foreground mt-0.5">
                                    {child.description}
                                  </div>
                                )}
                              </div>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="hidden md:block">
                <Button href="/contact" size="sm" variant="gradient">
                  Free Consultation
                </Button>
              </div>
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl glass flex items-center justify-center text-foreground"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm glass-strong border-l border-white/10 overflow-y-auto"
            >
              <div className="pt-24 px-6 pb-8">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <button
                      onClick={() => {
                        if (hasChildren(link)) {
                          setMobileDropdown(mobileDropdown === link.label ? null : link.label);
                        } else {
                          setIsMobileMenuOpen(false);
                        }
                      }}
                      className="w-full flex items-center justify-between py-3 text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {hasChildren(link) ? (
                        <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="flex-1 text-left">
                          {link.label}
                        </Link>
                      ) : (
                        <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="flex-1 text-left">
                          {link.label}
                        </Link>
                      )}
                      {hasChildren(link) && (
                        <ChevronRight className={cn("w-4 h-4 transition-transform duration-200", mobileDropdown === link.label && "rotate-90")} />
                      )}
                    </button>
                    <AnimatePresence>
                      {hasChildren(link) && mobileDropdown === link.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 border-l border-white/10 ml-2 space-y-1 pb-2">
                            {link.children!.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <Button href="/contact" className="w-full" variant="gradient">
                    Book Free Consultation
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
