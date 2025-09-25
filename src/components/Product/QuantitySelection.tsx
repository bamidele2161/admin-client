import React from "react";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (type: "increment" | "decrement") => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
}) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-gray-600">Quantity:</span>
      <div className="flex items-center gap-1 border rounded-md w-fit bg-gray-100 px-3 py-1 shadow-sm">
        <button
          className="w-7 h-7 bg-white text-gray-700 rounded-full flex justify-center items-center text-lg shadow-sm hover:bg-secColor-Light transition-colors"
          onClick={() => onQuantityChange("decrement")}
        >
          -
        </button>
        <span className="text-base font-medium w-10 text-center">
          {quantity}
        </span>
        <button
          className="w-7 h-7 bg-white text-gray-700 rounded-full flex justify-center items-center text-lg shadow-sm hover:bg-secColor-Light transition-colors"
          onClick={() => onQuantityChange("increment")}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
