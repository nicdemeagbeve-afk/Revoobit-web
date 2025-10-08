import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Mail, Lock, User, Heart, Sparkles } from "lucide-react";

const SignupPage = () => {
  const navigate = useNavigate();
  const { SignUp } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email || !formData.password || !formData.fullName) {
      toast.error("Veuillez remplir tous les champs");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await SignUp(formData.email, formData.password, formData.fullName);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Inscription réussie ! Vérifiez votre email.");
        navigate("/login");
      }
    } catch (err) {
      toast.error("Erreur lors de l'inscription.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-2xl border-green-200">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold text-gray-900">Inscription Admin</CardTitle>
          <CardDescription className="text-gray-600">
            Créez votre compte pour accéder à Revoobit
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nom complet</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  className="pl-10 border-green-200 focus:border-green-500"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email professionnel</Label>
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

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
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
                  {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Création..." : "S'inscrire"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
