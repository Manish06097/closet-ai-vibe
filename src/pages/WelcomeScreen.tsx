
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Background Video Overlay Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-neon-magenta/20 via-transparent to-neon-aqua/20 animate-float"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-poppins font-bold text-5xl md:text-6xl text-gradient animate-glow-pulse">
            VIBEFIT
          </h1>
          <div className="mt-4">
            <p className="font-inter text-lg text-white/85">
              Your AI Stylist, Anytime.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Button
            onClick={() => navigate('/profile-setup')}
            className="btn-neon px-12 py-4 text-lg hover:shadow-neon-aqua/50 hover:shadow-2xl"
            aria-label="Get Started to VibeFit"
          >
            Get Started
          </Button>
          
          {/* Secondary Link */}
          <div className="text-center">
            <p className="font-inter text-sm text-white/60">
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-white font-medium hover:text-neon-aqua transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-neon-magenta rounded-full animate-float opacity-60"></div>
        <div className="absolute bottom-32 right-16 w-6 h-6 bg-neon-aqua rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-8 w-3 h-3 bg-neon-orange rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
