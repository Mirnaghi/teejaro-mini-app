import { useState } from "react";
import { PopupMenu } from "@/components/ui/popup-menu";
import { ChevronRight } from "lucide-react";
import { TopUpCryptoContent } from "./TopUpCryptoContent";
import { BankTransferContent } from "./BankTransferContent";
import { CryptoDepositContent } from "./CryptoDepositContent";
import { Button } from "@/components/ui/button";
import TopUpCryptoFlags from '@/assets/icons/topUpCryptoFlags.svg'
import TopUpBankFlags from '@/assets/icons/topUpBankFlags.svg'

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
      <div className="mt-1">
        <h2 className="font-medium text-3xl">Add money with</h2>
        <p className="text-sm mt-1 mb-5">Which card or account do you want to make the transfer from?</p>
        <Button variant="secondary" className="w-full h-[60px] flex justify-between items-center mb-5" onClick={() => setCurrentScreen("crypto")}>
          <div className="flex items-center">
            <img src={TopUpCryptoFlags} alt="#" />
            <span className="ml-2 text-[16px]">Crypto</span>
          </div>
          <ChevronRight className="ml-2" style={{ width: '25px', height: '25px' }} />
        </Button>
        <Button variant="secondary" className="w-full h-[60px] flex justify-between items-center" onClick={() => setCurrentScreen("bank")}>
          <div className="flex items-center">
            <img src={TopUpBankFlags} alt="#" />
            <span className="ml-2 text-[16px]">Bank accounts</span>
          </div>
          <ChevronRight className="ml-2" style={{ width: '25px', height: '25px' }} />
        </Button>
      </div>
    );
  };

  return (
    <PopupMenu
      isOpen={isOpen}
      onClose={handleClose}
      showHeader={false}
    >
      {renderContent()}
    </PopupMenu>
  );
}