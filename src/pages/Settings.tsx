import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  User, 
  Shield, 
  FileText, 
  Moon, 
  Sun, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Mail,
  Phone,
  Calendar
} from "lucide-react";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";

type KycStatus = "verified" | "pending" | "rejected" | "not_started";

export default function Settings() {
  const navigate = useNavigate();
  const { user, isInTelegram, hapticFeedback } = useTelegramWebApp();
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );
  
  // Mock KYC status - this would come from your backend
  const [kycStatus] = useState<KycStatus>("pending");

  const handleThemeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    hapticFeedback('light');
  };

  const handleBackClick = () => {
    hapticFeedback('light');
    navigate('/');
  };

  const getKycBadge = () => {
    switch (kycStatus) {
      case "verified":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending Review
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <AlertCircle className="w-3 h-3 mr-1" />
            Not Started
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-4 pb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleBackClick}
          className="mr-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      <div className="px-6 space-y-6">
        {/* Account Details */}
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <User className="w-5 h-5 mr-2 text-primary" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-crypto rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {isInTelegram && user 
                      ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}` 
                      : 'Teejaro User'
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isInTelegram && user?.username ? `@${user.username}` : 'No username'}
                  </p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">user@example.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="text-sm font-medium">January 2024</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KYC Status */}
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Shield className="w-5 h-5 mr-2 text-primary" />
              KYC Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Verification Status</p>
                <p className="text-sm text-muted-foreground">
                  {kycStatus === "verified" 
                    ? "Your identity has been verified"
                    : kycStatus === "pending"
                    ? "Your documents are being reviewed"
                    : kycStatus === "rejected"
                    ? "Please resubmit your documents"
                    : "Complete KYC to unlock all features"
                  }
                </p>
              </div>
              {getKycBadge()}
            </div>
            
            {kycStatus !== "verified" && (
              <>
                <Separator className="my-4" />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => hapticFeedback('light')}
                >
                  {kycStatus === "not_started" ? "Start Verification" : "View Status"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              {isDarkMode ? (
                <Moon className="w-5 h-5 mr-2 text-primary" />
              ) : (
                <Sun className="w-5 h-5 mr-2 text-primary" />
              )}
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={handleThemeToggle}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Policy */}
        <Card className="bg-card border-border shadow-card cursor-pointer hover:bg-secondary/50 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Privacy Policy</h3>
                  <p className="text-sm text-muted-foreground">Read our privacy policy</p>
                </div>
              </div>
              <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-180" />
            </div>
          </CardContent>
        </Card>

        {/* Additional Settings */}
        <div className="space-y-4">
          <Card className="bg-card border-border shadow-card cursor-pointer hover:bg-secondary/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Terms of Service</h3>
                  <p className="text-sm text-muted-foreground">View terms and conditions</p>
                </div>
                <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-180" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-card cursor-pointer hover:bg-secondary/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Support</h3>
                  <p className="text-sm text-muted-foreground">Get help and support</p>
                </div>
                <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-180" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sign Out Button */}
        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-4">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => {
                hapticFeedback('medium');
                // Add sign out logic here
                console.log('Sign out clicked');
              }}
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}