import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { Card } from "../../Cards/Cards";
import { useGetVendorsReportQuery } from "../../../service/admin";
import { HiOutlineMagnifyingGlass, HiOutlineBuildingStorefront, HiOutlineChevronDown } from "react-icons/hi2";
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

const VendorsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: vendorsData,
    isLoading,
    error,
  } = useGetVendorsReportQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const data: VendorsData = vendorsData?.data || {
    vendors: [],
    pagination: {},
  };

  // Filter vendors based on search term
  const filteredVendors = useMemo(() => {
    if (!searchTerm) return data.vendors;

    return data.vendors.filter((vendor) =>
      vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data.vendors, searchTerm]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const columns = [
    {
      name: "Business Name",
      selector: (row: Vendor) => row.businessName,
      cell: (row: Vendor) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DCE4E8]"><HiOutlineBuildingStorefront size={16} /></div>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">
              {row.businessName}
            </div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: Vendor) => row.status,
      cell: (row: Vendor) => (
        <StatusBadge value={row.status} />
      ),
      sortable: true,
    },
    {
      name: "Total Orders",
      selector: (row: Vendor) => row.totalOrders,
      format: (row: Vendor) => row.totalOrders.toLocaleString(),
      sortable: true,
    },
    {
      name: "Total Revenue",
      selector: (row: Vendor) => row.totalRevenue,
      format: (row: Vendor) => formatCurrency(row.totalRevenue),
      sortable: true,
    },
    {
      name: "Total Earnings",
      selector: (row: Vendor) => row.totalEarnings,
      format: (row: Vendor) => formatCurrency(row.totalEarnings),
      cell: (row: Vendor) => (
        <span className="font-semibold text-pryColor">
          {formatCurrency(row.totalEarnings)}
        </span>
      ),
      sortable: true,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "60px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        fontWeight: "bold",
        fontSize: "0.9rem",
        color: "#374151",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
  };

  if (isLoading) {
    return (
    <Card className="admin-panel">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="admin-panel">
        <div className="text-center py-8">
          <p className="text-red-500">Error loading vendors data</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="admin-panel">
      <div className="mb-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-secColor">Detailed ledger</p><h3 className="mt-1 font-spaceGrotesk text-2xl font-semibold tracking-tight">Vendor performance</h3><p className="mt-1 text-sm text-lightGreyColor">Revenue and earnings across every vendor.</p>
          </div>
          <div className="text-sm text-gray-500">
            Total: {data.vendors.length} vendors
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-lightGreyColor" size={18} />
          <input
            type="text"
            placeholder="Search by business name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredVendors}
        pagination
        customStyles={customStyles}
        highlightOnHover
        responsive
        sortIcon={<HiOutlineChevronDown size={16} />}
        noDataComponent={
          <div className="text-center py-8">
            <HiOutlineBuildingStorefront className="mx-auto mb-4 text-gray-400" size={36} />
            <p className="text-gray-500">
              {searchTerm
                ? `No vendors found matching "${searchTerm}"`
                : "No vendor data available"}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
              >
                Clear search
              </button>
            )}
          </div>
        }
      />
    </div>
  );
};

export default VendorsTable;
