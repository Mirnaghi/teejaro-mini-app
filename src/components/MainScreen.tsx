import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUp, MessageCircle, User } from "lucide-react";
import { CardDetailsModal } from "./CardDetailsModal";
import { AddMoneyModal } from "./AddMoneyModal";
import { BankAccountModal } from "./BankAccountModal";
import { InviteFriendsModal } from "./InviteFriendsModal";
import { SendModal } from "./SendModal";
import { CreateCardModal } from "./CreateCardModal";
import { ThemeToggle } from "./ThemeToggle";
import { TransactionsBottomSheet } from "./TransactionsBottomSheet";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";
import CardBgImage from '@/assets/images/card_bg_img.png'
import TjrWhiteLogo from '@/assets/icons/tjrWhiteLogo.svg'
import VisaLogo from '@/assets/icons/visaLogo.svg'
import MiniCardIcn from '@/assets/icons/miniCardIcn.svg'
import BankFlags from '@/assets/icons/bankFlags.svg'

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
  },
  {
    id: "7",
    icon: "🏥",
    description: "Pharmacy",
    amount: "-$32.45",
    type: "out",
    date: "Dec 26",
    time: "4:20 PM",
    status: "completed",
    category: "Healthcare"
  },
  {
    id: "8",
    icon: "🚕",
    description: "Uber Ride",
    amount: "-$18.75",
    type: "out",
    date: "Dec 26",
    time: "2:15 PM",
    status: "completed",
    category: "Transportation"
  },
  {
    id: "9",
    icon: "☕",
    description: "Starbucks",
    amount: "-$6.50",
    type: "out",
    date: "Dec 26",
    time: "9:30 AM",
    status: "completed",
    category: "Food & Dining"
  },
  {
    id: "10",
    icon: "🎬",
    description: "Netflix Subscription",
    amount: "-$19.99",
    type: "out",
    date: "Dec 25",
    time: "12:00 AM",
    status: "completed",
    category: "Entertainment"
  },
  {
    id: "11",
    icon: "🛍️",
    description: "Target",
    amount: "-$156.78",
    type: "out",
    date: "Dec 25",
    time: "3:45 PM",
    status: "completed",
    category: "Shopping"
  },
  {
    id: "12",
    icon: "🏠",
    description: "Rent Payment",
    amount: "-$1,800.00",
    type: "out",
    date: "Dec 24",
    time: "9:00 AM",
    status: "completed",
    category: "Housing"
  },
  {
    id: "13",
    icon: "📱",
    description: "Phone Bill",
    amount: "-$89.99",
    type: "out",
    date: "Dec 24",
    time: "8:30 AM",
    status: "completed",
    category: "Utilities"
  },
  {
    id: "14",
    icon: "💳",
    description: "Credit Card Payment",
    amount: "-$450.00",
    type: "out",
    date: "Dec 23",
    time: "2:00 PM",
    status: "completed",
    category: "Finance"
  },
  {
    id: "15",
    icon: "🎁",
    description: "Gift Card Purchase",
    amount: "-$100.00",
    type: "out",
    date: "Dec 23",
    time: "11:30 AM",
    status: "completed",
    category: "Shopping"
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
  const [isTransactionsOpen, setIsTransactionsOpen] = useState(true);

  const handleButtonClick = (action: () => void) => {
    hapticFeedback('light');
    action();
  };

  const handleModalOpen = (modalSetter: (value: boolean) => void) => {
    setIsTransactionsOpen(false);
    modalSetter(true);
  };


  useEffect(() => {
    const isAnyModalOpen = isCardDetailsOpen || isAddMoneyOpen || isBankAccountOpen ||
      isInviteFriendsOpen || isSendOpen || isCreateCardOpen;

    if (isAnyModalOpen && isTransactionsOpen) {
      setIsTransactionsOpen(false);
    } else if (!isAnyModalOpen && !isTransactionsOpen) {
      setIsTransactionsOpen(true);
    }
  }, [isCardDetailsOpen, isAddMoneyOpen, isBankAccountOpen, isInviteFriendsOpen, isSendOpen, isCreateCardOpen, isTransactionsOpen]);

  return (
    <div className="min-h-screen bg-background pt-6 max-w-screen-custom m-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pb-2">
        <button
          className="flex items-center space-x-2"
          onClick={() => handleButtonClick(() => navigate('/settings'))}
        >
          <div className="w-11 h-11 bg-gradient-crypto rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <span className="text-sm font-medium text-foreground block text-left">
              {isInTelegram && user ? `${user.first_name}${user.last_name ?? ''}` : 'Teejaro'}
            </span>
            <span className="text-[10px] text-foreground block text-left">
              App Version: 1.2.4
            </span>
          </div>
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
        <button onClick={() => {
          // setIsCardDetailsOpen(true);
          setIsCreateCardOpen(true);

        }} className="relative w-full h-48 max-w-screen-custom">
          <img src={CardBgImage} alt="#" className="w-full absolute h-full z-1 top-0 left-0" />
          <div className="w-full p-5 absolute h-full z-2 top-0 left-0 flex flex-col justify-between">
            <div className="w-full flex flex-row items-start justify-between">
              <div>
                <p className="font-semibold text-[#FFF] text-3xl text-left">$ 1.434.530</p>
                <p className="text-[#FFF] text-sm text-left">Current balance</p>
              </div>
              <div>
                <img src={TjrWhiteLogo} alt="#" />
              </div>
            </div>
            <img src={VisaLogo} alt="#" className='w-36' />
          </div>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="px-4 mb-[30px] mt-[20px]">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="secondary"
            size="lg"
            className="h-[50px] rounded-full"
            onClick={() => handleButtonClick(() => handleModalOpen(setIsAddMoneyOpen))}
          >
            <Plus className="mr-1" style={{ width: '22px', height: '22px' }} />
            Top up
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="h-[50px] rounded-full"
            onClick={() => handleButtonClick(() => handleModalOpen(setIsSendOpen))}
          >
            <ArrowUp className="mr-1" style={{ width: '22px', height: '22px' }} />
            Send
          </Button>
        </div>
      </div>

      <div className="px-4 mb-[30px] mt-[20px]">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="secondary"
            size="lg"
            className="h-[88px] rounded-3xl flex flex-col items-start px-5"
          // onClick={() => handleButtonClick(() => setIsAddMoneyOpen(true))}
          >
            <img src={MiniCardIcn} alt="#" />
            <span className="text-[18px] font-semibold mt-0.5">Phisical cards</span>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="h-[88px] rounded-3xl flex flex-col items-start px-5"
            onClick={() => handleModalOpen(setIsBankAccountOpen)}
          >
            <img src={BankFlags} alt="#" />
            <span className="text-[18px] font-semibold">Bank accounts</span>
          </Button>
        </div>
      </div>

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
      <TransactionsBottomSheet
        isOpen={isTransactionsOpen}
        onClose={() => setIsTransactionsOpen(false)}
        transactions={transactions}
      />
    </div>
  );
}