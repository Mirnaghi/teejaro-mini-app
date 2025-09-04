import { Sheet, SheetRef } from "react-modal-sheet";
import { Badge } from "@/components/ui/badge";
import { X, ChevronUp } from "lucide-react";
import { getStatusColor } from "@/utils/colors";
import { useRef, useEffect, useState } from "react";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";
import { useNavigate } from "react-router-dom";

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
}

export function TransactionsBottomSheet({
  isOpen,
  onClose,
  transactions,
}: TransactionsBottomSheetProps) {


  const { isInTelegram, hapticFeedback } = useTelegramWebApp();
  const [showAllTransactions, setShowAllTransactions] = useState(true);
  const sheetRef = useRef<SheetRef>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setShowAllTransactions(true);
      if (isInTelegram) {
        hapticFeedback('medium');
      }
    }
  }, [isOpen, isInTelegram, hapticFeedback]);

  const handleClose = () => { onClose && onClose() };

  const getDisplayTransactions = () => {
    if (showAllTransactions) {
      return transactions;
    }
    return transactions.slice(0, 5);
  };


  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      onClose={handleClose}
      snapPoints={[0.9, 0.5, 0.3]}
      initialSnap={2}
      className="max-w-screen-custom m-auto"
    >
      <Sheet.Container
        style={{
          borderRadius: '20px 20px 0 0',
          boxShadow: 'none',
        }}
        className="w-full bg-secondary"
      >
        <div
          className="w-full bg-secondary px-4"
          style={{
            borderRadius: '20px 20px 0 0',
            boxShadow: 'none',
            height: '100%'
          }}>
          <Sheet.Header className="pb-4">
            <div className="flex justify-center pt-4">
              <div className="w-12 h-1.5 bg-[#DDDEDE] rounded-full" />
            </div>
          </Sheet.Header>
          <div className="mb-3 flex justify-between items-center px-4">
            <span className="font-medium">Transactions</span>
            <button onClick={() => navigate("/transactions")}>
              <span className="font-medium text-sm">View all</span>
            </button>
          </div>
          <Sheet.Content className="overflow-hidden">
            <div
              className="space-y-6 overflow-y-auto scrollbar-hide"
              style={{
                maxHeight: 'calc(100vh - 222px)',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain'
              }}
            >

              {["Today", "Yesterday", "Dec 28", "Dec 27", "Dec 25", "Dec 24", "Dec 23"].map((date) => {
                const dateTransactions = getDisplayTransactions().filter(t => t.date === date);
                if (dateTransactions.length === 0) return null;

                return (
                  <div key={date}>
                    <h3 className="text-sm px-4 font-medium text-muted-foreground mb-3 uppercase tracking-wide">
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
                              <p className={`font-semibold text-lg ${transaction.type === "in" ? "text-green-500" : "text-foreground"
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
          </Sheet.Content>
        </div>
      </Sheet.Container>
    </Sheet>
  );
}
