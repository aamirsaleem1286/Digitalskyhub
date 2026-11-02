"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  ChevronDown,
  Bot,
  Send,
  Sparkles,
  ExternalLink,
} from "lucide-react";

// ---------- Types ----------

interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
}

type WidgetView = "closed" | "menu" | "chat";

// ---------- Bot responses ----------

const botResponses: { keywords: string[]; response: string }[] = [
  {
    keywords: ["hi", "hello", "hey", "howdy", "good morning", "good evening", "good afternoon"],
    response:
      "Hey there! 👋 Welcome to AI Solution IT. How can I help you today? You can ask me about our services, pricing, portfolio, or anything else!",
  },
  {
    keywords: ["service", "what do you do", "offer", "capabilities", "solutions"],
    response:
      "We offer a wide range of services:\n\n🤖 **AI & Automation** — AI agents, chatbots, workflow automation\n💻 **Software Development** — Web, mobile, custom software\n📱 **Digital Marketing** — SEO, ads, social media\n🎨 **Design & Branding** — UI/UX, brand identity\n🎬 **Video Editing** — Professional post-production\n\nWhich one interests you most?",
  },
  {
    keywords: ["pricing", "cost", "price", "how much", "rates", "budget", "affordable"],
    response:
      "Our pricing is project-based and varies by scope:\n\n🚀 **Startup** — $2,999+ (basic website, 5 pages)\n💼 **Business** — $9,999+ (full solution with AI chatbot)\n🏢 **Enterprise** — Custom pricing (tailored solutions)\n\nWant a free quote? Click the WhatsApp button or fill out our contact form!",
  },
  {
    keywords: ["contact", "phone", "email", "call", "reach", "get in touch"],
    response:
      "You can reach us through:\n\n📧 **Email:** aisolutionit26@gmail.com\n📞 **Phone:** +447418354297\n💬 **WhatsApp:** Click the WhatsApp button below\n\nWe typically respond within 24 hours!",
  },
  {
    keywords: ["location", "where", "office", "address", "located", "Pakistan", "Malaysia"],
    response:
      "We have offices in:\n\n📍 **Dubai, UAE** — Our headquarters\n📍 **London, UK** — Our European office\n\nBoth locations are open Mon-Fri, 9 AM - 6 PM (GMT).",
  },
  {
    keywords: ["portfolio", "work", "projects", "past work", "showcase", "examples"],
    response:
      "We've delivered 100+ projects including:\n\n• 🤖 AI-powered CRM platforms\n• 🛒 Global e-commerce marketplaces\n• 📱 Health & fitness mobile apps\n• ⚙️ Enterprise automation systems\n• 🎯 Full brand identity launches\n\nCheck out our Portfolio page for the full showcase!",
  },
  {
    keywords: ["ai", "automation", "chatbot", "agent"],
    response:
      "Yes! AI & Automation is our specialty:\n\n• **AI Agents** — Custom LLM-powered autonomous agents\n• **Chatbots** — Intelligent customer service bots\n• **Voice AI** — 24/7 voice agent deployment\n• **WhatsApp Bots** — Automated WhatsApp communication\n• **Workflow Automation** — End-to-end process automation\n\nWant to discuss your specific use case? Let's talk!",
  },
  {
    keywords: ["website", "web development", "web dev", "web app"],
    response:
      "We build stunning, high-performance websites:\n\n• Custom websites with modern frameworks (Next.js, React)\n• E-commerce platforms with secure checkout\n• Scalable web applications with real-time features\n• CMS integration for easy content management\n\nEvery site is responsive, SEO-optimized, and built for speed!",
  },
  {
    keywords: ["mobile app", "app development", "ios", "android"],
    response:
      "We develop mobile apps for iOS & Android:\n\n• **Cross-platform** with React Native / Flutter\n• **Native apps** for maximum performance\n• **UI/UX design** tailored to your brand\n• **App store deployment** & ongoing support\n\nFrom MVPs to enterprise-grade apps, we've got you covered!",
  },
  {
    keywords: ["thank", "thanks", "appreciate"],
    response:
      "You're very welcome! 😊 If you have any other questions, I'm here to help. Otherwise, feel free to reach out via our contact form or WhatsApp for a free consultation!",
  },
  {
    keywords: ["bye", "goodbye", "see you", "talk later"],
    response:
      "Thanks for chatting! 👋 Feel free to come back anytime. In the meantime, check out our Portfolio and Case Studies to see our work. Have a great day!",
  },
  {
    keywords: ["resume", "cv", "job", "career", "hiring", "careers"],
    response:
      "We're always looking for talented people! Check out our Careers page for open positions:\n\n• Senior AI/ML Engineer\n• Full Stack Developer\n• UI/UX Designer\n• Digital Marketing Specialist\n• DevOps Engineer\n\nAll positions are remote! 🌍",
  },
];

function findBotResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const item of botResponses) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.response;
    }
  }
  return (
    "That's a great question! 🤔 I'm not entirely sure about that one. Let me connect you with our team who can help!\n\n" +
    "In the meantime, you can:\n" +
    "💬 **WhatsApp us** — Get an instant response\n" +
    "📧 **Email us** at aisolutionit26@gmail.com\n" +
    "📝 **Fill out the contact form** for a detailed reply"
  );
}

// ---------- Helper: format bot text with bold markers ----------

function formatBotText(text: string): (string | React.ReactNode)[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="text-foreground font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

// ---------- Component ----------

export function ChatWidget() {
  const [view, setView] = useState<WidgetView>("closed");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "bot",
      text: "👋 Hi! I'm ASIT, your AI Solution IT assistant. Ask me anything about our services, pricing, or portfolio!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isBotTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (view === "chat") {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [view]);

  const toggleView = useCallback((newView: WidgetView) => {
    setView((prev) => (prev === newView ? "closed" : newView));
  }, []);

  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text || isBotTyping) return;

    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", text };
    setChatMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsBotTyping(true);

    // Simulate bot thinking delay
    const delay = Math.min(400 + text.length * 10, 1500);
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "bot",
        text: findBotResponse(text),
      };
      setChatMessages((prev) => [...prev, botMsg]);
      setIsBotTyping(false);
    }, delay);
  }, [inputValue, isBotTyping]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const resetChat = useCallback(() => {
    setChatMessages([
      {
        id: "init",
        role: "bot",
        text: "👋 Hi! I'm ASIT, your AI Solution IT assistant. Ask me anything about our services, pricing, or portfolio!",
      },
    ]);
    setIsBotTyping(false);
    setInputValue("");
  }, []);

  // Quick action buttons
  const quickActions = [
    { label: "Services", query: "What services do you offer?" },
    { label: "Pricing", query: "What's your pricing?" },
    { label: "Portfolio", query: "Show me your work" },
    { label: "Contact", query: "How do I contact you?" },
  ];

  const triggerQuickAction = useCallback(
    (query: string) => {
      const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", text: query };
      setChatMessages((prev) => [...prev, userMsg]);
      setIsBotTyping(true);

      setTimeout(() => {
        const botMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "bot",
          text: findBotResponse(query),
        };
        setChatMessages((prev) => [...prev, botMsg]);
        setIsBotTyping(false);
      }, 600);
    },
    []
  );

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447418354297";
  const waLink = `https://wa.me/${whatsappNumber}?text=Hi%20AI%20Solution%20IT!%20I%27d%20like%20to%20know%20more%20about%20your%20services.`;

  return (
    <>
      {/* FAB button */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
        <AnimatePresence>
          {/* Menu / Chat panel */}
          {view === "menu" && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="glass-strong rounded-2xl border border-white/10 shadow-2xl shadow-black/20 w-[280px] overflow-hidden"
            >
              <div className="p-4 border-b border-white/10">
                <p className="text-sm font-semibold">Let&apos;s Talk</p>
                <p className="text-xs text-muted-foreground">Choose how you&apos;d like to connect</p>
              </div>
              <div className="p-2 space-y-1">
                {/* WhatsApp */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">WhatsApp</div>
                    <div className="text-xs text-muted-foreground">Instant reply on WhatsApp</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </a>

                {/* AI Chatbot */}
                <button
                  onClick={() => setView("chat")}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors w-full text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">AI Assistant</div>
                    <div className="text-xs text-muted-foreground">Chat with ASIT, our AI bot</div>
                  </div>
                  <Sparkles className="w-4 h-4 text-primary/60" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Chat panel */}
          {view === "chat" && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9, height: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1, height: "auto" }}
              exit={{ opacity: 0, y: 20, scale: 0.9, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="glass-strong rounded-2xl border border-white/10 shadow-2xl shadow-black/20 w-[340px] sm:w-[380px] flex flex-col overflow-hidden"
              style={{ maxHeight: "min(560px, calc(100vh - 120px))" }}
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">ASIT AI Assistant</p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                      Online — Usually replies instantly
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setView("menu")}
                  className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors"
                >
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px]">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-primary to-secondary text-white rounded-tr-md"
                          : "glass rounded-tl-md text-foreground/90"
                      }`}
                    >
                      {msg.role === "bot" ? formatBotText(msg.text) : msg.text}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isBotTyping && (
                  <div className="flex justify-start">
                    <div className="glass rounded-2xl rounded-tl-md px-4 py-3">
                      <div className="flex gap-1.5">
                        <motion.div
                          className="w-2 h-2 rounded-full bg-primary/40"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 rounded-full bg-primary/40"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                        />
                        <motion.div
                          className="w-2 h-2 rounded-full bg-primary/40"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Quick Actions */}
              {chatMessages.length <= 2 && (
                <div className="px-4 pb-2 flex-shrink-0">
                  <div className="flex flex-wrap gap-1.5">
                    {quickActions.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => triggerQuickAction(action.query)}
                        className="text-[11px] px-3 py-1.5 rounded-full glass hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input */}
              <div className="p-3 border-t border-white/10 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    disabled={isBotTyping}
                    className="flex-1 px-4 py-2.5 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow disabled:opacity-50"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isBotTyping}
                    className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white disabled:opacity-30 transition-opacity flex-shrink-0 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground/60 text-center mt-1.5">
                  Responses are automated. For complex inquiries, connect on WhatsApp.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB */}
        <motion.button
          onClick={() => {
            if (view === "chat") setView("closed");
            else toggleView(view === "menu" ? "closed" : "menu");
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-2xl shadow-primary/30 flex items-center justify-center hover:shadow-primary/50 transition-shadow"
        >
          {/* Ripple ring */}
          <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-primary/50" />
          {view !== "closed" ? <X className="w-6 h-6 relative z-10" /> : <MessageCircle className="w-6 h-6 relative z-10" />}
        </motion.button>
      </div>

      {/* Spacer for page padding — prevents content from hiding behind widget */}
      <div className="h-20" />
    </>
  );
}
