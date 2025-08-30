import { useState } from "react";
import { PopupMenu } from "@/components/ui/popup-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Plus, ArrowLeft, Check } from "lucide-react";

interface BankAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  currency: string;
  isConnected: boolean;
}

const mockBankAccounts: BankAccount[] = [
  {
    id: "1",
    bankName: "Chase Bank",
    accountNumber: "****1234",
    currency: "USD",
    isConnected: true,
  },
  {
    id: "2",
    bankName: "Bank of America",
    accountNumber: "****5678",
    currency: "USD",
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
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    currency: "",
    accountHolderName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const handleBack = () => {
    setCurrentScreen("select");
  };

  const handleClose = () => {
    setCurrentScreen("select");
    setSelectedAccount(null);
    setFormData({
      bankName: "",
      accountNumber: "",
      routingNumber: "",
      currency: "",
      accountHolderName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    });
    onClose();
  };

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccount(accountId);
    // Handle account selection logic here
  };

  const handleCreateAccount = () => {
    // Handle account creation logic here
    console.log("Creating account with data:", formData);
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

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  placeholder="Chase Bank"
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  placeholder="1234567890"
                />
              </div>
              <div>
                <Label htmlFor="routingNumber">Routing Number</Label>
                <Input
                  id="routingNumber"
                  value={formData.routingNumber}
                  onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value })}
                  placeholder="021000021"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="accountHolderName">Account Holder Name</Label>
              <Input
                id="accountHolderName"
                value={formData.accountHolderName}
                onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="New York"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="NY"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  placeholder="10001"
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="United States"
                />
              </div>
            </div>

            <Button 
              onClick={handleCreateAccount} 
              className="w-full mt-6"
              disabled={!formData.bankName || !formData.accountNumber || !formData.currency}
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
                className={`cursor-pointer transition-colors border-2 ${
                  selectedAccount === account.id 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:bg-secondary/50"
                }`}
                onClick={() => handleAccountSelect(account.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{account.bankName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {account.currency} • {account.accountNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {account.isConnected && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Connected
                        </span>
                      )}
                      {selectedAccount === account.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
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

        {/* Continue Button */}
        {selectedAccount && (
          <Button onClick={handleClose} className="w-full mt-6">
            Continue with Selected Account
          </Button>
        )}
      </div>
    );
  };

  return (
    <PopupMenu 
      isOpen={isOpen} 
      onClose={handleClose} 
      title={getTitle()}
      showHeader={currentScreen === "select"}
    >
      {renderContent()}
    </PopupMenu>
  );
}
