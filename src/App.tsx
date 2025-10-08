import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import AffiliateDashboard from "./pages/AffiliateDashboard";
import AffiliateSite from "./pages/AffiliateSite";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import WizardStep1 from "./pages/wizard/WizardStep1";

const App = () => (
  <TooltipProvider>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['affiliate']}>
              <AffiliateDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wizard/step1"
          element={
            <ProtectedRoute allowedRoles={['affiliate']}>
              <WizardStep1 />
            </ProtectedRoute>
          }
        />
        <Route path="/site/:id" element={<AffiliateSite />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </TooltipProvider>
);

export default App;
