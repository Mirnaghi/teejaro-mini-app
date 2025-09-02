import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";
import Index from "./pages/Index";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { webApp, isInTelegram } = useTelegramWebApp();

  useEffect(() => {
    if (webApp) {
      // Configure the app for Telegram
      webApp.ready();
      webApp.expand();
      
      // Remove any scrollbars and optimize for mobile
      document.body.style.overscrollBehavior = 'none';
      document.body.style.userSelect = 'none';
    }
  }, [webApp]);

  return (
    <div className={`app ${isInTelegram ? 'telegram-app' : ''}`}>
      <div className={`${isInTelegram ? 'pt-20' : ''}`}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
