
import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import { Star, MessageCircle, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();

  // Data for the testimonials section with translations
  const testimonialsData = [
    {
      name: t('testimonials.sarah_johnson.name', 'Sarah Johnson'),
      company: t('testimonials.sarah_johnson.company', 'TechAdvance Inc.'),
      quote: t('testimonials.sarah_johnson.quote', "The AI assistant feature has revolutionized our decision-making process. We've seen a 30% increase in operational efficiency since implementation."),
      stars: 5,
      role: t('testimonials.sarah_johnson.role', 'Head of Operations')
    },
    {
      name: t('testimonials.michael_chen.name', 'Michael Chen'),
      company: t('testimonials.michael_chen.company', 'GlobalTrade Solutions'),
      quote: t('testimonials.michael_chen.quote', "The platform's ability to analyze market trends and provide strategic recommendations has been invaluable for our international expansion."),
      stars: 5,
      role: t('testimonials.michael_chen.role', 'Director of Strategy')
    },
    {
      name: t('testimonials.aisha_patel.name', 'Aisha Patel'),
      company: t('testimonials.aisha_patel.company', 'Innovate Financial'),
      quote: t('testimonials.aisha_patel.quote', "The customizable dashboard has given us unprecedented visibility into our financial performance. The AI insights are spot-on and actionable."),
      stars: 4,
      role: t('testimonials.aisha_patel.role', 'CFO')
    },
    {
      name: t('testimonials.robert_martinez.name', 'Robert Martinez'),
      company: t('testimonials.robert_martinez.company', 'MarketEdge Partners'),
      quote: t('testimonials.robert_martinez.quote', "The predictive analytics have helped us anticipate market shifts and adjust our strategy accordingly. It's like having a financial advisor available 24/7."),
      stars: 5,
      role: t('testimonials.robert_martinez.role', 'Director of Strategy')
    }
  ];
  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-seftec-darkNavy">
      <div className="container mx-auto px-6">
        <SectionHeading
          label={t('testimonials.label', 'Client Success')}
          title={t('testimonials.title', 'What Our Clients Say')}
          subtitle={t('testimonials.subtitle', 'Businesses around the world trust our platform to drive their financial decision-making and strategic planning.')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal">
          {testimonialsData.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 bg-seftec-slate dark:bg-seftec-darkNavy/80 border border-seftec-slate dark:border-white/10 hover:shadow-apple transition-all duration-500 animate-fade-up relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="absolute top-6 right-6 text-seftec-navy/10 dark:text-white/10" size={48} />

              <div className="flex flex-col h-full">
                <div className="mb-4 flex">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="text-seftec-gold dark:text-seftec-gold" size={20} fill="currentColor" />
                  ))}
                </div>

                <p className="text-seftec-navy/80 dark:text-white/80 italic mb-6 relative z-10">"{testimonial.quote}"</p>

                <div className="mt-auto flex items-center gap-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-seftec-navy/10 dark:bg-white/10 flex items-center justify-center">
                    <MessageCircle className="text-seftec-navy dark:text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-seftec-navy dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-seftec-navy/70 dark:text-white/70">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
