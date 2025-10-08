import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  ShoppingCart,
  MessageCircle,
  Send,
  Heart,
  Star,
  Truck,
  Shield,
  Users,
  ArrowRight,
  Sparkles,
  Award,
  Zap,
  CheckCircle
} from "lucide-react";

// ==================== VARIABLES CONFIGURABLES ====================
// Ces variables pourront être remplacées par les données du backend

const AFFILIATE_INFO = {
  name: "Dr. Jean Dupont",
  title: "Conseillère Santé Certifiée",
  phone: "+33 1 23 45 67 89",
  email: "jean@revoobit.com",
  zone: "Region de la savanes/Togo",
  horaires: "Lundi - Samedi • 9h00 - 20h00",
  rating: 4.9,
  reviews: 127,
  specialty: "Bien-être & Nutrition Cellulaire"
};

const PRODUCTS = [
  {
    id: 1,
    name: "Miira-Cell+",
    description: "Nutriment cellulaire révolutionnaire à base de cellules souches végétales de pomme Uttwiler Spätlauber",
    price: "129,00 €",
    features: ["Cellules souches de pomme", "Régénération cellulaire", "Énergie et vitalité", "Anti-âge naturel"],
    badge: "Best-seller",
    image: "/assets/mira-cell.png"
  },
  {
    id: 2,
    name: "Miira Tiara",
    description: "Soin complet premium pour une peau radieuse, revitalisée et régénérée",
    price: "89,00 €",
    features: ["Éclat immédiat", "Hydratation profonde", "Anti-âge naturel", "Peau repulpée"],
    badge: "Nouveau",
    image: "/assets/mira-cell.png"
  },

  {
    id: 3,
    name: "Miiralife",
    description: "Supplement de bien-être quotidien pour une protection cellulaire optimale et durable",
    price: "79,00 €",
    features: ["Protection cellulaire", "Bien-être quotidien", "Formule complète", "Énergie durable"],
    badge: "Essentiel",
    image: "/images/miiralife.png"
  }
];

const BENEFITS = [
  {
    icon: Users,
    title: "Conseils Personnalisés",
    description: "Accompagnement sur mesure selon vos objectifs bien-être"
  },
  {
    icon: Truck,
    title: "Livraison Rapide",
    description: "Expédition sous 24h partout en France"
  },
  {
    icon: Shield,
    title: "Suivi Personnalisé",
    description: "Support continu pour optimiser vos résultats"
  },
  {
    icon: Award,
    title: "Produits Certifiés",
    description: "Formules brevetées et scientifiquement étudiées"
  }
];

const TESTIMONIALS = [
  {
    name: "Marie L.",
    text: "Sarah m'a guidée vers les bons produits. Mon énergie a été transformée en 3 semaines seulement !",
    rating: 5,
    product: "Miira-Cell+"
  },
  {
    name: "Pierre D.",
    text: "Un suivi exceptionnel et des résultats visibles sur ma peau. Je recommande vivement !",
    rating: 5,
    product: "Miira Tiara"
  },
  {
    name: "Sophie M.",
    text: "Enfin des produits qui fonctionnent ! L'accompagnement personnalisé fait toute la différence.",
    rating: 5,
    product: "Miiralife"
  }
];
// ==================== FIN DES VARIABLES CONFIGURABLES ====================

const AffiliateSite = () => {
  const { id } = useParams();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [productForm, setProductForm] = useState({
    product: "",
    quantity: "1",
    notes: "",
  });

  const [chatMessage, setChatMessage] = useState("");

  const handleContact = () => {
    toast.success("Message envoyé! Nous vous répondrons bientôt.");
    setContactForm({ name: "", email: "", phone: "", message: "" });
  };

  const handleProductOrder = () => {
    toast.success("Commande envoyée! Nous vous contactons pour finaliser.");
    setProductForm({ product: "", quantity: "1", notes: "" });
  };

  const handleChatSend = () => {
    if (chatMessage.trim()) {
      toast.success("Message envoyé");
      setChatMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-green-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-gray-900">{AFFILIATE_INFO.name}</span>
              <p className="text-xs text-green-600">{AFFILIATE_INFO.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${AFFILIATE_INFO.phone}`}>
              <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-50">
                <Phone className="mr-2 h-4 w-4" />
                Appeler
              </Button>
            </a>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Commander
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Commander un produit</DialogTitle>
                  <DialogDescription>
                    Choisissez le produit qui vous intéresse
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="product">Produit</Label>
                    <select 
                      id="product"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={productForm.product}
                      onChange={(e) => setProductForm({...productForm, product: e.target.value})}
                    >
                      <option value="">Sélectionnez un produit</option>
                      {PRODUCTS.map(product => (
                        <option key={product.id} value={product.name}>
                          {product.name} - {product.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantité</Label>
                    <Input 
                      id="quantity" 
                      type="number"
                      min="1"
                      value={productForm.quantity}
                      onChange={(e) => setProductForm({...productForm, quantity: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes (optionnel)</Label>
                    <Textarea 
                      id="notes"
                      value={productForm.notes}
                      onChange={(e) => setProductForm({...productForm, notes: e.target.value})}
                      rows={3}
                      placeholder="Informations complémentaires..."
                    />
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    onClick={handleProductOrder}
                    disabled={!productForm.product}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Demander un devis
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Hero Section Attractive */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-green-500/10 border border-green-400/20">
                <Zap className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Conseillère Certifiée Revoobit</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-gray-900 leading-tight">
                Transformez Votre
                <span className="block bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent mt-2">
                  Bien-être
                </span>
                Avec Revoobit
              </h1>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Rejoignez la révolution du bien-être cellulaire. En tant que conseillère certifiée Revoobit, 
                je vous accompagne personnellement vers une santé optimale avec des produits innovants 
                aux résultats prouvés.
              </p>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{AFFILIATE_INFO.rating}/5</span>
                </div>
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">{AFFILIATE_INFO.reviews}+</span> clients satisfaits
                </div>
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="text-sm text-gray-600">
                  Spécialiste <span className="font-semibold text-green-600">{AFFILIATE_INFO.specialty}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg group">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Découvrir les Produits
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Choisissez Votre Produit</DialogTitle>
                      <DialogDescription>
                        Sélectionnez le produit qui correspond à vos objectifs
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label htmlFor="hero-product">Produit</Label>
                        <select 
                          id="hero-product"
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          value={productForm.product}
                          onChange={(e) => setProductForm({...productForm, product: e.target.value})}
                        >
                          <option value="">Sélectionnez un produit</option>
                          {PRODUCTS.map(product => (
                            <option key={product.id} value={product.name}>
                              {product.name} - {product.price}
                            </option>
                          ))}
                        </select>
                      </div>
                      <Button 
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                        onClick={handleProductOrder}
                        disabled={!productForm.product}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Obtenir mon devis personnalisé
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="lg" className="border-green-300 text-green-700 hover:bg-green-50">
                  <Phone className="mr-2 h-5 w-5" />
                  Consultation Gratuite
                </Button>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-green-200">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Vos Avantages</h3>
                  <p className="text-gray-600 mt-2">En choisissant mon accompagnement</p>
                </div>
                <div className="space-y-4">
                  {BENEFITS.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-xl bg-green-50 group hover:bg-green-100 transition-colors">
                      <div className="bg-white p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                        <item.icon className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-green-500/10 border border-green-400/20">
              <Sparkles className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Produits Exclusifs</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-900">
              La Gamme <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">Revoobit</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez nos produits innovants de bien-être cellulaire, conçus pour des résultats optimaux
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PRODUCTS.map((product) => (
              <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-green-200 relative overflow-hidden">
                {product.badge && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-10 shadow-lg">
                    {product.badge}
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 mb-6 group-hover:scale-105 transition-transform">
                    <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center shadow-inner">
                      <Heart className="h-10 w-10 text-green-600" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-display font-semibold mb-3 text-gray-900 text-center">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-center leading-relaxed">
                    {product.description}
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                      {product.price}
                    </span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 group shadow-lg">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Commander Maintenant
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Commander {product.name}</DialogTitle>
                        <DialogDescription>
                          Remplissez le formulaire pour recevoir votre devis personnalisé
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label>Produit sélectionné</Label>
                          <Input value={product.name} disabled className="bg-gray-50" />
                        </div>
                        <div>
                          <Label htmlFor={`quantity-${product.id}`}>Quantité</Label>
                          <Input 
                            id={`quantity-${product.id}`}
                            type="number"
                            min="1"
                            value={productForm.quantity}
                            onChange={(e) => setProductForm({...productForm, quantity: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`notes-${product.id}`}>Notes (optionnel)</Label>
                          <Textarea 
                            id={`notes-${product.id}`}
                            value={productForm.notes}
                            onChange={(e) => setProductForm({...productForm, notes: e.target.value})}
                            rows={3}
                            placeholder="Informations complémentaires..."
                          />
                        </div>
                        <Button 
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                          onClick={handleProductOrder}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Demander un devis personnalisé
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rest of the components remain the same with updated variables */}
      {/* Informations Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white border-green-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl w-fit mb-4 shadow-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">Zone de couverture</h3>
                <p className="text-sm text-gray-600">
                  {AFFILIATE_INFO.zone}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl w-fit mb-4 shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">Disponibilité</h3>
                <p className="text-sm text-gray-600">
                  {AFFILIATE_INFO.horaires}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl w-fit mb-4 shadow-lg">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">Contact</h3>
                <p className="text-sm text-gray-600">
                  {AFFILIATE_INFO.phone}<br />
                  {AFFILIATE_INFO.email}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-900">
              Ils m'ont fait <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">confiance</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les témoignages de clients satisfaits par mon accompagnement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-green-50 to-white border-green-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                      <Users className="h-6 w-6 text-white" />
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
                  <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
                  <div className="bg-green-100 rounded-lg p-3 text-center">
                    <span className="text-green-800 font-semibold text-sm">Produit : {testimonial.product}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white border-green-200 shadow-2xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl text-gray-900">Discutons de vos objectifs</CardTitle>
                <CardDescription className="text-lg">
                  Recevez des conseils personnalisés pour votre bien-être
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name">Nom complet</Label>
                    <Input 
                      id="contact-name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-email">Email</Label>
                      <Input 
                        id="contact-email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className="border-green-200 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone">Téléphone</Label>
                      <Input 
                        id="contact-phone"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        className="border-green-200 focus:border-green-500"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea 
                      id="contact-message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      rows={4}
                      placeholder="Parlez-moi de vos objectifs bien-être et de vos attentes..."
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg"
                    onClick={handleContact}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer ma demande
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              size="icon" 
              className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Assistant Revoobit</DialogTitle>
              <DialogDescription>
                Questions sur nos produits ? Je vous réponds !
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="h-64 border border-green-200 rounded-lg p-4 overflow-y-auto bg-green-50">
                <div className="bg-white border border-green-200 rounded-lg p-3 mb-3 shadow-sm">
                  <p className="text-sm text-gray-700">
                    Bonjour! Je suis votre assistant Revoobit. Comment puis-je vous aider dans votre démarche bien-être ?
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Posez votre question..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                  className="border-green-200 focus:border-green-500"
                />
                <Button 
                  size="icon" 
                  onClick={handleChatSend}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-900 to-green-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <span className="font-display font-bold text-lg">{AFFILIATE_INFO.name}</span>
                <p className="text-green-200 text-sm">{AFFILIATE_INFO.title}</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-green-200 mb-2">
                Site professionnel généré automatiquement
              </p>
              <p className="text-green-300 text-sm">
                © 2025 {AFFILIATE_INFO.name}. Partenaire officiel de <span className="font-semibold">Revoobit</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AffiliateSite;