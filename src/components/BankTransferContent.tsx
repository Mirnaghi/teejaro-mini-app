import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Building2, ChevronRight } from "lucide-react";
import { BankAccountDetailModal } from "./BankAccountDetailModal";

interface BankTransferContentProps {
  onBack: () => void;
}

const mockBankAccounts = [
  {
    id: "1",
    bankName: "Chase Bank",
    accountNumber: "****1234",
    currency: "USD",
    balance: "$12,450.75",
    routingNumber: "021000021",
    accountHolderName: "John Doe",
    address: "123 Main St, New York, NY 10001",
    isConnected: true,
  },
  {
    id: "2",
    bankName: "Bank of America",
    accountNumber: "****5678",
    currency: "USD",
    balance: "$5,230.12",
    routingNumber: "026009593",
    accountHolderName: "John Doe",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    isConnected: true,
  },
];

export function BankTransferContent({ onBack }: BankTransferContentProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);

  const handleAccountClick = (account: any) => {
    setSelectedAccount(account);
    setIsDetailOpen(true);
  };
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-secondary/80">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold text-foreground">Select Bank Account</h2>
        <div className="w-10"></div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
            Your Bank Accounts
          </h3>
          <div className="space-y-3">
            {mockBankAccounts.map((account) => (
              <Card 
                key={account.id}
                className="cursor-pointer hover:bg-secondary/50 transition-colors bg-card border-border"
                onClick={() => handleAccountClick(account)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{account.bankName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {account.currency} • {account.accountNumber}
                        </p>
                        <p className="text-sm font-semibold text-primary">
                          {account.balance}
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
      </div>

      <BankAccountDetailModal 
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        account={selectedAccount}
      />
    </>
  );
}