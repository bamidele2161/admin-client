import { useState } from "react";
import PayoutOverview from "../../../components/AdminComponent/payouts/PayoutOverview";
import MarkPayout from "../../../components/AdminComponent/payouts/MarkPayout";
import Navbar from "../../../components/Navbar/Navbar";

const PayoutManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex-col h-screen gap-10 flex">
      <Navbar title="Payout Management" subtitle="Manage vendor payouts here" />
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
              Payout Overview
            </button>
            <button
              onClick={() => setActiveTab("mark")}
              className={`ml-8 py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === "mark"
                  ? "border-secColor text-greyColr"
                  : "border-transparent text-lightGreyColor hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Mark Payout
            </button>
          </nav>
        </div>
      </div>

      <div className="px-10">
        {activeTab === "overview" && <PayoutOverview />}
        {activeTab === "mark" && <MarkPayout />}
      </div>
    </div>
  );
};

export default PayoutManagement;
