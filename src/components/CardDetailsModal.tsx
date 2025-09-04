import { useState } from "react";
import { PopupMenu } from "@/components/ui/popup-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Eye, EyeOff, Lock, RefreshCw, ChevronRight } from "lucide-react";
import TjrWhiteLogo from '@/assets/icons/tjrWhiteLogo.svg'
import { useToast } from "@/hooks/use-toast";
import CardBgImage from '@/assets/images/card_bg_img.png'
import AppleIcn from '@/assets/icons/appleIcn.svg'
interface CardDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CardDetailsModal({ isOpen, onClose }: CardDetailsModalProps) {
  const [showCardDetails, setShowCardDetails] = useState(false);
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
    <PopupMenu
      isOpen={isOpen}
      onClose={onClose}
      showHeader={false}
      className="max-h-[90vh]"
    >
      <div>
        {/* Virtual Card Display */}
        <div className="relative w-full h-52 mb-5">
          <img src={CardBgImage} alt="#" className="w-full absolute h-full z-1 top-0 left-0" />
          <div className="w-full p-5 absolute h-full z-2 top-0 left-0 flex flex-col justify-between">
            <div className="w-full flex flex-row items-start justify-between">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 bg-gradient-crypto rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-medium text-[#FFF]">
                  Kamil Vahabov
                </span>
              </div>
              <div>
                <img src={TjrWhiteLogo} alt="#" />
              </div>
            </div>
            <button
              disabled={!showCardDetails}
              onClick={() => { copyToClipboard("4734567890121234", "Card number") }}
            >
              <span className="text-[6vw] text-[#fff] tracking-[0.08em] text-center block font-mono custom:text-[32px]">
                {showCardDetails ? `1234 4567 7890 1011` : '**** **** **** 1011'}
              </span>
            </button>
            <div className="flex items-center justify-between">
              <div className="flex">
                <div className="min-w-16">
                  <button
                    disabled={!showCardDetails}
                    onClick={() => copyToClipboard("12/27", "Expiration date")}
                    className="text-[#fff] text-[14px]">
                    {showCardDetails ? `02/29` : '*****'}
                  </button>
                  <span className="block text-[#fff] text-[10px]">
                    Date
                  </span>
                </div>
                <div className="min-w-16">
                  <button
                    disabled={!showCardDetails}
                    onClick={() => copyToClipboard("123", "CVV")}
                    className="text-[#fff] text-[14px]">
                    {showCardDetails ? `543` : '***'}
                  </button>
                  <span className="block text-[#fff] text-[10px]">
                    CVC
                  </span>
                </div>
              </div>
              <button
                className="bg-secondary px-3 h-[35px] flex items-center text-[14px] rounded-sm justify-center"
                onClick={() => setShowCardDetails(!showCardDetails)}
              >
                {showCardDetails ? "Hide" : 'Show'} details
                {showCardDetails ? <EyeOff className="w-5 h-5 ml-2" /> : <Eye className="w-5 h-5 ml-2" />}
              </button>
            </div>
          </div>
        </div>

        <Button variant="secondary" className="h-[60px] w-full flex items-center justify-between mb-5">
          <div className="flex items-center">
            <img src={AppleIcn} alt="#" className="mr-2" />
            <span className="font-medium text-[16px]">Top up your balance via Apple Pay</span>
          </div>
          <ChevronRight className="ml-2" style={{ width: '25px', height: '25px' }} />
        </Button>

        <Button variant="outline" className="h-[60px] w-full flex items-center justify-between">
          <span className="font-medium text-[16px]">Billing address</span>
          <ChevronRight className="ml-2" style={{ width: '25px', height: '25px' }} />
        </Button>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <Button className="h-[60px] bg-tjrAppColor text-[16px] font-semibold text-[#000]">
            Replace Card
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
          <Button className="h-[60px] bg-tjrAppColor text-[16px] font-semibold text-[#000]">
            Lock Card
            <Lock className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </PopupMenu>
  );
}