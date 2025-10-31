"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Lightbulb, Users, User as UserIcon, Target, Globe } from "lucide-react"; // Added Target and Globe icons
import { getSupabaseStorageUrl } from "@/lib/utils"; // Import getSupabaseStorageUrl

export function AboutSection() {
  const teamMembers = [
    {
      name: "Nicodème AGBEVE",
      role: "Fondateur & Développeur",
      description: "Visionnaire et architecte technique de Revoobit Togo Digital Hub, il transforme les idées en réalité numérique pour les distributeurs Revoobit.",
      // avatar: "team-nicodeme.png", // Supprimé pour utiliser l'icône générique
    },
    {
      name: "Christian ADEGBETI",
      role: "Co-fondateur & Cybersec",
      description: "Garant de la sécurité de nos plateformes et de la protection des données des distributeurs Revoobit.",
      // avatar: "team-christian.png", // Supprimé pour utiliser l'icône générique
    },
    {
      name: "Communication & Media Manager",
      role: "Un membre clé de notre équipe",
      description: "Assure la visibilité de Revoobit Togo Digital Hub et la connexion avec notre communauté de distributeurs.",
      // avatar: "team-generic-1.png", // Supprimé pour utiliser l'icône générique
    },
    {
      name: "Développeur Back-end",
      role: "Un membre clé de notre équipe",
      description: "Construit l'infrastructure robuste qui alimente les mini-sites Revoobit automatisés.",
      // avatar: "team-generic-2.png", // Supprimé pour utiliser l'icône générique
    },
    {
      name: "Développeur Front-end",
      role: "Un membre clé de notre équipe",
      description: "Crée des interfaces utilisateur intuitives et esthétiques pour une expérience optimale des distributeurs Revoobit.",
      // avatar: "team-generic-3.png", // Supprimé pour utiliser l'icône générique
    },
  ];

  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-blue-600">
          À propos de Revoobit Togo Digital Hub
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Bienvenue chez Revoobit Togo Digital Hub, la filiale officielle de Revoobit dédiée à accompagner les distributeurs et partenaires du Togo dans leur transformation digitale. Nous agissons en synergie avec revoobit.com pour vous offrir des outils, formations et solutions numériques adaptés aux réalités locales.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-left space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Target className="h-7 w-7 text-red-500" /> Notre Objectif Principal
            </h3>
            <p className="text-base text-gray-700 leading-relaxed">
              Permettre à chaque distributeur togolais de Revoobit d’avoir une <span className="font-semibold text-blue-600">présence en ligne professionnelle</span>, de mieux promouvoir les produits Revoobit (Miira-Cell+, Miiralife, etc.) sur les réseaux sociaux et plateformes e-commerce, et d’élargir sa clientèle grâce à des stratégies digitales simples, efficaces et éthiques.
            </p>
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Lightbulb className="h-7 w-7 text-blue-600" /> Nos Missions
            </h3>
            <ul className="list-disc list-inside text-base text-gray-700 leading-relaxed space-y-2">
              <li>**Digitalisation du réseau** : Création de mini-sites, boutiques et pages personnalisées pour chaque distributeur.</li>
              <li>**Formation & accompagnement** : Ateliers pratiques sur le marketing numérique, la vente en ligne et la gestion de la relation client.</li>
              <li>**Support & communication locale** : Production de contenus (visuels, vidéos, messages promotionnels) adaptés au marché togolais et conformes à la charte Revoobit internationale.</li>
              <li>**Synergie avec le site principal** : Les outils du Hub Togo sont interconnectés avec revoobit.com, garantissant une cohérence de marque, des mises à jour produits centralisées, et une communication fluide entre le siège et les partenaires locaux.</li>
            </ul>
          </div>
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src={getSupabaseStorageUrl("about-miabesite-hero.png")} // Using Supabase storage URL
              alt="À propos de Revoobit Togo Digital Hub"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-black">
          Notre Engagement
        </h3>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Revoobit Togo Digital Hub s’engage à soutenir le développement professionnel et financier des revendeurs, à promouvoir un usage responsable et éthique du digital, et à contribuer à la notoriété de Revoobit en Afrique de l’Ouest par la qualité, la transparence et l’innovation.
        </p>

        <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-black">
          Notre Vision
        </h3>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Faire du Togo un centre de référence numérique Revoobit en Afrique francophone, où chaque vendeur peut bâtir une présence digitale solide et durable tout en représentant fièrement la marque Revoobit.
        </p>

        <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-black">
          Notre Équipe
        </h3>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Revoobit Togo Digital Hub est fier d'être une équipe locale passionnée par le numérique, dédiée à soutenir la croissance économique de notre région et le succès de chaque distributeur Revoobit.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={index} className="flex flex-col items-center p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-500">
              <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4 border-4 border-yellow-400 flex items-center justify-center bg-gray-200">
                {/* Affiche toujours l'icône UserIcon */}
                <UserIcon className="h-16 w-16 text-gray-500" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h4>
              <p className="text-blue-600 font-medium mb-3">{member.role}</p>
              <p className="text-sm text-gray-600">{member.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}