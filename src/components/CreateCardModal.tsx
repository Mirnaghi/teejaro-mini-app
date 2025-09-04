import { useState } from "react";
import { PopupMenu } from "@/components/ui/popup-menu";
import { Button } from "@/components/ui/button";
import VisaMiniLogo from '@/assets/icons/visaMiniLogo.svg'
import CardBgImage from '@/assets/images/card_bg_img.png'
import TjrWhiteLogo from '@/assets/icons/tjrWhiteLogo.svg'

interface CreateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCardModal({ isOpen, onClose }: CreateCardModalProps) {
  const [isActivating, setIsActivating] = useState(false);

  const handleActivateCard = () => {
    setIsActivating(true);
    // Simulate activation process
    setTimeout(() => {
      setIsActivating(false);
      onClose();
    }, 2000);
  };

  return (
    <PopupMenu
      isOpen={isOpen}
      onClose={onClose}
      title="Create Virtual Card"
      showHeader={false}
    >
      <div>
        {/* Card Preview */}
        <div className="relative w-full h-52">
          <img src={CardBgImage} alt="#" className="w-full absolute h-full z-1 top-0 left-0" />
          <div className="w-full p-5 absolute h-full z-2 top-0 left-0 flex flex-col justify-center items-center">
            <img src={TjrWhiteLogo} alt="#" className="w-[81px] h-[34px]" />
            <img src={VisaMiniLogo} alt="#" className="w-[50px] h-[16px] mt-4" />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center my-5">
          <div className="bg-secondary rounded-full px-4 py-1 mx-2 my-1">
            <span>0% Top Up</span>
          </div>
          <div className="bg-secondary rounded-full px-4 py-1 mx-2 my-1">
            <span>Apple & Google Pay</span>
          </div>
          <div className="bg-secondary rounded-full px-4 py-1 mx-2 my-1">
            <span>No Spending Limits</span>
          </div>
          <div className="bg-secondary rounded-full px-4 py-1 mx-2 my-1">
            <span>10+ Visa Benefits</span>
          </div>
        </div>

        <h1 className="text-lg font-bold text-center mb-1">Visa Signature card</h1>
        <p className="text-sm text-center mb-5">UEFA Çempionlar Liqasının əsas mərhələsində iştirak etmək hüququ qazanan “Qarabağ” uzun çəkən hücumçu transferini bitirib. Sportinfo.аz xəbər verir ki, Ağdam klubu “Flamenqo”ya satdığı Olavio Juninyonu geri qaytarıb.</p>

        <Button
          onClick={handleActivateCard}
          className="w-full h-[60px] bg-tjrAppColor rounded-[20px] text-[#000]"
          // disabled={isActivating}
          disabled={true}
        >
          {/* {isActivating ? "Activating..." : "Activate Card"} */}
          Coming soon
        </Button>
      </div>
    </PopupMenu>
  );
}