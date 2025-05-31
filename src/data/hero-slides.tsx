
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import clsx from "clsx";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Globe,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

/* --------------------------------------------------------------------- */
/*  1.  SLIDES PAYLOAD                                                   */
/* --------------------------------------------------------------------- */
interface Slide {
  id: string;
  variant: "light" | "dark";
  headline: React.ReactNode;
  sub: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  badges?: Array<{ icon: React.ReactNode; text: string; className?: string }>;
  trustIndicators?: Array<{ icon: React.ReactNode; text: string }>;
  illustration?: React.ReactNode;
  backgroundPattern?: React.ReactNode;
  tagline?: string;
}

const slides: Slide[] = [
  {
    id: "trade",
    variant: "light",
    tagline: "Grow Smarter, Together",
    headline: (
      <>
        <span className="text-seftec-navy dark:text-white">Revolutionizing Global</span>{" "}
        <span className="bg-gradient-to-r from-seftec-gold to-orange-500 dark:from-seftec-teal dark:to-blue-400 bg-clip-text text-transparent">
          Trade with a Trusted AI-Powered Marketplace
        </span>
      </>
    ),
    sub: "Trade with Trust, Pay with Confidence. Connect with verified businesses worldwide, transact securely, and access financing solutions all in one platform.",
    primaryCta: { label: "Get Started", href: "/register" },
    secondaryCta: { label: "Book a Demo", href: "/contact" },
    badges: [
      {
        icon: <Globe className="w-4 h-4" />,
        text: "The Future of Secure B2B Trade & Vendor Payments",
        className: "bg-white/90 text-seftec-navy border-seftec-navy/20"
      },
      {
        icon: <Shield className="w-4 h-4" />,
        text: "ISO 20022 Compliant DeFi Leadership",
        className: "bg-seftec-gold/10 text-seftec-navy dark:text-seftec-gold border-seftec-gold/30"
      }
    ],
    backgroundPattern: (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-seftec-gold/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-seftec-teal/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-seftec-gold/5 to-seftec-teal/5 rounded-full filter blur-3xl"></div>
      </div>
    )
  },
  {
    id: "bizgenie",
    variant: "dark",
    headline: (
      <>
        Transform Your{' '}
        <span className="bg-gradient-teal-purple bg-clip-text text-transparent">
          Business
        </span>
        <br className="hidden sm:block" />
        <span className="block sm:inline"> with AI</span>
      </>
    ),
    sub: "Unlock enterprise-grade DeFi access, AI-powered marketplace solutions, and intelligent business automation in one comprehensive platform.",
    primaryCta: { label: "Get Started Free", href: "/register" },
    secondaryCta: { label: "Try BizGenie AI", href: "/bizgenie" },
    badges: [
      {
        icon: <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-sparkle" />,
        text: "AI-Powered Business Platform",
        className: "bg-white/80 dark:bg-seftec-charcoal/80 backdrop-blur-sm border border-seftec-navy/10 dark:border-white/10"
      }
    ],
    trustIndicators: [
      { icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-seftec-teal" />, text: "Enterprise Security" },
      { icon: <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-seftec-purple" />, text: "Global Compliance" },
      { icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-seftec-gold" />, text: "24/7 AI Support" }
    ],
    illustration: (
      <div className="relative bg-gradient-to-br from-white/50 to-seftec-slate/30 dark:from-seftec-charcoal/50 dark:to-seftec-navy/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-2xl">
        <div className="bg-white dark:bg-seftec-darkNavy rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-teal-purple rounded-lg flex items-center justify-center">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="text-sm sm:text-base font-semibold text-seftec-navy dark:text-white">
                SEFTECHUB
              </span>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-seftec-slate/50 dark:bg-seftec-charcoal/50 rounded-lg p-3 sm:p-4">
              <div className="text-xs sm:text-sm text-seftec-navy/60 dark:text-white/60">Revenue</div>
              <div className="text-lg sm:text-xl font-bold text-seftec-navy dark:text-white">₦2.4M</div>
              <div className="text-xs text-green-500">+24%</div>
            </div>
            <div className="bg-seftec-slate/50 dark:bg-seftec-charcoal/50 rounded-lg p-3 sm:p-4">
              <div className="text-xs sm:text-sm text-seftec-navy/60 dark:text-white/60">Growth</div>
              <div className="text-lg sm:text-xl font-bold text-seftec-navy dark:text-white">87%</div>
              <div className="text-xs text-seftec-teal">+12%</div>
            </div>
          </div>
          
          <div className="h-20 sm:h-24 bg-gradient-to-r from-seftec-teal/20 to-seftec-purple/20 rounded-lg flex items-end justify-between p-2 sm:p-3">
            {[40, 60, 35, 80, 45, 70, 90].map((height, i) => (
              <div 
                key={i} 
                className="bg-gradient-teal-purple rounded-sm animate-pulse"
                style={{ 
                  height: `${height}%`, 
                  width: `${100/7 - 2}%`,
                  animationDelay: `${i * 100}ms`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    backgroundPattern: (
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="hidden lg:block absolute top-1/4 left-1/4 w-2 h-2 bg-seftec-gold rounded-full animate-pulse"></div>
        <div className="hidden lg:block absolute top-3/4 right-1/4 w-3 h-3 bg-seftec-teal rounded-full animate-bounce"></div>
        <div className="hidden lg:block absolute bottom-1/4 left-1/3 w-1 h-1 bg-seftec-purple rounded-full animate-pulse"></div>
      </div>
    )
  }
];

/* --------------------------------------------------------------------- */
/*  2.  COMPONENT                                                        */
/* --------------------------------------------------------------------- */
export default function HeroSlider() {
  return (
    <section className="relative min-h-screen">
      <Carousel
        opts={{ loop: true, align: "center" }}
        plugins={[
          Autoplay({ delay: 8000, stopOnInteraction: true }),
        ]}
        className="w-full overflow-hidden"
      >
        <CarouselContent>
          {slides.map((s) => (
            <CarouselItem key={s.id} className="w-full">
              {/* ---------- SLIDE SHELL ---------- */}
              <section
                className={clsx(
                  "relative flex items-center justify-center py-16 md:py-24",
                  s.variant === "dark"
                    ? "bg-neutral-950 text-white"
                    : "bg-gradient-to-b from-white to-sky-50 text-neutral-800"
                )}
              >
                {/* decorative blobs / patterns */}
                {s.backgroundPattern}

                {/* ---------- INNER GRID ---------- */}
                <div className="container mx-auto px-4 md:grid md:grid-cols-[1fr_auto] md:gap-12">
                  {/* ---- COPY BLOCK ---- */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-xl text-center md:text-left space-y-6"
                  >
                    {/* Tagline */}
                    {s.tagline && (
                      <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
                        {s.tagline}
                      </span>
                    )}

                    {/* Badges */}
                    {s.badges && (
                      <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        {s.badges.map((b, i) => (
                          <span
                            key={i}
                            className={clsx(
                              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm text-xs font-medium shadow",
                              b.className
                            )}
                          >
                            {b.icon}
                            {b.text}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Headline + sub */}
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight">
                      {s.headline}
                    </h1>
                    <p className="text-lg leading-relaxed">{s.sub}</p>

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                      <Link to={s.primaryCta.href} className="group w-full sm:w-auto">
                        <Button
                          size="lg"
                          className="w-full sm:w-auto bg-gradient-teal-purple text-white hover:opacity-90 shadow-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl group-hover:scale-105 transition"
                        >
                          {s.primaryCta.label}
                          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>

                      {s.secondaryCta && (
                        <Link to={s.secondaryCta.href} className="w-full sm:w-auto">
                          <Button
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto border-2 border-seftec-navy/20 dark:border-white/20 hover:border-seftec-teal dark:hover:border-seftec-gold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition hover:scale-105"
                          >
                            {s.secondaryCta.label}
                          </Button>
                        </Link>
                      )}
                    </div>

                    {/* Trust indicators */}
                    {s.trustIndicators && (
                      <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-6">
                        {s.trustIndicators.map((ti, i) => (
                          <span key={i} className="inline-flex items-center gap-2 text-sm">
                            {ti.icon}
                            {ti.text}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>

                  {/* ---- ILLUSTRATION ---- */}
                  {s.illustration && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 0.7,
                        ease: "easeOut",
                        delay: 0.2,
                      }}
                      viewport={{ once: true }}
                      className="mx-auto mt-12 md:mt-0 max-w-[340px] md:max-w-[420px]"
                    >
                      {s.illustration}
                    </motion.div>
                  )}
                </div>
              </section>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* ---------- CONTROLS ---------- */}
        <CarouselPrevious
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2"
        />
        <CarouselNext
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2"
        />
      </Carousel>
    </section>
  );
}
