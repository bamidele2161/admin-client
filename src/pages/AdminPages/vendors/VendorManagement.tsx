import { useState } from "react";
import VendorApproval from "../../../components/AdminComponent/vendors/VendorApproval";
import VendorPerformance from "../../../components/AdminComponent/vendors/VendorPerformance";
import VendorSuspension from "../../../components/AdminComponent/vendors/VendorSuspension";
import Navbar from "../../../components/Navbar/Navbar";

const VendorManagement = () => {
  const [activeTab, setActiveTab] = useState("approval");

  return (
    <div className="flex-col h-screen gap-10 flex">
      <Navbar title="Vendor Management" subtitle="Manage vendor here" />
      <div className="px-10">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("approval")}
              className={`py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === "approval"
                  ? "border-secColor text-greyColr"
                  : "border-transparent text-lightGreyColor hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Vendor Approval
            </button>
            <button
              onClick={() => setActiveTab("performance")}
              className={`ml-8 py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === "performance"
                  ? "border-secColor text-greyColr"
                  : "border-transparent text-lightGreyColor hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => setActiveTab("suspension")}
              className={`ml-8 py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === "suspension"
                  ? "border-secColor text-greyColr"
                  : "border-transparent text-lightGreyColor hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Vendor Suspension
            </button>
          </nav>
        </div>
      </div>

      <div className="px-10">
        {activeTab === "approval" && <VendorApproval />}
        {activeTab === "performance" && <VendorPerformance />}
        {activeTab === "suspension" && <VendorSuspension />}
      </div>
    </div>
  );
};

export default VendorManagement;
