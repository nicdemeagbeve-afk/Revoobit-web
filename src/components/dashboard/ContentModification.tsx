"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Palette, LayoutTemplate, Type, EyeOff } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export function ContentModification() {
  // Placeholder states for advanced design options
  const [selectedTemplate, setSelectedTemplate] = React.useState("default");
  const [primaryColor, setPrimaryColor] = React.useState("blue");
  const [secondaryColor, setSecondaryColor] = React.useState("red");
  const [fontFamily, setFontFamily] = React.useState("sans");
  const [showTestimonials, setShowTestimonials] = React.useState(true);

  const predefinedColors = [
    { value: "red", label: "Rouge" },
    { value: "blue", label: "Bleu" },
    { value: "green", label: "Vert" },
    { value: "yellow", label: "Jaune" },
    { value: "black", label: "Noir" },
    { value: "purple", label: "Violet" },
    { value: "orange", label: "Orange" },
    { value: "gray", label: "Gris" },
  ];

  const fontOptions = [
    { value: "sans", label: "Sans-serif (Moderne)" },
    { value: "serif", label: "Serif (Classique)" },
    { value: "mono", label: "Monospace (Technique)" },
  ];

  const templateOptions = [
    { value: "default", label: "Template par défaut" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "service", label: "Services" },
    { value: "portfolio", label: "Portfolio" },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">📝 Modifier le Contenu</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mode Simple */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Modification Rapide (Wizard)</h3>
          <p className="text-muted-foreground mb-4">
            Mettez à jour rapidement les informations clés de votre site via l'assistant.
          </p>
          <Button asChild size="lg" className="w-full">
            <Link href="/create-site">
              <Pencil className="mr-2 h-5 w-5" /> Modifier le Contenu (Wizard)
            </Link>
          </Button>
        </div>

        {/* Mode Avancé */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Modifier l'Apparence (Design)</h3>
          <p className="text-muted-foreground mb-4">
            Personnalisez le design de votre site (templates, couleurs, polices, sections).
          </p>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="lg" className="w-full">
                <Palette className="mr-2 h-5 w-5" /> Modifier l'Apparence (Design)
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Options de Design Avancées</DrawerTitle>
                  <DrawerDescription>Personnalisez l'aspect visuel de votre site.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0 space-y-6">
                  {/* Changer de Template */}
                  <div className="space-y-2">
                    <Label htmlFor="template">Changer de Template</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger id="template">
                        <SelectValue placeholder="Sélectionnez un template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templateOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Choisissez un nouveau modèle pour votre site.
                    </p>
                  </div>

                  {/* Options de Couleurs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Couleur Principale</Label>
                      <Select value={primaryColor} onValueChange={setPrimaryColor}>
                        <SelectTrigger id="primary-color">
                          <SelectValue placeholder="Couleur principale" />
                        </SelectTrigger>
                        <SelectContent>
                          {predefinedColors.map((color) => (
                            <SelectItem key={color.value} value={color.value}>
                              {color.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondary-color">Couleur Secondaire</Label>
                      <Select value={secondaryColor} onValueChange={setSecondaryColor}>
                        <SelectTrigger id="secondary-color">
                          <SelectValue placeholder="Couleur secondaire" />
                        </SelectTrigger>
                        <SelectContent>
                          {predefinedColors.map((color) => (
                            <SelectItem key={color.value} value={color.value}>
                              {color.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Changer la Police */}
                  <div className="space-y-2">
                    <Label htmlFor="font-family">Police de Caractères</Label>
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger id="font-family">
                        <SelectValue placeholder="Sélectionnez une police" />
                      </SelectTrigger>
                      <SelectContent>
                        {fontOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Masquer/Afficher Sections */}
                  <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-testimonials">Afficher la section Témoignages</Label>
                      <p className="text-sm text-muted-foreground">
                        Contrôlez la visibilité de la section des témoignages.
                      </p>
                    </div>
                    <Switch
                      id="show-testimonials"
                      checked={showTestimonials}
                      onCheckedChange={setShowTestimonials}
                    />
                  </div>
                </div>
                <DrawerFooter>
                  <Button>Appliquer les Modifications</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Annuler</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </CardContent>
    </Card>
  );
}