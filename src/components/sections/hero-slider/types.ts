
import * as React from "react";

export interface Slide {
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
