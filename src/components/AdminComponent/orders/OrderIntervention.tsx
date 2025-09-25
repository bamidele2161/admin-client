import { useState } from "react";
import DataTable from "react-data-table-component";
import { Edit, Truck, XCircle, ChevronDown } from "lucide-react";

const orders = [
  {
    id: "ORD-1001",
    userName: "John Doe",
    vendorName: "Fashion Styles Inc.",
    status: "Pending",
    total: 129.99,
    paymentRef: "PAY-1001",
    date: "2023-10-12",
    issue: null,
  },
  {
    id: "ORD-1002",
    userName: "Jane Smith",
    vendorName: "Tech Gadgets Ltd",
    status: "Paid",
    total: 249.99,
    paymentRef: "PAY-1002",
    date: "2023-09-18",
    issue: "Shipping Delay",
  },
  {
    id: "ORD-1003",
    userName: "Bob Johnson",
    vendorName: "Home Essentials Co",
    status: "Shipped",
    total: 349.99,
    paymentRef: "PAY-1003",
    date: "2023-08-22",
    issue: null,
  },
  {
    id: "ORD-1004",
    userName: "Alice Williams",
    vendorName: "Outdoor Adventures",
    status: "Delivered",
    total: 179.99,
    paymentRef: "PAY-1004",
    date: "2023-07-15",
    issue: "Quality Complaint",
  },
  {
    id: "ORD-1005",
    userName: "Charlie Brown",
    vendorName: "Beauty Supplies Plus",
    status: "Canceled",
    total: 89.99,
    paymentRef: "PAY-1005",
    date: "2023-11-03",
    issue: "Payment Issue",
  },
  {
    id: "ORD-1006",
    userName: "Grace Miller",
    vendorName: "Fashion Styles Inc.",
    status: "Pending",
    total: 159.99,
    paymentRef: "PAY-1006",
    date: "2023-10-25",
    issue: "Customer Request",
  },
  {
    id: "ORD-1007",
    userName: "Daniel Lee",
    vendorName: "Tech Gadgets Ltd",
    status: "Paid",
    total: 299.99,
    paymentRef: "PAY-1007",
    date: "2023-09-28",
    issue: null,
  },
  {
    id: "ORD-1008",
    userName: "Olivia Davis",
    vendorName: "Home Essentials Co",
    status: "Shipped",
    total: 189.99,
    paymentRef: "PAY-1008",
    date: "2023-10-18",
    issue: "Shipping Delay",
  },
];

const OrderIntervention = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [issueFilter, setIssueFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>();
  const [modalAction, setModalAction] = useState("");
  const [note, setNote] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleAction = (order: any, action: any) => {
    setSelectedOrder(order);
    setModalAction(action);

    if (action === "changeStatus") {
      setNewStatus(order.status);
    } else {
      setNote("");
    }

    setShowModal(true);
  };

  const handleModalAction = () => {
    // In a real app, you would call your API/Redux action here
    if (modalAction === "changeStatus") {
      console.log(
        `Changing status for order ${selectedOrder.id} from ${selectedOrder.status} to ${newStatus}`
      );
    } else if (modalAction === "cancel") {
      console.log(`Canceling order ${selectedOrder.id}, Reason: ${note}`);
    } else if (modalAction === "refund") {
      console.log(
        `Processing refund for order ${selectedOrder.id}, Amount: ${selectedOrder.total}, Note: ${note}`
      );
    }
    setShowModal(false);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vendorName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || order.status === statusFilter;

    const matchesIssue =
      issueFilter === "ALL" ||
      (issueFilter === "HasIssue" && order.issue !== null) ||
      (issueFilter === "NoIssue" && order.issue === null) ||
      order.issue === issueFilter;

    return matchesSearch && matchesStatus && matchesIssue;
  });

  // Get unique issues for the filter dropdown
  const issues = [
    "ALL",
    "HasIssue",
    "NoIssue",
    ...new Set(orders.filter((o) => o.issue !== null).map((o) => o.issue)),
  ];

  const columns = [
    {
      name: "Order ID",
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: "Customer",
      selector: (row: any) => row.userName,
      sortable: true,
    },
    {
      name: "Vendor",
      selector: (row: any) => row.vendorName,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row: any) => row.date,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row: any) => row.total,
      format: (row: any) => `#${row.total.toFixed(2)}`,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
      cell: (row: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.status === "Pending"
              ? "bg-processing text-white"
              : row.status === "Paid"
              ? "bg-pryColor text-white"
              : row.status === "Shipped"
              ? "bg-secColor text-white"
              : row.status === "Delivered"
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
      name: "Issue",
      selector: (row: any) => row.issue,
      cell: (row: any) =>
        row.issue ? (
          <span className="px-2 py-1 bg-negative-Light text-negative rounded-md text-xs">
            {row.issue}
          </span>
        ) : (
          <span className="text-positive text-xs">None</span>
        ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleAction(row, "changeStatus")}
            className="p-1 rounded text-pryColor hover:bg-pryColor-Light"
            title="Change Status"
          >
            <Edit size={16} />
          </button>
          {row.status !== "Canceled" && row.status !== "Delivered" && (
            <button
              onClick={() => handleAction(row, "cancel")}
              className="p-1 rounded text-negative hover:bg-negative-Light"
              title="Cancel Order"
            >
              <XCircle size={16} />
            </button>
          )}
          {/* {(row.status === "Paid" ||
            row.status === "Shipped" ||
            row.status === "Delivered") && (
            <button
              onClick={() => handleAction(row, "refund")}
              className="p-1 rounded text-processing hover:bg-processing-Light"
              title="Process Refund"
            >
              <DollarSign size={16} />
            </button>
          )} */}
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
          Order Intervention
        </h2>

        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="w-full md:w-40">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>

          <div className="w-full md:w-40">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
              value={issueFilter}
              onChange={(e) => setIssueFilter(e.target.value)}
            >
              <option value="ALL">All Orders</option>
              <option value="HasIssue">Has Issue</option>
              <option value="NoIssue">No Issue</option>
              {issues
                .filter((i) => !["ALL", "HasIssue", "NoIssue"].includes(i))
                .map((issue) => (
                  <option key={issue} value={issue}>
                    {issue}
                  </option>
                ))}
            </select>
          </div>

          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="mb-6 bg-processing-Light border-l-4 border-processing p-4 flex items-start">
        <Truck
          size={20}
          className="text-processing mr-2 flex-shrink-0 mt-0.5"
        />
        <div>
          <h3 className="font-semibold text-greyColr">Order Management</h3>
          <p className="text-sm text-lightGreyColor">
            Orders that need attention are displayed below. You can modify order
            status, process cancellations, or issue refunds.
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredOrders}
        pagination
        customStyles={customStyles}
        highlightOnHover
        responsive
        sortIcon={<ChevronDown size={16} />}
        defaultSortFieldId={1}
        defaultSortAsc={false}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-greyColr">
              {modalAction === "changeStatus"
                ? "Change Order Status"
                : modalAction === "cancel"
                ? "Cancel Order"
                : "Process Refund"}
            </h3>

            <div className="mb-4">
              <p className="mb-2">
                <span className="font-semibold">Order ID:</span>{" "}
                {selectedOrder.id}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Customer:</span>{" "}
                {selectedOrder.userName}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Total:</span> #
                {selectedOrder.total.toFixed(2)}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Current Status:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    selectedOrder.status === "Pending"
                      ? "bg-processing text-white"
                      : selectedOrder.status === "Paid"
                      ? "bg-pryColor text-white"
                      : selectedOrder.status === "Shipped"
                      ? "bg-secColor text-white"
                      : selectedOrder.status === "Delivered"
                      ? "bg-positive text-white"
                      : "bg-negative text-white"
                  }`}
                >
                  {selectedOrder.status}
                </span>
              </p>
            </div>

            {modalAction === "changeStatus" ? (
              <div className="mb-4">
                <label className="block text-sm font-medium text-lightGreyColor mb-1">
                  New Status
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-sm font-medium text-lightGreyColor mb-1">
                  {modalAction === "cancel"
                    ? "Cancellation Reason"
                    : "Refund Note"}
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={
                    modalAction === "cancel"
                      ? "Please provide a reason for cancellation..."
                      : "Please provide details about this refund..."
                  }
                />
              </div>
            )}

            <p className="mb-6 text-sm text-lightGreyColor">
              {modalAction === "changeStatus"
                ? `You are about to change the order status from ${selectedOrder.status} to ${newStatus}.`
                : modalAction === "cancel"
                ? "This action will cancel the order and notify both the customer and vendor."
                : `This will process a refund of #${selectedOrder.total.toFixed(
                    2
                  )} to the customer.`}
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
                className={`px-4 py-2 rounded-md text-white ${
                  modalAction === "cancel"
                    ? "bg-negative hover:bg-opacity-90"
                    : "bg-pryColor hover:bg-opacity-90"
                }`}
                disabled={modalAction !== "changeStatus" && !note.trim()}
              >
                {modalAction === "changeStatus"
                  ? "Update Status"
                  : modalAction === "cancel"
                  ? "Cancel Order"
                  : "Process Refund"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderIntervention;
