import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormInput from "../../../components/FormInput";

const AddPayout = () => {
  const [showModal, setShowModal] = useState(false);

  const initialValues = {
    bankName: "",
    accountNumber: "",
    accountName: "",
  };

  const formSchema = Yup.object().shape({
    bankName: Yup.string().required("Bank name is required"),
    accountNumber: Yup.string()
      .required("Account number is required")
      .matches(/^\d+$/, "Account number must be numeric"),
    accountName: Yup.string().required("Account name is required"),
  });

  const onSubmit = (data: typeof initialValues) => {
    console.log("Form Data:", data);
    // TODO: Submit the form (e.g. API call)
    setShowModal(false); // Close modal after submission
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: formSchema,
      onSubmit,
      validateOnChange: true,
      validateOnBlur: true,
    });

  const dummyPayoutAccount = {
    bankName: "First Bank",
    accountNumber: "1234567890",
    accountName: "John Doe",
  };

  return (
    <>
      <div className="py-6">
        <div className="bg-white border rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">Payout Account</h2>
          {dummyPayoutAccount ? (
            <div className="border p-4 rounded-md mb-4 bg-gray-50">
              <p className="font-semibold text-gray-800">Bank Details</p>
              <div className="mt-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Bank Name:</span>{" "}
                  {dummyPayoutAccount.bankName}
                </p>
                <p>
                  <span className="font-medium">Account Number:</span>{" "}
                  {dummyPayoutAccount.accountNumber}
                </p>
                <p>
                  <span className="font-medium">Account Name:</span>{" "}
                  {dummyPayoutAccount.accountName}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 mb-4">No payout account added yet.</p>
          )}

          <button
            onClick={() => setShowModal(true)}
            className="bg-pryColor text-white px-4 py-2 rounded hover:bg-secColor transition-colors"
          >
            Add Another Payout Account
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white p-10 rounded-lg w-full max-w-xl relative shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-4xl cursor-pointer"
              aria-label="Close"
            >
              &times;
            </button>

            <h3 className="text-xl font-semibold mb-4">Add Payout Account</h3>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 ">
                {/* Bank Name */}
                <FormInput
                  placeholder="Bank Name"
                  type="text"
                  id="bankName"
                  name="bankName"
                  error={touched.bankName ? errors.bankName : undefined}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  defaultValue={values.bankName as string}
                />

                {/* Account Number */}
                <FormInput
                  placeholder="Account Number"
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  error={
                    touched.accountNumber ? errors.accountNumber : undefined
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  defaultValue={values.accountNumber as string}
                />

                {/* Account Name */}
                <FormInput
                  placeholder="Account Name"
                  type="text"
                  id="accountName"
                  name="accountName"
                  error={touched.accountName ? errors.accountName : undefined}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  defaultValue={values.accountName as string}
                />
              </div>

              {/* Submit Button */}
              <div className="mt-6 text-right">
                <button
                  type="submit"
                  className="bg-pryColor text-white px-6 py-3 rounded-md hover:bg-secColor transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPayout;
