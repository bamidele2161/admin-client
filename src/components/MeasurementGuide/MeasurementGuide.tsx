import React from "react";

const MeasurementGuide: React.FC = () => {
  const measurements = [
    {
      name: "Chest/Bust",
      description: "Measure around the fullest part of your chest",
      sizes: { XS: "32-34", S: "34-36", M: "36-38", L: "38-40", XL: "40-42" },
    },
    {
      name: "Waist",
      description: "Measure around your natural waistline",
      sizes: { XS: "24-26", S: "26-28", M: "28-30", L: "30-32", XL: "32-34" },
    },
    {
      name: "Hip",
      description: "Measure around the fullest part of your hips",
      sizes: { XS: "34-36", S: "36-38", M: "38-40", L: "40-42", XL: "42-44" },
    },
    {
      name: "Length",
      description: "Measure from shoulder to desired length",
      sizes: { XS: "24", S: "25", M: "26", L: "27", XL: "28" },
    },
  ];

  return (
    <div className="space-y-6">
      {/* How to Measure Section */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-pryColor mb-2 md:text-base text-sm">
          How to Measure
        </h3>
        <ul className="text-xs md:text-sm text-secColor space-y-1">
          <li>• Use a flexible measuring tape</li>
          <li>• Measure over undergarments or fitted clothing</li>
          <li>• Keep the tape snug but not tight</li>
          <li>• Stand naturally with arms at your sides</li>
        </ul>
      </div>

      {/* Size Chart */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-4 text-sm md:text-base">
          Size Chart (inches)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 py-2 text-left text-xs md:text-sm font-medium text-gray-700 border-b">
                  Measurement
                </th>
                <th className="px-3 py-2 text-center text-xs md:text-sm font-medium text-gray-700 border-b">
                  XS
                </th>
                <th className="px-3 py-2 text-center text-xs md:text-sm font-medium text-gray-700 border-b">
                  S
                </th>
                <th className="px-3 py-2 text-center text-xs md:text-sm font-medium text-gray-700 border-b">
                  M
                </th>
                <th className="px-3 py-2 text-center text-xs md:text-sm font-medium text-gray-700 border-b">
                  L
                </th>
                <th className="px-3 py-2 text-center text-xs md:text-sm font-medium text-gray-700 border-b">
                  XL
                </th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="px-3 py-3">
                    <div>
                      <div className="font-medium text-xs md:text-sm text-gray-800">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center md:text-sm text-[9px]">
                    {item.sizes.XS}
                  </td>
                  <td className="px-3 py-3 text-center md:text-sm text-[9px]">
                    {item.sizes.S}
                  </td>
                  <td className="px-3 py-3 text-center md:text-sm text-[9px]">
                    {item.sizes.M}
                  </td>
                  <td className="px-3 py-3 text-center md:text-sm text-[9px]">
                    {item.sizes.L}
                  </td>
                  <td className="px-3 py-3 text-center md:text-sm text-[9px]">
                    {item.sizes.XL}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2 text-sm md:text-md">
          Sizing Tips
        </h3>
        <p className="text-xs md:text-sm text-yellow-700">
          If you're between sizes, we recommend choosing the larger size for a
          more comfortable fit. For a more fitted look, choose the smaller size.
        </p>
      </div>
    </div>
  );
};

export default MeasurementGuide;
