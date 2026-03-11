import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import AccessibilityControls from "@/components/AccessibilityControls";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import HowItWorksPage from "@/pages/HowItWorksPage";
import CommunityImpactPage from "@/pages/CommunityImpactPage";
import ContactPage from "@/pages/ContactPage";
import AuthPage from "@/pages/AuthPage";
import EntrepreneurDashboard from "@/pages/EntrepreneurDashboard";
import InstitutionDashboard from "@/pages/InstitutionDashboard";
import OnboardingPage from "@/pages/OnboardingPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/community-impact" element={<CommunityImpactPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<AuthPage defaultMode="login" />} />
              <Route path="/get-started" element={<AuthPage defaultMode="signup" />} />
              <Route path="/entrepreneur-dashboard" element={<EntrepreneurDashboard />} />
              <Route path="/institution-dashboard" element={<InstitutionDashboard />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <ChatBot />
            <AccessibilityControls />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
