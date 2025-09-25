import React, { useState, useRef, useEffect } from "react";

interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  onChange: (selectedValues: string[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  options,
  onChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // <-- new
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: string) => {
    const alreadySelected = selectedValues.includes(option);
    const updatedValues = alreadySelected
      ? selectedValues.filter((val) => val !== option)
      : [...selectedValues, option];

    setSelectedValues(updatedValues);
    onChange(updatedValues);
  };

  const handleRemoveValue = (valueToRemove: string) => {
    const updatedValues = selectedValues.filter((val) => val !== valueToRemove);
    setSelectedValues(updatedValues);
    onChange(updatedValues);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options?.filter((option) =>
    option?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-2" ref={dropdownRef}>
      <label className="font-medium">
        {label} <span className="text-base text-red-500">*</span>
      </label>

      <div className="relative">
        <div
          className="border border-pryColor py-3 px-4 rounded-lg cursor-pointer flex flex-wrap gap-2 min-h-[40px] items-center"
          onClick={toggleDropdown}
        >
          {selectedValues.length === 0 ? (
            <span className="text-gray-400">Select options...</span>
          ) : (
            selectedValues.map((value, index) => (
              <span
                key={index}
                className="bg-secColor-Light px-3 py-1 rounded flex items-center text-sm"
              >
                {value}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveValue(value);
                  }}
                  className="ml-2 text-red-500"
                >
                  ✕
                </button>
              </span>
            ))
          )}
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full border rounded bg-white shadow max-h-60 overflow-auto">
            <div className="p-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full border px-2 py-1 rounded"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Options */}
            <div className="max-h-40 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className={`p-2 cursor-pointer hover:bg-gray-100 ${
                      selectedValues.includes(option) ? "bg-secColor-Light" : ""
                    }`}
                  >
                    {option}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-400">No options found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
