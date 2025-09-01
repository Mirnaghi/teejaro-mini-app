import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, ArrowUp, MessageCircle, User, MoreHorizontal, ChevronRight, Building2 } from "lucide-react";
import { CardDetailsModal } from "./CardDetailsModal";
import { AddMoneyModal } from "./AddMoneyModal";
import { BankAccountModal } from "./BankAccountModal";
import { InviteFriendsModal } from "./InviteFriendsModal";
import { SendModal } from "./SendModal";
import { AnimatedCardsCarousel } from "./AnimatedCardsCarousel";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";

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
  const { user, isInTelegram, hapticFeedback } = useTelegramWebApp();
  const [isCardDetailsOpen, setIsCardDetailsOpen] = useState(false);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isBankAccountOpen, setIsBankAccountOpen] = useState(false);
  const [isInviteFriendsOpen, setIsInviteFriendsOpen] = useState(false);
  const [isSendOpen, setIsSendOpen] = useState(false);

  // Add haptic feedback to button clicks
  const handleButtonClick = (action: () => void) => {
    hapticFeedback('light');
    action();
  };
  
  // Card balances data
  const cards = [
    {
      id: "visa-virtual",
      title: "Visa Virtual",
      status: "Active" as const,
      cardNumber: "•••• 1234",
      gradientClass: "bg-gradient-to-br from-slate-800 to-slate-900 text-white",
      balance: "$4.00"
    },
    {
      id: "visa-metal",
      title: "Visa Metal", 
      status: "Coming Soon" as const,
      cardNumber: "•••• ••••",
      gradientClass: "bg-gradient-to-br from-gray-600 to-gray-800 text-white",
      balance: "$0.00"
    },
    {
      id: "crypto-card",
      title: "Crypto Rewards",
      status: "Active" as const,
      cardNumber: "•••• 5678",
      gradientClass: "bg-gradient-to-br from-purple-600 to-blue-600 text-white",
      balance: "$2,450.75"
    }
  ];

  // Bank account balances (these would come from your data source)
  const bankAccountBalances = [12450.75, 5230.12]; // Chase + Bank of America

  // Calculate total balance from cards and bank accounts
  const cardTotalValue = cards.reduce((sum, card) => {
    const numericValue = parseFloat(card.balance.replace('$', '').replace(',', ''));
    return sum + (isNaN(numericValue) ? 0 : numericValue);
  }, 0);

  const bankTotalValue = bankAccountBalances.reduce((sum, balance) => sum + balance, 0);
  const totalBalance = cardTotalValue + bankTotalValue;
  const totalBankBalance = `$${bankTotalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-2 pb-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-crypto rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground">
            {isInTelegram && user ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}` : 'Teejaro'}
          </span>
        </div>
        {!isInTelegram && (
          <Button variant="ghost" size="icon">
            <MessageCircle className="w-6 h-6" />
          </Button>
        )}
      </div>

      {/* Centered Balance Section */}
      <div className="px-6 py-4 text-center">
        <h1 className="text-sm text-muted-foreground mb-2">TOTAL BALANCE (USDT)</h1>
        <p className="text-4xl font-bold text-foreground">
          ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="crypto" 
            size="lg" 
            className="h-14"
            onClick={() => handleButtonClick(() => setIsAddMoneyOpen(true))}
          >
            <Plus className="w-5 h-5 mr-2" />
            Top up
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            className="h-14"
            onClick={() => handleButtonClick(() => setIsSendOpen(true))}
          >
            <ArrowUp className="w-5 h-5 mr-2" />
            Send
          </Button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="px-6">
        <AnimatedCardsCarousel 
          cards={cards}
          onCardClick={(cardId) => {
            if (cardId === "visa-virtual") {
              setIsCardDetailsOpen(true);
            }
          }}
        />
      </div>

      {/* Utility Sections */}
      <div className="px-6 mb-8 space-y-4">
        <Card 
          className="bg-card border-border shadow-card cursor-pointer hover:bg-secondary/50 transition-colors"
          onClick={() => setIsBankAccountOpen(true)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Bank accounts</h3>
                  <p className="text-lg font-bold text-primary">{totalBankBalance}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-card border-border shadow-card cursor-pointer hover:bg-secondary/50 transition-colors"
          onClick={() => setIsInviteFriendsOpen(true)}
        >
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
            <div className="absolute inset-0 bg-card rounded-2xl border border-border transform translate-y-2 opacity-60" />
            <div className="absolute inset-0 bg-card rounded-2xl border border-border transform translate-y-1 opacity-80" />
          
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
      <BankAccountModal 
        isOpen={isBankAccountOpen} 
        onClose={() => setIsBankAccountOpen(false)} 
      />
      <InviteFriendsModal 
        isOpen={isInviteFriendsOpen} 
        onClose={() => setIsInviteFriendsOpen(false)} 
      />
      <SendModal 
        isOpen={isSendOpen} 
        onClose={() => setIsSendOpen(false)} 
      />
    </div>
  );
}