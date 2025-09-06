
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface CryptoDepositContentProps {
  onBack: () => void;
}

export function CryptoDepositContent({ onBack }: CryptoDepositContentProps) {
  const depositAddress = "0x742d35Cc6634C0532925a3b8D0A8B5C3f2Bb4C580x742d35Cc6634C0532925a3b8D0A8B5C3f2Bb4C58";
  const navigate = useNavigate();
  const { toast } = useToast();

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: `${fieldName} copied successfully`,
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <>
      <div className="mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-semibold text-foreground mt-5">Your USDC address</h2>
        <p className="text-sm">Send only USDC in network Ethereum (ERC20). Sending other coins may result in permanent loss.</p>
      </div>

      <div className="bg-secondary p-[20px] rounded-[30px] mb-7">
        <QrCode className="w-1/2 h-[180px] mx-auto mb-2" />
        <div className="flex items-center justify-between mt-5">
          <div className="flex-1 mr-2 ">
            <p className="text-sm font-mono text-foreground break-all font-semibold">
              {depositAddress}
            </p>
          </div>
          <Button
            className="h-[50px] w-[50px rounded-full bg-[#fff]"
            onClick={() => copyToClipboard(depositAddress, "Deposit address")}
          >
            <Copy className="w-3 h-3 text-[#000]" />
          </Button>
        </div>
      </div>

      <div className="bg-secondary rounded-[30px] p-[20px] mb-7">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm max-w-[45%]">
            Top up fee
          </span>
          <span className="text-sm max-w-[45%] font-semibold">
            0%
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm max-w-[45%]">
            Expected arrival
          </span>
          <span className="text-sm max-w-[45%] font-semibold">
            1-10 minutes
          </span>
        </div>
      </div>
      <Button
        className="w-full h-[60px] bg-[#00BA82] text-lg rounded-[16px] mb-7"
        onClick={() => {
          onBack && onBack()
        }}
      >
        Go to home page
      </Button>
    </>
  );
}