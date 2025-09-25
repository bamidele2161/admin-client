import React from "react";

interface TabProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 text-lg font-semibold ${
        isActive
          ? "border-b-4 border-pryColor text-pryColor"
          : "text-gray-500 hover:text-pryColor"
      }`}
    >
      {label}
    </button>
  );
};

export default Tab;
