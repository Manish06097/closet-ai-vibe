
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, Mic, Plus, Calendar, TrendingUp, Shirt } from "lucide-react";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Top App Bar */}
      <div className="bg-dark-navy/50 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" className="text-white">
            <Menu className="w-6 h-6" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-neon rounded-full"></div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <Input
            placeholder="Search your style..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
          <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60">
            <Mic className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">
        {/* Greeting */}
        <div>
          <h1 className="font-inter font-medium text-white text-lg">
            Hey there, here's what's new
          </h1>
        </div>

        {/* Today's Outfit Card */}
        <div className="bg-gradient-to-br from-neon-magenta/20 to-neon-aqua/20 rounded-2xl p-6 border border-white/10">
          <h2 className="font-poppins font-bold text-xl text-white mb-4">Today's Outfit</h2>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gray-600 rounded-lg"></div>
            <div className="w-16 h-16 bg-gray-600 rounded-lg"></div>
            <div className="w-16 h-16 bg-gray-600 rounded-lg"></div>
            <div className="text-white/60 text-2xl">+</div>
          </div>
          <Button className="btn-neon-magenta">
            Customize
          </Button>
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 className="font-poppins font-bold text-xl text-white mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-dark-charcoal/50 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-inter font-semibold text-white">{event.name}</h3>
                    <p className="text-white/60 text-sm">{event.date}</p>
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
            <h2 className="font-poppins font-bold text-xl text-white">Your Wardrobe</h2>
            <span className="text-neon-aqua text-sm">5 items</span>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {recentItems.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-24">
                <div className="w-24 h-24 bg-gray-600 rounded-lg mb-2"></div>
                <p className="text-white/80 text-xs text-center">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div>
          <h2 className="font-poppins font-bold text-xl text-white mb-4">Quick Access</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-neon-aqua/20 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Shirt className="w-8 h-8 text-neon-aqua" />
              </div>
              <span className="text-white/80 text-sm">Wardrobe</span>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-neon-magenta/20 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-8 h-8 text-neon-magenta" />
              </div>
              <span className="text-white/80 text-sm">Planner</span>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-neon-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Search className="w-8 h-8 text-neon-orange" />
              </div>
              <span className="text-white/80 text-sm">Shop</span>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-neon-aqua/20 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-8 h-8 text-neon-aqua" />
              </div>
              <span className="text-white/80 text-sm">Trends</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <Button className="fixed bottom-6 right-6 w-14 h-14 rounded-full btn-neon shadow-lg animate-glow-pulse">
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default Dashboard;
