import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Copy, Home, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface USDTAddressScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

const mockAddress = "0x06153bF4e8a96F62599205525F2368579390B31a";

export function USDTAddressScreen({ isOpen, onClose, onBack }: USDTAddressScreenProps) {
  const { toast } = useToast();

  const copyAddress = () => {
    navigator.clipboard.writeText(mockAddress);
    toast({
      title: "Address copied!",
      description: "USDT address copied to clipboard",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background border-border max-h-[90vh] overflow-y-auto animate-modal-enter data-[state=closed]:animate-modal-exit">
        <DialogHeader className="flex flex-row items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-secondary/80">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <DialogTitle className="text-lg font-semibold text-foreground">Your USDT Address</DialogTitle>
          <div className="w-10"></div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Warning */}
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <p className="text-sm text-foreground">
              Send only <span className="font-semibold">USDT</span> in network{" "}
              <span className="font-semibold">Base (BASE)</span>. Sending other coins may result in permanent loss.
            </p>
          </div>

          {/* Help Link */}
          <Button variant="ghost" className="w-full justify-start p-0 h-auto text-primary hover:bg-transparent">
            <HelpCircle className="w-4 h-4 mr-2" />
            How to add USDT to your card
          </Button>

          {/* QR Code */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-48 h-48 bg-gradient-card border border-border rounded-xl flex items-center justify-center relative">
                  {/* QR Code placeholder with network/token indicators */}
                  <div className="w-40 h-40 bg-secondary rounded-lg flex items-center justify-center">
                    <div className="grid grid-cols-8 gap-1">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-foreground' : 'bg-transparent'} rounded-sm`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Network Badge */}
                  <div className="absolute top-2 right-2 bg-crypto-blue text-white text-xs px-2 py-1 rounded-full">
                    BASE
                  </div>
                  
                  {/* Token Badge */}
                  <div className="absolute bottom-2 left-2 bg-crypto-green text-white text-xs px-2 py-1 rounded-full">
                    USDT
                  </div>
                </div>

                {/* Address */}
                <div className="w-full">
                  <p className="text-center text-foreground font-mono text-sm break-all mb-4">
                    {mockAddress}
                  </p>
                  
                  <Button 
                    variant="crypto" 
                    className="w-full h-12"
                    onClick={copyAddress}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy address
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Details */}
          <Card className="bg-muted/30 border-border">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Top up fee</span>
                  <span className="text-sm font-medium text-success">0%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Expected arrival</span>
                  <span className="text-sm font-medium text-foreground">1–10 minutes</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <Button 
            variant="outline" 
            className="w-full h-12"
            onClick={onClose}
          >
            <Home className="w-4 h-4 mr-2" />
            Back to home
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}