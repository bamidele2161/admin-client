import React from "react";
import ProgressStep from "./ProgressStep";

export interface ProgressStep {
  id: number;
  title: string;
}

interface ProgressBarProps {
  steps: ProgressStep[];
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full overflow-hidden bg-white rounded-xl shadow-default">
      <div className="flex pt-2 justify-center items-center gap-2 sm:gap-6 md:gap-10 lg:gap-14 overflow-x-auto pb-2 scrollbar-none">
        {steps.map((step) => (
          <ProgressStep
            key={step.id}
            id={step.id}
            title={step.title}
            isActive={currentStep === step.id}
            isCompleted={currentStep >= step.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
