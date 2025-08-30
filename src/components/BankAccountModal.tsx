import { useState } from "react";
import { PopupMenu } from "@/components/ui/popup-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Plus, ArrowLeft, Check, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BankAccountDetailModal } from "./BankAccountDetailModal";

interface BankAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

const mockBankAccounts: BankAccount[] = [
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

const currencies = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
  { value: "AUD", label: "AUD - Australian Dollar" },
];

export function BankAccountModal({ isOpen, onClose }: BankAccountModalProps) {
  const [currentScreen, setCurrentScreen] = useState<"select" | "create">("select");
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedAccountData, setSelectedAccountData] = useState<BankAccount | null>(null);
  const [formData, setFormData] = useState({
    currency: "",
  });

  const handleBack = () => {
    setCurrentScreen("select");
  };

  const handleClose = () => {
    setCurrentScreen("select");
    setSelectedAccount(null);
    setFormData({
      currency: "",
    });
    onClose();
  };

  const handleAccountSelect = (account: BankAccount) => {
    setSelectedAccountData(account);
    setIsDetailOpen(true);
  };

  const handleCreateAccount = () => {
    // Handle account creation logic here
    console.log("Creating account with currency:", formData.currency);
    handleClose();
  };

  const getTitle = () => {
    switch (currentScreen) {
      case "create": return "Add New Bank Account";
      default: return "Select Bank Account";
    }
  };

  const renderContent = () => {
    if (currentScreen === "create") {
      return (
        <>
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon" onClick={handleBack} className="hover:bg-secondary/80">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-xl font-semibold text-foreground">Add New Account</h2>
            <div className="w-10"></div>
          </div>

          <div className="space-y-6">
            {/* Alert about activation requirement */}
            <Alert className="border-warning/20 bg-warning/10">
              <AlertCircle className="h-4 w-4 text-warning" />
              <AlertDescription className="text-warning">
                You need at least $100 USD in your balance for account activation.
              </AlertDescription>
            </Alert>

            {/* Currency Selection */}
            <div>
              <Label htmlFor="currency">Select Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => setFormData({ currency: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose your preferred currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleCreateAccount} 
              className="w-full mt-6"
              disabled={!formData.currency}
            >
              Apply for Account
            </Button>
          </div>
        </>
      );
    }

    return (
      <div className="space-y-4">
        {/* Existing Accounts */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
            Your Bank Accounts
          </h3>
          <div className="space-y-3">
            {mockBankAccounts.map((account) => (
              <Card 
                key={account.id}
                className={`cursor-pointer transition-colors border-2 border-border hover:bg-secondary/50`}
                onClick={() => handleAccountSelect(account)}
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add New Account Button */}
        <Card 
          className="bg-secondary/30 border-dashed border-border cursor-pointer hover:bg-secondary/50 transition-colors"
          onClick={() => setCurrentScreen("create")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-medium text-foreground mb-2">Add New Bank Account</h4>
            <p className="text-sm text-muted-foreground">
              Connect a new bank account for transfers
            </p>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <>
      <PopupMenu 
        isOpen={isOpen} 
        onClose={handleClose} 
        title={getTitle()}
        showHeader={currentScreen === "select"}
      >
        {renderContent()}
      </PopupMenu>
      
      <BankAccountDetailModal 
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        account={selectedAccountData}
      />
    </>
  );
}
