import React, { useState } from "react";

interface MultiInputFieldProps {
  label: string;
  isNumber?: boolean;
  onChange: (values: (string | number)[]) => void;
}

const MultiInputField: React.FC<MultiInputFieldProps> = ({
  label,
  isNumber = false,
  onChange,
}) => {
  const [values, setValues] = useState<(string | number)[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddValue = () => {
    if (!inputValue.trim()) return;

    const newValue = isNumber ? Number(inputValue) : inputValue;
    if (isNumber && isNaN(newValue as number)) {
      alert("Please enter a valid number");
      return;
    }

    const updatedValues = [...values, newValue];
    setValues(updatedValues);
    onChange(updatedValues);
    setInputValue(""); // Clear input after adding
  };

  const handleRemoveValue = (index: number) => {
    const updatedValues = values.filter((_, i) => i !== index);
    setValues(updatedValues);
    onChange(updatedValues);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder={`Enter ${isNumber ? "a number" : "a value"}...`}
        />
        <button
          onClick={handleAddValue}
          className="bg-pryColor text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {values.map((value, index) => (
          <span
            key={index}
            className="bg-gray-200 px-3 py-1 rounded flex items-center"
          >
            {value}
            <button
              onClick={() => handleRemoveValue(index)}
              className="ml-2 text-red-500"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MultiInputField;
