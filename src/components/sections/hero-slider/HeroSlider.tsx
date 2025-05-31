
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { slides } from "./slides-data";
import { SlideContent } from "./SlideContent";

export default function HeroSlider() {
  return (
    <section className="relative min-h-screen">
      <Carousel
        opts={{ loop: true, align: "center" }}
        plugins={[
          Autoplay({
            delay: 8000,
            stopOnInteraction: false,
            stopOnMouseEnter: true
          }),
        ]}
        className="w-full overflow-hidden"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="w-full">
              <SlideContent slide={slide} />
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
