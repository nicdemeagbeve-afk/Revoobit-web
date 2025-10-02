import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import { 
  Heart,
  Star,
  Shield,
  Truck,
  Check,
  ArrowRight,
  ShoppingCart,
  Award,
  Leaf,
  Zap,
  Users,
  Clock
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import miiraCell from "@/assets/mira-cell.png";
import miiraTiara from "@/assets/miira-tiara.png";
import miiralife from "@/assets/miira-life.png";
import productPack from "@/assets/Miira-pack.png";

const Index = () => {
  const products = [
    {
      id: 1,
      name: "Miira-Cell+",
      description: "Nutriment cellulaire révolutionnaire à base de cellules souches végétales",
      price: "129,00 €",
      image: miiraCell,
      features: ["Cellules souches de pomme", "Régénération cellulaire", "Énergie et vitalité"],
      badge: "Best-seller"
    },
    {
      id: 2,
      name: "Miira Tiara",
      description: "Soin complet pour une peau radieuse et revitalisée",
      price: "89,00 €",
      image: miiraTiara,
      features: ["Éclat immédiat", "Hydratation profonde", "Anti-âge naturel"],
      badge: "Nouveau"
    },
    {
      id: 3,
      name: "Miiralife",
      description: "Supplement de bien-être quotidien pour une protection cellulaire optimale",
      price: "79,00 €",
      image: miiralife,
      features: ["Protection cellulaire", "Bien-être quotidien", "Formule complète"],
      badge: "Essentiel"
    }
  ];

  const benefits = [
    {
      icon: Leaf,
      title: "100% Naturel",
      description: "Ingrédients naturels et biologiques"
    },
    {
      icon: Shield,
      title: "Qualité Premium",
      description: "Normes de qualité les plus strictes"
    },
    {
      icon: Truck,
      title: "Livraison Rapide",
      description: "Expédition sous 24h"
    },
    {
      icon: Award,
      title: "Certifié",
      description: "Produits testés et approuvés"
    }
  ];

  const testimonials = [
    {
      name: "Marie L.",
      text: "Miira-Cell+ a transformé mon énergie quotidienne. Je me sens revitalisée !",
      rating: 5
    },
    {
      name: "Pierre D.",
      text: "Miira Tiara a redonné à ma peau son éclat de jeunesse. Incroyable !",
      rating: 5
    },
    {
      name: "Sophie M.",
      text: "Miiralife est devenu indispensable à ma routine bien-être. Résultats visibles !",
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-green-800/60 to-green-900" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-green-500/20 border border-green-400/20">
                <Heart className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-white">Santé & Bien-être Naturel</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight text-white">
                Découvrez la 
                <span className="block text-green-300 mt-2">
                  Révolution Revoobit
                </span>
              </h1>
              
              <p className="text-xl text-green-100 mb-8">
                Des produits de santé innovants qui transforment votre bien-être grâce aux dernières avancées en nutrition cellulaire
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" className="group bg-green-500 hover:bg-green-600">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Acheter maintenant
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
                </Button>
                <Button variant="glass" size="xl" className="text-white border-white/20">
                  Voir les produits
                </Button>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <img 
                src={productPack} 
                alt="Produits Revoobit" 
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold animate-pulse">
                🚀 Nouveau
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-green-300/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-green-300 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth">
                  <benefit.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-900">
              Nos Produits <span className="text-green-600">Exclusifs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez la gamme complète de produits Revoobit pour votre santé et bien-être
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-smooth hover:border-green-200">
                  {product.badge && (
                    <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      {product.badge}
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-contain group-hover:scale-105 transition-smooth"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-display font-semibold mb-3 text-gray-900">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-bold text-green-600">{product.price}</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700 group">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Ajouter au panier
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-900">
              Ils nous <span className="text-green-600">font confiance</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les témoignages de nos clients satisfaits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gray-900">
                Innovation <span className="text-green-600">Scientifique</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Revoobit combine les dernières avancées en nutrition cellulaire avec des ingrédients naturels pour des résultats optimaux.
              </p>
              
              <div className="space-y-6">
                {[
                  { 
                    icon: Zap, 
                    title: "Technologie Avancée", 
                    desc: "Extraction et préservation des principes actifs naturels" 
                  },
                  { 
                    icon: Leaf, 
                    title: "Ingrédients Naturels", 
                    desc: "Sélection rigoureuse des meilleurs ingrédients biologiques" 
                  },
                  { 
                    icon: Clock, 
                    title: "Résultats Durables", 
                    desc: "Effets visibles et durables sur le long terme" 
                  }
                ].map((benefit) => (
                  <div key={benefit.title} className="flex gap-4 group">
                    <div className="bg-green-100 p-3 rounded-xl h-fit group-hover:scale-110 transition-smooth">
                      <benefit.icon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-gray-900">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-green-200">
                <div className="text-center mb-8">
                  <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Notre Engagement</h3>
                </div>
                <div className="space-y-6">
                  {[
                    { label: "Clients satisfaits", value: "10K+", color: "text-green-600" },
                    { label: "Pays desservis", value: "25+", color: "text-blue-600" },
                    { label: "Produits certifiés", value: "100%", color: "text-purple-600" },
                    { label: "Support client", value: "24/7", color: "text-orange-600" }
                  ].map((metric, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-green-100 rounded-lg">
                      <span className="text-gray-900 font-medium">{metric.label}</span>
                      <span className={`text-2xl font-bold ${metric.color}`}>{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Prêt à transformer votre bien-être ?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Rejoignez la communauté Revoobit et découvrez la différence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" className="bg-white text-green-600 hover:bg-gray-100 group">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Commander maintenant
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
              </Button>
              <Button variant="outline" size="xl" className="text-green-900 border-white hover:bg-white/10">
                Nous contacter
              </Button>
            </div>
            <p className="text-sm text-green-200 mt-4">
              Livraison gratuite à partir de 100€ • Satisfait ou remboursé sous 30 jours
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-green-500 p-2 rounded-lg">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <span className="font-display font-bold">REVOOBIT</span>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">
                Produits de santé et bien-être naturels
              </p>
              <p className="text-sm text-gray-400">
                © 2025 Revoobit. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;