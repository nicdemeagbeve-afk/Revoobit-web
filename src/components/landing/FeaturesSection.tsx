"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Server, Settings, Layout, Smartphone, FileText } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Sous-domaine Revoobit personnalisé",
      description: "(tonnom.revoobit-togo.com)",
    },
    {
      icon: <Server className="h-6 w-6 text-primary" />,
      title: "Hébergement optimisé Revoobit",
      description: "(Serveurs rapides, 99% uptime)",
    },
    {
      icon: <Settings className="h-6 w-6 text-primary" />,
      title: "Maintenance & Mises à jour Revoobit",
      description: "(Sécurité, support, conformité Revoobit)",
    },
    {
      icon: <Layout className="h-6 w-6 text-primary" />,
      title: "Design professionnel Revoobit",
      description: "(Adapté aux produits et à la marque Revoobit)",
    },
    {
      icon: <Smartphone className="h-6 w-6 text-primary" />,
      title: "Site responsive pour tous les appareils",
      description: "(Accessible sur téléphone, tablette, PC)",
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "Contenu intelligent pour tes produits",
      description: "(Textes générés pour Miira-Cell+, Miiralife, etc.)",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted px-4"> {/* Added px-4 */}
      <div className="container mx-auto text-center"> {/* Removed px-4 md:px-6, using container mx-auto */}
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12">
          Ce que tu obtiens pour booster ta présence Revoobit
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"> {/* Added max-w-5xl mx-auto */}
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{feature.description}</p> {/* Ensured text-sm for smaller screens */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}