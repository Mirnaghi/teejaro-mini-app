import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  currency: string;
  balance: string;
  routingNumber: string;
  accountHolderName: string;
  address: string;
  isConnected: boolean;
}

interface BankAccountDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: BankAccount | null;
}

export function BankAccountDetailModal({ isOpen, onClose, account }: BankAccountDetailModalProps) {
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

  if (!account) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto z-[10000]">
        <DialogHeader>
          <DialogTitle>Account Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Balance Card */}
          <Card className="bg-gradient-primary border-0 text-white">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-1">{account.balance}</h3>
              <p className="text-white/80 text-sm">Available Balance</p>
              <p className="text-white/60 text-xs mt-1">{account.currency}</p>
            </CardContent>
          </Card>

          {/* Bank Details */}
          <div>
            <h4 className="font-medium text-foreground mb-2 text-sm">Bank Information</h4>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-secondary/30 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Bank Name</p>
                  <p className="font-medium text-foreground text-sm">{account.bankName}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1.5 h-6 w-6"
                  onClick={() => copyToClipboard(account.bankName, "Bank name")}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-2 bg-secondary/30 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Account Number</p>
                  <p className="font-medium text-foreground text-sm">{account.accountNumber}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1.5 h-6 w-6"
                  onClick={() => copyToClipboard(account.accountNumber.replace(/\*/g, ''), "Account number")}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-2 bg-secondary/30 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Routing Number</p>
                  <p className="font-medium text-foreground text-sm">{account.routingNumber}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1.5 h-6 w-6"
                  onClick={() => copyToClipboard(account.routingNumber, "Routing number")}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-2 bg-secondary/30 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Account Holder</p>
                  <p className="font-medium text-foreground text-sm">{account.accountHolderName}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1.5 h-6 w-6"
                  onClick={() => copyToClipboard(account.accountHolderName, "Account holder name")}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-2 bg-secondary/30 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Currency</p>
                  <p className="font-medium text-foreground text-sm">{account.currency}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1.5 h-6 w-6"
                  onClick={() => copyToClipboard(account.currency, "Currency")}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-2 bg-secondary/30 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-medium text-foreground text-sm">{account.address}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1.5 h-6 w-6"
                  onClick={() => copyToClipboard(account.address, "Address")}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}