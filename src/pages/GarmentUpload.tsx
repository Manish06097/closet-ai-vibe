
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Check, Edit } from "lucide-react";
import AppBar from "@/components/AppBar";
import ProgressBar from "@/components/ProgressBar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GarmentAnalysisResult {
  [imageKey: string]: {
    Category: string;
    Material: string;
    Color: string;
    Pattern: string;
    Fit: string;
  };
}

const DUMMY_OPTIONS = {
  Category: ["T-Shirt", "Jeans", "Jacket", "Dress", "Shoes"],
  Material: ["Cotton", "Denim", "Leather", "Wool", "Polyester"],
  Color: ["Light Gray", "Blue", "Black", "White", "Red", "Green", "Yellow"],
  Pattern: ["Striped", "Solid", "Floral", "Checkered", "Geometric", "Abstract"],
  Fit: ["Regular", "Slim", "Loose", "Skinny", "Relaxed"],
};

const GarmentUpload = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'capture' | 'uploading' | 'analyze' | 'confirm'>('capture');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [analyzedGarments, setAnalyzedGarments] = useState<GarmentAnalysisResult[]>([]);
  const [editingGarmentField, setEditingGarmentField] = useState<{ imageKey: string; field: string } | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (step === 'capture') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [step]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        streamRef.current = stream;
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
      alert("Could not access camera. Please ensure permissions are granted.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleTakePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], `garment-${Date.now()}.png`, { type: 'image/png' });
            await processNewImages([file]); // Process new image
          }
        }, 'image/png');
      }
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      await processNewImages(filesArray); // Process new images
    }
  };

  const processNewImages = async (newImages: File[]) => {
    if (newImages.length === 0) return;

    setStep('uploading');
    setIsAnalyzing(true);
    try {
      // Append new images to selectedImages
      setSelectedImages(prev => [...prev, ...newImages]);
      
      const results = await uploadGarments(newImages); // Call dummy API with only new images
      setAnalyzedGarments(prev => [...prev, ...results]); // Append new results
      setStep('analyze');
    } catch (error) {
      console.error("Error processing images:", error);
      alert("Failed to process images. Please try again.");
      setStep('capture'); // Go back to capture on error
    } finally {
      setIsAnalyzing(false);
    }
  };

  const uploadGarments = async (images: File[]): Promise<GarmentAnalysisResult[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Dummy API logic
    const dummyResults: GarmentAnalysisResult[] = images.map((image, index) => {
      const imageKey = `garment_${Date.now()}_${index}`;
      return {
        [imageKey]: {
          Category: "T-Shirt",
          Material: "Cotton",
          Color: "Light Gray",
          Pattern: "Striped",
          Fit: "Regular",
        },
      };
    });
    return dummyResults;
  };

  const handleSaveItem = () => {
    setStep('confirm');
    setTimeout(() => {
      navigate('/dashboard'); // Navigate directly to dashboard
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
          <div className="bg-dark-charcoal/50 rounded-2xl h-96 mb-8 flex items-center justify-center border-2 border-dashed border-white/30 overflow-hidden relative">
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay playsInline muted></video>
            <canvas ref={canvasRef} className="hidden"></canvas> {/* Hidden canvas for capturing */}
            {!streamRef.current && (
              <div className="text-center">
                <Camera className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <p className="text-white/60">Camera preview will appear here</p>
              </div>
            )}
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
            
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload-input"
            />
            <Button
              onClick={() => document.getElementById('file-upload-input')?.click()}
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

  if (step === 'uploading') {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-16 h-16 bg-neon-aqua rounded-full flex items-center justify-center mx-auto mb-6 animate-spin">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-poppins font-bold text-2xl text-white mb-4">
            Uploading and Analyzing Garments...
          </h2>
          <p className="font-inter text-white/80 mb-8">
            Please wait while we process your items.
          </p>
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

          <div className="grid grid-cols-1 gap-6"> {/* Grid layout for cards */}
            {analyzedGarments.map((garmentResult, index) => {
              const imageKey = Object.keys(garmentResult)[0];
              const garmentData = garmentResult[imageKey];
              const imageUrl = selectedImages[index] ? URL.createObjectURL(selectedImages[index]) : 'public/placeholder.svg';

              const handleEditClick = (field: string) => {
                setEditingGarmentField({ imageKey, field });
              };

              const handleValueChange = (field: string, newValue: string) => {
                setAnalyzedGarments(prev => 
                  prev.map(item => {
                    if (Object.keys(item)[0] === imageKey) {
                      return {
                        [imageKey]: {
                          ...item[imageKey],
                          [field]: newValue,
                        },
                      };
                    }
                    return item;
                  })
                );
                setEditingGarmentField(null); // Exit edit mode
              };

              return (
                <div key={imageKey} className="bg-dark-charcoal rounded-xl p-4"> {/* Removed mb-8, gap handles spacing */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-20 h-20 bg-gray-400 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={imageUrl} alt={`Garment ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      {isAnalyzing ? (
                        // Loading Skeletons
                        <>
                          <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
                          <div className="h-3 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                          <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
                          <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                        </>
                      ) : (
                        // AI Results with Edit functionality
                        Object.entries(garmentData).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="font-poppins font-semibold text-white">{key}</span>
                            <div className="flex items-center space-x-2">
                                {editingGarmentField?.imageKey === imageKey && editingGarmentField?.field === key ? (
                                  <Select onValueChange={(newValue) => handleValueChange(key, newValue)} defaultValue={value}>
                                    <SelectTrigger className="w-full bg-dark-charcoal text-white border-white/30"> {/* Changed width to w-full */}
                                      <SelectValue placeholder={value} />
                                    </SelectTrigger>
                                    <SelectContent className="bg-dark-charcoal text-white border-white/30">
                                      {(DUMMY_OPTIONS as any)[key]?.map((option: string) => (
                                        <SelectItem key={option} value={option}>
                                          {option}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <span className="font-inter text-white/80">{value}</span>
                                )}
                              <Edit
                                className="w-4 h-4 text-neon-aqua cursor-pointer"
                                onClick={() => handleEditClick(key)}
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!isAnalyzing && (
            <div className="space-y-4 mt-8"> {/* Added mt-8 for spacing from cards */}
              <button onClick={() => setStep('capture')} className="text-neon-aqua hover:text-white transition-colors text-sm">
                Retake Photo / Upload More
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
