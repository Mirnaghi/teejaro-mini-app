import { useState } from "react";
import { PopupMenu } from "@/components/ui/popup-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import UsdtIcn from '@/assets/icons/usdtIcn.svg'
import { Input } from "./ui/input";
import { ArrowLeft } from "lucide-react";
interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SendModal({ isOpen, onClose }: SendModalProps) {
  const [currentScreen, setCurrentScreen] = useState<"main" | "review">("main");

  const [selectedCoin, setSelectedCoin] = useState("USDT");
  const handleClose = () => {
    setCurrentScreen('main')
    onClose()
  }
  const renderContent = () => {
    if (currentScreen === "review") {
      return (
        <>
          <div className="mb-6">
            <Button variant="ghost" size="icon" onClick={() => { setCurrentScreen('main') }} className="bg-secondary">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-2xl font-semibold text-foreground mt-5">Review transfer</h2>
          </div>
          <div className="bg-secondary p-[20px] rounded-[20px] mb-7">
            <div className="flex items-start justify-between mb-5">
              <span className="text-sm w-[45%] text-[#737D95]">Token</span>
              <span className="text-sm font-semibold w-[50%] text-right">USDT</span>
            </div>
            <div className="flex items-start justify-between mb-5">
              <span className="text-sm w-[45%] text-[#737D95]">Network</span>
              <span className="text-sm font-semibold w-[50%] text-right">Polygon PoS</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-sm w-[45%] text-[#737D95]">Wallet address</span>
              <span className="text-sm font-semibold w-[50%] text-right">23432x3432423234324 2324423423sfdfsdfsdfsdf34</span>
            </div>
          </div>
          <div className="bg-secondary p-[20px] rounded-[20px] mb-7">
            <div className="flex items-start justify-between mb-5">
              <span className="text-sm w-[45%] text-[#737D95]">Transfer amount</span>
              <span className="text-sm font-semibold w-[50%] text-right">3.00 USDT</span>
            </div>
            <div className="flex items-start justify-between mb-5">
              <span className="text-sm w-[45%] text-[#737D95]">Service fee</span>
              <span className="text-sm font-semibold w-[50%] text-right">0.01 USDT</span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-xl w-[45%] text-[#737D95]">Total</span>
              <span className="text-xl font-semibold w-[50%] text-right">3.01 USDT</span>
            </div>
          </div>
          <Button className="w-full h-[60px] bg-[#00BA82] text-lg">
            Send
          </Button>
        </>
      );
    }

    return (
      <>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mt-5">Send crypto</h2>
        </div>
        <div className="flex items-center justify-between mb-8">
          <RadioGroup value={selectedCoin} className="w-[48%]" onValueChange={setSelectedCoin}>
            <Label htmlFor={"USDT"} className="flex-1">
              <Card className={`border-2 rounded-[20px] bg-secondary ${selectedCoin === 'USDT' ? 'border-[#C5CCDD]' : 'border-secondary'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={UsdtIcn} alt="#" />
                      <span className="font-medium text-foreground text-lg">USDT</span>
                    </div>
                    <RadioGroupItem value={'USDT'} id={"USDT"} />
                  </div>
                </CardContent>
              </Card>
            </Label>
          </RadioGroup>
          <RadioGroup value={selectedCoin} className="w-[48%]" onValueChange={setSelectedCoin}>
            <Label htmlFor={"USDC"} className="flex-1">
              <Card className={`border-2 rounded-[20px] bg-secondary ${selectedCoin === 'USDC' ? 'border-[#C5CCDD]' : 'border-secondary'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={UsdtIcn} alt="#" />
                      <span className="font-medium text-foreground text-lg">USDC</span>
                    </div>
                    <RadioGroupItem value={'USDC'} id={"USDC"} />
                  </div>
                </CardContent>
              </Card>
            </Label>
          </RadioGroup>
        </div>

        <div className="mb-8">
          <span className="text-sm mb-2 block">Address</span>
          <Input placeholder={`${selectedCoin} address`} className="h-[65px] rounded-[20px] text-lg" />
        </div>
        <div className="mb-8">
          <span className="text-sm mb-2 block">Network</span>
          <div className="h-[65px] bg-secondary rounded-[20px] flex items-center px-4">
            <span className="text-lg">Polygon PoS</span>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <span className="text-sm mb-2">Amount</span>
            <span className="text-sm mb-2 max-w-[70%]">Balance: 34.97 USDC</span>
          </div>
          <Input placeholder={`${selectedCoin} address`} className="h-[65px] rounded-[20px] text-lg" type="number" />
        </div>

        <Button
          className="w-full h-[60px] bg-[#00BA82] text-lg"
          onClick={() => {
            setCurrentScreen('review')
          }}>
          Continue
        </Button>
      </>
    );
  };

  return (
    <PopupMenu
      isOpen={isOpen}
      onClose={handleClose}
      showHeader={false}
    >
      {renderContent()}
    </PopupMenu>
  );
}