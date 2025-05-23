
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Home, ShoppingBag, Search, Calendar, TrendingUp, User, Settings, HelpCircle, LogOut, Bot, Briefcase } from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

interface MainSidebarProps {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
  color?: string;
}

const MainSidebar = ({ open, onClose, isMobile }: MainSidebarProps) => {
  const location = useLocation();

  const mainNavItems: MenuItem[] = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: ShoppingBag, label: "My Closet", path: "/closet" },
    { icon: Search, label: "Explore", path: "/search" },
    { icon: Calendar, label: "Outfit Planner", path: "/planner" },
    { icon: ShoppingBag, label: "Shop", path: "/shop" },
    { icon: TrendingUp, label: "Trends", path: "/trends" },
  ];

  const aiAssistantItems: MenuItem[] = [
    { icon: Bot, label: "Style Bot", path: "/style-bot" },
    { icon: Briefcase, label: "Pack Helper", path: "/pack-helper" },
  ];

  const accountItems: MenuItem[] = [
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: HelpCircle, label: "Help & Feedback", path: "/help" },
    { icon: LogOut, label: "Log Out", path: "/logout", color: "#FF4C4C" },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => (
      <SidebarMenuItem key={item.label}>
        <SidebarMenuButton 
          asChild
          isActive={isActiveRoute(item.path)}
          className={`group relative ${isActiveRoute(item.path) ? 'text-neon-aqua' : 'text-white'}`}
        >
          <Link 
            to={item.path} 
            onClick={isMobile ? onClose : undefined}
            className={`flex items-center w-full px-4 py-3 transition-all duration-150 hover:bg-[#1C273B] rounded-md ${isActiveRoute(item.path) ? 'bg-[#1C273B]' : ''}`}
          >
            <div 
              className={`absolute left-0 w-1 h-full ${isActiveRoute(item.path) ? 'bg-neon-magenta' : 'bg-transparent'} rounded-r transition-all duration-150 group-hover:bg-neon-magenta`}
            />
            <item.icon 
              className={`w-6 h-6 ${item.color ? `text-white group-hover:text-[${item.color}]` : 'text-white group-hover:text-neon-aqua'} ${isActiveRoute(item.path) ? 'text-neon-aqua' : ''}`} 
            />
            <span className="ml-3">{item.label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));
  };
  
  // For mobile, we use Drawer component
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onClose}>
        <DrawerContent
          className="h-[100dvh] bg-[#131A2B] p-0 flex flex-col"
          style={{ maxHeight: '100dvh', width: '100%' }}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-[#2A3245]">
            <div className="flex items-center">
              <div className="w-8 h-8 mr-2 bg-gradient-to-r from-neon-orange to-neon-magenta rounded-md" />
              <span className="text-gradient font-poppins font-bold text-xl">VibeFit</span>
            </div>
            <button 
              onClick={onClose} 
              className="w-11 h-11 flex items-center justify-center text-white/75 hover:text-white transition-colors"
              aria-label="Close sidebar"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* User Profile Preview */}
          <div className="flex items-center h-16 px-4 border-b border-[#2A3245]">
            <div className="w-10 h-10 rounded-full bg-[#2A3245] border-2 border-neon-aqua flex items-center justify-center text-white">
              A
            </div>
            <span className="ml-3 font-inter font-semibold text-white">Alex Johnson</span>
          </div>
          
          <div className="overflow-y-auto flex-1 py-4">
            <div className="px-4">
              <SidebarMenu className="flex flex-col gap-3">
                {renderMenuItems(mainNavItems)}
              </SidebarMenu>
            </div>
            
            <div className="h-px bg-[#2A3245] my-4 mx-4" />
            
            <div className="px-4">
              <h3 className="text-[#888E99] font-inter font-semibold text-xs uppercase mb-2">AI Assistants</h3>
              <SidebarMenu className="flex flex-col gap-3">
                {renderMenuItems(aiAssistantItems)}
              </SidebarMenu>
            </div>
            
            <div className="h-px bg-[#2A3245] my-4 mx-4" />
            
            <div className="px-4">
              <h3 className="text-[#888E99] font-inter font-semibold text-xs uppercase mb-2">Account & Settings</h3>
              <SidebarMenu className="flex flex-col gap-3">
                {renderMenuItems(accountItems)}
              </SidebarMenu>
            </div>
          </div>
          
          <div className="py-3 text-center border-t border-[#2A3245]">
            <span className="text-[#555C6A] text-xs font-inter">v1.0.0</span>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
  
  // For desktop, we use our custom sidebar styling
  return (
    <div 
      className={`${open ? 'translate-x-0' : '-translate-x-full'} fixed top-0 left-0 w-[280px] md:w-[240px] h-screen transition-transform duration-300 ease-in-out bg-[#131A2B] shadow-lg z-[1000] flex flex-col`}
      data-state={open ? "open" : "closed"}
      role="navigation"
      aria-label="Main menu"
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-[#2A3245]">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-2 bg-gradient-to-r from-neon-orange to-neon-magenta rounded-md" />
          <span className="text-gradient font-poppins font-bold text-xl">VibeFit</span>
        </div>
        <button 
          onClick={onClose} 
          className="w-11 h-11 flex items-center justify-center text-white/75 hover:text-white transition-colors"
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>
      </div>
      
      {/* User Profile Preview */}
      <div className="flex items-center h-16 px-4 border-b border-[#2A3245]">
        <div className="w-10 h-10 rounded-full bg-[#2A3245] border-2 border-neon-aqua flex items-center justify-center text-white">
          A
        </div>
        <span className="ml-3 font-inter font-semibold text-white">Alex Johnson</span>
      </div>
      
      <div className="overflow-y-auto pt-4 flex-1">
        <div className="px-4">
          <SidebarMenu className="flex flex-col gap-3">
            {renderMenuItems(mainNavItems)}
          </SidebarMenu>
        </div>
        
        <div className="h-px bg-[#2A3245] my-4 mx-4" />
        
        <div className="px-4">
          <h3 className="text-[#888E99] font-inter font-semibold text-xs uppercase mb-2">AI Assistants</h3>
          <SidebarMenu className="flex flex-col gap-3">
            {renderMenuItems(aiAssistantItems)}
          </SidebarMenu>
        </div>
        
        <div className="h-px bg-[#2A3245] my-4 mx-4" />
        
        <div className="px-4">
          <h3 className="text-[#888E99] font-inter font-semibold text-xs uppercase mb-2">Account & Settings</h3>
          <SidebarMenu className="flex flex-col gap-3">
            {renderMenuItems(accountItems)}
          </SidebarMenu>
        </div>
      </div>
      
      <div className="mt-auto py-3 text-center border-t border-[#2A3245]">
        <span className="text-[#555C6A] text-xs font-inter">v1.0.0</span>
      </div>
    </div>
  );
};

export default MainSidebar;
