"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
  Clock,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// ---------- Types ----------

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  _form?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  subject: "",
  message: "",
};

// ---------- Validation ----------

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim() || !emailRegex.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (data.phone.trim()) {
    const digits = data.phone.replace(/[\s\-\(\)\+]/g, "");
    if (digits.length < 7 || digits.length > 15) {
      errors.phone = "Enter a valid phone number (or leave blank)";
    }
  }

  if (!data.subject.trim() || data.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters";
  }

  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
}

// ---------- Component ----------

export function ContactContent() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [touched, setTouched] = useState<Set<string>>(new Set());

  // ---- Handlers ----

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear field error on change if field was touched
      if (touched.has(name)) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name as keyof FormErrors];
          return next;
        });
      }
    },
    [touched]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;
      setTouched((prev) => new Set(prev).add(name));

      // Validate single field on blur
      const fieldErrors = validateForm(formData);
      if (fieldErrors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof FormErrors] }));
      } else {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name as keyof FormErrors];
          return next;
        });
      }
    },
    [formData]
  );

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();

      // Mark all fields as touched
      const allFields: (keyof FormData)[] = ["name", "email", "phone", "subject", "message"];
      setTouched(new Set(allFields));

      // Validate all
      const validationErrors = validateForm(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        toast.error("Please fix the highlighted fields before submitting.", {
          icon: <AlertCircle className="w-4 h-4" />,
        });
        return;
      }

      setStatus("submitting");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.errors?._form || "Something went wrong. Please try again.");
        }

        setStatus("success");
        toast.success("Message sent successfully! 🎉", {
          description: "We'll get back to you within 24 hours. Check your email for confirmation.",
          duration: 6000,
          icon: <CheckCircle className="w-4 h-4 text-green-400" />,
        });

        // Reset form after 2 seconds
        setTimeout(() => {
          setFormData(initialFormData);
          setErrors({});
          setTouched(new Set());
          setStatus("idle");
        }, 2000);
      } catch (error) {
        setStatus("error");
        const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
        setErrors((prev) => ({ ...prev, _form: message }));
        toast.error(message, {
          icon: <AlertCircle className="w-4 h-4" />,
        });
        setStatus("idle");
      }
    },
    [formData]
  );

  // ---- Helpers ----

  const inputClasses =
    "w-full px-4 py-2.5 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50";
  const inputErrorClasses =
    "w-full px-4 py-2.5 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-shadow border border-red-500/30";
  const labelClasses = "block text-sm font-medium text-foreground/80 mb-1.5";
  const errorTextClasses = "text-xs text-red-500 mt-1 flex items-center gap-1";

  const getInputClass = (field: keyof FormData) =>
    errors[field as keyof FormErrors] && touched.has(field) ? inputErrorClasses : inputClasses;

  return (
    <>
      {/* ===== Page Header ===== */}
      <section className="relative pt-32 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="container-custom mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              Contact Us
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Let&apos;s <span className="gradient-text">Talk</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business? Book a free consultation and let&apos;s
              discuss how we can help you achieve your goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Contact Info Cards ===== */}
      <section className="section-padding pt-0">
        <div className="container-custom mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
            {[
              { icon: Mail, label: "Email", value: "aisolutionit26@gmail.com", href: "mailto:aisolutionit26@gmail.com" },
              { icon: Phone, label: "Phone", value: "+447418354297", href: "tel:+447418354297" },
              { icon: MapPin, label: "Office", value: "Mart Lot 5796-B ,Jalan imam haji omar kampung sungai pinang ,4920 pulau indah,Selangor", href: "#" },
            ].map((item) => (
              <GlassCard key={item.label} glow="blue" className="p-5 text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                <a href={item.href} className="text-sm font-medium hover:text-primary transition-colors">
                  {item.value}
                </a>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Main Contact Section ===== */}
      <section className="section-padding pt-0">
        <div className="container-custom mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* ---- Form ---- */}
            <div className="lg:col-span-3">
              <GlassCard glow="blue" className="p-6 md:p-8">
                <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>

                {/* Global form error */}
                {errors._form && (
                  <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-500 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errors._form}
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                  {/* Row: Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className={labelClasses}>
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass("name")}
                        disabled={status === "submitting"}
                      />
                      {errors.name && touched.has("name") && (
                        <p className={errorTextClasses}>
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClasses}>
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass("email")}
                        disabled={status === "submitting"}
                      />
                      {errors.email && touched.has("email") && (
                        <p className={errorTextClasses}>
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row: Phone + Service */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+447418354297"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass("phone")}
                        disabled={status === "submitting"}
                      />
                      {errors.phone && touched.has("phone") && (
                        <p className={errorTextClasses}>
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="service" className={labelClasses}>Service Interest</label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={inputClasses}
                        disabled={status === "submitting"}
                      >
                        <option value="">Select a service...</option>
                        <option value="AI & Automation">AI & Automation</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Design & Branding">Design & Branding</option>
                        <option value="Video Editing">Video Editing</option>
                        <option value="Consulting">Consulting</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className={labelClasses}>
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass("subject")}
                      disabled={status === "submitting"}
                    />
                    {errors.subject && touched.has("subject") && (
                      <p className={errorTextClasses}>
                        <AlertCircle className="w-3 h-3" /> {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="budget" className={labelClasses}>Budget Range</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={inputClasses}
                      disabled={status === "submitting"}
                    >
                      <option value="">Select budget range...</option>
                      <option value="Under $5,000">Under $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                      <option value="$50,000+">$50,000+</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={labelClasses}>
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about your project, goals, and timeline..."
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass("message")}
                      disabled={status === "submitting"}
                    />
                    {errors.message && touched.has("message") && (
                      <p className={errorTextClasses}>
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="gradient"
                    className="w-full"
                    loading={status === "submitting"}
                    disabled={status === "submitting" || status === "success"}
                    icon={status === "success" ? <CheckCircle className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                  >
                    {status === "submitting"
                      ? "Sending..."
                      : status === "success"
                        ? "Message Sent!"
                        : "Send Message"}
                  </Button>
                </form>
              </GlassCard>
            </div>

            {/* ---- Sidebar ---- */}
            <div className="lg:col-span-2 space-y-6">
              {/* Office Hours */}
              <GlassCard glow="purple" className="p-6">
                <h3 className="text-lg font-bold mb-4">Office Hours</h3>
                <div className="space-y-3">
                  {[
                    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM (GMT)" },
                    { day: "Saturday", hours: "10:00 AM - 2:00 PM (GMT)" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((item) => (
                    <div key={item.day} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.day}</span>
                      <span className="font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Quick Response */}
              <GlassCard glow="cyan" className="p-6">
                <h3 className="text-lg font-bold mb-4">Quick Response</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">24 Hours</div>
                      <div className="text-xs text-muted-foreground">Average response time</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <div className="font-medium">Free Consultation</div>
                      <div className="text-xs text-muted-foreground">30-minute discovery call</div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447418354297"}?text=Hi%20AI%20Solution%20IT!%20I%20have%20a%20question.`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <GlassCard glow="cyan" className="p-5 flex items-center gap-4 hover:border-green-500/30 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">WhatsApp Us</div>
                    <div className="text-xs text-muted-foreground">Instant messaging</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </GlassCard>
              </a>

              {/* Map Placeholder */}
              <GlassCard glow="blue" className="p-0 overflow-hidden h-48">
                <div className="w-full h-full bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-primary/50 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Mart Lot 5796-B ,Jalan imam haji omar kampung sungai pinang ,4920 pulau indah,Selangor</p>
                    {/* <p className="text-xs text-muted-foreground">London, UK</p> */}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
