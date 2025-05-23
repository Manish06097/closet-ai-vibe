
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

const EmptySearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q") || "";

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col">
      {/* We would use the same AppBar as in SearchResults, omitting for brevity */}
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 animate-float">
        <div className="w-48 h-48 flex items-center justify-center text-white/30 mb-6">
          <Package className="w-32 h-32" />
        </div>
        
        <h2 className="font-poppins font-semibold text-xl text-white text-center mb-2">
          No matches for "{query}"
        </h2>
        
        <p className="font-inter text-white/75 text-center mb-6">
          Try these:
        </p>
        
        <ul className="space-y-3 w-full max-w-xs text-center">
          <li className="font-inter text-white/75">Check your spelling</li>
          <li className="font-inter text-white/75">Try broader terms</li>
          <li>
            <Button 
              variant="link" 
              className="text-neon-aqua hover:text-neon-aqua/80 font-inter"
              onClick={() => navigate("/filters")}
            >
              Clear filters
            </Button>
          </li>
          <li>
            <Button 
              variant="link" 
              className="text-neon-magenta hover:text-neon-magenta/80 font-inter"
              onClick={() => navigate("/browse")}
            >
              Browse all products
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmptySearchResults;
