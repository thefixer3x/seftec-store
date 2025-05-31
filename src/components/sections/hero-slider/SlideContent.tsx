
import * as React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slide } from "./types";

interface SlideContentProps {
  slide: Slide;
}

export function SlideContent({ slide: s }: SlideContentProps) {
  return (
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
  );
}
