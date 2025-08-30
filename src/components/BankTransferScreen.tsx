import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Building2, ChevronRight } from "lucide-react";

interface BankTransferScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

const mockBankAccounts = [
  {
    id: "1",
    bankName: "Chase Bank",
    accountNumber: "****1234",
    accountType: "Checking",
    isConnected: true,
  },
  {
    id: "2",
    bankName: "Bank of America",
    accountNumber: "****5678",
    accountType: "Savings",
    isConnected: true,
  },
];

export function BankTransferScreen({ isOpen, onClose, onBack }: BankTransferScreenProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background border-border animate-modal-enter data-[state=closed]:animate-modal-exit">
        <DialogHeader className="flex flex-row items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-secondary/80">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <DialogTitle className="text-xl font-semibold text-foreground">Bank Transfer</DialogTitle>
          <div className="w-10"></div>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
              Connected Accounts
            </h3>
            <div className="space-y-3">
              {mockBankAccounts.map((account) => (
                <Card 
                  key={account.id}
                  className="cursor-pointer hover:bg-secondary/50 transition-colors bg-card border-border"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-crypto-blue/20 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-crypto-blue" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{account.bankName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {account.accountType} {account.accountNumber}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-secondary/30 border-dashed border-border">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium text-foreground mb-2">Add New Bank Account</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Connect your bank account for easy transfers
              </p>
              <Button variant="outline" size="sm">
                Connect Account
              </Button>
            </CardContent>
          </Card>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Transfer Details</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Transfer fee:</span>
                <span>$0.99</span>
              </div>
              <div className="flex justify-between">
                <span>Processing time:</span>
                <span>1-3 business days</span>
              </div>
              <div className="flex justify-between">
                <span>Daily limit:</span>
                <span>$10,000</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}