import { PopupMenu } from "@/components/ui/popup-menu";
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
    <PopupMenu 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Account Details"
      showHeader={true}
    >
      {/* <div className="space-y-4"> */}
      <div className="h-[90vh]"> 
      
        {/* Balance Card */}
        <Card className="bg-gradient-primary border-0 text-white">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-1">{account.balance}</h3>
            <p className="text-white/80">Available Balance</p>
            <p className="text-white/60 text-sm mt-2">{account.currency}</p>
          </CardContent>
        </Card>

        {/* Bank Details */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Bank Information</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Bank Name</p>
                <p className="font-medium text-foreground">{account.bankName}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-8 w-8"
                onClick={() => copyToClipboard(account.bankName, "Bank name")}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Account Number</p>
                <p className="font-medium text-foreground">{account.accountNumber}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-8 w-8"
                onClick={() => copyToClipboard(account.accountNumber.replace(/\*/g, ''), "Account number")}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Routing Number</p>
                <p className="font-medium text-foreground">{account.routingNumber}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-8 w-8"
                onClick={() => copyToClipboard(account.routingNumber, "Routing number")}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Account Holder</p>
                <p className="font-medium text-foreground">{account.accountHolderName}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-8 w-8"
                onClick={() => copyToClipboard(account.accountHolderName, "Account holder name")}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Currency</p>
                <p className="font-medium text-foreground">{account.currency}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-8 w-8"
                onClick={() => copyToClipboard(account.currency, "Currency")}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium text-foreground">{account.address}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-8 w-8"
                onClick={() => copyToClipboard(account.address, "Address")}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PopupMenu>
  );
}