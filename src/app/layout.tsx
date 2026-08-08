import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Toaster } from "sonner";
import { ChatWidget } from "@/components/layout/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Digital Sky Hub | AI, Automation & Digital Innovation",
    template: "%s | Digital Sky Hub",
  },
  description:
    "Digital Sky Hub transforms businesses with AI, automation, and custom software. We build enterprise-grade AI solutions, stunning digital experiences, and intelligent automation systems.",
  keywords: [
    "AI solutions",
    "business automation",
    "custom software development",
    "digital transformation",
    "AI agent development",
    "web development",
    "mobile app development",
    "digital marketing",
    "UI/UX design",
  ],
  authors: [{ name: "Digital Sky Hub" }],
  creator: "Digital Sky Hub",
  publisher: "Digital Sky Hub",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Digital Sky Hub",
    title: "Digital Sky Hub | AI, Automation & Digital Innovation",
    description:
      "Transforming Businesses with AI, Automation & Digital Innovation. Build smarter businesses with cutting-edge technology.",
    url: "https://digitalskyhub.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Sky Hub | AI, Automation & Digital Innovation",
    description:
      "Transforming Businesses with AI, Automation & Digital Innovation.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* Schema.org markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Digital Sky Hub",
              url: "https://digitalskyhub.com",
              logo: "https://digitalskyhub.com/logo.png",
              description:
                "Transforming Businesses with AI, Automation & Digital Innovation.",
              foundingDate: "2024",
              founders: [{ name: "Aamir Khan" }],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dubai",
                addressCountry: "UAE",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+923312001008",
                contactType: "sales",
                email: "info@digitalskyhub.com",
              },
              sameAs: [
                "https://linkedin.com/company/digitalskyhub",
                "https://twitter.com/digitalskyhub",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          <LoadingScreen />
          <AnimatedBackground />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
          <Toaster
            position="bottom-right"
            theme="system"
            toastOptions={{
              classNames: {
                toast: "glass-strong border border-white/10",
                description: "text-sm text-muted-foreground",
                actionButton: "bg-primary text-white hover:bg-primary/90",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
