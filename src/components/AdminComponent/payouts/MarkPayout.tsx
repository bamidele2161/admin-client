import { useState } from "react";
import {
  useMarkVendorPayoutMutation,
  useGetAllVendorsQuery,
} from "../../../service/admin";
import ImageUpload from "../../Upload/ImageUpload";

interface MarkPayoutFormData {
  vendorId: number;
  amount: number;
  reference: string;
  receiptUrl?: string;
  notes?: string;
}

interface VendorData {
  id: number;
  businessName?: string;
  firstName?: string;
  lastName?: string;
}

const MarkPayout = () => {
  const [formData, setFormData] = useState<MarkPayoutFormData>({
    vendorId: 0,
    amount: 0,
    reference: "",
    receiptUrl: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [receipt, setReceipt] = useState("");
  const [markVendorPayout] = useMarkVendorPayoutMutation();
  const { data: vendorsData, isLoading: vendorsLoading } =
    useGetAllVendorsQuery();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "vendorId" || name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result = await markVendorPayout({
        vendorId: formData.vendorId,
        amount: formData.amount,
        reference: formData.reference,
        receiptUrl: receipt,
        notes: formData.notes || undefined,
      }).unwrap();

      setSuccessMessage(
        `Payout marked successfully! Reference: ${result.data.reference}`
      );
      setFormData({
        vendorId: 0,
        amount: 0,
        reference: "",
        receiptUrl: "",
        notes: "",
      });
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? (error.data as { message?: string })?.message
          : "Failed to mark payout. Please try again.";
      setErrorMessage(
        errorMessage || "Failed to mark payout. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateReference = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    const reference = `PAY-${timestamp}-${randomNum}`;
    setFormData((prev) => ({ ...prev, reference }));
  };

  return (
    <div className="max-w-2xl mx-auto mb-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Mark Vendor Payout
        </h2>

        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vendor Selection */}
            <div>
              <label
                htmlFor="vendorId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Vendor <span className="text-red-500">*</span>
              </label>
              <select
                id="vendorId"
                name="vendorId"
                value={formData.vendorId}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secColor focus:border-transparent"
              >
                <option value={0}>Select a vendor</option>
                {vendorsLoading ? (
                  <option disabled>Loading vendors...</option>
                ) : (
                  vendorsData?.data?.map((vendor: VendorData) => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.businessName ||
                        vendor.firstName + " " + vendor.lastName}{" "}
                      - ID: {vendor.id}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secColor focus:border-transparent"
                placeholder="Enter payout amount"
              />
            </div>
          </div>
          {/* Reference */}
          <div>
            <label
              htmlFor="reference"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Reference <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="reference"
                name="reference"
                value={formData.reference}
                onChange={handleInputChange}
                required
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secColor focus:border-transparent"
                placeholder="Enter reference number"
              />
              <button
                type="button"
                onClick={generateReference}
                className="px-4 py-2 bg-pryColor text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Generate
              </button>
            </div>
          </div>

          {/* Receipt URL */}
          <div>
            <label
              htmlFor="receiptUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Receipt
            </label>
            <ImageUpload setDocument={setReceipt} isBase64={true} />
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secColor focus:border-transparent"
              placeholder="Add any additional notes..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-pryColor text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Processing..." : "Mark Payout"}
            </button>
          </div>
        </form>
      </div>

      {/* Information Card */}
      {/* <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-yellow-900 mb-2">
          Information
        </h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Select the vendor from the dropdown list</li>
          <li>• Enter the exact payout amount</li>
          <li>• Use the "Generate" button to create a unique reference</li>
        </ul>
      </div> */}
    </div>
  );
};

export default MarkPayout;
