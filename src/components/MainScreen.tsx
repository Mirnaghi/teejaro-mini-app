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
import { CreateCardModal } from "./CreateCardModal";
import { AnimatedCardsCarousel } from "./AnimatedCardsCarousel";
import { ThemeToggle } from "./ThemeToggle";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";
import CardBgImage from '@/assets/images/card_bg_img.png'
import TjrWhiteLogo from '@/assets/icons/tjrWhiteLogo.svg'
import VisaLogo from '@/assets/icons/visaLogo.svg'
import MiniCardIcn from '@/assets/icons/miniCardIcn.svg'
import BankFlags from '@/assets/icons/bankFlags.svg'
import { getStatusColor } from "@/utils/colors";

interface Transaction {
  id: string;
  icon: string;
  description: string;
  amount: string;
  type: "in" | "out";
  date: string;
  time: string;
  status: "completed" | "pending" | "failed";
  category: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    icon: "🎵",
    description: "Spotify Premium",
    amount: "-$15.99",
    type: "out",
    date: "Today",
    time: "2:30 PM",
    status: "completed",
    category: "Entertainment"
  },
  {
    id: "2",
    icon: "🍕",
    description: "Pizza Palace",
    amount: "-$24.50",
    type: "out",
    date: "Today",
    time: "1:15 PM",
    status: "completed",
    category: "Food & Dining"
  },
  {
    id: "3",
    icon: "💰",
    description: "Salary Deposit",
    amount: "+$3,200.00",
    type: "in",
    date: "Yesterday",
    time: "9:00 AM",
    status: "completed",
    category: "Income"
  },
  {
    id: "4",
    icon: "⛽",
    description: "Shell Gas Station",
    amount: "-$45.20",
    type: "out",
    date: "Yesterday",
    time: "6:30 PM",
    status: "completed",
    category: "Transportation"
  },
  {
    id: "5",
    icon: "🛒",
    description: "Amazon Purchase",
    amount: "-$87.99",
    type: "out",
    date: "Dec 28",
    time: "3:45 PM",
    status: "pending",
    category: "Shopping"
  },
  {
    id: "6",
    icon: "💡",
    description: "Electric Bill",
    amount: "-$125.67",
    type: "out",
    date: "Dec 27",
    time: "10:15 AM",
    status: "completed",
    category: "Utilities"
  }
];

export function MainScreen() {
  const navigate = useNavigate();
  const { user, isInTelegram, hapticFeedback } = useTelegramWebApp();
  const [isCardDetailsOpen, setIsCardDetailsOpen] = useState(false);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isBankAccountOpen, setIsBankAccountOpen] = useState(false);
  const [isInviteFriendsOpen, setIsInviteFriendsOpen] = useState(false);
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [isCreateCardOpen, setIsCreateCardOpen] = useState(false);

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
    },
    {
      id: "empty-virtual",
      title: "Virtual Card",
      status: "Coming Soon" as const,
      cardNumber: "",
      gradientClass: "bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white border border-blue-500/30",
      balance: ""
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
    <div className="min-h-screen bg-background pt-6 max-w-[444px] m-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-2 pb-2">
        <button
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => handleButtonClick(() => navigate('/settings'))}
        >
          <div className="w-11 h-11 bg-gradient-crypto rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground">
            {isInTelegram && user ? `${user.first_name}${user.last_name ?? ''}` : 'Teejaro'}
          </span>
        </button>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {!isInTelegram && (
            <Button variant="ghost" size="icon">
              <MessageCircle className="w-6 h-6" />
            </Button>
          )}
        </div>
      </div>

      {/* Card Section */}
      <div className="px-4 mt-5 flex items-center justify-center">
        <div className="relative w-full h-48 max-w-[444px]">
          <img src={CardBgImage} alt="#" className="w-full absolute h-full z-1 top-0 left-0" />
          <div className="w-full p-5 absolute h-full z-2 top-0 left-0 flex flex-col justify-between">
            <div className="w-full flex flex-row items-start justify-between">
              <div>
                <p className="font-semibold text-[#FFF] text-3xl">$ 1.434.530</p>
                <p className="text-[#FFF] text-sm">Current balance</p>
              </div>
              <div>
                <img src={TjrWhiteLogo} alt="#" />
              </div>
            </div>
            <img src={VisaLogo} alt="#" className='w-36' />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 mb-[30px] mt-[20px]">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="secondary"
            size="lg"
            className="h-[50px] rounded-full"
            onClick={() => handleButtonClick(() => setIsAddMoneyOpen(true))}
          >
            <Plus className="w-5 h-5 mr-2" />
            Top up
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="h-[50px] rounded-full"
            onClick={() => handleButtonClick(() => setIsSendOpen(true))}
          >
            <ArrowUp className="w-5 h-5 mr-2" />
            Send
          </Button>
        </div>
      </div>
      {/* Cards Section
      <div className="px-4">
        <AnimatedCardsCarousel
          cards={cards}
          onCardClick={(cardId) => {
            if (cardId === "visa-virtual") {
              setIsCardDetailsOpen(true);
            } else if (cardId === "empty-virtual") {
              setIsCreateCardOpen(true);
            }
          }}
        />
      </div> */}

      <div className="px-4 mb-[30px] mt-[20px]">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="secondary"
            size="lg"
            className="h-[88px] rounded-3xl flex flex-col items-start"
          // onClick={() => handleButtonClick(() => setIsAddMoneyOpen(true))}
          >
            <img src={MiniCardIcn} alt="#" />
            <span className="text-[18px] font-semibold mt-0.5">Phisical cards</span>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="h-[88px] rounded-3xl flex flex-col items-start"
            onClick={() => setIsBankAccountOpen(true)}
          >
            <img src={BankFlags} alt="#" />
            <span className="text-[18px] font-semibold">Bank accounts</span>
          </Button>
        </div>
      </div>

      {/* Utility Sections */}
      {/* <div className="px-4 mb-4 space-y-4">
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
                  <p className="text-base font-bold text-primary">{totalBankBalance}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <div className="relative p-[3px] bg-gradient-to-r from-purple-400 via-pink-400 via-cyan-400 to-purple-400 rounded-xl">
          <Card
            className="bg-card border-0 cursor-pointer hover:bg-secondary/20 transition-all duration-300 hover:scale-[1.02]"
            onClick={() => setIsInviteFriendsOpen(true)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-xl">🎁</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Invite Friends to Earn</h3>
                    <p className="text-base font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">500 TJR</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div> */}

      {/* Transactions Stack */}
      {/* <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Transactions</h3>
        </div>
        <div
          className="relative cursor-pointer group"
          onClick={() => navigate("/transactions")}
        >
          <Card className="relative bg-secondary border-border hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1">
            <CardContent className="p-0">
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
                <p className={`font-semibold ${mockTransactions[0].type === "credit" ? "text-green-500" : "text-foreground"
                  }`}>
                  {mockTransactions[0].amount}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div> */}

      <div className="bg-secondary px-4 py-4 pb-8 rounded-tl-[20px] rounded-tr-[20px]">
        <div className="mb-3 flex justify-between items-center">
          <span className="font-medium">Transactions</span>
          <button onClick={() => navigate("/transactions")}>
            <span className="font-medium text-sm">View all</span>
          </button>
        </div>
        {/* Transactions by Date */}
        <div className="space-y-6">
          {/* Group transactions by date */}
          {["Today", "Yesterday", "Dec 28", "Dec 27"].map((date) => {
            const dateTransactions = transactions.filter(t => t.date === date);
            if (dateTransactions.length === 0) return null;

            return (
              <div key={date}>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                  {date}
                </h3>
                <div className="space-y-2">
                  {dateTransactions.map((transaction) => (
                    <CardContent className="p-0 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-lg">
                            {transaction.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{transaction.description}</h4>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span>{transaction.time}</span>
                              <span>•</span>
                              <span className={getStatusColor(transaction.status)}>
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${transaction.type === "in" ? "text-green-500" : "text-foreground"
                            }`}>
                            {transaction.amount}
                          </p>
                          <p className="text-xs text-muted-foreground">{transaction.category}</p>
                        </div>
                      </div>
                    </CardContent>
                  ))}
                </div>
              </div>
            );
          })}
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
      <CreateCardModal
        isOpen={isCreateCardOpen}
        onClose={() => setIsCreateCardOpen(false)}
      />
    </div>
  );
}