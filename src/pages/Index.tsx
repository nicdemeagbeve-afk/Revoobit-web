import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Users, 
  Globe, 
  BarChart3, 
  Zap, 
  Shield, 
  Rocket,
  ArrowRight,
  Check
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import featureManagement from "@/assets/feature-management.png";
import featureWebsites from "@/assets/feature-websites.png";
import featureStats from "@/assets/feature-stats.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full gradient-glass border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Plateforme Nouvelle Génération</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              REVOOBIT
              <span className="block gradient-hero bg-clip-text text-transparent mt-2">
                Réinventer l'expérience numérique
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              La plateforme tout-en-un pour gérer vos affiliés et créer des mini-sites professionnels en quelques clics
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admin">
                <Button variant="hero" size="xl" className="group">
                  Découvrir la plateforme
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
                </Button>
              </Link>
              <Button variant="glass" size="xl">
                Voir la démo
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Fonctionnalités <span className="gradient-hero bg-clip-text text-transparent">Puissantes</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour gérer votre réseau d'affiliés
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group">
              <div className="gradient-glass border border-border rounded-2xl p-8 hover:border-primary/40 transition-smooth hover:shadow-elegant">
                <div className="mb-6">
                  <img 
                    src={featureManagement} 
                    alt="Gestion des affiliés" 
                    className="w-full h-48 object-contain animate-float"
                  />
                </div>
                <div className="gradient-primary p-3 rounded-xl w-fit mb-4 shadow-glow">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-3">
                  Gestion des affiliés
                </h3>
                <p className="text-muted-foreground mb-4">
                  Créez, gérez et suivez vos affiliés en temps réel avec une interface intuitive
                </p>
                <ul className="space-y-2">
                  {["Création rapide", "Activation/Suspension", "Statistiques détaillées"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-secondary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group">
              <div className="gradient-glass border border-border rounded-2xl p-8 hover:border-primary/40 transition-smooth hover:shadow-elegant">
                <div className="mb-6">
                  <img 
                    src={featureWebsites} 
                    alt="Création de mini-sites" 
                    className="w-full h-48 object-contain animate-float"
                    style={{ animationDelay: "1s" }}
                  />
                </div>
                <div className="gradient-secondary p-3 rounded-xl w-fit mb-4 shadow-glow">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-3">
                  Mini-sites professionnels
                </h3>
                <p className="text-muted-foreground mb-4">
                  Créez des sites web élégants pour vos affiliés avec notre éditeur visuel
                </p>
                <ul className="space-y-2">
                  {["Éditeur drag & drop", "Templates premium", "Responsive design"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-secondary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group">
              <div className="gradient-glass border border-border rounded-2xl p-8 hover:border-primary/40 transition-smooth hover:shadow-elegant">
                <div className="mb-6">
                  <img 
                    src={featureStats} 
                    alt="Statistiques avancées" 
                    className="w-full h-48 object-contain animate-float"
                    style={{ animationDelay: "2s" }}
                  />
                </div>
                <div className="bg-accent p-3 rounded-xl w-fit mb-4 shadow-glow">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-3">
                  Statistiques avancées
                </h3>
                <p className="text-muted-foreground mb-4">
                  Analysez les performances avec des tableaux de bord interactifs
                </p>
                <ul className="space-y-2">
                  {["Analytics en temps réel", "Graphiques interactifs", "Export de données"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-secondary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Pourquoi choisir <span className="gradient-hero bg-clip-text text-transparent">Revoobit</span> ?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Une plateforme pensée pour les professionnels qui veulent aller plus loin
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Zap, title: "Rapide et efficace", desc: "Configuration en quelques minutes" },
                  { icon: Shield, title: "Sécurisé", desc: "Vos données sont protégées" },
                  { icon: Rocket, title: "Évolutif", desc: "Grandit avec votre activité" }
                ].map((benefit) => (
                  <div key={benefit.title} className="flex gap-4 group">
                    <div className="gradient-primary p-3 rounded-xl h-fit shadow-glow group-hover:scale-110 transition-smooth">
                      <benefit.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="gradient-glass border border-primary/20 rounded-3xl p-8 shadow-elegant">
                <div className="space-y-4">
                  <div className="gradient-hero h-4 w-3/4 rounded animate-pulse" />
                  <div className="bg-secondary/20 h-4 w-1/2 rounded animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <div className="bg-accent/20 h-4 w-2/3 rounded animate-pulse" style={{ animationDelay: "0.4s" }} />
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="gradient-glass border border-border rounded-xl p-4">
                      <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent mb-1">99.9%</div>
                      <div className="text-sm text-muted-foreground">Uptime</div>
                    </div>
                    <div className="gradient-glass border border-border rounded-xl p-4">
                      <div className="text-3xl font-bold gradient-secondary bg-clip-text text-transparent mb-1">24/7</div>
                      <div className="text-sm text-muted-foreground">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Prêt à transformer votre activité ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Rejoignez les professionnels qui font confiance à Revoobit
            </p>
            <Link to="/admin">
              <Button variant="premium" size="xl" className="group">
                Commencer maintenant
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="gradient-hero p-2 rounded-lg">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-display font-bold">REVOOBIT</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Revoobit. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
