import { useState } from "react";
import CategoryManagement from "../../../components/AdminComponent/content/CategoryManagement";
import PromotionalContent from "../../../components/AdminComponent/content/PromotionalContent";
import Navbar from "../../../components/Navbar/Navbar";

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState("categories");

  return (
    <div className="flex-col h-screen gap-10 flex">
      <Navbar title="Content Management" subtitle="Manage content here" />
      <div className="px-10">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("categories")}
              className={`py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === "categories"
                  ? "border-secColor text-greyColr"
                  : "border-transparent text-lightGreyColor hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Category Management
            </button>
            <button
              onClick={() => setActiveTab("promotional")}
              className={`ml-8 py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === "promotional"
                  ? "border-secColor text-greyColr"
                  : "border-transparent text-lightGreyColor hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Promotional Content
            </button>
          </nav>
        </div>
      </div>

      <div className="px-10">
        {activeTab === "categories" && <CategoryManagement />}
        {activeTab === "promotional" && <PromotionalContent />}
      </div>
    </div>
  );
};

export default ContentManagement;
