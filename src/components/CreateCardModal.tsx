import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CreditCard } from "lucide-react";

interface CreateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCardModal({ isOpen, onClose }: CreateCardModalProps) {
  const [isActivating, setIsActivating] = useState(false);

  const handleActivateCard = () => {
    setIsActivating(true);
    // Simulate activation process
    setTimeout(() => {
      setIsActivating(false);
      onClose();
    }, 2000);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Create Virtual Card
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Card Preview */}
          <div className="w-full h-32 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center">
            <div className="text-center text-white">
              <CreditCard className="w-8 h-8 mx-auto mb-2 opacity-60" />
              <p className="text-sm opacity-80">Virtual Card</p>
            </div>
          </div>

          {/* Balance Alert */}
          <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              You need at least 35 USDT in your balance to activate this card.
            </AlertDescription>
          </Alert>

          {/* Card Features */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Card Features:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Instant virtual card activation
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Online payments worldwide
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Real-time transaction notifications
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Secure contactless payments
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isActivating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleActivateCard}
              className="flex-1"
              disabled={isActivating}
            >
              {isActivating ? "Activating..." : "Activate Card"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}