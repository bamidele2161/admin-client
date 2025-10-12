import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import FinancialSummary from "../../../components/AdminComponent/reports/FinancialSummary";
import LedgerChart from "../../../components/AdminComponent/reports/LedgerChart";
import TopVendors from "../../../components/AdminComponent/reports/TopVendors";
import VendorsTable from "../../../components/AdminComponent/reports/VendorsTable";

const ReportsManagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        title="Reports Management"
        subtitle="View financial reports and analytics"
      />

      <div className="p-6 space-y-6">
        {/* Financial Summary Cards Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Financial Summary
          </h2>
          <FinancialSummary />
        </section>

        {/* Charts and Top Vendors Section - Same Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ledger Distribution
            </h2>
            <LedgerChart />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Top Vendors
            </h2>
            <TopVendors />
          </section>
        </div>

        {/* Vendors Table Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">All Vendors</h2>
          <VendorsTable />
        </section>
      </div>
    </div>
  );
};

export default ReportsManagement;
