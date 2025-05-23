
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import AppBar from "@/components/AppBar";
import ProgressBar from "@/components/ProgressBar";

const ClosetImport = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-dark">
      <AppBar currentStep={3} totalSteps={6} showBack />
      
      <div className="px-6 py-8 max-w-md mx-auto">
        <ProgressBar currentStep={3} totalSteps={6} />
        
        <div className="text-center mb-12">
          <h1 className="font-poppins font-bold text-3xl text-white mb-4">
            Digitize Your Closet
          </h1>
          <p className="font-inter text-white/80">
            Add your clothes to get personalized style recommendations.
          </p>
        </div>

        {/* Center Illustration */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            {/* Phone Frame */}
            <div className="w-32 h-48 bg-gradient-to-br from-neon-aqua/20 to-neon-magenta/20 rounded-2xl border border-white/20 flex items-center justify-center">
              <div className="w-24 h-36 bg-dark-navy/50 rounded-xl"></div>
            </div>
            
            {/* Floating Icons */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-neon-aqua rounded-full flex items-center justify-center animate-float">
              <span className="text-white text-xs">👔</span>
            </div>
            <div className="absolute -top-2 -right-6 w-8 h-8 bg-neon-magenta rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
              <span className="text-white text-xs">👟</span>
            </div>
            <div className="absolute -bottom-4 -left-6 w-8 h-8 bg-neon-orange rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
              <span className="text-white text-xs">👜</span>
            </div>
            <div className="absolute -bottom-2 -right-4 w-8 h-8 bg-neon-aqua rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '1.5s' }}>
              <span className="text-white text-xs">⌚</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-8">
          <Button
            onClick={() => navigate('/garment-upload')}
            className="w-full btn-neon flex items-center justify-center space-x-2 py-4"
          >
            <Download className="w-5 h-5" />
            <span>Import Sample Wardrobe</span>
          </Button>
          
          <Button
            onClick={() => navigate('/garment-upload')}
            variant="outline"
            className="w-full border-white/30 text-white hover:bg-white/10 flex items-center justify-center space-x-2 py-4"
          >
            <Upload className="w-5 h-5" />
            <span>Upload My Own</span>
          </Button>
        </div>

        {/* Skip Link */}
        <div className="text-center">
          <button
            onClick={() => navigate('/onboarding-complete')}
            className="font-inter text-sm text-white/60 hover:text-white transition-colors"
          >
            I'll do this later
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClosetImport;
