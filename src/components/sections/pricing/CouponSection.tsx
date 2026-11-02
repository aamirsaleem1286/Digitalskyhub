"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const offers = {
  SAR: [
    { pay: "3,500", get: "5,000", validity: "30 Days" },
    { pay: "5,000", get: "7,100", validity: "45 Days" },
    { pay: "6,500", get: "9,300", validity: "75 Days" },
  ],
  RM: [
    { pay: "3,500", get: "5,000", validity: "30 Days" },
    { pay: "5,000", get: "7,100", validity: "45 Days" },
    { pay: "6,500", get: "9,300", validity: "75 Days" },
  ],
} as const;

type Currency = keyof typeof offers;

const whatsappHref = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447418354297"}`;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function CouponLogo() {
  return (
    <div className="flex items-center justify-center gap-3">
      <svg viewBox="0 0 48 48" className="w-11 h-11 flex-shrink-0" aria-hidden="true">
        <rect width="48" height="48" rx="12" fill="#021E64" />
        <path
          d="M24 11 L34 37 H29.2 L27.3 31.5 H20.7 L18.8 37 H14 Z M22 27.2 H26 L24 21.5 Z"
          fill="#38BDF8"
        />
        <rect x="35" y="9" width="4" height="4" fill="#F97316" />
        <rect x="9" y="35" width="4" height="4" fill="#2563EB" />
        <rect x="9" y="9" width="3" height="3" fill="#FFFFFF" opacity="0.5" />
      </svg>
      <div className="text-left">
        <div className="text-base md:text-lg font-extrabold tracking-tight text-[#021E64]">
          AI SOLUTION IT
        </div>
        <div className="text-[9px] md:text-[10px] font-semibold tracking-[0.18em] text-[#2563EB]">
          EMPOWERING BUSINESSES DIGITALLY
        </div>
      </div>
    </div>
  );
}

export function CouponSection() {
  const [currency, setCurrency] = useState<Currency>("SAR");
  const coupons = offers[currency];

  return (
    <section className="relative pb-20 md:pb-28">
      <div className="container-custom mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto rounded-3xl overflow-hidden border border-blue-200/60 bg-gradient-to-b from-sky-50 via-blue-50 to-blue-100 shadow-2xl shadow-blue-900/10"
        >
          <div className="px-5 pt-8 pb-8 md:px-10 md:pt-10">
            <CouponLogo />

            <div className="text-center mt-8">
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[#021E64]">
                BONUS COUPON
              </h2>
              <p className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#2563EB]">
                OFFERS
              </p>
            </div>

            <div className="flex justify-center mt-5">
              <span className="px-4 md:px-5 py-2 rounded-full bg-[#F97316] text-white text-[11px] md:text-sm font-bold text-center">
                Offer valid till 27 November 2026
              </span>
            </div>

            <div className="flex justify-center mt-6">
              <div className="inline-flex p-1 rounded-full bg-white border border-blue-200 shadow-sm">
                {(["RM", "SAR"] as Currency[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setCurrency(option)}
                    className={`px-6 md:px-8 py-2 rounded-full text-sm font-bold transition-colors ${
                      currency === option
                        ? "bg-[#021E64] text-white shadow"
                        : "text-[#021E64] hover:bg-blue-50"
                    }`}
                    aria-pressed={currency === option}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {coupons.map((coupon) => (
                <div
                  key={coupon.pay}
                  className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-2 rounded-2xl bg-white border border-blue-100 shadow-md shadow-blue-900/5 p-3"
                >
                  <div className="sm:w-[32%] px-3 py-2 flex flex-col justify-center">
                    <div className="text-[10px] md:text-[11px] uppercase tracking-wide text-slate-500">
                      Pay Only
                    </div>
                    <div className="text-2xl md:text-3xl font-extrabold leading-tight text-[#2563EB]">
                      {coupon.pay}
                    </div>
                    <div className="text-[10px] md:text-[11px] font-bold text-[#021E64]">{currency}</div>
                  </div>

                  <div className="flex items-center gap-2 sm:w-[40%]">
                    <ArrowRight className="w-6 h-6 text-[#F97316] flex-shrink-0" />
                    <div className="flex-1 rounded-xl bg-[#021E64] px-3 py-2 text-center">
                      <div className="text-[9px] md:text-[10px] uppercase tracking-wide text-sky-300">
                        You Get
                      </div>
                      <div className="text-xl md:text-2xl font-extrabold text-white leading-tight">
                        {coupon.get}
                      </div>
                    </div>
                  </div>

                  <div className="sm:w-[28%] sm:ml-auto rounded-xl border border-orange-300 bg-orange-50 px-3 py-2 flex flex-col justify-center text-center">
                    <div className="text-[9px] md:text-[10px] uppercase tracking-wide text-orange-500">
                      Validity
                    </div>
                    <div className="text-lg md:text-xl font-extrabold text-[#F97316] leading-tight">
                      {coupon.validity}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <h3 className="text-base md:text-xl font-bold text-[#021E64]">
                Choose any country you want
              </h3>
              <p className="text-[11px] md:text-sm text-slate-500 mt-1">
                Available on Facebook • Instagram • WhatsApp
              </p>
            </div>
          </div>

          <div className="bg-[#021E64] px-5 py-6 md:px-10 flex flex-col items-center gap-2">
            <div className="text-white font-extrabold tracking-wide text-sm md:text-base">
              AI SOLUTION IT
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span className="text-lg md:text-xl font-extrabold">+44 7418 354297</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
