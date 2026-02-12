import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DietasPage from "./pages/DietasPage";
import RutinasPage from "./pages/RutinasPage";
import ResetPassword from "./components/ResetPassword";
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/WhatsAppButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dietas" element={<DietasPage />} />
          <Route path="/rutinas" element={<RutinasPage />} />
          <Route path="/inicio" element={<Index/>} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppButton></WhatsAppButton>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;