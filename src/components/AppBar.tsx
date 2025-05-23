
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, Menu, Mic } from "lucide-react";

interface AppBarProps {
  showMenu?: boolean;
  showSearch?: boolean;
  showProfile?: boolean;
  onMenuClick?: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ 
  showMenu = false, 
  showSearch = false, 
  showProfile = false,
  onMenuClick
}) => {
  return (
    <div className="w-full h-14 bg-[#131A2B] shadow-md flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="flex items-center">
        {showMenu && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-11 w-11 text-white/75 hover:text-white hover:bg-[#1C273B]"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </Button>
        )}
        {!showMenu && (
          <div className="flex items-center h-14">
            <div className="w-8 h-8 bg-gradient-to-r from-neon-orange to-neon-magenta rounded-md" />
            <span className="ml-2 text-gradient font-poppins font-bold text-xl">VibeFit</span>
          </div>
        )}
      </div>

      {showSearch && (
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search size={20} className="text-[#CCCCCC]" />
            </div>
            <input
              type="text"
              placeholder="Search your style..."
              className="w-full h-10 bg-[#1C2436] text-white rounded-full pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-neon-aqua focus:border-transparent placeholder-[#CCCCCC] font-inter text-base"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Mic size={20} className="text-[#CCCCCC]" />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center">
        {showProfile && (
          <Avatar className="border-2 border-transparent hover:border-neon-aqua transition-colors">
            <AvatarFallback className="bg-[#2A3245] text-white">A</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default AppBar;
