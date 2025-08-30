import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, ArrowUp, MessageCircle, User, MoreHorizontal, ChevronRight } from "lucide-react";
import { CardDetailsModal } from "./CardDetailsModal";
import { AddMoneyModal } from "./AddMoneyModal";

interface Transaction {
  id: string;
  icon: string;
  description: string;
  amount: string;
  type: "credit" | "debit";
}

const mockTransactions: Transaction[] = [
  { id: "1", icon: "💰", description: "Top up from wallet", amount: "+9.00 USDT", type: "credit" },
  { id: "2", icon: "🛒", description: "Purchase at Store", amount: "-12.50 USDT", type: "debit" },
  { id: "3", icon: "📤", description: "Send to friend", amount: "-5.00 USDT", type: "debit" },
  { id: "4", icon: "🎁", description: "Cashback reward", amount: "+2.50 USDT", type: "credit" },
];

export function MainScreen() {
  const navigate = useNavigate();
  const [isCardDetailsOpen, setIsCardDetailsOpen] = useState(false);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-2 pb-2">
        <div className="flex-1" />
        <Button variant="ghost" size="icon">
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      {/* Centered Balance Section */}
      <div className="px-6 py-4 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-crypto rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-sm text-muted-foreground mb-2">Teejaro BALANCE (USDT)</h1>
        <p className="text-4xl font-bold text-foreground">$4.00</p>
      </div>

      {/* Action Buttons */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="crypto" 
            size="lg" 
            className="h-14"
            onClick={() => setIsAddMoneyOpen(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Top up
          </Button>
          <Button variant="secondary" size="lg" className="h-14">
            <ArrowUp className="w-5 h-5 mr-2" />
            Send
          </Button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="px-6 mb-8">
        <div className="flex space-x-4 overflow-x-auto pb-4">
          <Card 
            className="min-w-[280px] bg-gradient-card border-border shadow-card cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => setIsCardDetailsOpen(true)}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Visa Virtual</h3>
                  <Badge variant="secondary" className="mt-1">Active</Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">•••• 1234</p>
                </div>
              </div>
              <div className="mt-6">
                <div className="w-12 h-8 bg-gradient-primary rounded-md"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="min-w-[280px] bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Visa Metal</h3>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">•••• ••••</p>
                </div>
              </div>
              <div className="mt-6">
                <div className="w-12 h-8 bg-secondary rounded-md"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Utility Sections */}
      <div className="px-6 mb-8 space-y-4">
        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-crypto-blue/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🏦</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Bank account</h3>
                  <p className="text-sm text-muted-foreground">Connect your bank</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🎁</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Teejaro</h3>
                  <p className="text-sm text-muted-foreground">Invite Friends to Earn</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Stack */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
          <button 
            onClick={() => navigate("/transactions")}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            View All
          </button>
        </div>
        
        {/* Stacked Cards Effect */}
        <div 
          className="relative cursor-pointer group"
          onClick={() => navigate("/transactions")}
        >
          {/* Stack Effect - Background Cards */}
          <div className="absolute inset-0 bg-card rounded-2xl border border-border transform translate-x-1 translate-y-1 opacity-60" />
          <div className="absolute inset-0 bg-card rounded-2xl border border-border transform translate-x-0.5 translate-y-0.5 opacity-80" />
          
          {/* Top Card with Content */}
          <Card className="relative bg-card border-border hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1">
            <CardContent className="p-0">
              {/* Show only the first transaction */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-secondary/50 rounded-xl flex items-center justify-center">
                    {mockTransactions[0].icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{mockTransactions[0].description}</h4>
                    <p className="text-sm text-muted-foreground">Today</p>
                  </div>
                </div>
                <p className={`font-semibold ${
                  mockTransactions[0].type === "credit" ? "text-green-500" : "text-foreground"
                }`}>
                  {mockTransactions[0].amount}
                </p>
              </div>
              
              {/* More indicator */}
              <div className="p-3 text-center border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  +{mockTransactions.length - 1} more transactions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <CardDetailsModal 
        isOpen={isCardDetailsOpen} 
        onClose={() => setIsCardDetailsOpen(false)} 
      />
      <AddMoneyModal 
        isOpen={isAddMoneyOpen} 
        onClose={() => setIsAddMoneyOpen(false)} 
      />
    </div>
  );
}