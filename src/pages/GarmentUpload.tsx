
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Check, Edit } from "lucide-react";
import AppBar from "@/components/AppBar";
import ProgressBar from "@/components/ProgressBar";

const GarmentUpload = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'capture' | 'analyze' | 'confirm'>('capture');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleTakePhoto = () => {
    setStep('analyze');
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSaveItem = () => {
    setStep('confirm');
    setTimeout(() => {
      navigate('/onboarding-complete');
    }, 2000);
  };

  if (step === 'capture') {
    return (
      <div className="min-h-screen bg-gradient-dark">
        <AppBar currentStep={4} totalSteps={6} showBack />
        
        <div className="px-6 py-8 max-w-md mx-auto">
          <ProgressBar currentStep={4} totalSteps={6} />
          
          <div className="text-center mb-12">
            <h1 className="font-poppins font-bold text-3xl text-white mb-4">
              Snap Your Garment
            </h1>
            <p className="font-inter text-white/80">
              Make sure the item fills the frame for best results.
            </p>
          </div>

          {/* Camera Preview Area */}
          <div className="bg-dark-charcoal/50 rounded-2xl h-96 mb-8 flex items-center justify-center border-2 border-dashed border-white/30">
            <div className="text-center">
              <Camera className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <p className="text-white/60">Camera preview will appear here</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleTakePhoto}
              className="w-full btn-neon flex items-center justify-center space-x-2 py-4"
            >
              <Camera className="w-5 h-5" />
              <span>Take Photo</span>
            </Button>
            
            <Button
              onClick={handleTakePhoto}
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white/10 flex items-center justify-center space-x-2 py-4"
            >
              <Upload className="w-5 h-5" />
              <span>Upload from Library</span>
            </Button>
          </div>

          {/* Help Tip */}
          <div className="mt-6 text-center">
            <button className="text-white/60 hover:text-neon-aqua transition-colors text-sm">
              ? Tips for better photos
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'analyze') {
    return (
      <div className="min-h-screen bg-gradient-dark">
        <AppBar currentStep={4} totalSteps={6} showBack />
        
        <div className="px-6 py-8 max-w-md mx-auto">
          <ProgressBar currentStep={4} totalSteps={6} />
          
          <div className="text-center mb-8">
            <h1 className="font-poppins font-bold text-3xl text-white mb-4">
              AI Analysis
            </h1>
          </div>

          {/* Garment Preview */}
          <div className="bg-dark-charcoal rounded-xl p-4 mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 bg-gray-400 rounded-lg"></div>
              
              <div className="flex-1 space-y-4">
                {isAnalyzing ? (
                  // Loading Skeletons
                  <>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
                      <div className="h-3 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
                      <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                    </div>
                  </>
                ) : (
                  // AI Results
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-poppins font-semibold text-white">Category</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-inter text-white/80">T-Shirt</span>
                        <Edit className="w-4 h-4 text-neon-aqua cursor-pointer" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-poppins font-semibold text-white">Material</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-inter text-white/80">Cotton</span>
                        <Edit className="w-4 h-4 text-neon-aqua cursor-pointer" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-poppins font-semibold text-white">Color</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-inter text-white/80">Light Gray</span>
                        <Edit className="w-4 h-4 text-neon-aqua cursor-pointer" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-poppins font-semibold text-white">Pattern</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-inter text-white/80">Striped</span>
                        <Edit className="w-4 h-4 text-neon-aqua cursor-pointer" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-poppins font-semibold text-white">Fit</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-inter text-white/80">Regular</span>
                        <Edit className="w-4 h-4 text-neon-aqua cursor-pointer" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {!isAnalyzing && (
            <div className="space-y-4">
              <button className="text-neon-aqua hover:text-white transition-colors text-sm">
                Retake Photo
              </button>
              
              <Button
                onClick={handleSaveItem}
                className="w-full btn-neon-magenta py-4"
              >
                Save to Closet
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Confirmation step
  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
      <div className="text-center px-6">
        <div className="w-16 h-16 bg-neon-aqua rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-bounce">
          <Check className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="font-poppins font-bold text-2xl text-white mb-4">
          Item saved to your Closet!
        </h2>
        
        <p className="font-inter text-white/80 mb-8">
          Redirecting to complete setup...
        </p>
      </div>
    </div>
  );
};

export default GarmentUpload;
