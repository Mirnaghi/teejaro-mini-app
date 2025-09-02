import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Filter, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

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

const Transactions = () => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-500";
      case "pending": return "text-yellow-500";
      case "failed": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background pt-6">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-10">
        <div className="flex items-center justify-between p-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="hover:bg-secondary/80"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Transactions</h1>
          <Button variant="ghost" size="icon" className="hover:bg-secondary/80">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search transactions..." 
              className="pl-10 bg-secondary/30 border-border"
            />
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="p-4 space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <ArrowDownLeft className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Money In</p>
                  <p className="text-lg font-semibold text-green-500">+$3,200</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <ArrowUpRight className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Money Out</p>
                  <p className="text-lg font-semibold text-red-500">-$299</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
                    <Card 
                      key={transaction.id}
                      className="cursor-pointer hover:bg-secondary/50 transition-colors bg-card border-border"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-secondary/50 rounded-xl flex items-center justify-center text-lg">
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
                            <p className={`font-semibold ${
                              transaction.type === "in" ? "text-green-500" : "text-foreground"
                            }`}>
                              {transaction.amount}
                            </p>
                            <p className="text-xs text-muted-foreground">{transaction.category}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Transactions;