import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  useGetAllPayoutsQuery,
  useGetAllVendorsQuery,
} from "../../../service/admin";

interface PayoutData {
  id: number;
  reference: string;
  recipientId: number;
  recipientType: string;
  amount: number;
  status: string;
  initiatedBy: string;
  receiptUrl?: string;
  notes?: string;
  createdAt: string;
  vendorName?: string;
}

const PayoutOverview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<PayoutData[]>([]);
  const [selectedPayout, setSelectedPayout] = useState<PayoutData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: vendorsData } = useGetAllVendorsQuery();

  const { data: payoutsData, isLoading, error } = useGetAllPayoutsQuery();

  useEffect(() => {
    if (payoutsData?.data) {
      const filtered = payoutsData.data.filter(
        (payout: PayoutData) =>
          payout.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payout.vendorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payout.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [payoutsData, searchTerm]);

  const columns = [
    {
      name: "Reference",
      selector: (row: PayoutData) => row.reference,
      sortable: true,
      width: "150px",
    },
    {
      name: "Vendor",
      selector: (row: PayoutData) =>
        vendorsData?.data?.find((vendor) => vendor.id === row.recipientId)
          ?.businessName || `ID: ${row.recipientId}`,
      sortable: true,
      width: "180px",
    },
    {
      name: "Amount",
      selector: (row: PayoutData) => `₦${row.amount.toLocaleString()}`,
      sortable: true,
      width: "120px",
    },
    {
      name: "Status",
      selector: (row: PayoutData) => row.status,
      sortable: true,
      width: "120px",
      cell: (row: PayoutData) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status.toLocaleLowerCase() === "paid"
              ? "bg-green-100 text-green-800"
              : row.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Initiated By",
      selector: (row: PayoutData) => row.initiatedBy,
      sortable: true,
      width: "150px",
    },
    {
      name: "Date",
      selector: (row: PayoutData) =>
        new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
      width: "120px",
    },
    {
      name: "Actions",
      cell: (row: PayoutData) => (
        <button
          onClick={() => {
            setSelectedPayout(row);
            setIsModalOpen(true);
          }}
          className="text-pryColor hover:text-blue-700 font-medium"
        >
          View Details
        </button>
      ),
      width: "120px",
    },
  ];

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPayout(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secColor"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading payouts data
      </div>
    );
  }
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
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Payouts</h3>
          <p className="text-2xl font-bold text-gray-900">
            {filteredData.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
          <p className="text-2xl font-bold text-gray-900">
            ₦
            {filteredData
              .reduce((sum, payout) => sum + payout.amount, 0)
              .toLocaleString()}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by reference, vendor, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secColor focus:border-transparent"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="flex flex-col">
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30]}
            customStyles={customStyles}
            highlightOnHover
            pointerOnHover
          />
        </div>
      </div>

      {/* Modal for Payout Details */}
      {isModalOpen && selectedPayout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Payout Details
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Reference
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedPayout.reference}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <span
                    className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                      selectedPayout.status?.toLowerCase() === "paid"
                        ? "bg-green-100 text-green-800"
                        : selectedPayout.status?.toLowerCase() === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedPayout.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Vendor
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {vendorsData?.data?.find(
                      (vendor) => vendor.id === selectedPayout.recipientId
                    )?.businessName || `ID: ${selectedPayout.recipientId}`}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    ₦{selectedPayout.amount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Initiated By
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedPayout.initiatedBy}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date Created
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedPayout.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {selectedPayout.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedPayout.notes}
                  </p>
                </div>
              )}

              {selectedPayout.receiptUrl && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Receipt
                  </label>
                  <a
                    href={selectedPayout.receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-sm text-secColor hover:text-blue-700 underline"
                  >
                    View Receipt
                  </a>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayoutOverview;
