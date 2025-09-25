import React, { useState } from "react";
import MeasurementGuide from "./MeasurementGuide";
import UserMeasurements from "./UserMeasurement";

interface MeasurementGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MeasurementGuideModal: React.FC<MeasurementGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"guide" | "measurements">("guide");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg flex flex-col py-6 px-8 md:py-10 md:px-16 gap-10 w-[800px] max-h-[90vh] overflow-y-auto scrollbar-hide relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Measurement Guide
          </h2>
          <p className="text-gray-600 md:text-base text-sm">
            Get the perfect fit with our sizing guide
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("guide")}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors  md:text-base text-sm ${
              activeTab === "guide"
                ? "border-b-2 border-pryColor text-pryColor"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Size Guide
          </button>
          <button
            onClick={() => setActiveTab("measurements")}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors md:text-base text-sm ${
              activeTab === "measurements"
                ? "border-b-2 border-pryColor text-pryColor"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            My Measurements
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          {activeTab === "guide" ? <MeasurementGuide /> : <UserMeasurements />}
        </div>
      </div>
    </div>
  );
};

export default MeasurementGuideModal;
