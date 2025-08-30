import { useState } from "react";
import { PopupMenu } from "@/components/ui/popup-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { SelectTokenModal } from "./SelectTokenModal";
import { USDTAddressScreen } from "./USDTAddressScreen";

interface TopUpCryptoScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

const networks = [
  { id: "ethereum", name: "Ethereum (ERC20)", description: "~$2-10 fees" },
  { id: "polygon", name: "Polygon PoS", description: "~$0.01-0.1 fees" },
  { id: "base", name: "Base", description: "~$0.01-0.1 fees" },
  { id: "optimism", name: "Optimism", description: "~$0.1-1 fees" },
  { id: "avalanche", name: "Avalanche", description: "~$0.1-1 fees" },
  { id: "arbitrum", name: "Arbitrum One", description: "~$0.1-1 fees" },
  { id: "zksync", name: "ZKsync", description: "~$0.1-1 fees" },
  { id: "tron", name: "Tron (TRC20)", description: "~$1-2 fees" },
];

export function TopUpCryptoScreen({ isOpen, onClose, onBack }: TopUpCryptoScreenProps) {
  const [selectedNetwork, setSelectedNetwork] = useState("base");
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<"main" | "address">("main");

  const handleContinue = () => {
    setCurrentScreen("address");
  };

  const handleBackToAddress = () => {
    setCurrentScreen("main");
  };

  if (currentScreen === "address") {
    return (
      <USDTAddressScreen 
        isOpen={isOpen} 
        onClose={onClose} 
        onBack={handleBackToAddress} 
      />
    );
  }

  return (
    <>
      <PopupMenu 
        isOpen={isOpen} 
        onClose={onClose} 
        showHeader={false}
      >
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-secondary/80">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-semibold text-foreground">Top up with crypto</h2>
          <div className="w-10"></div>
        </div>

        <div className="space-y-6">
          {/* Choose Token */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
              CHOOSE TOKEN
            </h3>
            <Card 
              className="cursor-pointer hover:bg-secondary/50 transition-colors bg-card border-border"
              onClick={() => setShowTokenModal(true)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-crypto-green/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-crypto-green">₮</span>
                    </div>
                    <span className="font-medium text-foreground">USDT</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Choose Network */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
              CHOOSE USDT NETWORK
            </h3>
            <RadioGroup value={selectedNetwork} onValueChange={setSelectedNetwork}>
              <div className="space-y-3">
                {networks.map((network) => (
                  <div key={network.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={network.id} id={network.id} />
                    <Label htmlFor={network.id} className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">{network.name}</span>
                        <span className="text-sm text-muted-foreground">{network.description}</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Continue Button */}
          <Button 
            variant="crypto" 
            className="w-full h-12 mt-8"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </PopupMenu>

      <SelectTokenModal 
        isOpen={showTokenModal} 
        onClose={() => setShowTokenModal(false)} 
      />
    </>
  );
}