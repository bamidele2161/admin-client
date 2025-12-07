import React from "react";
import { Card, CardContent } from "../../Cards/Cards";
import { useGetVendorsReportQuery } from "../../../service/admin";
import { TrendingUp, Store, Package } from "lucide-react";

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
    <div className="p-6 border shadow-default rounded-lg h-[67vh]">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Top Performing Vendors
          </h3>
        </div>
        <p className="text-sm text-gray-500">
          Vendors ranked by total earnings
        </p>
      </div>

      {topVendors.length > 0 ? (
        <CardContent>
          <div className="space-y-4">
            {topVendors?.slice(0, 3).map((vendor) => (
              <div
                key={vendor.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                      <span className="text-pryColor font-semibold text-sm">
                        {getInitials(vendor.businessName)}
                      </span>
                    </div>
                    {/* <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {index + 1}
                    </div> */}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">
                        {vendor.businessName}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          vendor.status
                        )}`}
                      >
                        {vendor.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4" />
                        <span>{vendor.totalOrders} orders</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-600 font-semibold">
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
          <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No vendor data available</p>
        </div>
      )}
    </div>
  );
};

export default TopVendors;
