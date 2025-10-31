"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, DollarSign, Star, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function PricingSection() {
  const plans = [
    {
      name: "Gratuit (Distributeur Débutant)",
      price: "0 F CFA",
      description: "Idéal pour lancer votre présence Revoobit en ligne.",
      features: [
        "1 mini-site Revoobit basique",
        "Sous-domaine personnalisé (tonnom.revoobit-togo.com)",
        "Présentation des produits Revoobit",
        "Lien direct vers votre WhatsApp",
        "Support WhatsApp limité",
      ],
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      buttonText: "Démarrer mon mini-site Revoobit",
      buttonVariant: "outline",
      link: "/create-site/select-template",
    },
    {
      name: "Standard (Distributeur Actif)",
      price: "1500 F CFA/mois",
      description: "Pour les distributeurs Revoobit qui veulent plus de visibilité et de ventes.",
      features: [
        "Jusqu'à 3 mini-sites Revoobit (1 premium)",
        "Toutes les fonctionnalités du plan Gratuit",
        "Paiement mobile intégré pour vos commandes",
        "Support WhatsApp et Email prioritaire",
        "Statistiques de base des visites",
      ],
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
      buttonText: "Choisir le plan Standard Revoobit",
      buttonVariant: "default",
      link: "/signup", // Or a specific pricing checkout page
    },
    {
      name: "Premium (Leader Revoobit)",
      price: "2500 F CFA/mois",
      description: "La solution complète pour les leaders Revoobit exigeants.",
      features: [
        "Jusqu'à 5 mini-sites Revoobit (3 premium)",
        "Toutes les fonctionnalités du plan Standard",
        "Paiement international pour vos clients",
        "Support VIP 24h/7",
        "Exportation de données clients",
        "Domaine personnalisé (ex: monrevoobit.com)",
        "Statistiques avancées et rapports",
      ],
      icon: <Crown className="h-6 w-6 text-purple-500" />,
      buttonText: "Choisir le plan Premium Revoobit",
      buttonVariant: "default",
      link: "/signup", // Or a specific pricing checkout page
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background px-4" id="pricing">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          Nos Plans d'Abonnement pour Distributeurs Revoobit
        </h2>
        <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Choisissez le plan qui propulsera votre activité Revoobit au niveau supérieur.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={cn(
              "flex flex-col p-6 text-left shadow-lg transition-all duration-300 hover:scale-[1.02]",
              plan.name === "Standard (Distributeur Actif)" && "border-2 border-primary"
            )}>
              <CardHeader className="pb-4 flex flex-col items-center text-center">
                <div className="mb-4">{plan.icon}</div>
                <CardTitle className="text-xl md:text-2xl font-bold mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground text-sm">{plan.description}</CardDescription>
                <p className="text-3xl md:text-4xl font-extrabold mt-4 mb-6">
                  {plan.price}
                  {plan.name !== "Gratuit (Distributeur Débutant)" && <span className="text-base font-medium text-muted-foreground">/mois</span>}
                </p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between p-0">
                <Link href={plan.link} passHref>
                  <Button asChild className="w-full mt-auto" variant={plan.buttonVariant as any}>
                    <div>
                      {plan.buttonText}
                    </div>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Nouvelle section CTA supprimée comme demandé */}
      </div>
    </section>
  );
}