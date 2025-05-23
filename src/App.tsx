
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen";
import ProfileSetup from "./pages/ProfileSetup";
import StyleSelection from "./pages/StyleSelection";
import ClosetImport from "./pages/ClosetImport";
import GarmentUpload from "./pages/GarmentUpload";
import OnboardingComplete from "./pages/OnboardingComplete";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/style-selection" element={<StyleSelection />} />
          <Route path="/closet-import" element={<ClosetImport />} />
          <Route path="/garment-upload" element={<GarmentUpload />} />
          <Route path="/onboarding-complete" element={<OnboardingComplete />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
