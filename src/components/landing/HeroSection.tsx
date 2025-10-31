"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link"; // Import Link
import { getSupabaseStorageUrl } from "@/lib/utils"; // Import getSupabaseStorageUrl

export function HeroSection() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 text-primary-foreground px-4 overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={getSupabaseStorageUrl("hero-video.mp4")} // Using Supabase storage URL
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-600/80 z-10"></div>

      <div className="container mx-auto text-center relative z-20"> {/* Ensure text is above the overlay */}
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            Développe ton business Revoobit en ligne.
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-light">
            Crée ton site professionnel en 5 minutes pour promouvoir les produits Revoobit et élargir ta clientèle — <span className="font-semibold">Gratuitement</span> !
          </p>
          {/* Bouton 'Créer mon site maintenant' supprimé comme demandé */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 text-base md:text-lg">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-300" />
              <span>Présence Digitale Professionnelle</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-300" />
              <span>Promotion Efficace des Produits Revoobit</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-300" />
              <span>Support Dédié aux Distributeurs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}