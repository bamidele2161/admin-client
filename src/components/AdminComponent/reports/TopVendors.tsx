import React from "react";
import { Card, CardContent } from "../../Cards/Cards";
import { useGetVendorsReportQuery } from "../../../service/admin";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { StatusBadge } from "../AdminUI";

interface Vendor {
  id: number;
  businessName: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  totalOrders: number;
  totalRevenue: number;
  totalEarnings: number;
  createdAt: string;
}

interface VendorsData {
  vendors: Vendor[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const TopVendors: React.FC = () => {
  const {
    data: vendorsData,
    isLoading,
    error,
  } = useGetVendorsReportQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <p className="text-red-500">Error loading vendors data</p>
        </div>
      </Card>
    );
  }

  const data: VendorsData = vendorsData?.data || {
    vendors: [],
    pagination: {},
  };

  // Sort vendors by total earnings and take top 5
  const topVendors = [...data.vendors]
    .sort((a, b) => b.totalEarnings - a.totalEarnings)
    .slice(0, 5);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="admin-panel h-full">
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-secColor">Performance ranking</p><h3 className="mt-1 font-spaceGrotesk text-2xl font-semibold tracking-tight">Top vendors</h3><p className="mt-1 text-sm text-lightGreyColor">Ranked by total earnings.</p>
      </div>

      {topVendors.length > 0 ? (
        <CardContent>
          <div className="space-y-4">
            {topVendors?.slice(0, 5).map((vendor, index) => (
              <div
                key={vendor.id}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-black/[.07] bg-[#F8F7F3] p-4 transition hover:bg-white"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pryColor font-spaceGrotesk text-sm font-semibold text-white">{String(index + 1).padStart(2,"0")}</div>
                    {/* <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {index + 1}
                    </div> */}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">
                        {vendor.businessName}
                      </h4>
                      <StatusBadge value={vendor.status} />
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{vendor.totalOrders} orders · {getInitials(vendor.businessName)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold text-pryColor">
                    <span>{formatCurrency(vendor.totalEarnings)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Revenue: {formatCurrency(vendor.totalRevenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary stats */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-gray-900">
                  {topVendors.reduce(
                    (sum, vendor) => sum + vendor.totalOrders,
                    0
                  )}
                </p>
                <p className="text-sm text-gray-500">Total Orders</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(
                    topVendors.reduce(
                      (sum, vendor) => sum + vendor.totalRevenue,
                      0
                    )
                  )}
                </p>
                <p className="text-sm text-gray-500">Total Revenue</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(
                    topVendors.reduce(
                      (sum, vendor) => sum + vendor.totalEarnings,
                      0
                    )
                  )}
                </p>
                <p className="text-sm text-gray-500">Total Earnings</p>
              </div>
            </div>
          </div>
        </CardContent>
      ) : (
        <div className="text-center py-8">
          <HiOutlineBuildingStorefront className="mx-auto mb-4 text-gray-400" size={36} />
          <p className="text-gray-500">No vendor data available</p>
        </div>
      )}
    </div>
  );
};

export default TopVendors;
