import { Hero } from "@/components/sections/home/Hero";
import { AboutSection } from "@/components/sections/home/AboutSection";
import { StatsSection } from "@/components/sections/home/StatsSection";
import { AwardsSection } from "@/components/sections/home/AwardsSection";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { PortfolioSection } from "@/components/sections/home/PortfolioSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { PricingSection } from "@/components/sections/home/PricingSection";
import { FaqSection } from "@/components/sections/home/FaqSection";
import { ContactSection } from "@/components/sections/home/ContactSection";
import { CtaSection } from "@/components/sections/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <StatsSection />
      <AwardsSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <ContactSection />
      <CtaSection />
    </>
  );
}
