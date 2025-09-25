import React, { useState } from "react";

const UserMeasurements: React.FC = () => {
  const [measurements, setMeasurements] = useState({
    chest: "",
    waist: "",
    hip: "",
    height: "",
    weight: "",
  });

  const [unit, setUnit] = useState<"inches" | "cm">("inches");

  const handleInputChange = (field: string, value: string) => {
    setMeasurements((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getSizeRecommendation = () => {
    const chest = parseFloat(measurements.chest);
    const waist = parseFloat(measurements.waist);

    if (!chest || !waist) return "";

    if (chest <= 34 && waist <= 26) return "XS";
    if (chest <= 36 && waist <= 28) return "S";
    if (chest <= 38 && waist <= 30) return "M";
    if (chest <= 40 && waist <= 32) return "L";
    return "XL";
  };

  const saveMeasurements = () => {
    localStorage.setItem("userMeasurements", JSON.stringify(measurements));
    alert("Measurements saved successfully!");
  };

  // const loadMeasurements = () => {
  //   const saved = localStorage.getItem("userMeasurements");
  //   if (saved) {
  //     setMeasurements(JSON.parse(saved));
  //   }
  // };

  return (
    <div className="space-y-6">
      {/* Unit Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 md:text-base text-md">
          Enter Your Measurements
        </h3>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setUnit("inches")}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              unit === "inches"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-600"
            }`}
          >
            Inches
          </button>
          <button
            onClick={() => setUnit("cm")}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              unit === "cm"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-600"
            }`}
          >
            CM
          </button>
        </div>
      </div>

      {/* Measurement Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block md:text-sm text-xs font-medium text-gray-700 mb-2">
            Chest/Bust ({unit})
          </label>
          <input
            type="number"
            value={measurements.chest}
            onChange={(e) => handleInputChange("chest", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pryColor focus:border-pryColor"
            placeholder="Enter chest measurement"
          />
        </div>

        <div>
          <label className="block md:text-sm text-xs font-medium text-gray-700 mb-2">
            Waist ({unit})
          </label>
          <input
            type="number"
            value={measurements.waist}
            onChange={(e) => handleInputChange("waist", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pryColor focus:border-pryColor"
            placeholder="Enter waist measurement"
          />
        </div>

        <div>
          <label className="block md:text-sm text-xs font-medium text-gray-700 mb-2">
            Hip ({unit})
          </label>
          <input
            type="number"
            value={measurements.hip}
            onChange={(e) => handleInputChange("hip", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pryColor focus:border-pryColor"
            placeholder="Enter hip measurement"
          />
        </div>

        <div>
          <label className="block md:text-sm text-xs font-medium text-gray-700 mb-2">
            Height ({unit})
          </label>
          <input
            type="number"
            value={measurements.height}
            onChange={(e) => handleInputChange("height", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pryColor focus:border-pryColor"
            placeholder="Enter height"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block md:text-sm text-xs font-medium text-gray-700 mb-2">
            Weight (lbs)
          </label>
          <input
            type="number"
            value={measurements.weight}
            onChange={(e) => handleInputChange("weight", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pryColor focus:border-pryColor"
            placeholder="Enter weight"
          />
        </div>
      </div>

      {/* Size Recommendation */}
      {getSizeRecommendation() && (
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">
            Recommended Size
          </h4>
          <p className="text-green-700">
            Based on your measurements, we recommend size:
            <span className="font-bold text-lg ml-2">
              {getSizeRecommendation()}
            </span>
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={saveMeasurements}
          className="flex-1 bg-pryColor text-white py-2 px-4 rounded-lg hover:bg-secColor transition-colors font-medium md:text-base text-sm"
        >
          Save Measurements
        </button>
        {/* <button
          onClick={loadMeasurements}
          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Load Saved
        </button> */}
      </div>

      {/* Note */}
      {/* <div className="text-xs text-gray-500 text-center">
        Your measurements are saved locally on your device for future reference.
      </div> */}
    </div>
  );
};

export default UserMeasurements;
