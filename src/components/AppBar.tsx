
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Menu, Search, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface AppBarProps {
  currentStep?: number;
  totalSteps?: number;
  showBack?: boolean;
  onBack?: () => void;
  showSearch?: boolean;
  showMenu?: boolean;
  showProfile?: boolean;
}

const AppBar = ({ 
  currentStep, 
  totalSteps, 
  showBack = false, 
  onBack,
  showSearch = false,
  showMenu = false,
  showProfile = false 
}: AppBarProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[#131A2B] shadow-md">
      {/* Left Side */}
      <div className="flex items-center space-x-4">
        {showBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-white hover:text-neon-aqua"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}

        {showMenu && (
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-neon-aqua min-h-[44px] min-w-[44px]"
          >
            <Menu className="w-6 h-6" />
          </Button>
        )}
        
        {!showBack && !showMenu && (
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-neon rounded-sm"></div>
            <span className="font-poppins font-bold text-white text-lg">VibeFit</span>
          </div>
        )}
      </div>

      {/* Middle - Search Bar */}
      {showSearch && (
        <div className="relative flex-grow max-w-lg mx-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <Input
            placeholder="Search your style..."
            className="pl-10 pr-12 bg-[#1C2436] border-transparent h-10 rounded-full text-white placeholder:text-gray-400 focus:border-neon-aqua focus:ring focus:ring-neon-aqua/30"
          />
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 min-h-[44px] min-w-[44px]"
          >
            <Mic className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Right Side */}
      {showProfile && (
        <div className="flex items-center">
          <Avatar className="h-10 w-10 border-2 border-transparent hover:border-neon-aqua transition-colors">
            <AvatarFallback className="bg-neon-magenta/20 text-white">
              AL
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      {/* Step Indicator */}
      {currentStep && totalSteps && (
        <div className="text-white/70 font-inter text-sm">
          {currentStep} / {totalSteps}
        </div>
      )}
    </div>
  );
};

export default AppBar;
