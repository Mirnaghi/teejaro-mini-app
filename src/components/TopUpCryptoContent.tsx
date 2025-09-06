import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import UsdtIcn from '@/assets/icons/usdtIcn.svg'

interface TopUpCryptoContentProps {
  onBack: () => void;
  onContinue: () => void;
}

const networks = [
  { id: "ethereum", name: "Ethereum (ERC20)", description: "~$2-10 fees" },
  { id: "polygon", name: "Polygon PoS", description: "~$0.01-0.1 fees" },
  { id: "base", name: "Base", description: "~$0.01-0.1 fees" },
  { id: "optimism", name: "Optimism", description: "~$0.1-1 fees" },
  { id: "avalanche", name: "Avalanche", description: "~$0.1-1 fees" },
  { id: "arbitrum", name: "Arbitrum One", description: "~$0.1-1 fees" },
  { id: "zksync", name: "ZKsync", description: "~$0.1-1 fees" },
  { id: "tron", name: "Tron (TRC20)", description: "~$1-2 fees" },
];

export function TopUpCryptoContent({ onBack, onContinue }: TopUpCryptoContentProps) {
  const [selectedNetwork, setSelectedNetwork] = useState("base");
  const [selectedCoin, setSelectedCoin] = useState("USDT");

  return (
    <>
      <div className="mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-semibold text-foreground mt-5">Top up with crypto</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
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

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 tracking-wide">
            Choose {selectedCoin} network
          </h3>
          <RadioGroup
            value={selectedNetwork}
            onValueChange={setSelectedNetwork}
            className="overflow-y-scroll"
            style={{
              maxHeight: `calc(100vh - 400px)`
            }}>
            {networks.map((network) => (
              <Label htmlFor={network.id} key={network.id}>
                <div className={`
                      border-2 
                      rounded-[20px] 
                      bg-secondary 
                      ${selectedNetwork === network.id ? 'border-[#C5CCDD]' : 'border-secondary'} 
                      h-[66px] 
                      flex 
                      items-center 
                      justify-center 
                      w-full
                      px-5
                `}>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <span className="font-medium text-foreground text-lg">{network.name}</span>
                      {/* <span className="font-medium text-foreground">{network.description}</span> */}
                    </div>
                    <RadioGroupItem value={network.id} id={network.id} />
                  </div>
                </div>
              </Label>
            ))}
          </RadioGroup>
        </div >

        <Button
          className="w-full h-[60px] bg-[#00BA82] text-lg"
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>
    </>
  );
}