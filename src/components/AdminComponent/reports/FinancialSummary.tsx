import React from "react";
import { useGetFinancialSummaryQuery } from "../../../service/admin";
import {
  BikeIcon,
  DollarSign,
  ListOrderedIcon,
  UserCog2Icon,
  UserIcon,
} from "lucide-react";

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
  console.log(financialData);
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
      icon: DollarSign,
      color: "bg-green",
    },
    {
      title: "Ashobox Fees",
      value: formatCurrency(financialData?.ashoboxFees || 0),
      icon: DollarSign,
      color: "bg-blue",
    },
    {
      title: "Logistics Fees",
      value: formatCurrency(financialData?.logisticsFees || 0),
      icon: BikeIcon,
      color: "bg-orange",
    },
    {
      title: "Vendor Earnings",
      value: formatCurrency(financialData?.vendorEarnings || 0),
      icon: UserIcon,
      color: "bg-purple",
    },
    {
      title: "Total Orders",
      value: financialData?.totalOrders?.toString() || "0",
      icon: ListOrderedIcon,
      color: "bg-indigo",
    },
    {
      title: "Active Vendors",
      value: financialData?.activeVendors?.toString() || "0",
      icon: UserCog2Icon,
      color: "bg-teal",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`p-6 ${card.color}-50 shadow-sm rounded-lg`}
        >
          <div className={`flex  items-center justify-between`}>
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-2xl font-bold text-pryColor">{card.value}</p>
            </div>
            <div className={`p-3 rounded-full text-xl`}>{<card.icon />}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinancialSummary;
