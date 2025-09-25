import { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import { useAppSelector } from "../../../hooks";
import { selectAuth } from "../../../store/slice/authSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormInput from "../../../components/FormInput";
import AddPayout from "../../../components/Dashboard/Settings/AddPayout";
import ResetPassword from "../../../components/Dashboard/Settings/ResetPassword";

const Settings = () => {
  const { userInfo } = useAppSelector(selectAuth);
  const [activeTab, setActiveTab] = useState("personal");
  const initialValues = {
    fullName: userInfo?.fullName || "",
    email: userInfo?.email || "",
    phoneNumber: userInfo?.phoneNumber || "",
    address: userInfo?.address || "",
    businessName: userInfo?.Vendor?.businessName,
  };

  const formSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().required("Email or Phone number is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
      validateOnChange: true,
      validateOnBlur: true,
      validateOnMount: true,
    });

  return (
    <div className="">
      <Navbar title="Settings" subtitle="Manage your profile here" />

      <div className="bg-gray-50 p-10 rounded-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Store Settings</h1>
          <p className="text-gray-500">
            Update and manage your account settings
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px text-sm font-medium">
            <li className="mr-4">
              <button
                onClick={() => setActiveTab("personal")}
                className={`inline-block p-3 ${
                  activeTab === "personal"
                    ? "text-pryColor border-b-2 border-pryColor"
                    : "text-gray-500 hover:text-gray-600"
                }`}
              >
                Personal Information
              </button>
            </li>
            <li className="mr-4">
              <button
                onClick={() => setActiveTab("pay")}
                className={`inline-block p-3 ${
                  activeTab === "pay"
                    ? "text-pryColor border-b-2 border-pryColor"
                    : "text-gray-500 hover:text-gray-600"
                }`}
              >
                Payout
              </button>
            </li>
            <li className="mr-4">
              <button
                onClick={() => setActiveTab("store")}
                className={`inline-block p-3 ${
                  activeTab === "store"
                    ? "text-pryColor border-b-2 border-pryColor"
                    : "text-gray-500 hover:text-gray-600"
                }`}
              >
                Security
              </button>
            </li>
          </ul>
        </div>

        {/* Personal Information Tab Content */}
        {activeTab === "personal" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Profile Picture */}
                <div className="md:col-span-2 flex items-center mb-4">
                  <div className="w-20 h-20 mr-4 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    <span className="text-3xl text-gray-600">
                      {userInfo?.fullName?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="bg-white border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 mr-2"
                    >
                      Change Photo
                    </button>
                    <button
                      type="button"
                      className="text-red-600 text-sm hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Full name */}
                <FormInput
                  placeholder="Full Name"
                  type="text"
                  id={"fullName"}
                  name="fullName"
                  error={
                    touched.fullName ? (errors.fullName as string) : undefined
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  defaultValue={values?.fullName}
                />

                <FormInput
                  placeholder="Business Name"
                  type="text"
                  id={"businessName"}
                  name="businessName"
                  error={
                    touched.businessName
                      ? (errors.businessName as string)
                      : undefined
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  defaultValue={values?.businessName}
                />

                <FormInput
                  placeholder="Email Address"
                  type="text"
                  id={"email"}
                  name="email"
                  error={touched.email ? (errors.email as string) : undefined}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  defaultValue={values?.email}
                />

                <FormInput
                  placeholder="Phone number"
                  type="text"
                  id={"phoneNumber"}
                  name="phoneNumber"
                  error={
                    touched.phoneNumber
                      ? (errors.phoneNumber as string)
                      : undefined
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  defaultValue={values?.phoneNumber}
                />

                <FormInput
                  placeholder="Phone number"
                  type="text"
                  id={"address"}
                  name="address"
                  error={
                    touched.address ? (errors.address as string) : undefined
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  defaultValue={values?.address}
                />
              </div>
              {/* Submit Button */}
              <div className="md:col-span-2 mt-6">
                <button
                  type="submit"
                  className="bg-pryColor text-white px-6 py-3 rounded-md hover:bg-secColor transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Store Settings Tab Content */}
        {activeTab === "store" && (
          // <div className="bg-white p-6 rounded-lg shadow-sm">
          //   <h3 className="text-lg font-medium text-gray-900 mb-4">
          //     Store Settings
          //   </h3>
          //   <p className="text-gray-500">
          //     Manage your store settings, including location, currency, and
          //     shipping options.
          //   </p>
          //   <ComingSoon />
          // </div>
          <ResetPassword />
        )}

        {/* Payout*/}
        {activeTab === "pay" && <AddPayout />}
      </div>
    </div>
  );
};

export default Settings;
