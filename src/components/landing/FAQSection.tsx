"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "Comment cette plateforme m'aide-t-elle en tant que distributeur Revoobit ?",
      answer:
        "Revoobit, Success Family vous permet de créer un mini-site professionnel en quelques minutes pour présenter les produits Revoobit (Miira-Cell+, Miiralife, etc.), partager votre lien de parrainage et capter de nouveaux prospects en ligne, sans aucune compétence technique.",
    },
    {
      question: "Mon mini-site sera-t-il lié à Revoobit.com ?",
      answer:
        "Oui, votre mini-site aura un sous-domaine personnalisé (ex: tonnom.revoobit-togo.com) et sera conçu pour s'intégrer harmonieusement avec l'écosystème Revoobit, tout en respectant la charte graphique de la marque.",
    },
    {
      question: "Puis-je vendre les produits Revoobit directement depuis mon site ?",
      answer:
        "Absolument ! Votre mini-site peut inclure des fiches produits pour Miira-Cell+ et autres, avec des boutons d'action pour diriger vos clients vers WhatsApp, un formulaire de commande ou votre lien de parrainage Revoobit. Vous gérez vos commandes et contacts directement.",
    },
    {
      question: "Y a-t-il des formations ou un support spécifique pour les distributeurs Revoobit ?",
      answer:
        "Oui, nous proposons des ateliers pratiques sur le marketing numérique, la vente en ligne et la gestion de la relation client, spécifiquement adaptés aux distributeurs Revoobit. Notre support est disponible 24h/7 via WhatsApp pour vous accompagner.",
    },
    {
      question: "Comment démarrer gratuitement avec Revoobit, Success Family ?",
      answer:
        "Le démarrage est gratuit pour créer votre premier mini-site Revoobit. Des options payantes sont disponibles pour des fonctionnalités avancées, et le paiement se fait via des méthodes de paiement mobile locales sécurisées (Orange Money, Moov Money, etc.) ou par carte bancaire.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted px-4"> {/* Added px-4 */}
      <div className="container mx-auto text-center"> {/* Removed px-4 md:px-6, using container mx-auto */}
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12">
          Questions fréquentes sur Revoobit, Success Family
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-base md:text-lg text-left hover:no-underline"> {/* Adjusted text size for mobile */}
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm text-left"> {/* Ensured text-sm for smaller screens */}
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}