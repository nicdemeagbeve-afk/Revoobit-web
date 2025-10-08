import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import {
  Users,
  Globe,
  BarChart3,
  UserPlus,
  Settings,
  Power,
  Trash2,
  Edit,
  TrendingUp
} from "lucide-react";

interface Affiliate {
  id: string;
  user_id: string;
  company_name: string | null;
  phone: string | null;
  address: string | null;
  status: 'active' | 'inactive' | 'suspended';
  is_first_login: boolean;
  created_at: string;
  profiles: {
    email: string;
    full_name: string | null;
  };
}

const AdminDashboard = () => {
  const { profile, signOut } = useAuth();
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newAffiliate, setNewAffiliate] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    companyName: "",
  });

  useEffect(() => {
    fetchAffiliates();
  }, []);

  const fetchAffiliates = async () => {
    try {
      const { data, error } = await supabase
        .from('affiliates')
        .select(`
          *,
          profiles (
            email,
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAffiliates(data || []);
    } catch (error) {
      console.error('Error fetching affiliates:', error);
      toast.error("Erreur lors du chargement des affiliés");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAffiliate = async () => {
    if (!newAffiliate.email || !newAffiliate.password || !newAffiliate.firstName) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newAffiliate.email,
        password: newAffiliate.password,
        options: {
          data: {
            role: 'affiliate',
            full_name: `${newAffiliate.firstName} ${newAffiliate.lastName}`.trim(),
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: `${newAffiliate.firstName} ${newAffiliate.lastName}`.trim()
          })
          .eq('id', authData.user.id);

        if (profileError) console.error('Profile update error:', profileError);

        const { error: affiliateError } = await supabase
          .from('affiliates')
          .insert({
            user_id: authData.user.id,
            company_name: newAffiliate.companyName || null,
            phone: newAffiliate.phone || null,
            status: 'active',
            created_by: profile?.id,
            is_first_login: true,
          });

        if (affiliateError) throw affiliateError;

        toast.success("Affilié créé avec succès!");
        setNewAffiliate({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phone: "",
          companyName: "",
        });
        setDialogOpen(false);
        fetchAffiliates();
      }
    } catch (error: any) {
      console.error('Error creating affiliate:', error);
      toast.error(error.message || "Erreur lors de la création de l'affilié");
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

    try {
      const { error } = await supabase
        .from('affiliates')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      toast.success("Statut mis à jour");
      fetchAffiliates();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const deleteAffiliate = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet affilié?")) return;

    try {
      const { error } = await supabase
        .from('affiliates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success("Affilié supprimé");
      fetchAffiliates();
    } catch (error) {
      console.error('Error deleting affiliate:', error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const stats = [
    {
      label: "Affiliés actifs",
      value: affiliates.filter(a => a.status === "active").length,
      icon: Users,
      color: "text-primary"
    },
    {
      label: "Total affiliés",
      value: affiliates.length,
      icon: Globe,
      color: "text-secondary"
    },
    {
      label: "Statistiques",
      value: "N/A",
      icon: TrendingUp,
      color: "text-accent"
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-between items-center animate-fade-in">
            <div>
              <h1 className="text-4xl font-display font-bold mb-2">
                <span className="gradient-hero bg-clip-text text-transparent">Administration</span>
              </h1>
              <p className="text-muted-foreground">Bienvenue, {profile?.full_name || profile?.email}</p>
            </div>
            <Button onClick={signOut} variant="outline">
              Déconnexion
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8 animate-fade-in-up">
            {stats.map((stat) => (
              <Card key={stat.label} className="gradient-glass border-border hover:border-primary/40 transition-smooth">
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

          <div className="flex flex-wrap gap-4 mb-8">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        value={newAffiliate.firstName}
                        onChange={(e) => setNewAffiliate({...newAffiliate, firstName: e.target.value})}
                        required
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
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newAffiliate.email}
                      onChange={(e) => setNewAffiliate({...newAffiliate, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Mot de passe *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newAffiliate.password}
                      onChange={(e) => setNewAffiliate({...newAffiliate, password: e.target.value})}
                      required
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
                    <Label htmlFor="companyName">Nom de l'entreprise</Label>
                    <Input
                      id="companyName"
                      value={newAffiliate.companyName}
                      onChange={(e) => setNewAffiliate({...newAffiliate, companyName: e.target.value})}
                    />
                  </div>
                </div>
                <Button onClick={handleCreateAffiliate} variant="hero" className="w-full">
                  Créer l'affilié
                </Button>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle>Liste des affiliés</CardTitle>
              <CardDescription>Gérez vos affiliés</CardDescription>
            </CardHeader>
            <CardContent>
              {affiliates.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Aucun affilié pour le moment
                </p>
              ) : (
                <div className="space-y-4">
                  {affiliates.map((affiliate) => (
                    <div
                      key={affiliate.id}
                      className="gradient-glass border border-border rounded-xl p-4 hover:border-primary/40 transition-smooth"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">
                              {affiliate.profiles?.full_name || 'Sans nom'}
                            </h3>
                            <Badge variant={affiliate.status === "active" ? "default" : "secondary"}>
                              {affiliate.status === "active" ? "Actif" : affiliate.status === "inactive" ? "Inactif" : "Suspendu"}
                            </Badge>
                            {affiliate.is_first_login && (
                              <Badge variant="outline">Nouveau</Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>📧 {affiliate.profiles?.email}</p>
                            {affiliate.company_name && <p>🏢 {affiliate.company_name}</p>}
                            {affiliate.phone && <p>📞 {affiliate.phone}</p>}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => toggleStatus(affiliate.id, affiliate.status)}
                            title={affiliate.status === 'active' ? 'Désactiver' : 'Activer'}
                          >
                            <Power className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => deleteAffiliate(affiliate.id)}
                            title="Supprimer"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
