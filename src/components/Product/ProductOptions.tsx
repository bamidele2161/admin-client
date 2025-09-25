import React, { useState } from "react";

interface ProductOptionsProps {
  colors?: string[];
  sizes?: string[];
  onColorSelect?: React.Dispatch<React.SetStateAction<string>>;
  onSizeSelect?: React.Dispatch<React.SetStateAction<string>>;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  colors = [],
  sizes = [],
  onColorSelect,
  onSizeSelect,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || "");
  const [selectedSize, setSelectedSize] = useState<string | null>(
    sizes[0] || null
  );

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (onColorSelect) onColorSelect(color);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    if (onSizeSelect) onSizeSelect(size);
  };

  return (
    <div className="space-y-4">
      {/* Color Options */}
      {colors.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Color</h4>
          <div className="flex flex-wrap gap-3">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`w-9 h-9 md:w-11 md:h-11 rounded-full border cursor-pointer transition-transform duration-200 hover:scale-110 ${
                  selectedColor === color
                    ? "ring-2 ring-pryColor-DEFAULT ring-offset-2"
                    : ""
                } ${color === "white" ? "bg-gray-200 border-black" : ""}`}
                style={{
                  backgroundColor: color !== "white" ? color : undefined,
                }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Options */}
      {sizes.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-600">Size</h4>
            {/* <button className="text-xs text-pryColor-DEFAULT hover:underline">
              Size Guide
            </button> */}
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                className={`w-10 h-10 md:w-12 md:h-12 border border-pryColor-DEFAULT rounded-full text-center text-sm md:text-base transition-all duration-200 hover:scale-105 ${
                  selectedSize === size
                    ? "bg-pryColor text-pryColor-Light"
                    : "text-gray-800 hover:bg-secColor-Light"
                }`}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOptions;
