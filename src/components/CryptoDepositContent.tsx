import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Copy, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CryptoDepositContentProps {
  onBack: () => void;
}

export function CryptoDepositContent({ onBack }: CryptoDepositContentProps) {
  const [selectedToken] = useState("USDT");
  const [selectedNetwork] = useState("Base");
  const depositAddress = "0x742d35Cc6634C0532925a3b8D0A8B5C3f2Bb4C58";
  const minDeposit = "1 USDT";
  const { toast } = useToast();

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: `${fieldName} copied successfully`,
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-secondary/80">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold text-foreground">Deposit {selectedToken}</h2>
        <div className="w-10"></div>
      </div>

      <div className="space-y-4">
        {/* Token & Network Info */}
        <Card className="bg-gradient-crypto border-0 text-white">
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">₮</span>
              </div>
              <span className="font-semibold">{selectedToken}</span>
            </div>
            <p className="text-white/80 text-xs">via {selectedNetwork} Network</p>
          </CardContent>
        </Card>

        {/* QR Code */}
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center">
              <div className="text-center">
                <QrCode className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-xs text-gray-500">QR Code</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Scan QR code to get deposit address
            </p>
          </CardContent>
        </Card>

        {/* Deposit Address */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
            Deposit Address
          </h3>
          <Card className="bg-secondary/30 border-border">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-2">
                  <p className="text-xs font-mono text-foreground break-all">
                    {depositAddress}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-6 w-6 flex-shrink-0"
                  onClick={() => copyToClipboard(depositAddress, "Deposit address")}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Information */}
        <Card className="bg-warning/10 border-warning/20">
          <CardContent className="p-3">
            <h4 className="font-medium text-foreground mb-2 text-sm">Important Information</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Minimum deposit:</span>
                <span className="font-medium text-foreground">{minDeposit}</span>
              </div>
              <div className="flex justify-between">
                <span>Network:</span>
                <span className="font-medium text-foreground">{selectedNetwork}</span>
              </div>
              <div className="flex justify-between">
                <span>Confirmations required:</span>
                <span className="font-medium text-foreground">12</span>
              </div>
            </div>
            <div className="mt-2 p-2 bg-warning/20 rounded-lg">
              <p className="text-xs text-warning">
                ⚠️ Only send {selectedToken} to this address via {selectedNetwork} network. 
                Sending other tokens or using wrong network may result in permanent loss.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button variant="outline">
            View History
          </Button>
          <Button 
            variant="crypto"
            onClick={() => copyToClipboard(depositAddress, "Deposit address")}
          >
            Copy Address
          </Button>
        </div>
      </div>
    </>
  );
}