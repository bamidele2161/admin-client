import { useState } from "react";
import DataTable from "react-data-table-component";
import { Ban, CheckCircle, Eye, AlertTriangle } from "lucide-react";

const vendors = [
  {
    id: 1,
    businessName: "Fashion Styles Inc.",
    ownerName: "Michael Jordan",
    totalProducts: 45,
    totalSales: 24500,
    avgRating: 4.7,
    status: "ACTIVE",
  },
  {
    id: 2,
    businessName: "Tech Gadgets Ltd",
    ownerName: "Lisa Johnson",
    totalProducts: 32,
    totalSales: 18920,
    avgRating: 4.2,
    status: "ACTIVE",
  },
  {
    id: 3,
    businessName: "Home Essentials Co",
    ownerName: "Robert Davis",
    totalProducts: 67,
    totalSales: 32150,
    avgRating: 4.5,
    status: "INACTIVE",
  },
  {
    id: 4,
    businessName: "Outdoor Adventures",
    ownerName: "Sarah Miller",
    totalProducts: 28,
    totalSales: 12780,
    avgRating: 4.8,
    status: "ACTIVE",
  },
  {
    id: 5,
    businessName: "Beauty Supplies Plus",
    ownerName: "David Wilson",
    totalProducts: 52,
    totalSales: 8950,
    avgRating: 3.9,
    status: "ACTIVE",
  },
];

const VendorSuspension = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [suspensionReason, setSuspensionReason] = useState("");
  const [suspensionDuration, setSuspensionDuration] = useState("permanent");

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleSuspend = (vendor: any) => {
    setSelectedVendor(vendor);
    setSuspensionReason("");
    setSuspensionDuration("permanent");
    setShowModal(true);
  };

  const handleActivate = (vendor: any) => {
    console.log(`Activating vendor:`, vendor);
  };

  const handleModalAction = () => {
    console.log(
      `Suspending vendor:`,
      selectedVendor,
      "Reason:",
      suspensionReason,
      "Duration:",
      suspensionDuration
    );
    setShowModal(false);
  };

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.ownerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || vendor.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      name: "Business Name",
      selector: (row: any) => row.businessName,
      sortable: true,
    },
    {
      name: "Owner",
      selector: (row: any) => row.ownerName,
      sortable: true,
    },
    {
      name: "Products",
      selector: (row: any) => row.totalProducts,
      sortable: true,
    },
    {
      name: "Total Sales",
      selector: (row: any) => row.totalSales,
      format: (row: any) => `$${row.totalSales.toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Avg. Rating",
      selector: (row: any) => row.avgRating,
      cell: (row: any) => (
        <div className="flex items-center">
          <span
            className={`mr-2 ${
              row.avgRating >= 4.5
                ? "text-positive"
                : row.avgRating >= 4.0
                ? "text-processing"
                : "text-negative"
            }`}
          >
            {row.avgRating}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
      cell: (row: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.status === "ACTIVE"
              ? "bg-positive text-white"
              : "bg-negative text-white"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex space-x-2">
          <button
            onClick={() => console.log("View vendor", row)}
            className="p-1 rounded text-pryColor hover:bg-pryColor-Light"
          >
            <Eye size={16} />
          </button>
          {row.status === "ACTIVE" ? (
            <button
              onClick={() => handleSuspend(row)}
              className="p-1 rounded text-negative hover:bg-negative-Light"
            >
              <Ban size={16} />
            </button>
          ) : (
            <button
              onClick={() => handleActivate(row)}
              className="p-1 rounded text-positive hover:bg-positive-Light"
            >
              <CheckCircle size={16} />
            </button>
          )}
          <button
            onClick={() => console.log("Warning vendor", row)}
            className="p-1 rounded text-processing hover:bg-processing-Light"
          >
            <AlertTriangle size={16} />
          </button>
        </div>
      ),
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
        color: "#352F36",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-greyColr mb-4 md:mb-0">
          Vendor Management
        </h2>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <div className="w-full md:w-48">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Vendors</option>
              <option value="ACTIVE">Active Vendors</option>
              <option value="INACTIVE">Suspended Vendors</option>
            </select>
          </div>

          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search vendors..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredVendors}
        pagination
        customStyles={customStyles}
        highlightOnHover
        responsive
      />

      {/* Suspension Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-greyColr">
              Suspend Vendor
            </h3>

            <div className="mb-4">
              <p className="mb-2">
                <span className="font-semibold">Business:</span>{" "}
                {selectedVendor?.businessName}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Owner:</span>{" "}
                {selectedVendor?.ownerName}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-lightGreyColor mb-1">
                Suspension Duration
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                value={suspensionDuration}
                onChange={(e) => setSuspensionDuration(e.target.value)}
              >
                <option value="7days">7 Days</option>
                <option value="30days">30 Days</option>
                <option value="90days">90 Days</option>
                <option value="permanent">Permanent</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-lightGreyColor mb-1">
                Suspension Reason
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                rows={3}
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value)}
                placeholder="Please provide a reason for suspension..."
              />
            </div>

            <p className="mb-6 text-sm text-lightGreyColor">
              This action will prevent the vendor from accessing their account
              and making sales. The reason will be communicated to them.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-lightGreyColor hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleModalAction}
                className="px-4 py-2 bg-negative text-white rounded-md hover:bg-opacity-90"
                disabled={!suspensionReason.trim()}
              >
                Suspend Vendor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorSuspension;
