import { useState } from "react";
import { PopupMenu } from "@/components/ui/popup-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Users, Coins, Building2, ChevronRight, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SendModal({ isOpen, onClose }: SendModalProps) {
  const [currentScreen, setCurrentScreen] = useState<"main" | "teejaro" | "crypto" | "bank">("main");
  const [searchQuery, setSearchQuery] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const { toast } = useToast();

  // Mock users for search
  const mockUsers = [
    { id: "1", username: "johnsmith", name: "John Smith", avatar: "🧑‍💼" },
    { id: "2", username: "sarahjones", name: "Sarah Jones", avatar: "👩‍💻" },
    { id: "3", username: "mikebrown", name: "Mike Brown", avatar: "👨‍🎨" },
    { id: "4", username: "emilydavis", name: "Emily Davis", avatar: "👩‍🔬" },
  ];

  const filteredUsers = mockUsers.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBack = () => {
    setCurrentScreen("main");
    setSearchQuery("");
    setAmount("");
    setSelectedUser(null);
  };

  const handleClose = () => {
    setCurrentScreen("main");
    setSearchQuery("");
    setAmount("");
    setSelectedUser(null);
    onClose();
  };

  const handleSendMoney = () => {
    if (!selectedUser || !amount) {
      toast({
        title: "Error",
        description: "Please select a user and enter an amount",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    toast({
      title: "Money Sent Successfully",
      description: `$${amount} sent to ${selectedUser.name}`,
      duration: 3000,
    });

    handleClose();
  };

  const getTitle = () => {
    switch (currentScreen) {
      case "teejaro": return "Send to Teejaro User";
      case "crypto": return "Crypto Transfer";
      case "bank": return "Bank Transfer";
      default: return "Send Money";
    }
  };

  const renderContent = () => {
    if (currentScreen === "teejaro") {
      return (
        <>
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon" onClick={handleBack} className="hover:bg-secondary/80">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-xl font-semibold text-foreground">Send to Teejaro User</h2>
            <div className="w-10"></div>
          </div>

          <div className="space-y-4">
            {/* Search for Users */}
            <div>
              <Label className="text-foreground mb-2 block">Search User</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by username or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-border"
                />
              </div>
            </div>

            {/* User Search Results */}
            {searchQuery && (
              <div className="max-h-40 overflow-y-auto space-y-2">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <Card 
                      key={user.id}
                      className={`cursor-pointer transition-colors ${
                        selectedUser?.id === user.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-secondary/50"
                      }`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-lg">
                            {user.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">@{user.username}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="bg-secondary/30">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">No users found</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Selected User */}
            {selectedUser && (
              <Card className="border-primary bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-xl">
                        {selectedUser.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{selectedUser.name}</p>
                        <p className="text-sm text-muted-foreground">@{selectedUser.username}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedUser(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Amount Input */}
            <div>
              <Label className="text-foreground mb-2 block">Amount (USD)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 bg-secondary border-border"
                />
              </div>
            </div>

            {/* Send Button */}
            <Button 
              onClick={handleSendMoney}
              className="w-full h-12 mt-6"
              disabled={!selectedUser || !amount || parseFloat(amount) <= 0}
            >
              Send ${amount || "0.00"} to {selectedUser ? selectedUser.name : "User"}
            </Button>
          </div>
        </>
      );
    }

    if (currentScreen === "crypto") {
      return (
        <>
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon" onClick={handleBack} className="hover:bg-secondary/80">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-xl font-semibold text-foreground">Crypto Transfer</h2>
            <div className="w-10"></div>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Crypto transfer functionality will be implemented here</p>
          </div>
        </>
      );
    }

    if (currentScreen === "bank") {
      return (
        <>
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon" onClick={handleBack} className="hover:bg-secondary/80">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-xl font-semibold text-foreground">Bank Transfer</h2>
            <div className="w-10"></div>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Bank transfer functionality will be implemented here</p>
          </div>
        </>
      );
    }

    return (
      <div className="space-y-4 mt-4">
        {/* Send to Teejaro User */}
        <Card 
          className="cursor-pointer hover:bg-secondary/50 transition-colors bg-card border-border"
          onClick={() => setCurrentScreen("teejaro")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Send to Teejaro User</h3>
                  <p className="text-sm text-muted-foreground">Instant transfer to other users</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Crypto Transfer */}
        <Card 
          className="cursor-pointer hover:bg-secondary/50 transition-colors bg-card border-border"
          onClick={() => setCurrentScreen("crypto")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-crypto-blue/20 rounded-xl flex items-center justify-center">
                  <Coins className="w-6 h-6 text-crypto-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Crypto Transfer</h3>
                  <p className="text-sm text-muted-foreground">Send to external wallet</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Bank Transfer */}
        <Card 
          className="cursor-pointer hover:bg-secondary/50 transition-colors bg-card border-border"
          onClick={() => setCurrentScreen("bank")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Bank Transfer</h3>
                  <p className="text-sm text-muted-foreground">Transfer to bank account</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <PopupMenu 
      isOpen={isOpen} 
      onClose={handleClose} 
      title={getTitle()}
      showHeader={false}
    >
      {renderContent()}
    </PopupMenu>
  );
}