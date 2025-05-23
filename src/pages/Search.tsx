
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@/components/AppBar";
import { Button } from "@/components/ui/button";
import { Clock, X } from "lucide-react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-focus the search input when the component mounts
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  const recentSearches = [
    "black dress",
    "summer outfits",
    "business casual",
    "sneakers"
  ];

  const trendingQueries = [
    "floral dress",
    "cargo pants",
    "summer essentials",
    "minimalist style"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Custom search AppBar */}
      <form onSubmit={handleSearch} className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[#131A2B] shadow-md h-[56px]">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="text-white hover:text-neon-aqua min-h-[44px] min-w-[44px]"
        >
          <X className="w-5 h-5" />
        </Button>
        
        <div className="relative flex-grow max-w-lg mx-4 md:max-w-[60%]">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search your style..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className={`w-full pl-10 pr-12 bg-[#1C2436] border-transparent h-10 rounded-full text-white placeholder:text-gray-400 focus:outline-none ${
              isFocused ? "border-2 border-neon-aqua shadow-[0_0_8px_rgba(0,229,255,0.5)]" : ""
            }`}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">
            <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
              <path d="M9 17A8 8 0 109 1a8 8 0 000 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        <Button type="submit" variant="ghost" size="sm" className="text-neon-aqua min-h-[44px]">
          Search
        </Button>
      </form>

      {/* Search suggestions dropdown */}
      <div className="bg-[#131A2B] border border-[#2A3245] rounded-lg mx-4 mt-2 shadow-lg overflow-hidden">
        {/* Recent searches section */}
        <div className="p-3">
          <h3 className="text-[#CCCCCC] font-inter font-semibold text-sm mb-2">Recent</h3>
          <ul>
            {recentSearches.map((search, index) => (
              <li key={index} className="mb-2 last:mb-0">
                <button 
                  onClick={() => {
                    setQuery(search);
                    navigate(`/search-results?q=${encodeURIComponent(search)}`);
                  }}
                  className="flex items-center w-full py-2 px-3 rounded-md hover:bg-[#1C273B] transition-colors"
                >
                  <Clock className="w-4 h-4 text-white/60 mr-3" />
                  <span className="text-white font-inter">{search}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Trending section */}
        <div className="p-3 border-t border-[#2A3245]">
          <h3 className="text-[#CCCCCC] font-inter font-semibold text-sm mb-2">Trending</h3>
          <div className="flex flex-wrap gap-2">
            {trendingQueries.map((trend, index) => (
              <button
                key={index}
                onClick={() => {
                  setQuery(trend);
                  navigate(`/search-results?q=${encodeURIComponent(trend)}`);
                }}
                className="inline-flex items-center px-3 py-1 rounded-full bg-[#1C2436] hover:bg-[#1C273B] hover:scale-[1.02] transition-all duration-150 text-white/80"
              >
                #{trend}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
