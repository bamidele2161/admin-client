import { useState } from "react";
import DataTable from "react-data-table-component";
import {
  Eye,
  // Edit, Ban, Check, Key
} from "lucide-react";
import { useGetAllUsersQuery } from "../../../service/auth";

// Sample data - in a real app, this would come from your Redux/API
// const users = [
//   {
//     id: 1,
//     fullName: "John Doe",
//     email: "john@example.com",
//     phoneNumber: "+1234567890",
//     role: "CUSTOMER",
//     status: "active",
//     createdAt: "2023-10-12",
//   },
//   {
//     id: 2,
//     fullName: "Jane Smith",
//     email: "jane@example.com",
//     phoneNumber: "+1987654321",
//     role: "CUSTOMER",
//     status: "active",
//     createdAt: "2023-09-18",
//   },
//   {
//     id: 3,
//     fullName: "Bob Johnson",
//     email: "bob@vendor.com",
//     phoneNumber: "+1122334455",
//     role: "VENDOR",
//     status: "suspended",
//     createdAt: "2023-08-22",
//   },
//   {
//     id: 4,
//     fullName: "Alice Williams",
//     email: "alice@admin.com",
//     phoneNumber: "+1555666777",
//     role: "ADMIN",
//     status: "active",
//     createdAt: "2023-07-15",
//   },
//   {
//     id: 5,
//     fullName: "Charlie Brown",
//     email: "charlie@vendor.com",
//     phoneNumber: "+1999888777",
//     role: "VENDOR",
//     status: "active",
//     createdAt: "2023-11-03",
//   },
// ];

const UserAccountControl = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const { data } = useGetAllUsersQuery();
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleAction = (user: any, action: string) => {
    setSelectedUser(user);
    setModalAction(action);
    setShowModal(true);
  };

  const handleModalAction = () => {
    // In a real app, you would call your API/Redux action here
    console.log(`Performing ${modalAction} on user:`, selectedUser);
    setShowModal(false);
  };

  const filteredUsers = data?.data?.filter((user: any) => {
    return (
      user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.phoneNumber?.includes(searchTerm)
    );
  });

  const columns = [
    {
      name: "Name",
      selector: (row: any) => row.fullName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row: any) => row.phoneNumber,
    },
    // {
    //   name: "Role",
    //   selector: (row:any) => row.role,
    //   cell: (row:any) => (
    //     <span
    //       className={`px-2 py-1 rounded-full text-xs ${
    //         row.role === "ADMIN"
    //           ? "bg-pryColor text-white"
    //           : row.role === "VENDOR"
    //           ? "bg-secColor text-white"
    //           : "bg-pryColor text-greyColr"
    //       }`}
    //     >
    //       {row.role}
    //     </span>
    //   ),
    //   sortable: true,
    // },
    // {
    //   name: "Status",
    //   selector: (row: any) => row.status,
    //   cell: (row: any) => (
    //     <span
    //       className={`px-2 py-1 rounded-full text-xs ${
    //         row.status === "active"
    //           ? "bg-positive text-white"
    //           : "bg-negative text-white"
    //       }`}
    //     >
    //       {row.status}
    //     </span>
    //   ),
    //   sortable: true,
    // },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleAction(row, "view")}
            className="p-1 rounded text-pryColor hover:bg-pryColor-Light"
          >
            <Eye size={16} />
          </button>
          {/* <button
            onClick={() => handleAction(row, "edit")}
            className="p-1 rounded text-secColor hover:bg-secColor-Light"
          >
            <Edit size={16} />
          </button> */}
          {/* <button
            onClick={() =>
              handleAction(
                row,
                row.status === "active" ? "suspend" : "activate"
              )
            }
            className={`p-1 rounded ${
              row.status === "active"
                ? "text-negative hover:bg-negative"
                : "text-positive hover:bg-positive"
            }`}
          >
            {row.status === "active" ? <Ban size={16} /> : <Check size={16} />}
          </button>
          <button
            onClick={() => handleAction(row, "resetPassword")}
            className="p-1 rounded text-processing hover:bg-processing-Light"
          >
            <Key size={16} />
          </button> */}
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
          User Account Control
        </h2>
        <div className="w-64">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredUsers}
        pagination
        customStyles={customStyles}
        highlightOnHover
        responsive
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-greyColr">
              {modalAction === "view"
                ? "User Details"
                : modalAction === "edit"
                ? "Edit User"
                : modalAction === "suspend"
                ? "Suspend User"
                : modalAction === "activate"
                ? "Activate User"
                : "Reset Password"}
            </h3>

            <div className="mb-4">
              <p className="mb-2">
                <span className="font-semibold">Name:</span>{" "}
                {selectedUser?.fullName}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Email:</span>{" "}
                {selectedUser?.email}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Role:</span>{" "}
                {selectedUser?.role}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Status:</span>{" "}
                {selectedUser?.status}
              </p>
            </div>

            {modalAction !== "view" && (
              <p className="mb-6 text-sm text-lightGreyColor">
                {modalAction === "edit"
                  ? "Edit the user details below."
                  : modalAction === "suspend"
                  ? "Are you sure you want to suspend this user? They will not be able to access their account."
                  : modalAction === "activate"
                  ? "Are you sure you want to activate this user?"
                  : "Send a password reset link to this user's email?"}
              </p>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-lightGreyColor hover:bg-gray-100"
              >
                Cancel
              </button>
              {modalAction !== "view" && (
                <button
                  onClick={handleModalAction}
                  className={`px-4 py-2 rounded-md text-white ${
                    modalAction === "suspend"
                      ? "bg-negative hover:bg-opacity-90"
                      : "bg-pryColor hover:bg-opacity-90"
                  }`}
                >
                  {modalAction === "edit"
                    ? "Save Changes"
                    : modalAction === "suspend"
                    ? "Suspend User"
                    : modalAction === "activate"
                    ? "Activate User"
                    : "Send Reset Link"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccountControl;
