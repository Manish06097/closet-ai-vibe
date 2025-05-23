
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Menu, Search, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AppBarProps {
  currentStep?: number;
  totalSteps?: number;
  showBack?: boolean;
  onBack?: () => void;
  showSearch?: boolean;
  showMenu?: boolean;
  showProfile?: boolean;
  variant?: "default" | "search"; // Added variant for search-focused mode
}

const AppBar = ({ 
  currentStep, 
  totalSteps, 
  showBack = false, 
  onBack,
  showSearch = false,
  showMenu = false,
  showProfile = false,
  variant = "default"
}: AppBarProps) => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleSearchFocus = () => {
    setIsFocused(true);
    if (variant === "default") {
      navigate("/search");
    }
  };

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[#131A2B] shadow-md h-[56px]">
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
        <div className="relative flex-grow max-w-lg mx-4 md:max-w-[60%]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <Input
            placeholder="Search your style..."
            className={cn(
              "pl-10 pr-12 bg-[#1C2436] border-transparent h-10 rounded-full text-white placeholder:text-gray-400",
              isFocused ? "border-2 border-neon-aqua shadow-[0_0_8px_rgba(0,229,255,0.5)]" : ""
            )}
            onFocus={handleSearchFocus}
            onBlur={() => setIsFocused(false)}
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
          <Avatar className="h-10 w-10 border-2 border-transparent hover:border-neon-aqua transition-colors focus:ring-2 focus:ring-neon-aqua">
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
