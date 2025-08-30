import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, MoreHorizontal, Eye, EyeOff, Lock, RefreshCw, User } from "lucide-react";

interface CardDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CardDetailsModal({ isOpen, onClose }: CardDetailsModalProps) {
  const [showCardNumber, setShowCardNumber] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background border-border p-0 gap-0">
        <DialogHeader className="flex flex-row items-center justify-between p-6 pb-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <div className="p-6 pt-0">
          {/* Virtual Card Display */}
          <Card className="mb-8 bg-gradient-crypto border-0 shadow-primary">
            <CardContent className="p-6 relative overflow-hidden">
              {/* Geometric Pattern Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 right-4 w-20 h-20 border border-white/30 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 border border-white/30 rounded-lg rotate-45"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/20 rounded-full"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-white font-bold text-lg">VISA</div>
                </div>
                
                <div className="mb-4">
                  <p className="text-white/80 text-sm mb-1">Card Holder</p>
                  <p className="text-white font-semibold">John Doe</p>
                </div>
                
                <div className="text-white font-mono text-lg tracking-wider">
                  •••• •••• •••• 1234
                </div>
                
                <div className="mt-4 text-right">
                  <p className="text-white/80 text-sm">Signature</p>
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
                  type={showCardNumber ? "text" : "password"}
                  value={showCardNumber ? "4734 5678 9012 1234" : "•••• •••• •••• 1234"}
                  readOnly
                  className="bg-secondary border-border text-foreground"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowCardNumber(!showCardNumber)}
                >
                  {showCardNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span className="ml-2 text-sm">
                    {showCardNumber ? "Hide details" : "Reveal details"}
                  </span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiration" className="text-foreground mb-2 block">Expiration date</Label>
                <Input
                  id="expiration"
                  value="12/27"
                  readOnly
                  className="bg-secondary border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="cvv" className="text-foreground mb-2 block">CVV</Label>
                <Input
                  id="cvv"
                  type="password"
                  value="•••"
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
      </DialogContent>
    </Dialog>
  );
}