import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Users, 
  Globe, 
  BarChart3, 
  Plus,
  Settings,
  UserPlus,
  Power,
  Trash2,
  Edit,
  TrendingUp
} from "lucide-react";

const AdminDashboard = () => {
  const [affiliates, setAffiliates] = useState([
    { id: 1, name: "Dr. Jean Dupont", email: "jean@example.com", specialty: "Cardiologie", status: "active", subdomain: "jeandupont" },
    { id: 2, name: "Dr. Marie Martin", email: "marie@example.com", specialty: "Dermatologie", status: "active", subdomain: "mariemartin" },
    { id: 3, name: "Cabinet XYZ", email: "contact@xyz.com", specialty: "Médecine générale", status: "suspended", subdomain: "cabinetxyz" },
  ]);

  const [newAffiliate, setNewAffiliate] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialty: "",
    subdomain: "",
  });

  const handleCreateAffiliate = () => {
    const affiliate = {
      id: affiliates.length + 1,
      name: `${newAffiliate.firstName} ${newAffiliate.lastName}`,
      email: newAffiliate.email,
      specialty: newAffiliate.specialty,
      status: "active" as const,
      subdomain: newAffiliate.subdomain,
    };
    
    setAffiliates([...affiliates, affiliate]);
    toast.success("Affilié créé avec succès!");
    setNewAffiliate({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialty: "",
      subdomain: "",
    });
  };

  const toggleStatus = (id: number) => {
    setAffiliates(affiliates.map(a => 
      a.id === id 
        ? { ...a, status: a.status === "active" ? "suspended" : "active" } 
        : a
    ));
    toast.success("Statut mis à jour");
  };

  const deleteAffiliate = (id: number) => {
    setAffiliates(affiliates.filter(a => a.id !== id));
    toast.success("Affilié supprimé");
  };

  const stats = [
    { label: "Affiliés actifs", value: affiliates.filter(a => a.status === "active").length, icon: Users, color: "text-primary" },
    { label: "Mini-sites", value: affiliates.length, icon: Globe, color: "text-secondary" },
    { label: "Visites totales", value: "12.5K", icon: TrendingUp, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-display font-bold mb-2">
              Dashboard <span className="gradient-hero bg-clip-text text-transparent">Administrateur</span>
            </h1>
            <p className="text-muted-foreground">Gérez votre plateforme et vos affiliés</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8 animate-fade-in-up">
            {stats.map((stat) => (
              <Card key={stat.label} className="gradient-glass border-border hover:border-primary/40 transition-smooth">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`gradient-primary p-3 rounded-xl shadow-glow`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="hero" size="lg">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Créer un affilié
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Créer un nouvel affilié</DialogTitle>
                  <DialogDescription>
                    Remplissez les informations pour créer un compte affilié
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input 
                        id="firstName" 
                        value={newAffiliate.firstName}
                        onChange={(e) => setNewAffiliate({...newAffiliate, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input 
                        id="lastName"
                        value={newAffiliate.lastName}
                        onChange={(e) => setNewAffiliate({...newAffiliate, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={newAffiliate.email}
                      onChange={(e) => setNewAffiliate({...newAffiliate, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input 
                      id="phone"
                      value={newAffiliate.phone}
                      onChange={(e) => setNewAffiliate({...newAffiliate, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialty">Spécialité</Label>
                    <Select 
                      value={newAffiliate.specialty}
                      onValueChange={(value) => setNewAffiliate({...newAffiliate, specialty: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cardiologie">Cardiologie</SelectItem>
                        <SelectItem value="Dermatologie">Dermatologie</SelectItem>
                        <SelectItem value="Médecine générale">Médecine générale</SelectItem>
                        <SelectItem value="Pédiatrie">Pédiatrie</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subdomain">Sous-domaine</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="subdomain"
                        value={newAffiliate.subdomain}
                        onChange={(e) => setNewAffiliate({...newAffiliate, subdomain: e.target.value})}
                      />
                      <span className="text-sm text-muted-foreground">.revoobit.com</span>
                    </div>
                  </div>
                </div>
                <Button onClick={handleCreateAffiliate} variant="hero" className="w-full">
                  Créer l'affilié
                </Button>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="glass">
                  <Settings className="mr-2 h-5 w-5" />
                  Configuration
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Configuration de la plateforme</DialogTitle>
                  <DialogDescription>
                    Personnalisez l'apparence et les paramètres
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="platformName">Nom de la plateforme</Label>
                    <Input id="platformName" defaultValue="Revoobit" />
                  </div>
                  <div>
                    <Label htmlFor="primaryColor">Couleur principale</Label>
                    <Input id="primaryColor" type="color" defaultValue="#3b82f6" />
                  </div>
                  <Button variant="hero" className="w-full" onClick={() => toast.success("Configuration enregistrée!")}>
                    Enregistrer
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Affiliates List */}
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle>Liste des affiliés</CardTitle>
              <CardDescription>Gérez vos affiliés et leurs mini-sites</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {affiliates.map((affiliate) => (
                  <div 
                    key={affiliate.id}
                    className="gradient-glass border border-border rounded-xl p-4 hover:border-primary/40 transition-smooth"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{affiliate.name}</h3>
                          <Badge variant={affiliate.status === "active" ? "default" : "secondary"}>
                            {affiliate.status === "active" ? "Actif" : "Suspendu"}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>📧 {affiliate.email}</p>
                          <p>🏥 {affiliate.specialty}</p>
                          <p>🌐 {affiliate.subdomain}.revoobit.com</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="icon" 
                          variant="ghost"
                          onClick={() => toast.success("Édition en cours...")}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost"
                          onClick={() => toggleStatus(affiliate.id)}
                        >
                          <Power className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost"
                          onClick={() => deleteAffiliate(affiliate.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
