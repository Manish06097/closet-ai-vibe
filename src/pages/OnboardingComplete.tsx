
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";

const OnboardingComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Background Image Effect */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop"
          alt="Stylish outfit background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-dark/80"></div>
      </div>
      
      <div className="relative z-10 px-6 py-8 max-w-md mx-auto min-h-screen flex flex-col justify-center">
        <ProgressBar currentStep={5} totalSteps={6} />
        
        {/* Main Card */}
        <div className="bg-dark-navy/80 backdrop-blur-sm rounded-2xl p-8 text-center animate-fade-in">
          {/* Check Icon */}
          <div className="w-16 h-16 bg-neon-aqua rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-bounce">
            <Check className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="font-poppins font-bold text-2xl text-white mb-8">
            You're All Set!
          </h1>
          
          {/* Feature List */}
          <div className="space-y-4 mb-8 text-left">
            <div className="flex items-center space-x-3">
              <span className="text-neon-aqua text-xl">⚡</span>
              <span className="font-inter text-white">Fast Outfit Ideas</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-neon-aqua text-xl">🛒</span>
              <span className="font-inter text-white">Smart Shopping Picks</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-neon-aqua text-xl">🌍</span>
              <span className="font-inter text-white">Pack Like a Pro</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <Button
            onClick={() => navigate('/dashboard')}
            className="w-full btn-neon-magenta py-4 mb-4"
          >
            Go to My Closet
          </Button>
          
          {/* Skip Tour */}
          <button
            onClick={() => navigate('/dashboard')}
            className="font-inter text-sm text-white/60 hover:text-white transition-colors"
          >
            Skip Tour
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingComplete;
