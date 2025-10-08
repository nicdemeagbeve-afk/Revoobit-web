import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const categories = [
  { value: "business", label: "Business / Entreprise" },
  { value: "portfolio", label: "Portfolio" },
  { value: "restaurant", label: "Restaurant" },
  { value: "blog", label: "Blog" },
  { value: "association", label: "Association" },
];

const WizardStep1 = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checkingSubdomain, setCheckingSubdomain] = useState(false);
  const [subdomainAvailable, setSubdomainAvailable] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    subdomain: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem('wizard_step1');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wizard_step1', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const checkSubdomain = async () => {
      if (formData.subdomain.length < 3) {
        setSubdomainAvailable(null);
        return;
      }

      setCheckingSubdomain(true);
      try {
        const { data, error } = await supabase
          .from('sites')
          .select('subdomain')
          .eq('subdomain', formData.subdomain.toLowerCase())
          .maybeSingle();

        if (error) throw error;
        setSubdomainAvailable(!data);
      } catch (error) {
        console.error('Error checking subdomain:', error);
      } finally {
        setCheckingSubdomain(false);
      }
    };

    const timeoutId = setTimeout(checkSubdomain, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.subdomain]);

  const handleNext = () => {
    if (!formData.name || !formData.subdomain || !formData.category) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (subdomainAvailable === false) {
      toast.error("Ce sous-domaine n'est pas disponible");
      return;
    }

    if (formData.subdomain.length < 3) {
      toast.error("Le sous-domaine doit contenir au moins 3 caractères");
      return;
    }

    const validSubdomain = /^[a-z0-9-]+$/.test(formData.subdomain);
    if (!validSubdomain) {
      toast.error("Le sous-domaine ne peut contenir que des lettres minuscules, chiffres et tirets");
      return;
    }

    navigate('/wizard/step2');
  };

  const formatSubdomain = (value: string) => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '')
      .replace(/^-+|-+$/g, '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Créer un nouveau site</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                <span>1</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center gap-2 bg-gray-300 text-gray-600 px-3 py-1 rounded-full text-sm">
                <span>2</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center gap-2 bg-gray-300 text-gray-600 px-3 py-1 rounded-full text-sm">
                <span>3</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center gap-2 bg-gray-300 text-gray-600 px-3 py-1 rounded-full text-sm">
                <span>4</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center gap-2 bg-gray-300 text-gray-600 px-3 py-1 rounded-full text-sm">
                <span>5</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Étape 1:</strong> Définissez les informations de base de votre site
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informations de base</CardTitle>
            <CardDescription>
              Commencez par définir le nom et le sous-domaine de votre site
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                Nom du site *
              </Label>
              <Input
                id="name"
                placeholder="Ex: Mon Entreprise"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">
                Ce nom sera affiché comme titre principal de votre site
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subdomain">
                Nom du sous-domaine *
              </Label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Input
                    id="subdomain"
                    placeholder="monentreprise"
                    value={formData.subdomain}
                    onChange={(e) => setFormData({ ...formData, subdomain: formatSubdomain(e.target.value) })}
                    required
                    className="pr-10"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {checkingSubdomain && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                    {!checkingSubdomain && subdomainAvailable === true && (
                      <Check className="h-4 w-4 text-green-600" />
                    )}
                    {!checkingSubdomain && subdomainAvailable === false && (
                      <span className="text-red-600 text-sm">✕</span>
                    )}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap">.revoobit.com</span>
              </div>
              {subdomainAvailable === false && (
                <p className="text-xs text-red-600">
                  Ce sous-domaine est déjà utilisé
                </p>
              )}
              {subdomainAvailable === true && (
                <p className="text-xs text-green-600">
                  Ce sous-domaine est disponible!
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Uniquement lettres minuscules, chiffres et tirets (minimum 3 caractères)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">
                Catégorie d'activité *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Cela nous aidera à vous proposer les templates les plus adaptés
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description courte
              </Label>
              <Textarea
                id="description"
                placeholder="Décrivez brièvement votre activité..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Cette description apparaîtra sur votre site (optionnel)
              </p>
            </div>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Annuler
              </Button>
              <Button
                onClick={handleNext}
                disabled={loading || checkingSubdomain || subdomainAvailable === false}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                Suivant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Vos informations sont sauvegardées automatiquement</p>
        </div>
      </div>
    </div>
  );
};

export default WizardStep1;
