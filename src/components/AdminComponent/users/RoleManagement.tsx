import { useState } from "react";
import DataTable from "react-data-table-component";
import { UserCog, ChevronDown } from "lucide-react";

// Sample data - in a real app, this would come from your Redux/API
const users = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john@example.com",
    role: "CUSTOMER",
    createdAt: "2023-10-12",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane@example.com",
    role: "CUSTOMER",
    createdAt: "2023-09-18",
  },
  {
    id: 3,
    fullName: "Bob Johnson",
    email: "bob@vendor.com",
    role: "VENDOR",
    createdAt: "2023-08-22",
  },
  {
    id: 4,
    fullName: "Alice Williams",
    email: "alice@admin.com",
    role: "ADMIN",
    createdAt: "2023-07-15",
  },
  {
    id: 5,
    fullName: "Charlie Brown",
    email: "charlie@vendor.com",
    role: "VENDOR",
    createdAt: "2023-11-03",
  },
];

const RoleManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [newRole, setNewRole] = useState("");

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleChange = (user: any) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowModal(true);
  };

  const handleModalAction = () => {
    // In a real app, you would call your API/Redux action here
    console.log(
      `Changing role for user ${selectedUser.fullName} from ${selectedUser.role} to ${newRole}`
    );
    setShowModal(false);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

    return matchesSearch && matchesRole;
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
      name: "Role",
      selector: (row: any) => row.role,
      cell: (row: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.role === "ADMIN"
              ? "bg-pryColor-DEFAULT text-white"
              : row.role === "VENDOR"
              ? "bg-secColor-DEFAULT text-white"
              : "bg-pryColor-Light text-greyColr"
          }`}
        >
          {row.role}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Joined",
      selector: (row: any) => row.createdAt,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <button
          onClick={() => handleRoleChange(row)}
          className="px-3 py-1 bg-secColor-Light text-secColor-DEFAULT rounded-md flex items-center hover:bg-secColor-DEFAULT hover:text-white"
        >
          <UserCog size={16} className="mr-1" />
          <span>Change Role</span>
        </button>
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
    <div className="bg-white p-6 rounded-lg shadow-default">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-greyColr mb-4 md:mb-0">
          Role Management
        </h2>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <div className="w-full md:w-48">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor-DEFAULT"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="VENDOR">Vendor</option>
              <option value="CUSTOMER">Customer</option>
            </select>
          </div>

          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor-DEFAULT"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredUsers}
        pagination
        customStyles={customStyles}
        highlightOnHover
        responsive
        sortIcon={<ChevronDown size={16} />}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-greyColr">
              Change User Role
            </h3>

            <div className="mb-4">
              <p className="mb-2">
                <span className="font-semibold">Name:</span>{" "}
                {selectedUser.fullName}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Email:</span>{" "}
                {selectedUser.email}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Current Role:</span>{" "}
                {selectedUser.role}
              </p>

              <label className="block text-sm font-medium text-lightGreyColor mb-1">
                New Role
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor-DEFAULT"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="ADMIN">Admin</option>
                <option value="VENDOR">Vendor</option>
                <option value="CUSTOMER">Customer</option>
              </select>
            </div>

            <p className="mb-6 text-sm text-lightGreyColor">
              {newRole === "ADMIN"
                ? "Admin users have full access to all features and settings."
                : newRole === "VENDOR"
                ? "Vendor users can manage their products, orders and business settings."
                : "Customer users can browse, purchase products and manage their account."}
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
                className="px-4 py-2 bg-pryColor-DEFAULT text-white rounded-md hover:bg-opacity-90"
              >
                Change Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;
