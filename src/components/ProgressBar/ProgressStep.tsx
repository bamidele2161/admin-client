import React from "react";
import { Check } from "lucide-react";

interface ProgressStepProps {
  id: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

const ProgressStep: React.FC<ProgressStepProps> = ({
  id,
  title,
  isActive,
  isCompleted,
}) => {
  return (
    <div className="flex flex-col items-center group w-24">
      <div
        className={
          "relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 mb-2" +
          " shadow-md transform" +
          (isActive && id !== 4
            ? " bg-gradient-to-br from-secColor to-pryColor text-white scale-110 ring-4 ring-secColor-Light"
            : isCompleted
            ? " bg-gradient-to-br from-positive to-positive-Light text-white"
            : " bg-pryColor-Lighter text-lightGreyColor") +
          "z-10"
        }
      >
        {isCompleted ? (
          <Check className="w-6 h-6 text-white animate-fade-in" />
        ) : (
          <span
            className={
              "text-lg font-semibold" + (isActive ? " animate-pulse" : "")
            }
          >
            {id}
          </span>
        )}

        {/* Connector line */}
        {id !== 1 && (
          <div
            className={
              "absolute right-full w-[48px] sm:w-[65px] md:w-[79px] lg:w-[94px] h-0.5 -translate-y-0" +
              (isActive || isCompleted
                ? " bg-gradient-to-r from-secColor-Light to-secColor"
                : " bg-pryColor-Lighter") +
              " z-[-1]"
            }
          />
        )}
      </div>

      <p
        className={
          "text-xs sm:text-sm font-medium transition-colors duration-300 whitespace-nowrap" +
          (isActive && id !== 4
            ? " text-pryColor font-semibold"
            : isCompleted
            ? " text-positive"
            : " text-lightGreyColor")
        }
      >
        {title}
      </p>
    </div>
  );
};

export default ProgressStep;
