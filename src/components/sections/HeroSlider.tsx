
import * as React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { slides } from "@/data/hero-slides";
import { HeroSlideContent } from "./hero/HeroSlideContent";
import { HeroSliderNavigation } from "./hero/HeroSliderNavigation";

export default function HeroSlider() {
  return (
    <section className="relative min-h-screen">
      <Carousel
        opts={{
          loop: true,
          align: "center",
          duration: 25
        }}
        className="w-full overflow-hidden"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="w-full">
              <HeroSlideContent slide={slide} />
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <HeroSliderNavigation />
      </Carousel>
    </section>
  );
}
