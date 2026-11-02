"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Bot, MessageSquare, Phone, FileText, Workflow, BrainCircuit, Cpu, Sparkles, Network, Eye, Speech } from "lucide-react";

const aiServices = [
  {
    icon: Bot,
    title: "AI Agent Development",
    description: "Custom autonomous AI agents that reason, plan, and execute complex tasks. Built with cutting-edge LLMs and fine-tuned for your business domain.",
    features: ["Autonomous task execution", "Multi-agent orchestration", "Tool use & API integration", "Memory & context management"],
  },
  {
    icon: MessageSquare,
    title: "AI Chatbots & Assistants",
    description: "Intelligent conversational AI that understands context, learns from interactions, and provides human-like support across all channels.",
    features: ["Natural language understanding", "Multi-channel deployment", "Context-aware conversations", "Analytics & insights"],
  },
  {
    icon: Phone,
    title: "Voice AI Agents",
    description: "Deploy AI voice agents that handle inbound and outbound calls with natural speech, real-time responses, and 24/7 availability.",
    features: ["Real-time speech processing", "Natural conversation flow", "Multi-language support", "Call analytics dashboard"],
  },
  {
    icon: Workflow,
    title: "Business Process Automation",
    description: "Intelligent automation of complex business processes using AI, reducing manual effort and eliminating errors.",
    features: ["End-to-end automation", "Smart document processing", "Workflow optimization", "Real-time monitoring"],
  },
  {
    icon: FileText,
    title: "Document Intelligence",
    description: "AI-powered document processing that extracts, classifies, and validates data from any document format with high accuracy.",
    features: ["Intelligent OCR", "Data extraction & validation", "Automated classification", "ERP/CRM integration"],
  },
  {
    icon: Network,
    title: "AI Integration Services",
    description: "Seamlessly integrate leading AI models and APIs into your existing applications and workflows.",
    features: ["OpenAI, Claude, Gemini", "Custom fine-tuning", "API development", "Scalable architecture"],
  },
  {
    icon: Eye,
    title: "Computer Vision Solutions",
    description: "AI-powered image and video analysis for quality inspection, surveillance, object detection, and visual search.",
    features: ["Object detection & tracking", "Image classification", "Quality inspection", "Real-time video analytics"],
  },
  {
    icon: Speech,
    title: "Natural Language Processing",
    description: "Advanced NLP solutions for sentiment analysis, text classification, entity recognition, and language understanding.",
    features: ["Sentiment analysis", "Entity recognition", "Text classification", "Language translation"],
  },
];

export function AiSolutionsContent() {
  return (
    <>
      {/* Page Header */}
      <section className="relative pt-32 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[96px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-[96px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
        </div>
        <div className="container-custom mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <BrainCircuit className="w-4 h-4" />
              AI Solutions
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Enterprise <span className="gradient-text">AI Solutions</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Harness the power of artificial intelligence with our enterprise-grade AI solutions.
              From intelligent agents to computer vision, we build AI that delivers real business value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI Services */}
      <section className="section-padding pt-0">
        <div className="container-custom mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiServices.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <GlassCard glow="blue" className="p-6 group h-full" hover={true}>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                  <ul className="space-y-1.5">
                    {service.features.map((f) => (
                      <li key={f} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary/50" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AI with AI Solution IT */}
      <section className="section-padding pt-0">
        <div className="container-custom mx-auto px-4 md:px-6">
          <SectionHeading title="Why Choose Our AI Solutions?" subtitle="AI Excellence" />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Cpu, title: "Cutting-Edge Technology", desc: "We use the latest AI models and frameworks including GPT-4, Claude, and custom fine-tuned models." },
              { icon: Sparkles, title: "Proven Results", desc: "Our AI solutions have delivered 60%+ efficiency gains and significant cost reductions for our clients." },
              { icon: Bot, title: "Expert Team", desc: "Our AI engineers have deep expertise in machine learning, NLP, computer vision, and LLM development." },
            ].map((item, i) => (
              <GlassCard key={item.title} glow="purple" className="text-center p-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding pt-0">
        <div className="container-custom mx-auto px-4 md:px-6">
          <GlassCard glow="cyan" className="p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Integrate AI Into Your Business?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Let&apos;s discuss how our AI solutions can transform your operations and drive growth.
            </p>
            <Button href="/contact" variant="gradient" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Start Your AI Journey
            </Button>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
