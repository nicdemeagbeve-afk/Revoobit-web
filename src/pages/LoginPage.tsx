import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Heart, 
  Sparkles,
  Shield,
  Smartphone,
  User
} from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<"admin" | "affiliate">("admin");

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation de l'authentification
    try {
      // Ici vous intégrerez votre logique d'authentification réelle
      if (formData.email && formData.password) {
        // Simuler un délai d'authentification
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast.success("Connexion réussie !");
        navigate("/admin");
      } else {
        toast.error("Veuillez remplir tous les champs");
      }
    } catch (error) {
      toast.error("Erreur de connexion. Vérifiez vos identifiants.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleAffiliateSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  // Simulation de l'authentification
  try {
    // Ici vous intégrerez votre logique d'authentification réelle
    if (formData.email && formData.password) {
      // Simuler un délai d'authentification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Stocker l'utilisateur connecté (ici juste l'email)
      localStorage.setItem("affiliateEmail", formData.email);

      toast.success("Connexion réussie !");
      navigate("/affiliate-dashboard");
    } else {
      toast.error("Veuillez remplir tous les champs");
    }
  } catch (error) {
    toast.error("Erreur de connexion. Vérifiez vos identifiants.");
  } finally {
    setIsLoading(false);
  }
};

  const handleDemoLogin = (role: string) => {
    setFormData({
      email: `${role}@revoobit.com`,
      password: "demo123",
      rememberMe: false
    });
    toast.info(`Mode démo ${role} activé`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3')] bg-cover bg-center opacity-5"></div>
      
      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-between lg:p-12 bg-gradient-to-br from-green-600 to-green-800 text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <Heart className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">REVOOBIT</h1>
              <p className="text-green-200 text-sm">Administration</p>
            </div>
          </div>

          <div className="space-y-6 max-w-md">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-green-300" />
                <h2 className="text-3xl font-bold">Plateforme d'Administration</h2>
              </div>
              <p className="text-green-100 text-lg leading-relaxed">
                Gérez votre réseau d'affiliés, suivez les performances et développez votre activité Revoobit.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: User, text: "Gestion des affiliés" },
                { icon: Smartphone, text: "Sites personnalisés" },
                { icon: Shield, text: "Analytics avancés" },
                { icon: Sparkles, text: "Support 24/7" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="bg-white/20 p-1 rounded">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="text-green-100 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-green-200 text-sm">
            <p>© 2025 Revoobit. Tous droits réservés.</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">REVOOBIT</h1>
                <p className="text-green-600 text-sm">Administration</p>
              </div>
            </div>

            <Card className="shadow-2xl border-green-200">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Connexion Admin
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Accédez à votre espace d'administration Revoobit
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={role === "admin" ? handleAdminSubmit : handleAffiliateSubmit} className="space-y-4">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">
                      Email professionnel
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@revoobit.com"
                        className="pl-10 border-green-200 focus:border-green-500"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-gray-700">
                        Mot de passe
                      </Label>
                      <Link 
                        to="/forgot-password" 
                        className="text-sm text-green-600 hover:text-green-700 hover:underline"
                      >
                        Mot de passe oublié ?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 border-green-200 focus:border-green-500"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, rememberMe: checked as boolean })
                        }
                      />
                      <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                        Se souvenir de moi
                      </Label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Connexion...
                      </>
                    ) : (
                      role === "admin" ? "Se connecter Admin" : "Se connecter Affilié"
                    )}
                  </Button>
                </form>

                {/* Demo Access Section */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">Accès démo</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="border-green-200 text-green-700 hover:bg-green-50"
                    onClick={() => handleDemoLogin("admin")}
                    disabled={isLoading}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Admin
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    onClick={() => handleDemoLogin("manager")}
                    disabled={isLoading}
                  >
                    <Smartphone className="mr-2 h-4 w-4" />
                    Manager
                  </Button>
                  
                </div>

                {/* Security Notice */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Sécurité</p>
                      <p className="text-xs text-green-600 mt-1">
                        Votre session sera sécurisée par chiffrement SSL. 
                        Déconnectez-vous après utilisation sur un appareil partagé.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Support Link */}
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Besoin d'aide ?{" "}
                    <Link 
                      to="/support" 
                      className="font-medium text-green-600 hover:text-green-700 hover:underline"
                    >
                      Contactez le support
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Footer */}
            <div className="lg:hidden mt-8 text-center">
              <p className="text-sm text-gray-600">
                © 2025 Revoobit. Plateforme d'administration sécurisée.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;