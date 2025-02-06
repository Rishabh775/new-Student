import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface StepCounterProps {
  currentStep: number;
  totalSteps: number;
}

const StepCounter: React.FC<StepCounterProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <div className={`h-0.5 w-8 ${index < currentStep ? 'bg-blue-500' : 'bg-gray-300'}`} />
          )}
          <div className="flex items-center">
            {index < currentStep ? (
              <CheckCircle2 className="w-8 h-8 text-blue-500" />
            ) : index === currentStep ? (
              <Circle className="w-8 h-8 text-blue-500 fill-current" />
            ) : (
              <Circle className="w-8 h-8 text-gray-300" />
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepCounter;