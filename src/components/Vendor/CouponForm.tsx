import React, { useState, useEffect } from "react";

interface Coupon {
  id?: string;
  code: string;
  type: string;
  value: number;
  minPurchase: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usedCount?: number;
  status?: string;
  products: string[];
  description: string;
}

interface CouponFormProps {
  coupon?: Coupon | null;
  onSave: (coupon: Coupon) => void;
  onCancel: () => void;
}

const defaultCoupon: Coupon = {
  code: "",
  type: "percentage",
  value: 10,
  minPurchase: 0,
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
    .toISOString()
    .split("T")[0],
  usageLimit: 100,
  products: ["all"],
  description: "",
};

const CouponForm: React.FC<CouponFormProps> = ({
  coupon,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Coupon>(coupon || defaultCoupon);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (coupon) {
      setFormData(coupon);
    } else {
      setFormData(defaultCoupon);
    }
  }, [coupon]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Handle number inputs
    if (type === "number") {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.code.trim()) {
      newErrors.code = "Coupon code is required";
    }

    if (formData.value <= 0) {
      newErrors.value = "Value must be greater than 0";
    }

    if (formData.type === "percentage" && formData.value > 100) {
      newErrors.value = "Percentage cannot exceed 100%";
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = "End date must be after start date";
    }

    if (formData.usageLimit <= 0) {
      newErrors.usageLimit = "Usage limit must be greater than 0";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Coupon Code*
          </label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.code ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-pryColor focus:border-pryColor`}
            placeholder="e.g. SUMMER25"
          />
          {errors.code && (
            <p className="mt-1 text-sm text-red-600">{errors.code}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount Type*
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pryColor focus:border-pryColor"
          >
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount (₹)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount Value*
          </label>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.value ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-pryColor focus:border-pryColor`}
            min="0"
            max={formData.type === "percentage" ? "100" : undefined}
            step="0.01"
          />
          {errors.value && (
            <p className="mt-1 text-sm text-red-600">{errors.value}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Purchase Amount
          </label>
          <input
            type="number"
            name="minPurchase"
            value={formData.minPurchase}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pryColor focus:border-pryColor"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date*
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pryColor focus:border-pryColor"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date*
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.endDate ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-pryColor focus:border-pryColor`}
          />
          {errors.endDate && (
            <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Usage Limit*
          </label>
          <input
            type="number"
            name="usageLimit"
            value={formData.usageLimit}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.usageLimit ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-pryColor focus:border-pryColor`}
            min="1"
          />
          {errors.usageLimit && (
            <p className="mt-1 text-sm text-red-600">{errors.usageLimit}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description*
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`w-full px-3 py-2 border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-pryColor focus:border-pryColor`}
            placeholder="Brief description of this coupon"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
      </div>

      <div className="pt-4 flex justify-end space-x-3 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pryColor focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pryColor hover:bg-secColor focus:outline-none focus:ring-2 focus:ring-pryColor focus:ring-offset-2"
        >
          {coupon ? "Update Coupon" : "Create Coupon"}
        </button>
      </div>
    </form>
  );
};

export default CouponForm;
