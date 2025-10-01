import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="gradient-hero p-2 rounded-lg shadow-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            REVOOBIT
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/admin">
            <Button variant="ghost" size="sm">
              Admin
            </Button>
          </Link>
          <Link to="/affiliate/demo">
            <Button variant="ghost" size="sm">
              Affilié
            </Button>
          </Link>
          <Button variant="hero" size="sm">
            Découvrir
          </Button>
        </div>
      </div>
    </nav>
  );
};
