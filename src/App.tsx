import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Schedule from "./pages/Schedule";
import Sessions from "./pages/Sessions";
import Teachers from "./pages/Teachers";
import Rooms from "./pages/Rooms";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import ProfileChef from "./pages/ProfileChef";
import ProfileEnseignant from "./pages/ProfileEnseignant";
import ProfileDelegue from "./pages/ProfileDelegue";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Index />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile/chef" element={<ProfileChef />} />
              <Route path="/profile/enseignant" element={<ProfileEnseignant />} />
              <Route path="/profile/delegue" element={<ProfileDelegue />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
