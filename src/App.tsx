import { useEffect, useState } from "react";
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
import { useLocation } from 'react-router-dom'
import WebApp from '@twa-dev/sdk';

const queryClient = new QueryClient();

const AppContent = () => {
  const { pathname } = useLocation();
  const { webApp, isInTelegram } = useTelegramWebApp();
  const [topPadding, setTopPadding] = useState(WebApp.safeAreaInset?.top || 0);


  useEffect(() => {
    if (webApp) {
      webApp.ready();
      webApp.requestFullscreen();
      document.body.style.overscrollBehavior = 'none';
      document.body.style.userSelect = 'none';
    }
  }, [webApp]);


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className={`app telegram-app`} style={{ paddingTop: `${WebApp?.safeAreaInset?.top + 35}px` }}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/settings" element={<Settings />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
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
