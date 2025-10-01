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
  Calendar,
  MessageCircle,
  Download,
  Send,
  Sparkles
} from "lucide-react";

const AffiliateSite = () => {
  const { id } = useParams();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [appointmentForm, setAppointmentForm] = useState({
    date: "",
    time: "",
    reason: "",
  });

  const [chatMessage, setChatMessage] = useState("");

  const handleContact = () => {
    toast.success("Message envoyé! Nous vous répondrons bientôt.");
    setContactForm({ name: "", email: "", phone: "", message: "" });
  };

  const handleAppointment = () => {
    toast.success("Demande de rendez-vous envoyée!");
    setAppointmentForm({ date: "", time: "", reason: "" });
  };

  const handleChatSend = () => {
    if (chatMessage.trim()) {
      toast.success("Message envoyé au chatbot");
      setChatMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="gradient-hero p-2 rounded-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-display font-bold">Dr. Jean Dupont</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+33123456789">
              <Button variant="glass" size="sm">
                <Phone className="mr-2 h-4 w-4" />
                Appeler
              </Button>
            </a>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="hero" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Prendre RDV
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Prendre rendez-vous</DialogTitle>
                  <DialogDescription>
                    Choisissez une date et un horaire
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input 
                      id="date" 
                      type="date"
                      value={appointmentForm.date}
                      onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Heure</Label>
                    <Input 
                      id="time" 
                      type="time"
                      value={appointmentForm.time}
                      onChange={(e) => setAppointmentForm({...appointmentForm, time: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="reason">Motif</Label>
                    <Textarea 
                      id="reason"
                      value={appointmentForm.reason}
                      onChange={(e) => setAppointmentForm({...appointmentForm, reason: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <Button variant="hero" className="w-full" onClick={handleAppointment}>
                    Confirmer le rendez-vous
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-5xl font-display font-bold mb-4">
              Dr. Jean Dupont
            </h1>
            <p className="text-xl text-primary font-semibold mb-4">
              Cardiologue - Spécialiste du cœur
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Plus de 15 ans d'expérience en cardiologie. Je suis spécialisé dans le diagnostic et le traitement des maladies cardiovasculaires, avec une approche personnalisée pour chaque patient.
            </p>
            <div className="flex flex-wrap gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="hero" size="lg">
                    <Calendar className="mr-2 h-5 w-5" />
                    Prendre rendez-vous
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Prendre rendez-vous</DialogTitle>
                    <DialogDescription>
                      Choisissez une date et un horaire
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="apt-date">Date</Label>
                      <Input 
                        id="apt-date" 
                        type="date"
                        value={appointmentForm.date}
                        onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="apt-time">Heure</Label>
                      <Input 
                        id="apt-time" 
                        type="time"
                        value={appointmentForm.time}
                        onChange={(e) => setAppointmentForm({...appointmentForm, time: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="apt-reason">Motif</Label>
                      <Textarea 
                        id="apt-reason"
                        value={appointmentForm.reason}
                        onChange={(e) => setAppointmentForm({...appointmentForm, reason: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <Button variant="hero" className="w-full" onClick={handleAppointment}>
                      Confirmer le rendez-vous
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="glass" size="lg">
                <Phone className="mr-2 h-5 w-5" />
                Contacter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Informations */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="gradient-glass border-border">
              <CardContent className="pt-6">
                <div className="gradient-primary p-3 rounded-xl w-fit mb-4 shadow-glow">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Adresse</h3>
                <p className="text-sm text-muted-foreground">
                  123 Rue de la Santé<br />
                  75013 Paris, France
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-glass border-border">
              <CardContent className="pt-6">
                <div className="gradient-secondary p-3 rounded-xl w-fit mb-4 shadow-glow">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Horaires</h3>
                <p className="text-sm text-muted-foreground">
                  Lundi - Vendredi<br />
                  9h00 - 18h00
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-glass border-border">
              <CardContent className="pt-6">
                <div className="bg-accent p-3 rounded-xl w-fit mb-4 shadow-glow">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Contact</h3>
                <p className="text-sm text-muted-foreground">
                  +33 1 23 45 67 89<br />
                  contact@jeandupont.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">
            Spécialités et <span className="gradient-hero bg-clip-text text-transparent">Services</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Consultation cardiologique",
              "Électrocardiogramme (ECG)",
              "Échographie cardiaque",
              "Holter ECG et tensionnel",
              "Épreuve d'effort",
              "Suivi des maladies cardiovasculaires"
            ].map((service) => (
              <div key={service} className="gradient-glass border border-border rounded-xl p-4">
                <p className="font-medium">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle>Nous contacter</CardTitle>
                <CardDescription>
                  Envoyez-nous un message, nous vous répondrons rapidement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name">Nom complet</Label>
                    <Input 
                      id="contact-name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
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
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone">Téléphone</Label>
                      <Input 
                        id="contact-phone"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
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
                    />
                  </div>
                  <Button variant="hero" className="w-full" onClick={handleContact}>
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer le message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">
            Documents <span className="gradient-hero bg-clip-text text-transparent">à télécharger</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Formulaire de consultation", size: "245 KB" },
              { name: "Guide du patient", size: "1.2 MB" },
              { name: "Recommandations post-consultation", size: "567 KB" }
            ].map((doc) => (
              <Card key={doc.name} className="gradient-glass border-border hover:border-primary/40 transition-smooth cursor-pointer">
                <CardContent className="pt-6">
                  <Download className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-1">{doc.name}</h3>
                  <p className="text-sm text-muted-foreground">{doc.size}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="premium" 
              size="icon" 
              className="h-14 w-14 rounded-full shadow-elegant"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Assistant virtuel</DialogTitle>
              <DialogDescription>
                Posez vos questions, je suis là pour vous aider
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="h-64 border border-border rounded-lg p-4 overflow-y-auto bg-muted/30">
                <div className="gradient-glass border border-border rounded-lg p-3 mb-3">
                  <p className="text-sm">
                    Bonjour! Comment puis-je vous aider aujourd'hui?
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Tapez votre message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                />
                <Button variant="hero" size="icon" onClick={handleChatSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Dr. Jean Dupont. Propulsé par <span className="font-semibold">Revoobit</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AffiliateSite;
