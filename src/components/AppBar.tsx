
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppBarProps {
  currentStep?: number;
  totalSteps?: number;
  showBack?: boolean;
  onBack?: () => void;
}

const AppBar = ({ currentStep, totalSteps, showBack = false, onBack }: AppBarProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-dark-navy/50 backdrop-blur-sm">
      {/* Left Side */}
      <div className="flex items-center space-x-4">
        {showBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-white hover:text-neon-aqua"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-neon rounded-sm"></div>
          <span className="font-poppins font-bold text-white text-lg">VibeFit</span>
        </div>
      </div>

      {/* Right Side - Step Indicator */}
      {currentStep && totalSteps && (
        <div className="text-white/70 font-inter text-sm">
          {currentStep} / {totalSteps}
        </div>
      )}
    </div>
  );
};

export default AppBar;
