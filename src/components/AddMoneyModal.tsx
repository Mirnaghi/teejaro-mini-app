import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, QrCode, Building2 } from "lucide-react";
import { TopUpCryptoScreen } from "./TopUpCryptoScreen";
import { BankTransferScreen } from "./BankTransferScreen";

interface AddMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddMoneyModal({ isOpen, onClose }: AddMoneyModalProps) {
  const [currentScreen, setCurrentScreen] = useState<"main" | "crypto" | "bank">("main");

  const handleBack = () => {
    setCurrentScreen("main");
  };

  const handleClose = () => {
    setCurrentScreen("main");
    onClose();
  };

  if (currentScreen === "crypto") {
    return (
      <TopUpCryptoScreen 
        isOpen={isOpen} 
        onClose={handleClose} 
        onBack={handleBack} 
      />
    );
  }

  if (currentScreen === "bank") {
    return (
      <BankTransferScreen 
        isOpen={isOpen} 
        onClose={handleClose} 
        onBack={handleBack} 
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background border-border animate-modal-enter data-[state=closed]:animate-modal-exit">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold text-foreground">Add Money with</DialogTitle>
          <Button variant="ghost" size="icon" onClick={handleClose} className="hover:bg-secondary/80">
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          <Card 
            className="cursor-pointer hover:bg-secondary/50 transition-colors bg-card border-border"
            onClick={() => setCurrentScreen("crypto")}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-crypto-blue/20 rounded-xl flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-crypto-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Crypto</h3>
                  <p className="text-sm text-muted-foreground">No Fees, No limits</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:bg-secondary/50 transition-colors bg-card border-border"
            onClick={() => setCurrentScreen("bank")}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Bank Transfer</h3>
                  <p className="text-sm text-muted-foreground">From your bank account</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}