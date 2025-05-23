
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import AppBar from "@/components/AppBar";
import ProgressBar from "@/components/ProgressBar";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState([66]); // 5'6" in inches
  const [weight, setWeight] = useState([150]);
  const [skinTone, setSkinTone] = useState<string>("");

  const skinTones = [
    { name: "Fair", color: "#F8D5B0", hex: "#F8D5B0" },
    { name: "Light", color: "#F5CBA7", hex: "#F5CBA7" },
    { name: "Medium Light", color: "#E8B894", hex: "#E8B894" },
    { name: "Medium", color: "#D4A574", hex: "#D4A574" },
    { name: "Medium Dark", color: "#B8956A", hex: "#B8956A" },
    { name: "Dark", color: "#8B6F47", hex: "#8B6F47" },
    { name: "Deep", color: "#5D4E37", hex: "#5D4E37" },
    { name: "Rich", color: "#3C2F2F", hex: "#3C2F2F" },
  ];

  const formatHeight = (inches: number) => {
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet}'${remainingInches}"`;
  };

  const canProceed = height[0] && weight[0] && skinTone;

  return (
    <div className="min-h-screen bg-gradient-dark">
      <AppBar currentStep={1} totalSteps={6} showBack />
      
      <div className="px-6 py-8 max-w-md mx-auto">
        <ProgressBar currentStep={1} totalSteps={6} />
        
        <h1 className="font-poppins font-bold text-3xl text-white text-center mb-12">
          Let's Get to Know You
        </h1>

        <div className="space-y-12">
          {/* Height Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-inter font-medium text-white">Height</label>
              <span className="font-inter font-bold text-neon-aqua text-lg">
                {formatHeight(height[0])}
              </span>
            </div>
            <Slider
              value={height}
              onValueChange={setHeight}
              max={84} // 7'0"
              min={48} // 4'0"
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-white/60">
              <span>4'0"</span>
              <span>7'0"</span>
            </div>
          </div>

          {/* Weight Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-inter font-medium text-white">Weight</label>
              <span className="font-inter font-bold text-neon-aqua text-lg">
                {weight[0]} lbs
              </span>
            </div>
            <Slider
              value={weight}
              onValueChange={setWeight}
              max={300}
              min={80}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-white/60">
              <span>80 lbs</span>
              <span>300 lbs</span>
            </div>
          </div>

          {/* Skin Tone Picker */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <label className="font-inter font-medium text-white">Skin Tone</label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-white/60" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>We use this to recommend colors that complement your skin tone.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {skinTones.map((tone) => (
                <button
                  key={tone.name}
                  onClick={() => setSkinTone(tone.name)}
                  className={`w-12 h-12 rounded-full transition-all duration-200 hover:scale-110 ${
                    skinTone === tone.name 
                      ? 'ring-3 ring-neon-aqua ring-offset-2 ring-offset-dark-navy' 
                      : ''
                  }`}
                  style={{ backgroundColor: tone.color }}
                  aria-label={`Select ${tone.name} skin tone`}
                />
              ))}
            </div>
            
            {skinTone && (
              <p className="text-center text-neon-aqua font-inter text-sm">
                {skinTone} selected
              </p>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-16">
          <Button
            variant="outline"
            disabled
            className="opacity-50 cursor-not-allowed"
          >
            Back
          </Button>
          
          <Button
            onClick={() => navigate('/style-selection')}
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

export default ProfileSetup;
