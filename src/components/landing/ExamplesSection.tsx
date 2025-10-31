"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link"; // Import Link

// Images d'exemple qui cadrent avec les templates et montrent un aperçu du site
const exampleSites = [
  { name: "Mini-site Distributeur Revoobit (Basique)", image: "https://picsum.photos/seed/basic-website-preview/400/300" },
  { name: "Boutique Revoobit (E-commerce)", image: "https://picsum.photos/seed/ecommerce-shop-interior/400/300" },
  { name: "Page de Présentation Produits Revoobit", image: "https://picsum.photos/seed/service-portfolio-showcase/400/300" },
  { name: "Portfolio Distributeur Revoobit (Professionnel)", image: "https://picsum.photos/seed/professional-portfolio-digital/400/300" },
  { name: "Page de Capture Leads Revoobit", image: "https://picsum.photos/seed/artisan-ecommerce-products/400/300" },
];

export function ExamplesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted px-4"> {/* Added px-4 */}
      <div className="container mx-auto text-center"> {/* Removed px-4 md:px-6, using container mx-auto */}
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12">
          Découvre des exemples de mini-sites Revoobit
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {exampleSites.map((site, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src={site.image}
                alt={site.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white text-lg font-semibold">{site.name}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link href="/create-site/select-template" passHref>
            <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto">
              <div>
                Crée ton mini-site Revoobit maintenant
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}