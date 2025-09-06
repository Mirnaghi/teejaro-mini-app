import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Building2, ChevronRight } from "lucide-react";
import { BankAccountDetailModal } from "./BankAccountDetailModal";
import BankAccountsImage from '@/assets/images/bankAccountsImage.png'
interface BankTransferContentProps {
  onBack?: () => void;
}

// const mockBankAccounts = [
//   {
//     id: "1",
//     bankName: "Chase Bank",
//     accountNumber: "****1234",
//     currency: "USD",
//     balance: "$12,450.75",
//     routingNumber: "021000021",
//     accountHolderName: "John Doe",
//     address: "123 Main St, New York, NY 10001",
//     isConnected: true,
//   },
//   {
//     id: "2",
//     bankName: "Bank of America",
//     accountNumber: "****5678",
//     currency: "USD",
//     balance: "$5,230.12",
//     routingNumber: "026009593",
//     accountHolderName: "John Doe",
//     address: "456 Oak Ave, Los Angeles, CA 90210",
//     isConnected: true,
//   },
// ];

export function BankTransferContent({ onBack }: BankTransferContentProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);

  // const handleAccountClick = (account: any) => {
  //   setSelectedAccount(account);
  //   setIsDetailOpen(true);
  // };
  return (
    <div>
      {onBack && <div className="mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>}

      <img src={BankAccountsImage} alt="#" className="w-full" />
      <h3 className="text-lg text-center font-semibold mt-10">Virtual Bank Accounts</h3>
      <p className="text-sm text-center mt-2">UEFA Çempionlar Liqasının əsas mərhələsində iştirak etmək hüququ qazanan “Qarabağ” uzun çəkən hücumçu transferini bitirib. Sportinfo.аz xəbər verir ki, Ağdam klubu “Flamenqo”ya satdığı Olavio Juninyonu geri qaytarıb.</p>
      <Button
        className="w-full h-[60px] bg-tjrAppColor rounded-[20px] text-[#000] text-lg mt-7"
        disabled={true}
      >
        Coming soon
      </Button>
      {/* {mockBankAccounts.map((account) => (
            <Card
              key={account.id}
              className="cursor-pointer hover:bg-secondary/50 transition-colors bg-card border-border"
              onClick={() => handleAccountClick(account)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">{account.bankName}</h4>
                      <p className="text-sm text-muted-foreground truncate">
                        {account.currency} • {account.accountNumber}
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        {account.balance}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))} */}

      <BankAccountDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        account={selectedAccount}
      />
    </div>
  );
}