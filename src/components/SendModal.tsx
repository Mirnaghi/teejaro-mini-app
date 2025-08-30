import { useState } from "react";
import { PopupMenu } from "@/components/ui/popup-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Users, Coins, Building2, ChevronRight, Search, CheckCircle } from "lucide-react";
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
  const [selectedToken, setSelectedToken] = useState("USDT");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const { toast } = useToast();

  // Available tokens
  const tokens = [
    { value: "USDT", label: "USDT", icon: "₮" },
    { value: "USDC", label: "USDC", icon: "◉" },
  ];

  // Available networks
  const networks = [
    { id: "ethereum", name: "Ethereum (ERC20)", fee: "~$2-10" },
    { id: "polygon", name: "Polygon PoS", fee: "~$0.01-0.1" },
    { id: "base", name: "Base", fee: "~$0.01-0.1" },
    { id: "optimism", name: "Optimism", fee: "~$0.1-1" },
    { id: "avalanche", name: "Avalanche", fee: "~$0.1-1" },
    { id: "arbitrum", name: "Arbitrum One", fee: "~$0.1-1" },
    { id: "tron", name: "Tron (TRC20)", fee: "~$1-2" },
  ];

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
    setSelectedToken("USDT");
    setSelectedNetwork("");
    setRecipientAddress("");
    setCryptoAmount("");
  };

  const handleClose = () => {
    setCurrentScreen("main");
    setSearchQuery("");
    setAmount("");
    setSelectedUser(null);
    setSelectedToken("USDT");
    setSelectedNetwork("");
    setRecipientAddress("");
    setCryptoAmount("");
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

  const handleSendCrypto = () => {
    if (!selectedNetwork || !recipientAddress || !cryptoAmount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    if (parseFloat(cryptoAmount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    const selectedNetworkName = networks.find(n => n.id === selectedNetwork)?.name || selectedNetwork;
    
    toast({
      title: "Crypto Transfer Initiated",
      description: `${cryptoAmount} ${selectedToken} sent via ${selectedNetworkName}`,
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

          <div className="space-y-4">
            {/* Token Selection */}
            <div>
              <Label className="text-foreground mb-2 block">Select Token</Label>
              <div className="grid grid-cols-2 gap-3">
                {tokens.map((token) => (
                  <Card
                    key={token.value}
                    className={`cursor-pointer transition-colors ${
                      selectedToken === token.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-secondary/30"
                    }`}
                    onClick={() => setSelectedToken(token.value)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{token.icon}</div>
                      <p className="font-medium text-foreground">{token.label}</p>
                      {selectedToken === token.value && (
                        <CheckCircle className="w-4 h-4 text-primary mx-auto mt-2" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Network Selection */}
            <div>
              <Label className="text-foreground mb-2 block">Select Network</Label>
              <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Choose network..." />
                </SelectTrigger>
                <SelectContent>
                  {networks.map((network) => (
                    <SelectItem key={network.id} value={network.id}>
                      <div className="flex justify-between items-center w-full">
                        <span>{network.name}</span>
                        <span className="text-muted-foreground text-sm ml-2">{network.fee}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Recipient Address */}
            <div>
              <Label className="text-foreground mb-2 block">Recipient Address</Label>
              <Input
                placeholder="Enter wallet address (0x...)"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="bg-secondary border-border font-mono text-sm"
              />
            </div>

            {/* Amount Input */}
            <div>
              <Label className="text-foreground mb-2 block">Amount ({selectedToken})</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={cryptoAmount}
                onChange={(e) => setCryptoAmount(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>

            {/* Network Fee Info */}
            {selectedNetwork && (
              <Card className="bg-warning/10 border-warning/20">
                <CardContent className="p-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Network Fee:</span>
                    <span className="font-medium text-foreground">
                      {networks.find(n => n.id === selectedNetwork)?.fee}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Send Button */}
            <Button 
              onClick={handleSendCrypto}
              className="w-full h-12 mt-6"
              disabled={!selectedNetwork || !recipientAddress || !cryptoAmount || parseFloat(cryptoAmount) <= 0}
            >
              Send {cryptoAmount || "0.00"} {selectedToken}
            </Button>
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