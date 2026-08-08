export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: ServiceCategory;
  features: string[];
}

export type ServiceCategory =
  | "ai-automation"
  | "business-solutions"
  | "software-development"
  | "digital-marketing"
  | "design-branding"
  | "video-editing"
  | "advanced-tech";

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: PortfolioCategory;
  image: string;
  tags: string[];
  link?: string;
}

export type PortfolioCategory =
  | "ai"
  | "web"
  | "mobile"
  | "automation"
  | "marketing"
  | "branding"
  | "all";

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  results: { metric: string; value: string }[];
  timeline: { phase: string; duration: string; details: string }[];
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: { linkedin?: string; twitter?: string; github?: string };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: { name: string; avatar: string };
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  readingTime: string;
}

export interface CareerPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  description: string;
  requirements: string[];
  responsibilities: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export type AwardCategory = "industry" | "platform" | "client" | "recognition";

export interface Award {
  id: string;
  title: string;
  issuer: string;
  description: string;
  category: AwardCategory;
  year: string;
  image?: string;
  badge: string;
  link?: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}
