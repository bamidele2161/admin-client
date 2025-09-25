import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { selectAuth } from "../../store/slice/authSlice";
import { useAppSelector } from "../../hooks";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { userInfo } = useAppSelector(selectAuth);

  console.log(userInfo);
  const [formData, setFormData] = useState({
    adminName: userInfo?.fullName,
    email: userInfo?.email,
    currentPassword: "",
    newPassword: "",
    phoneNumber: userInfo?.phoneNumber,
    confirmPassword: "",
    siteTitle: "ashobox",
    siteDescription: "Your one-stop shop for quality fashion products",
    enableNotifications: true,
    emailNotifications: true,
    darkMode: false,
    maintenanceMode: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic
    alert("Profile settings updated");
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle security settings update
    alert("Security settings updated");
  };

  // const handleSiteSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Handle site settings update
  //   alert("Site settings updated");
  // };

  // const handlePreferencesSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Handle preferences update
  //   alert("Preferences updated");
  // };

  return (
    <div className="flex-col h-screen gap-10 flex">
      <Navbar title="Admin Settings" subtitle="Manage your settings" />
      <div className="flex flex-col md:flex-row gap-6 px-10">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-lg shadow-default p-4">
            <h3 className="font-medium text-lg text-greyColr mb-4">Settings</h3>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeTab === "profile"
                    ? "bg-pryColor text-white font-semibold"
                    : "hover:bg-gray-100 text-lightGreyColor"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeTab === "security"
                    ? "bg-pryColor text-white font-semibold"
                    : "hover:bg-gray-100 text-lightGreyColor"
                }`}
              >
                Security
              </button>
              {/* <button
                onClick={() => setActiveTab("site")}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeTab === "site"
                    ? "bg-pryColor text-white font-semibold"
                    : "hover:bg-gray-100 text-lightGreyColor"
                }`}
              >
                Site Settings
              </button> */}
              {/* <button
                onClick={() => setActiveTab("preferences")}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeTab === "preferences"
                    ? "bg-pryColor text-white font-semibold"
                    : "hover:bg-gray-100 text-lightGreyColor"
                }`}
              >
                Preferences
              </button> */}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-default p-6">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-greyColr">
                  Profile Settings
                </h2>
                <form onSubmit={handleProfileSubmit}>
                  <div className="mb-4">
                    <label className="block text-lightGreyColor mb-2">
                      Admin Name
                    </label>
                    <input
                      type="text"
                      name="adminName"
                      value={formData.adminName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pryColor"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-lightGreyColor mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pryColor"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-lightGreyColor mb-2">
                      Phone Number
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pryColor"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-lightGreyColor mb-2">
                      Admin Avatar
                    </label>
                    <div className="flex items-center">
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mr-4">
                        User
                      </div>
                      <button
                        type="button"
                        className="px-4 py-2 bg-secColor text-white rounded hover:bg-opacity-90"
                      >
                        Change Avatar
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-pryColor text-white rounded hover:bg-opacity-90"
                    >
                      Save Profile
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-greyColr">
                  Security Settings
                </h2>
                <form onSubmit={handleSecuritySubmit}>
                  <div className="mb-4">
                    <label className="block text-lightGreyColor mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pryColor"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-lightGreyColor mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pryColor"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-lightGreyColor mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pryColor"
                    />
                  </div>
                  <div className="mb-4 bg-secColor-Light p-4 rounded text-greyColr">
                    <h4 className="font-medium mb-2">Password Requirements</h4>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>At least 8 characters long</li>
                      <li>Contains at least one uppercase letter</li>
                      <li>Contains at least one number</li>
                      <li>Contains at least one special character</li>
                    </ul>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-pryColor text-white font-semibold rounded hover:bg-opacity-90"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Site Settings */}
            {/* {activeTab === "site" && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-greyColr">
                  Site Settings
                </h2>
                <form onSubmit={handleSiteSubmit}>
                  <div className="mb-4">
                    <label className="block text-lightGreyColor mb-2">
                      Site Title
                    </label>
                    <input
                      type="text"
                      name="siteTitle"
                      value={formData.siteTitle}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pryColor"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-lightGreyColor mb-2">
                      Site Description
                    </label>
                    <textarea
                      name="siteDescription"
                      value={formData.siteDescription}
                      onChange={handleChange}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pryColor"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="maintenanceMode"
                        checked={formData.maintenanceMode}
                        onChange={handleChange}
                        className="mr-2 h-4 w-4 text-pryColor"
                      />
                      <span className="text-lightGreyColor">
                        Enable Maintenance Mode
                      </span>
                    </label>
                    <p className="text-xs text-lightGreyColor mt-1 ml-6">
                      When enabled, site will be inaccessible to regular users.
                    </p>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-pryColor text-white font-semibold rounded hover:bg-opacity-90"
                    >
                      Save Site Settings
                    </button>
                  </div>
                </form>
              </div>
            )} */}

            {/* Preferences */}
            {/* {activeTab === "preferences" && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-greyColr">
                  Preferences
                </h2>
                <form onSubmit={handlePreferencesSubmit}>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="enableNotifications"
                        checked={formData.enableNotifications}
                        onChange={handleChange}
                        className="mr-2 h-4 w-4 text-pryColor"
                      />
                      <span className="text-lightGreyColor">
                        Enable Dashboard Notifications
                      </span>
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={formData.emailNotifications}
                        onChange={handleChange}
                        className="mr-2 h-4 w-4 text-pryColor"
                      />
                      <span className="text-lightGreyColor">
                        Receive Email Notifications
                      </span>
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="darkMode"
                        checked={formData.darkMode}
                        onChange={handleChange}
                        className="mr-2 h-4 w-4 text-pryColor"
                      />
                      <span className="text-lightGreyColor">
                        Enable Dark Mode
                      </span>
                    </label>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-pryColor text-white font-semibold rounded hover:bg-opacity-90"
                    >
                      Save Preferences
                    </button>
                  </div>
                </form>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
