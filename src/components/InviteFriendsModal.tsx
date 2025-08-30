import { useState } from "react";
import { PopupMenu } from "@/components/ui/popup-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Copy, Share, Users, Gift, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InviteFriendsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteFriendsModal({ isOpen, onClose }: InviteFriendsModalProps) {
  const inviteLink = "https://teejaro.app/invite/TJ123ABC";
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Teejaro',
          text: 'Join me on Teejaro and get $10 bonus! Use my invite link:',
          url: inviteLink,
        });
      } catch (err) {
        copyToClipboard(inviteLink, "Invitation link");
      }
    } else {
      copyToClipboard(inviteLink, "Invitation link");
    }
  };

  return (
    <PopupMenu 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Invite Friends"
      showHeader={false}
    >
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-secondary/80">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold text-foreground">Invite Friends</h2>
        <div className="w-10"></div>
      </div>

      <div className="space-y-4">
        {/* Rewards Summary */}
        <Card className="bg-gradient-primary border-0 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Your Rewards</h3>
                <p className="text-white/80 text-sm">Earn $10 for each friend who joins</p>
              </div>
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-1 text-yellow-300" />
                <p className="text-2xl font-bold">$150</p>
                <p className="text-xs text-white/70">Total Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-card border-border">
            <CardContent className="p-3 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-lg font-bold text-foreground">15</p>
              <p className="text-xs text-muted-foreground">Friends Invited</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-3 text-center">
              <Gift className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <p className="text-lg font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">Successfully Joined</p>
            </CardContent>
          </Card>
        </div>

        {/* Invitation Link */}
        <div>
          <Label className="text-foreground mb-2 block">Your Invitation Link</Label>
          <div className="flex space-x-2">
            <Input
              value={inviteLink}
              readOnly
              className="bg-secondary border-border text-foreground flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(inviteLink, "Invitation link")}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* How it Works */}
        <Card className="bg-secondary/30 border-border">
          <CardContent className="p-4">
            <h4 className="font-medium text-foreground mb-3">How it works</h4>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <p className="text-sm text-muted-foreground">Share your unique invitation link with friends</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <p className="text-sm text-muted-foreground">They sign up and verify their account</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <p className="text-sm text-muted-foreground">You both get $10 bonus credited to your account</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button variant="outline" onClick={() => copyToClipboard(inviteLink, "Invitation link")}>
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </Button>
          <Button variant="default" onClick={handleShare}>
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </PopupMenu>
  );
}