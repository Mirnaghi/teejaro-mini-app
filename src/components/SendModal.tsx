import { useState } from "react";
import { PopupMenu } from "@/components/ui/popup-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Coins, Building2, ChevronRight } from "lucide-react";

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SendModal({ isOpen, onClose }: SendModalProps) {
  const [currentScreen, setCurrentScreen] = useState<"main" | "teejaro" | "crypto" | "bank">("main");

  const handleBack = () => {
    setCurrentScreen("main");
  };

  const handleClose = () => {
    setCurrentScreen("main");
    onClose();
  };

  const getTitle = () => {
    switch (currentScreen) {
      case "teejaro": return "Send to Teejaro User";
      case "crypto": return "Crypto Transfer";
      case "bank": return "Bank Transfer";
      default: return "Send Money";
    }
  };

  const renderContent = () => {
    if (currentScreen === "teejaro") {
      return (
        <>
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon" onClick={handleBack} className="hover:bg-secondary/80">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-xl font-semibold text-foreground">Send to Teejaro User</h2>
            <div className="w-10"></div>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Teejaro user transfer functionality will be implemented here</p>
          </div>
        </>
      );
    }

    if (currentScreen === "crypto") {
      return (
        <>
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon" onClick={handleBack} className="hover:bg-secondary/80">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-xl font-semibold text-foreground">Crypto Transfer</h2>
            <div className="w-10"></div>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Crypto transfer functionality will be implemented here</p>
          </div>
        </>
      );
    }

    if (currentScreen === "bank") {
      return (
        <>
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon" onClick={handleBack} className="hover:bg-secondary/80">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-xl font-semibold text-foreground">Bank Transfer</h2>
            <div className="w-10"></div>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Bank transfer functionality will be implemented here</p>
          </div>
        </>
      );
    }

    return (
      <div className="space-y-4 mt-4">
        {/* Send to Teejaro User */}
        <Card 
          className="cursor-pointer hover:bg-secondary/50 transition-colors bg-card border-border"
          onClick={() => setCurrentScreen("teejaro")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Send to Teejaro User</h3>
                  <p className="text-sm text-muted-foreground">Instant transfer to other users</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Crypto Transfer */}
        <Card 
          className="cursor-pointer hover:bg-secondary/50 transition-colors bg-card border-border"
          onClick={() => setCurrentScreen("crypto")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-crypto-blue/20 rounded-xl flex items-center justify-center">
                  <Coins className="w-6 h-6 text-crypto-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Crypto Transfer</h3>
                  <p className="text-sm text-muted-foreground">Send to external wallet</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Bank Transfer */}
        <Card 
          className="cursor-pointer hover:bg-secondary/50 transition-colors bg-card border-border"
          onClick={() => setCurrentScreen("bank")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Bank Transfer</h3>
                  <p className="text-sm text-muted-foreground">Transfer to bank account</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <PopupMenu 
      isOpen={isOpen} 
      onClose={handleClose} 
      title={getTitle()}
      showHeader={false}
    >
      {renderContent()}
    </PopupMenu>
  );
}