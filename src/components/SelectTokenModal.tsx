import { PopupMenu } from "@/components/ui/popup-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface SelectTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tokens = [
  { 
    id: "usdt", 
    name: "USDT", 
    fullName: "Tether USD",
    isSelected: true,
    icon: "₮"
  },
  { 
    id: "usdc", 
    name: "USDC", 
    fullName: "USD Coin",
    isSelected: false,
    icon: "◉"
  },
];

export function SelectTokenModal({ isOpen, onClose }: SelectTokenModalProps) {
  return (
    <PopupMenu 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Select a token"
    >
      <div className="space-y-3 mt-4">
          {tokens.map((token) => (
            <Card 
              key={token.id}
              className={`cursor-pointer transition-colors border ${
                token.isSelected 
                  ? "bg-primary/10 border-primary" 
                  : "bg-card border-border hover:bg-secondary/50"
              }`}
              onClick={onClose}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-crypto-green/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-crypto-green">{token.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{token.name}</h4>
                      <p className="text-sm text-muted-foreground">{token.fullName}</p>
                    </div>
                  </div>
                  {token.isSelected && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </PopupMenu>
  );
}