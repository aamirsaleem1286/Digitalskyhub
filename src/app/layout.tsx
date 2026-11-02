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
    default: "AI Solution IT | AI, Automation & Digital Innovation",
    template: "%s | AI Solution IT",
  },
  description:
    "AI Solution IT transforms businesses with AI, automation, and custom software. We build enterprise-grade AI solutions, stunning digital experiences, and intelligent automation systems.",
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
  authors: [{ name: "AI Solution IT" }],
  creator: "AI Solution IT",
  publisher: "AI Solution IT",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AI Solution IT",
    title: "AI Solution IT | AI, Automation & Digital Innovation",
    description:
      "Transforming Businesses with AI, Automation & Digital Innovation. Build smarter businesses with cutting-edge technology.",
    url: "https://aisolutionit.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Solution IT | AI, Automation & Digital Innovation",
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
              name: "AI Solution IT",
              url: "https://aisolutionit.com",
              logo: "https://aisolutionit.com/logo.png",
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
                telephone: "+447418354297",
                contactType: "sales",
                email: "aisolutionit26@gmail.com",
              },
              sameAs: [
                "https://linkedin.com/company/aisolutionit",
                "https://twitter.com/aisolutionit",
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
