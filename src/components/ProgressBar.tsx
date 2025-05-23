
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex space-x-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${
              index < currentStep 
                ? 'bg-neon-aqua shadow-neon-aqua/50 shadow-md' 
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
      <span className="ml-4 text-white/70 font-inter text-sm">
        {currentStep} / {totalSteps}
      </span>
    </div>
  );
};

export default ProgressBar;
