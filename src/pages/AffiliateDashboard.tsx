import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { AffiliateProductSelection } from "@/components/AffiliateProductSelection";
import {
  Eye,
  Edit,
  Share2,
  Plus,
  Trash2,
  Globe,
  Copy,
  TrendingUp,
  Rocket
} from "lucide-react";

interface Site {
  id: string;
  name: string;
  subdomain: string;
  status: 'draft' | 'published' | 'unpublished';
  published_at: string | null;
  created_at: string;
}

const AffiliateDashboard = () => {
  const { profile, affiliate, refreshProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  useEffect(() => {
    if (affiliate?.is_first_login) {
      setShowWelcomePopup(true);
    }
    fetchSites();
  }, [affiliate]);

  const fetchSites = async () => {
    if (!affiliate) return;

    try {
      const { data, error } = await supabase
        .from('sites')
        .select('*')
        .eq('affiliate_id', affiliate.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSites(data || []);
    } catch (error) {
      console.error('Error fetching sites:', error);
      toast.error("Erreur lors du chargement des sites");
    } finally {
      setLoading(false);
    }
  };

  const handleStartWizard = async () => {
    if (affiliate) {
      await supabase
        .from('affiliates')
        .update({ is_first_login: false })
        .eq('id', affiliate.id);

      await refreshProfile();
      setShowWelcomePopup(false);
      navigate('/wizard/step1');
    }
  };

  const handleClosewelcome = async () => {
    if (affiliate) {
      await supabase
        .from('affiliates')
        .update({ is_first_login: false })
        .eq('id', affiliate.id);

      await refreshProfile();
      setShowWelcomePopup(false);
    }
  };

  const copyLink = (subdomain: string) => {
    navigator.clipboard.writeText(`https://${subdomain}.revoobit.com`);
    toast.success("Lien copié!");
  };

  const deleteSite = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce site?")) return;

    try {
      const { error } = await supabase
        .from('sites')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success("Site supprimé");
      fetchSites();
    } catch (error) {
      console.error('Error deleting site:', error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const stats = [
    {
      label: "Sites créés",
      value: sites.length,
      icon: Globe
    },
    {
      label: "Sites publiés",
      value: sites.filter(s => s.status === 'published').length,
      icon: Eye
    },
    {
      label: "Brouillons",
      value: sites.filter(s => s.status === 'draft').length,
      icon: Edit
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

      <Dialog open={showWelcomePopup} onOpenChange={setShowWelcomePopup}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Bienvenue sur votre espace affilié!
            </DialogTitle>
            <DialogDescription className="text-lg pt-4">
              Félicitations! Votre compte a été créé avec succès.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
              <div className="flex items-start gap-4">
                <div className="bg-green-600 p-3 rounded-full">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Créez votre premier site web!</h3>
                  <p className="text-muted-foreground mb-4">
                    Notre assistant vous guidera étape par étape pour créer votre site web professionnel en quelques minutes.
                    Vous pourrez choisir un template, personnaliser le contenu, et publier votre site instantanément.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-green-600 rounded-full"></div>
                      <span>Choix parmi plusieurs templates professionnels</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-green-600 rounded-full"></div>
                      <span>Personnalisation complète du contenu</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-green-600 rounded-full"></div>
                      <span>Nom de sous-domaine personnalisé</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-green-600 rounded-full"></div>
                      <span>Publication instantanée</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleStartWizard}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                size="lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                Créer mon site maintenant
              </Button>
              <Button
                onClick={handleClosewelcome}
                variant="outline"
                size="lg"
              >
                Plus tard
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-between items-center animate-fade-in">
            <div>
              <h1 className="text-4xl font-display font-bold mb-2">
                <span className="gradient-hero bg-clip-text text-transparent">Dashboard Affilié</span>
              </h1>
              <p className="text-muted-foreground">
                Bienvenue, {profile?.full_name || profile?.email}
              </p>
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

          <div className="flex gap-4 mb-8">
            <Button
              onClick={() => navigate('/wizard/step1')}
              variant="hero"
              size="lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              Créer un nouveau site
            </Button>
          </div>

          {affiliate && (
            <div className="mb-8">
              <AffiliateProductSelection affiliateId={affiliate.id} />
            </div>
          )}

          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle>Mes sites web</CardTitle>
              <CardDescription>Gérez vos sites et leur contenu</CardDescription>
            </CardHeader>
            <CardContent>
              {sites.length === 0 ? (
                <div className="text-center py-12">
                  <Globe className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucun site pour le moment</h3>
                  <p className="text-muted-foreground mb-6">
                    Créez votre premier site web en quelques clics
                  </p>
                  <Button
                    onClick={() => navigate('/wizard/step1')}
                    variant="hero"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Créer mon premier site
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {sites.map((site) => (
                    <div
                      key={site.id}
                      className="gradient-glass border border-border rounded-xl p-6 hover:border-primary/40 transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{site.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {site.subdomain}.revoobit.com
                          </p>
                          <Badge variant={site.status === 'published' ? 'default' : 'secondary'}>
                            {site.status === 'published' ? 'Publié' : site.status === 'draft' ? 'Brouillon' : 'Non publié'}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyLink(site.subdomain)}
                          className="flex-1"
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copier le lien
                        </Button>
                        {site.status === 'published' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`https://${site.subdomain}.revoobit.com`, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/wizard/edit/${site.id}`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteSite(site.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
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

export default AffiliateDashboard;
