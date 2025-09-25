import React, { useState } from "react";

type Tab = {
  label: string;
  content: React.ReactNode;
};

const Tabs: React.FC<{ tabs: Tab[] }> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex justify-center border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-3 text-lg font-semibold ${
              activeTab === index
                ? "border-b-4 border-pryColor text-pryColor"
                : "text-gray-500 hover:text-pryColor"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-6">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
