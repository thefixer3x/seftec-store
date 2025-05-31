
import React from 'react';
import { CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

export function HeroSliderNavigation() {
  return (
    <>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white" />
    </>
  );
}
