
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Mic, Plus, Calendar, TrendingUp, Shirt } from "lucide-react";
import AppBar from "@/components/AppBar";
import { Card, CardContent } from "@/components/ui/card";
import MainSidebar from "@/components/MainSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";

const Dashboard = () => {
  const [greeting, setGreeting] = useState("");
  const { isOpen, isMobile, openSidebar, closeSidebar } = useSidebar();

  const recentItems = [
    { id: 1, name: "Striped T-Shirt", image: "photo-1721322800607-8c38375eef04" },
    { id: 2, name: "Denim Jacket", image: "photo-1470071459604-3b5ec3a7fe05" },
    { id: 3, name: "White Sneakers", image: "photo-1500375592092-40eb2168fd21" },
    { id: 4, name: "Black Jeans", image: "photo-1582562124811-c09040d0a901" },
  ];

  const upcomingEvents = [
    { id: 1, name: "Work Meeting", date: "Today 2 PM", outfit: "Business Casual" },
    { id: 2, name: "Date Night", date: "Fri 7 PM", outfit: "Romantic Chic" },
    { id: 3, name: "Weekend Brunch", date: "Sat 11 AM", outfit: "Casual Cool" },
  ];

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    setGreeting(getTimeBasedGreeting());
  }, []);

  const quickAccessIcons = [
    { icon: Shirt, name: "Wardrobe", color: "bg-neon-aqua/20" },
    { icon: Calendar, name: "Planner", color: "bg-neon-magenta/20" },
    { icon: Search, name: "Shop", color: "bg-neon-orange/20" },
    { icon: TrendingUp, name: "Trends", color: "bg-neon-aqua/20" }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-dark flex w-full">
        {/* Sidebar */}
        <MainSidebar open={isOpen} onClose={closeSidebar} isMobile={isMobile} />
        
        {/* Main Content */}
        <div className="flex-1">
          {/* AppBar */}
          <AppBar showMenu showSearch showProfile onMenuClick={openSidebar} />
          
          <div className="px-4 py-6 space-y-8">
            {/* Greeting */}
            <div>
              <h1 className="font-inter font-medium text-white text-lg">
                {greeting}, Alex 👋
              </h1>
            </div>

            {/* Today's Outfit Card */}
            <div className="bg-[#1C2436] rounded-xl p-6 border border-[#2A3245] shadow-md h-[180px]">
              <h2 className="font-poppins font-semibold text-[22px] text-white mb-4">Outfit Idea</h2>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-[60px] h-[60px] bg-gray-600 rounded-lg overflow-hidden"></div>
                <div className="w-[60px] h-[60px] bg-gray-600 rounded-lg overflow-hidden"></div>
                <div className="w-[60px] h-[60px] bg-gray-600 rounded-lg overflow-hidden"></div>
                <div className="text-white/60 text-2xl">+</div>
              </div>
              <Button className="bg-neon-magenta hover:bg-neon-magenta/90 text-white font-inter font-semibold rounded-full px-6 py-3 transition-all duration-150 hover:shadow-lg active:scale-95">
                Customize
              </Button>
            </div>

            {/* Upcoming Events */}
            <div>
              <h2 className="font-poppins font-semibold text-[22px] text-white mb-4">Upcoming Events</h2>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-[#1C2436] rounded-xl p-4 border border-[#2A3245]">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-inter font-semibold text-white">{event.name}</h3>
                        <p className="text-white/75 text-sm">{event.date}</p>
                      </div>
                      <div className="text-neon-aqua text-sm font-inter">
                        {event.outfit}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wardrobe Teaser */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-poppins font-semibold text-[22px] text-white">Your Wardrobe</h2>
                <span className="text-neon-aqua text-sm">5 items</span>
              </div>
              
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {recentItems.map((item) => (
                  <div key={item.id} className="flex-shrink-0 w-24 transition-transform hover:translate-y-[-4px] hover:shadow-lg duration-150">
                    <div className="w-24 h-24 bg-gray-600 rounded-xl mb-2"></div>
                    <p className="text-white/75 text-xs text-center">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Access */}
            <div>
              <h2 className="font-poppins font-semibold text-[22px] text-white mb-4">Quick Access</h2>
              <div className="grid grid-cols-4 gap-4">
                {quickAccessIcons.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-16 h-16 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-2 hover:bg-neon-aqua hover:text-white transition-colors`}>
                      <item.icon className={`w-8 h-8 ${index === 0 || index === 3 ? 'text-neon-aqua' : index === 1 ? 'text-neon-magenta' : 'text-neon-orange'}`} />
                    </div>
                    <span className="text-white/75 text-sm font-inter font-semibold">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Action Button */}
          <Button className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-neon-aqua hover:bg-neon-aqua/90 text-white shadow-lg shadow-neon-aqua/30 animate-glow-pulse">
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
