import { useState } from "react";
import DataTable from "react-data-table-component";
import { Check, X, Eye } from "lucide-react";
import {
  useGetAllVendorsQuery,
  useUpdateVendorMutation,
} from "../../../service/admin";
import { toast } from "react-toastify";
import Spinner from "../../Spinner/Spinner";

// Sample data - in a real app, this would come from your Redux/API
// const pendingVendors = [
//   {
//     id: 1,
//     businessName: "Fashion Styles Inc.",
//     ownerName: "Michael Jordan",
//     email: "michael@fashionstyles.com",
//     phoneNumber: "+1234567890",
//     createdAt: "2023-10-12",
//   },
//   {
//     id: 2,
//     businessName: "Tech Gadgets Ltd",
//     ownerName: "Lisa Johnson",
//     email: "lisa@techgadgets.com",
//     phoneNumber: "+1987654321",
//     createdAt: "2023-09-18",
//   },
//   {
//     id: 3,
//     businessName: "Home Essentials Co",
//     ownerName: "Robert Davis",
//     email: "robert@homeessentials.com",
//     phoneNumber: "+1122334455",
//     createdAt: "2023-08-22",
//   },
//   {
//     id: 4,
//     businessName: "Outdoor Adventures",
//     ownerName: "Sarah Miller",
//     email: "sarah@outdooradventures.com",
//     phoneNumber: "+1555666777",
//     createdAt: "2023-07-15",
//   },
//   {
//     id: 5,
//     businessName: "Beauty Supplies Plus",
//     ownerName: "David Wilson",
//     email: "david@beautysupplies.com",
//     phoneNumber: "+1999888777",
//     createdAt: "2023-11-03",
//   },
// ];

const VendorApproval = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const { data } = useGetAllVendorsQuery();
  const [updateVendor, { isLoading }] = useUpdateVendorMutation();
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleAction = (vendor: any, action: string) => {
    setSelectedVendor(vendor);
    setModalAction(action);
    if (action === "reject") {
      setRejectionReason("");
    }
    setShowModal(true);
  };

  const handleModalAction = async () => {
    try {
      let response;
      if (modalAction === "approve") {
        console.log(`Approving vendor:`, selectedVendor);
        response = await updateVendor({
          id: selectedVendor.id,
          body: { status: "APPROVED" },
        });
        toast.success(response?.data?.message);
      } else if (modalAction === "reject") {
        console.log(
          `Rejecting vendor:`,
          selectedVendor,
          "Reason:",
          rejectionReason
        );

        response = await updateVendor({
          id: selectedVendor.id,
          body: { status: "REJECTED" },
        });
        toast.success(response?.data?.message);
      }

      setShowModal(false);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const filteredVendors = data?.data?.filter((vendor: any) => {
    return (
      vendor?.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor?.User?.fullName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      vendor?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  console.log(selectedVendor);
  const columns = [
    {
      name: "Business Name",
      selector: (row: any) => row?.businessName,
      sortable: true,
    },
    {
      name: "Owner",
      selector: (row: any) => row?.User?.fullName,
      sortable: true,
    },
    {
      name: "Email",
      grow: 2,
      selector: (row: any) => row?.User?.email,
    },
    {
      name: "Phone",
      selector: (row: any) => row?.User?.phoneNumber,
    },
    {
      name: "Status",
      selector: (row: any) => (
        <span
          className={`
        px-3 py-1 rounded-full text-xs font-semibold
        ${
          row?.status === "PENDING"
            ? "bg-yellow-100 text-yellow-700"
            : row?.status === "APPROVED"
            ? "bg-green-100 text-green-700"
            : row?.status === "REJECTED"
            ? "bg-orange-100 text-orange-700"
            : row?.status === "INACTIVE"
            ? "bg-red-100 text-red-700"
            : "bg-gray-100 text-gray-700"
        }
      `}
        >
          {row?.status || "Unknown"}
        </span>
      ),
    },
    {
      name: "Applied On",
      selector: (row: any) => row?.createdAt?.slice(0, 10),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleAction(row, "view")}
            className="p-1 rounded text-pryColor hover:bg-pryColor"
          >
            <Eye size={16} />
          </button>
          {row?.status !== "APPROVED" && (
            <button
              onClick={() => handleAction(row, "approve")}
              className="p-1 rounded text-positive hover:bg-positive"
            >
              <Check size={16} />
            </button>
          )}

          {row?.status !== "REJECTED" && (
            <button
              onClick={() => handleAction(row, "reject")}
              className="p-1 rounded text-negative hover:bg-negative"
            >
              <X size={16} />
            </button>
          )}
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-greyColr">
          Pending Vendor Approvals
        </h2>
        <div className="w-64">
          <input
            type="text"
            placeholder="Search vendors..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
            value={searchTerm}
            onChange={handleSearch}
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
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[700px]">
            <h3 className="text-xl font-semibold mb-8 text-greyColr">
              {modalAction === "view"
                ? "Vendor Details"
                : modalAction === "approve"
                ? "Approve Vendor"
                : "Reject Vendor"}
            </h3>

            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="mb-2">
                  <span className="font-semibold">Business:</span>{" "}
                  {selectedVendor?.businessName}
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <span className="font-semibold">Owner:</span>{" "}
                  {selectedVendor?.User?.fullName}
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedVendor?.User?.email}
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <span className="font-semibold">City:</span>{" "}
                  {selectedVendor?.city}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="mb-2">
                  <span className="font-semibold">Address:</span>{" "}
                  {selectedVendor?.User?.address}
                </p>
              </div>

              <div>
                <p className="mb-2">
                  <span className="font-semibold">Phone:</span>{" "}
                  {selectedVendor?.User?.phoneNumber}
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <span className="font-semibold">Applied On:</span>{" "}
                  {selectedVendor?.createdAt.slice(0, 10)}
                </p>
              </div>
            </div>

            {modalAction === "reject" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-lightGreyColor mb-1">
                  Rejection Reason
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Please provide a reason for rejection..."
                />
              </div>
            )}

            {modalAction !== "view" && (
              <p className="mb-6 text-sm text-lightGreyColor">
                {modalAction === "approve"
                  ? "Are you sure you want to approve this vendor? They will be able to add products and start selling."
                  : "The rejection reason will be sent to the vendor via email."}
              </p>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-lightGreyColor hover:bg-gray-100"
              >
                {modalAction === "view" ? "Close" : "Cancel"}
              </button>
              {modalAction !== "view" && (
                <button
                  onClick={handleModalAction}
                  className={`px-4 py-2 rounded-md text-white ${
                    modalAction === "approve"
                      ? "bg-positive hover:bg-opacity-90"
                      : "bg-negative hover:bg-opacity-90"
                  }`}
                  disabled={modalAction === "reject" && !rejectionReason.trim()}
                >
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      {modalAction === "approve"
                        ? "Approve Vendor"
                        : "Reject Vendor"}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorApproval;
