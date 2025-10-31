import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { AboutSection } from "@/components/AboutSection"; // Import the moved AboutSection

export const metadata: Metadata = {
  title: "À propos de Revoobit Togo Digital Hub",
  description: "Découvrez la mission, la vision et l'équipe de Revoobit Togo Digital Hub, votre partenaire digital.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}