"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Menu,
  X,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  ChevronUp,
  Star,
  Wrench,
  Palette,
  Hammer,
  PaintRoller,
  CheckCircle,
  User,
  Briefcase, // Added Briefcase import
  PencilRuler, // Added PencilRuler
  StarHalf, // Added StarHalf
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SiteEditorFormData } from '@/lib/schemas/site-editor-form-schema';
import { toast } from 'sonner'; // Import toast for notifications

interface ServicePortfolioTemplateProps {
  siteData: SiteEditorFormData;
  subdomain: string;
}

export function ServicePortfolioTemplate({ siteData, subdomain }: ServicePortfolioTemplateProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const primaryColorClass = `bg-${siteData.primaryColor}-600`;
  const primaryColorTextClass = `text-${siteData.primaryColor}-600`;
  const primaryColorBorderClass = `border-${siteData.primaryColor}-600`;
  const primaryColorHoverBgClass = `hover:bg-${siteData.primaryColor}-700`;
  const primaryColorDarkBgClass = `bg-${siteData.primaryColor}-800`;

  const secondaryColorClass = `bg-${siteData.secondaryColor}-500`;
  const secondaryColorTextClass = `text-${siteData.secondaryColor}-500`;
  const secondaryColorHoverBgClass = `hover:bg-${siteData.secondaryColor}-600`;

  const accentColorClass = `bg-${siteData.secondaryColor}-500`;
  const accentColorTextClass = `text-${siteData.secondaryColor}-500`;
  const accentColorBorderClass = `border-${siteData.secondaryColor}-500`;

  const whatsappBgClass = 'bg-[#25D366]';
  const whatsappHoverBgClass = 'hover:bg-[#128C7E]';

  const sectionsVisibility = siteData.sectionsVisibility || {
    showHero: true,
    showAbout: true,
    showProductsServices: true,
    showTestimonials: true,
    showSkills: true,
    showContact: true,
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offset = 80;
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.pageYOffset - offset,
        behavior: 'smooth',
      });
      setIsMobileMenuOpen(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/site/${subdomain}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender_name: formData.name,
          sender_email: formData.email,
          sender_phone: formData.phone,
          service_interested: formData.service,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Erreur lors de l'envoi du message.");
      } else {
        toast.success("Message envoyé avec succès ! Nous vous recontacterons bientôt.");
        setFormData({ name: '', phone: '', email: '', service: '', message: '' }); // Clear form
      }
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      toast.error("Une erreur inattendue est survenue lors de l'envoi du message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const portfolioItems = siteData.productsAndServices.length > 0
    ? siteData.productsAndServices.map(p => ({
        image: p.image || 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', // Fallback placeholder
        title: p.title,
        description: p.description,
        price: p.price,
        currency: p.currency,
        actionButton: p.actionButton,
      }))
    : [
        { image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', title: "Présentation Miira-Cell+", description: "Découvrez les avantages uniques de Miira-Cell+ pour votre santé.", price: 0, currency: "XOF", actionButton: "quote" },
        { image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', title: "Opportunité d'Affaire Revoobit", description: "Rejoignez mon équipe et construisez votre indépendance financière.", price: 0, currency: "XOF", actionButton: "quote" },
        { image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1558&q=80', title: "Témoignages Clients Revoobit", description: "Des histoires de succès et de bien-être grâce aux produits Revoobit.", price: 0, currency: "XOF", actionButton: "quote" },
        { image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', title: "Formation Distributeur Revoobit", description: "Accompagnement personnalisé pour votre développement.", price: 0, currency: "XOF", actionButton: "quote" },
      ];

  const testimonialsToDisplay = siteData.testimonials && siteData.testimonials.length > 0
    ? siteData.testimonials
    : [
        { quote: "J'ai fait appel à ce distributeur Revoobit pour des conseils sur Miira-Cell+. Le service a été excellent et les résultats sont là. Je recommande vivement !", author: "Marie Diop", location: siteData.businessLocation || "Dakar", avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
        { quote: "Excellent accompagnement pour démarrer mon activité Revoobit. Le distributeur a su comprendre mes besoins et proposer des solutions adaptées. Professionnalisme et qualité du travail.", author: "Jean Ndiaye", location: siteData.businessLocation || "Pikine", avatar: "https://randomuser.me/api/portraits/men/54.jpg" },
        { quote: "Intervention rapide et efficace pour toutes mes questions sur les produits Revoobit. Prix raisonnable et travail soigné. Je ne vais plus chercher ailleurs pour mes besoins Revoobit.", author: "Fatou Sarr", location: siteData.businessLocation || "Guédiawaye", avatar: "https://randomuser.me/api/portraits/women/67.jpg" },
      ];

  const skillsToDisplay = siteData.skills || [];

  const paymentMethods = siteData.paymentMethods && siteData.paymentMethods.length > 0
    ? siteData.paymentMethods
    : ["Mobile Money", "Cash", "Virement", "Wave"];

  // Helper to get Lucide icon component by name
  const getLucideIcon = (iconName: string) => {
    const icons: { [key: string]: React.ElementType } = {
      Wrench, Hammer, PaintRoller, Briefcase, Star, CheckCircle, PencilRuler, Palette,
      MessageSquare, Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, ChevronUp, X, Menu, User, StarHalf
    };
    return icons[iconName] || Wrench; // Default to Wrench if not found
  };

  return (
    <div className="font-sans antialiased text-gray-800 bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2"> {/* Adjusted gap for mobile */}
              {siteData.logoOrPhoto ? (
                <Image src={siteData.logoOrPhoto} alt={`${siteData.publicName} Logo`} width={40} height={40} className="rounded-full object-cover" />
              ) : (
                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center text-white text-xl font-bold", primaryColorClass)}>
                  {siteData.publicName.charAt(0)}
                </div>
              )}
              <div className="flex flex-col">
                <h1 className={cn("text-lg font-bold", primaryColorTextClass)}>{siteData.publicName}</h1> {/* Adjusted text size for mobile */}
                <p className="text-xs text-gray-600">Distributeur Revoobit Officiel</p> {/* Adjusted text size for mobile */}
              </div>
            </div>
            <div className={cn("hidden md:flex items-center gap-6")}> {/* Adjusted gap for mobile */}
              {sectionsVisibility.showHero && <a href="#accueil" onClick={(e) => handleSmoothScroll(e, '#accueil')} className="text-gray-700 font-medium hover:text-blue-600 transition-colors text-sm">Accueil</a>} {/* Adjusted text size for mobile */}
              {sectionsVisibility.showAbout && <a href="#apropos" onClick={(e) => handleSmoothScroll(e, '#apropos')} className="text-gray-700 font-medium hover:text-blue-600 transition-colors text-sm">À propos</a>} {/* Adjusted text size for mobile */}
              {sectionsVisibility.showProductsServices && <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')} className="text-gray-700 font-medium hover:text-blue-600 transition-colors text-sm">Produits & Services Revoobit</a>} {/* Adjusted text size for mobile */}
              {sectionsVisibility.showProductsServices && <a href="#portfolio" onClick={(e) => handleSmoothScroll(e, '#portfolio')} className="text-gray-700 font-medium hover:text-blue-600 transition-colors text-sm">Opportunités Revoobit</a>} {/* Adjusted text size for mobile */}
              {sectionsVisibility.showTestimonials && testimonialsToDisplay.length > 0 && (
                <a href="#temoignages" onClick={(e) => handleSmoothScroll(e, '#temoignages')} className="text-gray-700 font-medium hover:text-blue-600 transition-colors text-sm">Témoignages Revoobit</a>
              )}
              {sectionsVisibility.showSkills && skillsToDisplay.length > 0 && <a href="#skills" onClick={(e) => handleSmoothScroll(e, '#skills')} className="text-gray-700 font-medium hover:text-blue-600 transition-colors text-sm">Mon Expertise Revoobit</a>} {/* Adjusted text size for mobile */}
              {sectionsVisibility.showContact && <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="text-gray-700 font-medium hover:text-blue-600 transition-colors text-sm">Contact</a>} {/* Adjusted text size for mobile */}
            </div>
            <button className="md:hidden text-xl text-gray-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}> {/* Adjusted text size for mobile */}
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </nav>
        </div>
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 z-40">
            <nav className="flex flex-col items-center gap-4">
              {sectionsVisibility.showHero && <a href="#accueil" onClick={(e) => handleSmoothScroll(e, '#accueil')} className="text-gray-700 font-medium hover:text-blue-600 transition-colors w-full text-center py-2 text-base">Accueil</a>} {/* Adjusted text size for mobile */}
              {sectionsVisibility.showAbout && <a href="#apropos" onClick={(e) => handleSmoothScroll(e, '#apropos')} className="text-gray-700 font-medium hover:text-blue-600 transition-colors w-full text-center py-2 text-base">À propos</a>} {/* Adjusted text size for mobile */}
              {sectionsVisibility.showProductsServices && <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')} className="text-gray-700 font-medium hover:text-blue-600 transition-colors w-full text-center py-2 text-base">Produits & Services Revoobit</a>} {/* Adjusted text size for mobile */}
              {sectionsVisibility.showProductsServices && <a href="#portfolio" onClick={(e) => handleSmoothScroll(e, '#portfolio')} className="text-gray-700 font-medium hover:text-blue-600 transition-colors w-full text-center py-2 text-base">Opportunités Revoobit</a>} {/* Adjusted text size for mobile */}
              {sectionsVisibility.showTestimonials && testimonialsToDisplay.length > 0 && (
                <a href="#temoignages" onClick={(e) => handleSmoothScroll(e, '#temoignages')} className="text-gray-700 font-medium hover:text-blue-600 transition-colors w-full text-center py-2 text-base">Témoignages Revoobit</a>
              )}
              {sectionsVisibility.showSkills && skillsToDisplay.length > 0 && <a href="#skills" onClick={(e) => handleSmoothScroll(e, '#skills')} className="text-gray-700 font-medium hover:text-blue-600 transition-colors w-full text-center py-2 text-base">Mon Expertise Revoobit</a>} {/* Adjusted text size for mobile */}
              {sectionsVisibility.showContact && <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="text-gray-700 font-medium hover:text-blue-600 transition-colors w-full text-center py-2 text-base">Contact</a>} {/* Adjusted text size for mobile */}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      {sectionsVisibility.showHero && (
        <section id="accueil" className={cn("relative py-16 md:py-24 text-white text-center bg-cover bg-center px-4", primaryColorClass)} style={{ backgroundImage: siteData.heroBackgroundImage ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${siteData.heroBackgroundImage}')` : undefined }}> {/* Adjusted padding for mobile */}
          <div className="container mx-auto max-w-3xl"> {/* Removed px-4 md:px-6, using container mx-auto */}
            {siteData.logoOrPhoto && (
              <Image
                src={siteData.logoOrPhoto}
                alt={`${siteData.publicName} Logo Revoobit`}
                width={siteData.heroBackgroundImage ? 60 : 100} // Smaller if background image, larger if not
                height={siteData.heroBackgroundImage ? 60 : 100}
                className={cn("rounded-full object-cover mb-4", siteData.heroBackgroundImage ? "mx-auto" : "mx-auto")}
              />
            )}
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{siteData.heroSlogan || "Votre partenaire pour le succès avec Revoobit !"}</h2> {/* Adjusted text size for mobile */}
            <p className="text-base md:text-xl mb-8 opacity-90">{siteData.aboutStory || "Découvrez les produits Revoobit et l'opportunité d'affaire unique."}</p> {/* Adjusted text size for mobile */}
            <a href={`https://wa.me/${siteData.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className={cn("inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-base transition-all duration-300 ease-in-out transform", whatsappBgClass, whatsappHoverBgClass, "w-full sm:w-auto")}> {/* Adjusted padding, text size, and width for mobile */}
              <MessageSquare className="h-5 w-5" /> Contactez-moi pour Revoobit
            </a>
          </div>
        </section>
      )}

      {/* About Section */}
      {sectionsVisibility.showAbout && (
        <section id="apropos" className="py-12 bg-white px-4"> {/* Adjusted padding for mobile */}
          <div className="container mx-auto max-w-5xl"> {/* Removed px-4 md:px-6, using container mx-auto */}
            <div className="text-center mb-8 md:mb-12"> {/* Adjusted mb for mobile */}
              <h2 className={cn("text-2xl md:text-4xl font-bold mb-4 relative inline-block", primaryColorTextClass)}> {/* Adjusted text size for mobile */}
                À propos de votre distributeur Revoobit
                <span className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full", primaryColorClass)}></span> {/* Adjusted width for mobile */}
              </h2>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2 text-sm leading-relaxed space-y-4"> {/* Adjusted text size for mobile */}
                <p>{siteData.aboutStory}</p>
                <p>En tant que distributeur Revoobit, je m'engage à vous fournir un accompagnement de qualité pour découvrir les produits et développer votre propre réseau. Mon objectif est de vous aider à atteindre vos objectifs de bien-être et financiers avec Revoobit. Chaque nouveau partenaire est pour moi l'occasion de partager une opportunité de vie améliorée.</p>
                <p>Basé à {siteData.businessLocation || "Lomé, Togo"}, je suis disponible pour vous accompagner dans toute la région.</p>
              </div>
              <div className="md:w-1/2 rounded-lg overflow-hidden shadow-lg">
                <Image src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Distributeur Revoobit" width={500} height={300} className="w-full h-auto object-cover" /> {/* Adjusted width/height for mobile */}
              </div>
            </div>
          </div>
        </section>
      )}

      {sectionsVisibility.showProductsServices && siteData.productsAndServices && siteData.productsAndServices.length > 0 && (
        <section id="services" className="py-12 bg-gray-100 px-4"> {/* Adjusted padding for mobile */}
          <div className="container mx-auto max-w-5xl"> {/* Removed px-4 md:px-6, using container mx-auto */}
            <div className="text-center mb-8 md:mb-12"> {/* Adjusted mb for mobile */}
              <h2 className={cn("text-2xl md:text-4xl font-bold mb-4 relative inline-block", primaryColorTextClass)}> {/* Adjusted text size for mobile */}
                Nos Produits & Services Revoobit
                <span className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full", primaryColorClass)}></span> {/* Adjusted width for mobile */}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Adjusted grid and gap for mobile */}
              {siteData.productsAndServices.map((product: any, index: number) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2">
                  <div className="h-48 overflow-hidden"> {/* Adjusted height for mobile */}
                    {product.image ? (
                      <Image src={product.image} alt={product.title} width={300} height={192} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        <Briefcase className="h-10 w-10" /> {/* Adjusted size for mobile */}
                      </div>
                    )}
                  </div>
                  <div className="p-4"> {/* Adjusted padding for mobile */}
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.title}</h3> {/* Adjusted text size for mobile */}
                    {product.price !== undefined && (
                      <div className={cn("text-xl font-bold mb-4", primaryColorTextClass)}> {/* Adjusted text size for mobile */}
                        {product.price} {product.currency}
                      </div>
                    )}
                    <a href={`https://wa.me/${siteData.whatsappNumber}?text=Je%20suis%20intéressé%20par%20${product.title}%20Revoobit`} target="_blank" rel="noopener noreferrer" className={cn("inline-block px-4 py-2 rounded-lg font-bold text-white text-sm transition-colors duration-300 w-full", secondaryColorClass, secondaryColorHoverBgClass)}> {/* Adjusted padding, text size, and width for mobile */}
                      {product.actionButton === 'buy' ? 'Acheter' : product.actionButton === 'quote' ? 'Demander un devis' : product.actionButton === 'book' ? 'Réserver' : 'Contacter'}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Section (using productsAndServices as portfolio items) */}
      {sectionsVisibility.showProductsServices && siteData.productsAndServices && siteData.productsAndServices.length > 0 && (
        <section id="portfolio" className="py-12 bg-white px-4"> {/* Adjusted padding for mobile */}
          <div className="container mx-auto max-w-5xl"> {/* Removed px-4 md:px-6, using container mx-auto */}
            <div className="text-center mb-8 md:mb-12"> {/* Adjusted mb for mobile */}
              <h2 className={cn("text-2xl md:text-4xl font-bold mb-4 relative inline-block", primaryColorTextClass)}> {/* Adjusted text size for mobile */}
                Nos Opportunités Revoobit
                <span className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full", primaryColorClass)}></span> {/* Adjusted width for mobile */}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> {/* Adjusted grid and gap for mobile */}
              {portfolioItems.map((item: any, index: number) => (
                <div key={index} className="relative rounded-lg overflow-hidden shadow-lg group">
                  <Image src={item.image} alt={item.title} width={300} height={180} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" /> {/* Adjusted height for mobile */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"> {/* Adjusted padding for mobile */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3> {/* Adjusted text size for mobile */}
                      <p className="text-gray-200 text-xs">{item.description}</p> {/* Adjusted text size for mobile */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionsVisibility.showSkills && skillsToDisplay.length > 0 && (
        <section id="skills" className="py-12 bg-gray-100 px-4"> {/* Adjusted padding for mobile */}
          <div className="container mx-auto max-w-5xl"> {/* Removed px-4 md:px-6, using container mx-auto */}
            <h2 className={cn("text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12", primaryColorTextClass)}>Mon Expertise Revoobit</h2> {/* Adjusted text size and mb for mobile */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"> {/* Adjusted grid and gap for mobile */}
              {skillsToDisplay.map((skill, index) => {
                const IconComponent = skill.icon ? getLucideIcon(skill.icon) : Wrench;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md p-4 space-y-3"> {/* Adjusted padding for mobile */}
                    <div className="flex items-center justify-center mb-4"><IconComponent className={cn("h-6 w-6", primaryColorTextClass)} /></div> {/* Adjusted size for mobile */}
                    <h3 className="text-lg font-semibold text-gray-800">{skill.title}</h3> {/* Adjusted text size for mobile */}
                    <p className="text-muted-foreground text-sm">{skill.description}</p> {/* Adjusted text size for mobile */}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {sectionsVisibility.showTestimonials && testimonialsToDisplay.length > 0 && (
        <section id="temoignages" className="py-12 bg-gray-100 px-4"> {/* Adjusted padding for mobile */}
          <div className="container mx-auto max-w-5xl"> {/* Removed px-4 md:px-6, using container mx-auto */}
            <div className="text-center mb-8 md:mb-12"> {/* Adjusted mb for mobile */}
              <h2 className={cn("text-2xl md:text-4xl font-bold mb-4 relative inline-block", primaryColorTextClass)}> {/* Adjusted text size for mobile */}
                Témoignages de Succès Revoobit
                <span className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full", primaryColorClass)}></span> {/* Adjusted width for mobile */}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Adjusted grid and gap for mobile */}
              {testimonialsToDisplay.map((testimonial: any, index: number) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg relative"> {/* Adjusted padding for mobile */}
                  <span className={cn("absolute top-4 left-4 text-6xl font-serif opacity-10", accentColorTextClass)}>&ldquo;</span> {/* Adjusted text size for mobile */}
                  <p className="text-base italic mb-6 relative z-10">{testimonial.quote}</p> {/* Adjusted text size for mobile */}
                  <div className="flex items-center gap-4">
                    {testimonial.avatar ? (
                      <Image src={testimonial.avatar} alt="Client" width={40} height={40} className={cn("rounded-full object-cover border-3", accentColorBorderClass)} />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        <User className="h-5 w-5" /> {/* Adjusted size for mobile */}
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">{testimonial.author}</h4> {/* Adjusted text size for mobile */}
                      <p className="text-gray-600 text-xs">{testimonial.location}</p> {/* Adjusted text size for mobile */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionsVisibility.showContact && (
        <section id="contact" className="py-12 bg-white px-4"> {/* Adjusted padding for mobile */}
          <div className="container mx-auto max-w-5xl"> {/* Removed px-4 md:px-6, using container mx-auto */}
            <div className="text-center mb-8 md:mb-12"> {/* Adjusted mb for mobile */}
              <h2 className={cn("text-2xl md:text-4xl font-bold mb-4 relative inline-block", primaryColorTextClass)}> {/* Adjusted text size for mobile */}
                Contactez votre distributeur Revoobit
                <span className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full", primaryColorClass)}></span> {/* Adjusted width for mobile */}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Adjusted grid and gap for mobile */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className={cn("flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-white", primaryColorClass)}> {/* Adjusted size for mobile */}
                    <Phone className="h-4 w-4" /> {/* Adjusted size for mobile */}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">Téléphone</h3> {/* Adjusted text size for mobile */}
                    <p className="text-sm text-gray-600">{siteData.secondaryPhoneNumber || siteData.whatsappNumber}</p> {/* Adjusted text size for mobile */}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className={cn("flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-white", primaryColorClass)}> {/* Adjusted size for mobile */}
                    <MessageSquare className="h-4 w-4" /> {/* Adjusted size for mobile */}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">WhatsApp</h3> {/* Adjusted text size for mobile */}
                    <p className="text-sm text-gray-600">{siteData.whatsappNumber}</p> {/* Adjusted text size for mobile */}
                  </div>
                </div>
                {siteData.email && (
                  <div className="flex items-start gap-4">
                    <div className={cn("flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-white", primaryColorClass)}> {/* Adjusted size for mobile */}
                      <Mail className="h-4 w-4" /> {/* Adjusted size for mobile */}
                    </div>
                    <p className="text-sm text-gray-600">{siteData.email || `contact@${subdomain}.com`}</p> {/* Adjusted text size for mobile */}
                  </div>
                )}
                {siteData.businessLocation && (
                  <div className="flex items-start gap-4">
                    <div className={cn("flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-white", primaryColorClass)}> {/* Adjusted size for mobile */}
                      <MapPin className="h-4 w-4" /> {/* Adjusted size for mobile */}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">Adresse</h3> {/* Adjusted text size for mobile */}
                      <p className="text-sm text-gray-600">{siteData.businessLocation}</p> {/* Adjusted text size for mobile */}
                      <p className="text-sm text-gray-600">Intervention dans toute la région</p> {/* Adjusted text size for mobile */}
                    </div>
                  </div>
                )}
              </div>
              {siteData.showContactForm && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md"> {/* Adjusted padding for mobile */}
                  <form onSubmit={handleSubmit} className="space-y-4"> {/* Adjusted space-y for mobile */}
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-1 text-sm">Nom complet</label> {/* Adjusted text size for mobile */}
                      <input type="text" id="name" name="name" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" value={formData.name} onChange={handleChange} /> {/* Adjusted padding and text size for mobile */}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-1 text-sm">Téléphone</label> {/* Adjusted text size for mobile */}
                      <input type="tel" id="phone" name="phone" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" value={formData.phone} onChange={handleChange} /> {/* Adjusted padding and text size for mobile */}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-1 text-sm">Email</label> {/* Adjusted text size for mobile */}
                      <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" value={formData.email} onChange={handleChange} /> {/* Adjusted padding and text size for mobile */}
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-gray-700 font-medium mb-1 text-sm">Produit Revoobit intéressé</label> {/* Adjusted text size for mobile */}
                      <select id="service" name="service" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" value={formData.service} onChange={handleChange}> {/* Adjusted padding and text size for mobile */}
                        <option value="">Sélectionnez un produit Revoobit</option>
                        {siteData.productsAndServices.map((product: any, idx: number) => (
                          <option key={idx} value={product.title}>{product.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-1 text-sm">Message</label> {/* Adjusted text size for mobile */}
                      <textarea id="message" name="message" required className="w-full px-3 py-2 border border-gray-300 rounded-lg min-h-[100px] resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" value={formData.message} onChange={handleChange}></textarea> {/* Adjusted padding, min-height, and text size for mobile */}
                    </div>
                    <button type="submit" className={cn("w-full px-5 py-2 rounded-lg font-bold text-white text-base transition-colors duration-300", primaryColorClass, primaryColorHoverBgClass)} disabled={isSubmitting}> {/* Adjusted padding and text size for mobile */}
                      {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer id="contact" className={cn("py-12 text-white px-4", primaryColorDarkBgClass)}> {/* Adjusted padding for mobile */}
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"> {/* Removed px-4 md:px-6, using container mx-auto */}
          <div className="text-center sm:text-left">
            <Link href="/" className="font-bold text-lg"> {/* Adjusted text size for mobile */}
              {siteData.publicName} (Distributeur Revoobit)
            </Link>
            <p className="text-xs text-gray-300 mt-2"> {/* Ensured text-xs for smaller screens */}
              {siteData.heroSlogan}
            </p>
          </div>
          <div className="flex gap-4">
            {siteData.facebookLink && (
              <a href={siteData.facebookLink} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                <Facebook className="h-5 w-5" /> {/* Adjusted size for mobile */}
              </a>
            )}
            {siteData.instagramLink && (
              <a href={siteData.instagramLink} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                <Instagram className="h-5 w-5" /> {/* Adjusted size for mobile */}
              </a>
            )}
          </div>
        </div>
        <div className="container px-4 md:px-6 text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} {siteData.publicName} (Distributeur Revoobit). Tous droits réservés.
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={cn("fixed bottom-6 right-6 h-10 w-10 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300", secondaryColorClass, secondaryColorHoverBgClass, showBackToTop ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4')}
      >
        <ChevronUp className="h-5 w-5" /> {/* Adjusted size for mobile */}
      </button>
    </div>
  );
}