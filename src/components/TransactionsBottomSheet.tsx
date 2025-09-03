import { Sheet, SheetRef } from "react-modal-sheet";
import { Badge } from "@/components/ui/badge";
import { X, ChevronUp } from "lucide-react";
import { getStatusColor } from "@/utils/colors";
import { useRef, useEffect, useState } from "react";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";

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

interface TransactionsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
  hideWhenModalsOpen?: boolean;
}

export function TransactionsBottomSheet({ 
  isOpen, 
  onClose, 
  transactions, 
  hideWhenModalsOpen = true 
}: TransactionsBottomSheetProps) {
  
  // Prevent the bottom sheet from closing - always keep it open
  const handleClose = () => {
    // Do nothing - prevent closure
  };
  const { isInTelegram, hapticFeedback } = useTelegramWebApp();
  const [showAllTransactions, setShowAllTransactions] = useState(true);
  const sheetRef = useRef<SheetRef>(null);

  // Initialize when opening
  useEffect(() => {
    if (isOpen) {
      setShowAllTransactions(true); // Always show all transactions
      // Provide haptic feedback when opening
      if (isInTelegram) {
        hapticFeedback('medium');
      }
    }
  }, [isOpen, isInTelegram, hapticFeedback]);

  // Handle pull-up gesture to expand and show all transactions
  const handlePullUp = () => {
    if (!showAllTransactions) {
      setShowAllTransactions(true);
      
      // Haptic feedback for expansion
      if (isInTelegram) {
        hapticFeedback('medium');
      }
    }
  };

  // Get transactions to display
  const getDisplayTransactions = () => {
    if (showAllTransactions) {
      return transactions;
    }
    return transactions.slice(0, 5);
  };

  // Determine if we're in Telegram mini app or web view
  const isTelegramMiniApp = isInTelegram;

  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      onClose={handleClose}
      snapPoints={isTelegramMiniApp ? [0.9, 0.6, 0.38] : [0.9, 0.6, 0.38]}
      initialSnap={2} // Start at 40% (index 2)
      className="z-50"
      // Center the sheet in web view, bottom in Telegram
      style={!isTelegramMiniApp ? { 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '20px'
      } : {}}
    >
              <Sheet.Container
          className={!isTelegramMiniApp ? "mx-auto max-w-md w-full" : ""}
          style={!isTelegramMiniApp ? {
            borderRadius: '20px 20px 0 0',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          } : {
            borderRadius: '20px 20px 0 0'
          }}
        >
        <Sheet.Header className="pb-4">
          <div className="flex justify-center pt-4">
            <div className="w-12 h-1.5 bg-muted rounded-full" />
          </div>
        </Sheet.Header>

        <Sheet.Content className="overflow-hidden">

          <div 
            className="space-y-6 overflow-y-auto px-4 pb-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            style={{
              maxHeight: 'calc(100vh - 200px)',
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain'
            }}
          >
            {/* Group transactions by date */}
            {["Today", "Yesterday", "Dec 28", "Dec 27", "Dec 25", "Dec 24", "Dec 23"].map((date) => {
              const dateTransactions = getDisplayTransactions().filter(t => t.date === date);
              if (dateTransactions.length === 0) return null;

              return (
                <div key={date}>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                    {date}
                  </h3>
                  <div className="space-y-2">
                    {dateTransactions.map((transaction) => (
                      <div key={transaction.id} className="bg-secondary rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-lg shadow-sm">
                              {transaction.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">{transaction.description}</h4>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                                <span>{transaction.time}</span>
                                <span>•</span>
                                <Badge 
                                  variant="secondary" 
                                  className={`text-xs ${getStatusColor(transaction.status)}`}
                                >
                                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold text-lg ${
                              transaction.type === "in" ? "text-green-500" : "text-foreground"
                            }`}>
                              {transaction.amount}
                            </p>
                            <p className="text-xs text-muted-foreground">{transaction.category}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pull-up button for mobile
          {!showAllTransactions && (
            <div className="px-4 pb-4">
              <button
                onClick={handlePullUp}
                className="w-full py-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-primary font-medium"
              >
                <ChevronUp className="w-4 h-4 inline mr-2" />
                Show All Transactions
              </button>
            </div>
          )} */}
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
}
