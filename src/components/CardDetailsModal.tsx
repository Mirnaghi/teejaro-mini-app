import { useState } from "react";
import { PopupMenu } from "@/components/ui/popup-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoreHorizontal, Eye, EyeOff, Lock, RefreshCw, User } from "lucide-react";

interface CardDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CardDetailsModal({ isOpen, onClose }: CardDetailsModalProps) {
  const [showCardDetails, setShowCardDetails] = useState(false);

  return (
    <PopupMenu 
      isOpen={isOpen} 
      onClose={onClose} 
      showHeader={false}
      className="max-h-[90vh]"
    >
      <div className="flex items-center justify-end mb-4">
        <Button variant="ghost" size="icon" className="hover:bg-secondary/80">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      <div>
          {/* Virtual Card Display */}
          <Card className="mb-6 bg-gradient-crypto border-0 shadow-primary max-w-sm mx-auto">
            <CardContent className="p-4 relative overflow-hidden">
              {/* Geometric Pattern Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-2 right-2 w-12 h-12 border border-white/30 rounded-full"></div>
                <div className="absolute bottom-2 left-2 w-10 h-10 border border-white/30 rounded-lg rotate-45"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/20 rounded-full"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-white font-bold">VISA</div>
                </div>
                
                <div className="mb-3">
                  <p className="text-white/80 text-xs mb-1">Card Holder</p>
                  <p className="text-white font-semibold text-sm">
                    {showCardDetails ? "John Doe" : "J••• D••"}
                  </p>
                </div>
                
                <div className="text-white font-mono text-base tracking-wider mb-3">
                  {showCardDetails ? "4734 5678 9012 1234" : "•••• •••• •••• 1234"}
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white/80 text-xs">Valid Thru</p>
                    <p className="text-white font-mono text-sm">
                      {showCardDetails ? "12/27" : "••/••"}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/80 text-xs">CVV</p>
                    <p className="text-white font-mono text-sm">
                      {showCardDetails ? "123" : "•••"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card Information */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="cardNumber" className="text-foreground mb-2 block">Card number</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  type={showCardDetails ? "text" : "password"}
                  value={showCardDetails ? "4734 5678 9012 1234" : "•••• •••• •••• 1234"}
                  readOnly
                  className="bg-secondary border-border text-foreground"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowCardDetails(!showCardDetails)}
                >
                  {showCardDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span className="ml-2 text-sm">
                    {showCardDetails ? "Hide details" : "Reveal details"}
                  </span>
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="cardHolder" className="text-foreground mb-2 block">Card holder name</Label>
              <Input
                id="cardHolder"
                type={showCardDetails ? "text" : "password"}
                value={showCardDetails ? "John Doe" : "J••• D••"}
                readOnly
                className="bg-secondary border-border text-foreground"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiration" className="text-foreground mb-2 block">Expiration date</Label>
                <Input
                  id="expiration"
                  type={showCardDetails ? "text" : "password"}
                  value={showCardDetails ? "12/27" : "••/••"}
                  readOnly
                  className="bg-secondary border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="cvv" className="text-foreground mb-2 block">CVV</Label>
                <Input
                  id="cvv"
                  type={showCardDetails ? "text" : "password"}
                  value={showCardDetails ? "123" : "•••"}
                  readOnly
                  className="bg-secondary border-border text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Button variant="outline" className="h-12">
              <RefreshCw className="w-4 h-4 mr-2" />
              Replace Card
            </Button>
            <Button variant="secondary" className="h-12">
              <Lock className="w-4 h-4 mr-2" />
              Lock Card
            </Button>
          </div>
      </div>
    </PopupMenu>
  );
}