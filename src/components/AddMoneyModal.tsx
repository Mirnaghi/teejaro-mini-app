import { useState } from "react";
import { PopupMenu } from "@/components/ui/popup-menu";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Building2 } from "lucide-react";
import { TopUpCryptoContent } from "./TopUpCryptoContent";
import { BankTransferContent } from "./BankTransferContent";
import { CryptoDepositContent } from "./CryptoDepositContent";

interface AddMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddMoneyModal({ isOpen, onClose }: AddMoneyModalProps) {
  const [currentScreen, setCurrentScreen] = useState<"main" | "crypto" | "bank" | "address">("main");

  const handleBack = () => {
    setCurrentScreen("main");
  };

  const handleClose = () => {
    setCurrentScreen("main");
    onClose();
  };

  const handleCryptoContinue = () => {
    setCurrentScreen("address");
  };

  const getTitle = () => {
    switch (currentScreen) {
      case "crypto": return "Top up with Crypto";
      case "bank": return "Bank Transfer";
      case "address": return "Deposit Address";
      default: return "Add Money with";
    }
  };

  const renderContent = () => {
    if (currentScreen === "crypto") {
      return <TopUpCryptoContent onBack={handleBack} onContinue={handleCryptoContinue} />;
    }

    if (currentScreen === "bank") {
      return <BankTransferContent onBack={handleBack} />;
    }

    if (currentScreen === "address") {
      return <CryptoDepositContent onBack={handleBack} />;
    }

    return (
      <div className="space-y-4 mt-4">
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