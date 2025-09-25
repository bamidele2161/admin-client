import { useState } from "react";
// import UserOverview from "../../../components/AdminComponent/users/UserOverview";
import UserAccountControl from "../../../components/AdminComponent/users/UserAccountControl";
// import RoleManagement from "../../../components/AdminComponent/users/RoleManagement";
import Navbar from "../../../components/Navbar/Navbar";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("account-control");

  return (
    <div className="flex-col h-screen gap-10 flex">
      <Navbar title="User Management" subtitle="Manage users here" />

      <div className="px-10">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {/* <button
              onClick={() => setActiveTab("overview")}
              className={`py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === "overview"
                  ? "border-secColor text-greyColr"
                  : "border-transparent text-lightGreyColor hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              User Overview
            </button> */}
            <button
              onClick={() => setActiveTab("account-control")}
              className={`ml-8 py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === "account-control"
                  ? "border-secColor text-greyColr"
                  : "border-transparent text-lightGreyColor hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Account Control
            </button>
            {/* <button
              onClick={() => setActiveTab("role-management")}
              className={`ml-8 py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === "role-management"
                  ? "border-secColor text-greyColr"
                  : "border-transparent text-lightGreyColor hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Role Management
            </button> */}
          </nav>
        </div>
      </div>

      <div className="px-10">
        {/* {activeTab === "overview" && <UserOverview />} */}
        {activeTab === "account-control" && <UserAccountControl />}
        {/* {activeTab === "role-management" && <RoleManagement />} */}
      </div>
    </div>
  );
};

export default UserManagement;
