import React from "react";
import { useGetFinancialSummaryQuery } from "../../../service/admin";
import { HiOutlineBanknotes, HiOutlineTruck, HiOutlineShoppingBag, HiOutlineBuildingStorefront, HiOutlineReceiptPercent, HiOutlineWallet } from "react-icons/hi2";

interface FinancialData {
  totalRevenue: number;
  ashoboxFees: number;
  logisticsFees: number;
  vendorEarnings: number;
  totalOrders: number;
  activeVendors: number;
}

const FinancialSummary: React.FC = () => {
  const { data, isLoading, error } = useGetFinancialSummaryQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading financial summary...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        Error loading financial data
      </div>
    );
  }

  const financialData: FinancialData = data?.data;
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const cards = [
    {
      title: "Total Revenue",
      value: new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(financialData?.totalRevenue || 0),
      icon: HiOutlineBanknotes,
      color: "bg-green",
    },
    {
      title: "Ashobox Fees",
      value: formatCurrency(financialData?.ashoboxFees || 0),
      icon: HiOutlineReceiptPercent,
      color: "bg-blue",
    },
    {
      title: "Logistics Fees",
      value: formatCurrency(financialData?.logisticsFees || 0),
      icon: HiOutlineTruck,
      color: "bg-orange",
    },
    {
      title: "Vendor Earnings",
      value: formatCurrency(financialData?.vendorEarnings || 0),
      icon: HiOutlineWallet,
      color: "bg-purple",
    },
    {
      title: "Total Orders",
      value: financialData?.totalOrders?.toString() || "0",
      icon: HiOutlineShoppingBag,
      color: "bg-indigo",
    },
    {
      title: "Active Vendors",
      value: financialData?.activeVendors?.toString() || "0",
      icon: HiOutlineBuildingStorefront,
      color: "bg-teal",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`admin-stat min-w-0 ${index === 0 ? "!bg-pryColor text-white" : ""}`}
        >
          <div className={`flex  items-center justify-between`}>
            <div>
              <p className={`admin-stat-label ${index === 0 ? "!text-white/45" : ""}`}>{card.title}</p>
              <p className={`admin-stat-value break-words ${index === 0 ? "!text-white" : ""}`}>{card.value}</p>
            </div>
            <div className={`hidden rounded-full p-3 text-xl sm:block ${index === 0 ? "bg-white/10" : "bg-[#DCE4E8]"}`}><card.icon size={18}/></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinancialSummary;
