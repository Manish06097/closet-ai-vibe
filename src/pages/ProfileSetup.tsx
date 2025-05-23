
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import AppBar from "@/components/AppBar";
import ProgressBar from "@/components/ProgressBar";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState([66]); // 5'6" in inches
  const [weight, setWeight] = useState([150]);
  const [skinTone, setSkinTone] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number[]>([25]);
  const [gender, setGender] = useState<string>("");
  const [chestSize, setChestSize] = useState<number[]>([90]);
  const [hipSize, setHipSize] = useState<number[]>([90]);

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

  const canProceed = name && gender && age[0] && chestSize[0] && hipSize[0] && height[0] && weight[0] && skinTone;

  return (
    <div className="min-h-screen bg-gradient-dark">
      <AppBar currentStep={1} totalSteps={6} showBack />
      
      <div className="px-6 py-8 max-w-md mx-auto">
        <ProgressBar currentStep={1} totalSteps={6} />
        
        <h1 className="font-poppins font-bold text-3xl text-white text-center mb-12">
          Let's Get to Know You
        </h1>

        <div className="space-y-12">
          <div className="space-y-4">
            <label className="font-inter font-medium text-white">Name</label>
            <Input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-4">
            <label className="font-inter font-medium text-white">Gender</label>
            <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" className="peer h-4 w-4 border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                <Label htmlFor="male" className="text-white">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" className="peer h-4 w-4 border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                <Label htmlFor="female" className="text-white">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" className="peer h-4 w-4 border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                <Label htmlFor="other" className="text-white">Other</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <label className="font-inter font-medium text-white">Age</label>
            <div className="flex items-center justify-between">
              <span className="font-inter font-bold text-neon-aqua text-lg">
                {age ? age : "Not set"}
              </span>
            </div>
            <Slider
              value={age}
              onValueChange={setAge}
              max={100}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-white/60">
              <span>1</span>
              <span>100</span>
            </div>
          </div>

          <div className="space-y-4">
            <label className="font-inter font-medium text-white">Chest Size (cm)</label>
            <div className="flex items-center justify-between">
              <span className="font-inter font-bold text-neon-aqua text-lg">
                {chestSize[0]} cm
              </span>
            </div>
            <Slider
              value={chestSize}
              onValueChange={setChestSize}
              max={200}
              min={50}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-white/60">
              <span>50 cm</span>
              <span>200 cm</span>
            </div>
          </div>

          <div className="space-y-4">
            <label className="font-inter font-medium text-white">Hip Size (cm)</label>
            <div className="flex items-center justify-between">
              <span className="font-inter font-bold text-neon-aqua text-lg">
                {hipSize[0]} cm
              </span>
            </div>
            <Slider
              value={hipSize}
              onValueChange={setHipSize}
              max={200}
              min={50}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-white/60">
              <span>50 cm</span>
              <span>200 cm</span>
            </div>
          </div>

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
                {Math.round(weight[0] * 0.453592)} kg
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
