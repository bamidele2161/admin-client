import { useState } from "react";

import OrderIntervention from "../../../components/AdminComponent/orders/OrderIntervention";
import SalesAnalytics from "../../../components/AdminComponent/orders/SalesAnalytics";
import OrderOverview from "../../../components/AdminComponent/orders/OrderOverview";
import Navbar from "../../../components/Navbar/Navbar";

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex-col h-screen gap-10 flex">
      <Navbar title="Order Management" subtitle="Manage orders here" />
      <div className="px-10">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === "overview"
                  ? "border-secColor text-greyColr"
                  : "border-transparent text-lightGreyColor hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Order Overview
            </button>
            <button
              onClick={() => setActiveTab("intervention")}
              className={`ml-8 py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === "intervention"
                  ? "border-secColor text-greyColr"
                  : "border-transparent text-lightGreyColor hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Order Intervention
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`ml-8 py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === "analytics"
                  ? "border-secColor text-greyColr"
                  : "border-transparent text-lightGreyColor hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Sales Analytics
            </button>
          </nav>
        </div>
      </div>

      <div className="px-10">
        {activeTab === "overview" && <OrderOverview />}
        {activeTab === "intervention" && <OrderIntervention />}
        {activeTab === "analytics" && <SalesAnalytics />}
      </div>
    </div>
  );
};

export default OrderManagement;
