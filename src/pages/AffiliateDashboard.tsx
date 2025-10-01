import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useParams, Link } from "react-router-dom";
import { 
  Eye, 
  Edit, 
  Share2, 
  QrCode,
  BarChart3,
  Users,
  Calendar,
  FileText,
  MapPin,
  Clock
} from "lucide-react";

const AffiliateDashboard = () => {
  const { id } = useParams();
  const [siteData, setSiteData] = useState({
    name: "Dr. Jean Dupont",
    specialty: "Cardiologue",
    description: "Spécialiste en cardiologie avec 15 ans d'expérience",
    address: "123 Rue de la Santé, 75013 Paris",
    phone: "+33 1 23 45 67 89",
    email: "contact@jeandupont.com",
    hours: "Lun-Ven: 9h-18h",
  });

  const stats = [
    { label: "Visites", value: "1,234", icon: Eye },
    { label: "Demandes", value: "45", icon: Users },
    { label: "RDV", value: "23", icon: Calendar },
  ];

  const generateQRCode = () => {
    toast.success("QR Code généré!");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`https://${id}.revoobit.com`);
    toast.success("Lien copié!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-display font-bold mb-2">
                  Dashboard <span className="gradient-hero bg-clip-text text-transparent">Affilié</span>
                </h1>
                <p className="text-muted-foreground">Gérez votre mini-site professionnel</p>
              </div>
              <Link to={`/site/${id}`}>
                <Button variant="glass">
                  <Eye className="mr-2 h-4 w-4" />
                  Voir le site
                </Button>
              </Link>
            </div>
            
            <div className="gradient-glass border border-primary/20 rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-2">Votre mini-site</p>
              <p className="text-lg font-semibold mb-3">
                https://{id}.revoobit.com
              </p>
              <div className="flex gap-2">
                <Button variant="hero" size="sm" onClick={copyLink}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Copier le lien
                </Button>
                <Button variant="glass" size="sm" onClick={generateQRCode}>
                  <QrCode className="mr-2 h-4 w-4" />
                  Générer QR Code
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8 animate-fade-in-up">
            {stats.map((stat) => (
              <Card key={stat.label} className="gradient-glass border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className="gradient-primary p-3 rounded-xl shadow-glow">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Editor */}
            <div className="lg:col-span-2">
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle>Éditeur de contenu</CardTitle>
                  <CardDescription>Personnalisez votre mini-site</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="info">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="info">Informations</TabsTrigger>
                      <TabsTrigger value="content">Contenu</TabsTrigger>
                      <TabsTrigger value="media">Médias</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="info" className="space-y-4">
                      <div>
                        <Label htmlFor="name">Nom</Label>
                        <Input 
                          id="name" 
                          value={siteData.name}
                          onChange={(e) => setSiteData({...siteData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="specialty">Spécialité</Label>
                        <Input 
                          id="specialty"
                          value={siteData.specialty}
                          onChange={(e) => setSiteData({...siteData, specialty: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          id="description"
                          value={siteData.description}
                          onChange={(e) => setSiteData({...siteData, description: e.target.value})}
                          rows={4}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input 
                            id="phone"
                            value={siteData.phone}
                            onChange={(e) => setSiteData({...siteData, phone: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email"
                            value={siteData.email}
                            onChange={(e) => setSiteData({...siteData, email: e.target.value})}
                          />
                        </div>
                      </div>
                      <Button 
                        variant="hero" 
                        className="w-full"
                        onClick={() => toast.success("Modifications enregistrées!")}
                      >
                        Enregistrer
                      </Button>
                    </TabsContent>

                    <TabsContent value="content" className="space-y-4">
                      <div>
                        <Label htmlFor="address">Adresse</Label>
                        <Input 
                          id="address"
                          value={siteData.address}
                          onChange={(e) => setSiteData({...siteData, address: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="hours">Horaires</Label>
                        <Input 
                          id="hours"
                          value={siteData.hours}
                          onChange={(e) => setSiteData({...siteData, hours: e.target.value})}
                        />
                      </div>
                      <Button 
                        variant="hero" 
                        className="w-full"
                        onClick={() => toast.success("Modifications enregistrées!")}
                      >
                        Enregistrer
                      </Button>
                    </TabsContent>

                    <TabsContent value="media" className="space-y-4">
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                        <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-4">
                          Glissez-déposez vos images ou cliquez pour parcourir
                        </p>
                        <Button variant="glass">
                          Choisir des fichiers
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="glass" className="w-full justify-start">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Voir les statistiques
                  </Button>
                  <Button variant="glass" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Gérer les RDV
                  </Button>
                  <Button variant="glass" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Documents
                  </Button>
                </CardContent>
              </Card>

              <Card className="gradient-glass border-primary/20">
                <CardHeader>
                  <CardTitle>Informations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">Adresse</p>
                      <p className="text-muted-foreground">{siteData.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">Horaires</p>
                      <p className="text-muted-foreground">{siteData.hours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;
