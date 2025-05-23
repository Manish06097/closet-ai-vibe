
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import AppBar from "@/components/AppBar";
import ProgressBar from "@/components/ProgressBar";

const StyleSelection = () => {
  const navigate = useNavigate();
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const styles = [
    { id: "streetwear", name: "Streetwear", image: "photo-1721322800607-8c38375eef04" },
    { id: "minimal", name: "Minimal", image: "photo-1470071459604-3b5ec3a7fe05" },
    { id: "business", name: "Business", image: "photo-1500375592092-40eb2168fd21" },
    { id: "casual", name: "Casual", image: "photo-1582562124811-c09040d0a901" },
    { id: "vintage", name: "Vintage", image: "photo-1721322800607-8c38375eef04" },
    { id: "sporty", name: "Sporty", image: "photo-1470071459604-3b5ec3a7fe05" },
    { id: "bohemian", name: "Bohemian", image: "photo-1500375592092-40eb2168fd21" },
    { id: "edgy", name: "Edgy", image: "photo-1582562124811-c09040d0a901" },
  ];

  const toggleStyle = (styleId: string) => {
    setSelectedStyles(prev => {
      if (prev.includes(styleId)) {
        return prev.filter(id => id !== styleId);
      } else if (prev.length < 3) {
        return [...prev, styleId];
      }
      return prev;
    });
  };

  const canProceed = selectedStyles.length >= 1;

  return (
    <div className="min-h-screen bg-gradient-dark">
      <AppBar currentStep={2} totalSteps={6} showBack />
      
      <div className="px-6 py-8 max-w-2xl mx-auto">
        <ProgressBar currentStep={2} totalSteps={6} />
        
        <div className="text-center mb-8">
          <h1 className="font-poppins font-bold text-3xl text-white mb-4">
            Pick Your Vibe
          </h1>
          <p className="font-inter text-white/80">
            Choose up to 3—this helps us personalize suggestions.
          </p>
        </div>

        {/* Style Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => toggleStyle(style.id)}
              className={`relative h-48 rounded-xl overflow-hidden transition-all duration-300 card-hover ${
                selectedStyles.includes(style.id) 
                  ? 'ring-3 ring-neon-aqua shadow-neon-aqua/30 shadow-xl' 
                  : 'hover:ring-2 hover:ring-white/30'
              }`}
            >
              <img
                src={`https://images.unsplash.com/${style.image}?w=400&h=300&fit=crop`}
                alt={style.name}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Style Name */}
              <div className="absolute bottom-4 left-4">
                <h3 className="font-inter font-semibold text-lg text-white">
                  {style.name}
                </h3>
              </div>
              
              {/* Check Badge */}
              {selectedStyles.includes(style.id) && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-neon-aqua rounded-full flex items-center justify-center animate-scale-bounce">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Hint */}
        <p className="text-center text-white/60 text-sm mb-8">
          Tip: You can change these later in Profile.
        </p>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/profile-setup')}
            className="border-white/30 text-white hover:bg-white/10"
          >
            Back
          </Button>
          
          <Button
            onClick={() => navigate('/closet-import')}
            disabled={!canProceed}
            className={canProceed ? "btn-neon" : "opacity-50 cursor-not-allowed"}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StyleSelection;
