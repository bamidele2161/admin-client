import { useState } from "react";
import DataTable from "react-data-table-component";
import { Eye, FileDown, ChevronDown, TrendingUp, Edit } from "lucide-react";
import { useGetAllOrdersQuery } from "../../../service/product";
import { toast } from "react-toastify";
import { useUpdateOrderStatusMutation } from "../../../service/admin";
import Spinner from "../../Spinner/Spinner";

const OrderOverview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [statusOrderStatus, setStatusOrderStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>();
  const { data, refetch } = useGetAllOrdersQuery();
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleUpdateOrder = (order: any) => {
    setSelectedOrder(order);
    setUpdateModal(true);
  };

  const handleExportData = () => {
    console.log("Exporting order data...");
    // In a real application, this would generate a CSV/Excel file with the orders
    alert("Orders exported successfully!");
  };

  // Get date range for filtering
  const getDateRange = () => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const ninetyDaysAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);

    switch (dateFilter) {
      case "last30":
        return thirtyDaysAgo;
      case "last90":
        return ninetyDaysAgo;
      default:
        return null;
    }
  };

  const filteredOrders = data?.data?.filter((order: any) => {
    const matchesSearch =
      // order?.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order?.userFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order?.vendorBusinessName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    // Date filtering
    const dateRange = getDateRange();
    const orderDate = new Date(order.date);
    const matchesDate = !dateRange || orderDate >= dateRange;

    // Status filtering
    const matchesStatus =
      statusFilter === "ALL" || order.status === statusFilter;

    return matchesSearch && matchesDate && matchesStatus;
  });

  // Calculate order statistics
  const totalOrders = filteredOrders?.length;
  const totalRevenue = filteredOrders?.reduce(
    (sum: number, order: any) => sum + order?.totalAmount,
    0
  );

  const deliveredOrders = filteredOrders?.filter(
    (order: any) => order.status === "Delivered"
  ).length;
  const canceledOrders = filteredOrders?.filter(
    (order: any) => order.status === "Canceled"
  ).length;

  const columns = [
    {
      name: "Order ID",
      selector: (row: any) => `ORD-${row.id}`,
      sortable: true,
    },
    {
      name: "Customer",
      selector: (row: any) => row.userFullName,
      sortable: true,
    },
    {
      name: "Vendor",
      selector: (row: any) => row.vendorBusinessName,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row: any) => row.createdAt.slice(0, 10),
      sortable: true,
    },
    {
      name: "Total",
      selector: (row: any) => row.totalAmount,
      format: (row: any) => `#${row.totalAmount?.toFixed(2)}`,
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
      name: "Actions",
      cell: (row: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleViewOrder(row)}
            className="px-3 py-1 bg-pryColor-Light text-pryColor rounded-md flex items-center hover:bg-pryColor hover:text-white"
          >
            <Eye size={16} className="mr-1" />
            {/* <span>View</span> */}
          </button>
          <button
            onClick={() => handleUpdateOrder(row)}
            className="px-3 py-1 bg-pryColor-Light text-pryColor rounded-md flex items-center hover:bg-pryColor hover:text-white"
          >
            <Edit size={16} />
            {/* <span>Update</span> */}
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

  const handleOrderUpdate = async () => {
    try {
      const response = await updateOrderStatus({
        id: selectedOrder.id,
        body: { status: statusOrderStatus },
      });
      toast.success(response?.data?.message);
      refetch();
      setUpdateModal(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };
  console.log(data);
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-greyColr mb-4 md:mb-0">
          Order Overview
        </h2>

        <div className="flex items-center">
          <button
            onClick={handleExportData}
            className="px-4 py-2 bg-pryColor text-white rounded-md flex items-center hover:bg-opacity-90 mr-4"
          >
            <FileDown size={16} className="mr-2" />
            <span>Export Data</span>
          </button>

          <a
            href="#"
            className="px-4 py-2 bg-secColor text-white rounded-md flex items-center hover:bg-opacity-90"
          >
            <TrendingUp size={16} className="mr-2" />
            <span>Sales Report</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-pryColor-Light p-4 rounded-lg">
          <h3 className="text-sm font-medium text-greyColr">Total Orders</h3>
          <div className="text-2xl font-bold text-pryColor mt-2">
            {totalOrders}
          </div>
        </div>

        <div className="bg-secColor-Light p-4 rounded-lg">
          <h3 className="text-sm font-medium text-greyColr">Total Revenue</h3>
          <div className="text-2xl font-bold text-secColor mt-2">
            ₦{totalRevenue?.toFixed(2)}
          </div>
        </div>

        <div className="bg-positive-Light p-4 rounded-lg">
          <h3 className="text-sm font-medium text-greyColr">
            Delivered Orders
          </h3>
          <div className="text-2xl font-bold text-positive mt-2">
            {deliveredOrders}
          </div>
        </div>

        <div className="bg-negative-Light p-4 rounded-lg">
          <h3 className="text-sm font-medium text-greyColr">Canceled Orders</h3>
          <div className="text-2xl font-bold text-negative mt-2">
            {canceledOrders}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
          <div className="w-full md:w-auto">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
            </select>
          </div>

          <div className="w-full md:w-auto">
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

      <DataTable
        columns={columns}
        data={filteredOrders}
        pagination
        customStyles={customStyles}
        highlightOnHover
        responsive
        sortIcon={<ChevronDown size={16} />}
      />

      {/* Order Detail Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-greyColr">
                Order Details
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-lightGreyColor">Order ID</p>
                <p className="font-semibold">{selectedOrder.id}</p>
              </div>
              <div>
                <p className="text-sm text-lightGreyColor">Date</p>
                <p className="font-semibold">
                  {selectedOrder.createdAt?.slice(0, 10)}
                </p>
              </div>
              <div>
                <p className="text-sm text-lightGreyColor">Status</p>
                <p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
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
              <div>
                <p className="text-sm text-lightGreyColor">Payment Ref</p>
                <p className="font-semibold">
                  {selectedOrder.paymentReference}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center bg-secColor-Light rounded-lg p-2">
              <div className="mb-6">
                <h4 className="text-md font-semibold mb-2">Customer</h4>
                <p>
                  <span className="text-lightGreyColor">Name:</span>{" "}
                  {selectedOrder.userFullName}
                </p>
                {/* <p>
                  <span className="text-lightGreyColor">ID:</span>{" "}
                  {selectedOrder.userId}
                </p> */}
              </div>

              <div className="mb-6">
                <h4 className="text-md font-semibold mb-2">Vendor</h4>
                <p>
                  <span className="text-lightGreyColor">Name:</span>{" "}
                  {selectedOrder.vendorBusinessName}
                </p>
                {/* <p>
                  <span className="text-lightGreyColor">ID:</span>{" "}
                  {selectedOrder.vendorId}
                </p> */}
              </div>
            </div>

            <div className="column flex flex-col gap-4">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Items
              </p>
              {selectedOrder?.items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex flex-col items-start justify-start">
                    <p className="text-sm text-greyColr font-workSans font-medium">
                      Product ID: {item.productId}
                    </p>
                    <p className="text-sm text-lightGreyColor font-workSans">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-end">
                    <p className="text-sm text-greyColr font-workSans font-medium">
                      Size:{item.size}
                    </p>
                    <p className="text-sm text-greyColr font-workSans font-medium">
                      Color:{item.color}
                    </p>
                  </div>
                  <p className="text-sm text-greyColr font-workSans font-medium">
                    Product Name:{item?.product?.name}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <p className="font-semibold">Total</p>
                <p className="font-bold">
                  ₦{selectedOrder.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-lightGreyColor hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  console.log("Print order", selectedOrder);
                  alert(`Printing order ${selectedOrder.id}`);
                }}
                className="px-4 py-2 bg-pryColor text-white rounded-md hover:bg-opacity-90"
              >
                Print Order
              </button>
            </div>
          </div>
        </div>
      )}

      {updateModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-greyColr">
                Update Order Status
              </h3>
              <button
                onClick={() => setUpdateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
              value={statusOrderStatus}
              onChange={(e) => setStatusOrderStatus(e.target.value)}
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </select>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setUpdateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-lightGreyColor hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={handleOrderUpdate}
                className="px-4 py-2 bg-pryColor text-white rounded-md hover:bg-opacity-90"
              >
                {isLoading ? <Spinner /> : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderOverview;
