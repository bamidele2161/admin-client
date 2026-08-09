import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import FinancialSummary from "../../../components/AdminComponent/reports/FinancialSummary";
import LedgerChart from "../../../components/AdminComponent/reports/LedgerChart";
import TopVendors from "../../../components/AdminComponent/reports/TopVendors";
import VendorsTable from "../../../components/AdminComponent/reports/VendorsTable";

const ReportsManagement: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar
        title="Reports Management"
        subtitle="View financial reports and analytics"
      />

      <div className="space-y-7 px-5 pb-16 sm:px-8 lg:px-10">
        <section className="relative overflow-hidden rounded-[2rem] bg-pryColor px-6 py-8 text-white sm:px-9 sm:py-10">
          <div className="absolute -right-20 -top-36 h-80 w-80 rounded-full border border-white/10" />
          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
            <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-white/45">Financial intelligence</p><h2 className="mt-3 max-w-2xl font-spaceGrotesk text-3xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">The marketplace,<br/>measured clearly.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-white/55">Revenue allocation, vendor performance, and transaction volume in one focused reporting workspace.</p></div>
            <p className="border-l border-white/15 pl-5 text-xs leading-6 text-white/45">All figures shown below come directly from Ashobox reporting APIs. No projected or estimated values are included.</p>
          </div>
        </section>
        {/* Financial Summary Cards Section */}
        <section>
          <div className="mb-4 flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-secColor">At a glance</p><h2 className="mt-1 font-spaceGrotesk text-2xl font-semibold tracking-tight">Financial summary</h2></div><p className="hidden text-xs text-lightGreyColor sm:block">Current reporting period</p></div>
          <FinancialSummary />
        </section>

        {/* Charts and Top Vendors Section - Same Row */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_.9fr]">
          <section>
            <LedgerChart />
          </section>

          <section>
            <TopVendors />
          </section>
        </div>

        {/* Vendors Table Section */}
        <section>
          <VendorsTable />
        </section>
      </div>
    </div>
  );
};

export default ReportsManagement;
