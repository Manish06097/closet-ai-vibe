
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Settings, ArrowLeft, ChevronDown, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product, SearchResultItem } from "@/types/product"; // Import the Product and SearchResultItem interfaces

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q") || "";
  
  const [products, setProducts] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("Relevance");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]); // Change to string[] for product._id
  
  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://127.0.0.1:8000/search?query=${encodeURIComponent(query)}&k=10&limit=10&offset=0`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: SearchResultItem[] = await response.json();
        setProducts(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  const sortOptions = ["Relevance", "Price: Low to High", "Price: High to Low", "Newest"];

  const toggleFavorite = (id: string) => { // Change id type to string
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  const openFilterPanel = () => {
    navigate("/filters");
  };

  return (
    <div className="min-h-screen bg-gradient-dark pb-20">
      {/* Search bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[#131A2B] shadow-md">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="text-white hover:text-neon-aqua"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="relative flex-grow max-w-lg mx-4 md:max-w-[60%]" onClick={() => navigate("/search")}>
          <div className="pl-10 pr-4 bg-[#1C2436] border-transparent h-10 rounded-full text-white flex items-center">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">
              <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
                <path d="M9 17A8 8 0 109 1a8 8 0 000 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="truncate">{query}</span>
          </div>
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="bg-[#131A2B] h-12 flex items-center px-4 shadow-sm">
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center text-white h-10 mr-2"
          onClick={openFilterPanel}
        >
          <Settings className="w-4 h-4 mr-2" />
          <span className="font-inter font-semibold text-sm">Filters</span>
          {activeFilters.length > 0 && (
            <span className="ml-2 bg-neon-magenta text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilters.length}
            </span>
          )}
        </Button>
        
        <div className="h-6 w-px bg-[#2A3245] mx-2"></div>
        
        <div className="relative">
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center text-white h-10"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            <span className="font-inter text-sm mr-1">{sortOption}</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
          
          {showSortDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-[#131A2B] border border-[#2A3245] rounded-lg shadow-lg z-10 w-48">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-[#1C273B] font-inter text-sm"
                  onClick={() => {
                    setSortOption(option);
                    setShowSortDropdown(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 px-4 py-3">
          {activeFilters.map((filter) => (
            <Badge 
              key={filter}
              className="bg-neon-aqua text-white px-2 py-1 rounded-full flex items-center"
            >
              {filter}
              <button 
                className="ml-1 hover:bg-white/10 rounded-full p-0.5"
                onClick={() => removeFilter(filter)}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      
      {/* Loading, Error, or No Results */}
      {loading && (
        <div className="text-center text-white p-8">Loading search results...</div>
      )}
      {error && (
        <div className="text-center text-red-500 p-8">Error: {error}</div>
      )}
      {!loading && !error && products.length === 0 && (
        <div className="text-center text-white p-8">No results found for "{query}".</div>
      )}

      {/* Product Grid */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {products.map((product) => (
            <div 
              key={product.product._id}
              className="bg-[#1C2436] rounded-xl overflow-hidden cursor-pointer group transition-all duration-200 hover:translate-y-[-4px] hover:shadow-lg"
              onClick={() => navigate(`/product/${product.product._id}`)}
            >
              <div className="relative">
                <img 
                  src={product.product.main_image_url} 
                  alt={product.product.product_name_display}
                  className="w-full aspect-[16/9] object-cover"
                />
                <button 
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#131A2B]/70 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.product._id);
                  }}
                >
                  <Heart 
                    className={`w-4 h-4 ${favorites.includes(product.product._id) ? 'text-neon-magenta fill-neon-magenta' : 'text-white'}`} 
                  />
                </button>
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-white font-inter font-semibold text-sm">View Details</span>
                </div>
              </div>
              <div className="p-3 h-16">
                <h3 className="font-poppins font-semibold text-base text-white truncate">{product.product.product_name_display}</h3>
                <p className="text-neon-aqua font-inter font-semibold text-sm">Rs. {product.metadata.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
