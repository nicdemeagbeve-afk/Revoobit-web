"use client";

import React from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Grâce à cette plateforme, j'ai pu créer mon mini-site Revoobit en un clin d'œil et mes ventes de Miira-Cell+ ont explosé !",
      author: "Afia",
      location: "Lomé",
    },
    {
      quote: "Mon réseau s'est considérablement élargi. Avoir une présence en ligne professionnelle pour Revoobit a tout changé.",
      author: "Koffi",
      location: "Kara",
    },
    {
      quote: "Enfin une solution simple et efficace pour promouvoir les produits Revoobit sur les réseaux sociaux. Le support est top !",
      author: "Esi",
      location: "Sokodé",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background px-4"> {/* Added px-4 */}
      <div className="container mx-auto text-center"> {/* Removed px-4 md:px-6, using container mx-auto */}
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
          Ce que nos distributeurs Revoobit disent de nous
        </h2>
        <div className="flex items-center justify-center gap-2 mb-8">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xl md:text-2xl font-semibold">4.9/5</span> {/* Adjusted text size for mobile */}
        </div>
        <p className="text-lg md:text-xl text-muted-foreground mb-12"> {/* Adjusted text size for mobile */}
          +1000 distributeurs Revoobit satisfaits
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"> {/* Adjusted gap and grid for mobile */}
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 text-left shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <p className="text-base italic mb-4">"{testimonial.quote}"</p> {/* Adjusted text size for mobile */}
                <p className="font-semibold text-primary text-sm"> {/* Adjusted text size for mobile */}
                  – {testimonial.author}, {testimonial.location}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}