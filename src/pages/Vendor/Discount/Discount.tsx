import { useState } from "react";
import { BadgePercent, Search, Plus, X, Check } from "lucide-react";
import CouponForm from "../../../components/Vendor/CouponForm";
import CouponList from "../../../components/Vendor/CouponList";

import Navbar from "../../../components/Navbar/Navbar";

const initialCoupons = [
  {
    id: "1",
    code: "SUMMER25",
    type: "percentage",
    value: 25,
    minPurchase: 1000,
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    usageLimit: 100,
    usedCount: 23,
    status: "active",
    products: ["all"],
    description: "Summer sale discount",
  },
  {
    id: "2",
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minPurchase: 500,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    usageLimit: 500,
    usedCount: 127,
    status: "active",
    products: ["all"],
    description: "New customer discount",
  },
  {
    id: "3",
    code: "FLAT100",
    type: "fixed",
    value: 100,
    minPurchase: 1500,
    startDate: "2025-05-01",
    endDate: "2025-05-15",
    usageLimit: 50,
    usedCount: 50,
    status: "expired",
    products: ["electronics"],
    description: "Electronics sale discount",
  },
];

const Discount = () => {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const activeCoupons = coupons.filter(
    (coupon) => coupon.status === "active"
  ).length;
  const expiredCoupons = coupons.filter(
    (coupon) => coupon.status === "expired"
  ).length;

  const handleAddCoupon = () => {
    setEditingCoupon(null);
    setIsFormOpen(true);
  };

  const handleEditCoupon = (coupon: any) => {
    setEditingCoupon(coupon);
    setIsFormOpen(true);
  };

  const handleDeleteCoupon = (id: string) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      setCoupons(coupons.filter((coupon) => coupon.id !== id));
    }
  };

  const handleSaveCoupon = (coupon: any) => {
    if (coupon.id) {
      // Update existing coupon
      setCoupons(coupons.map((c) => (c.id === coupon.id ? coupon : c)));
    } else {
      // Add new coupon
      const newCoupon = {
        ...coupon,
        id: Date.now().toString(),
        usedCount: 0,
        status: new Date(coupon.endDate) < new Date() ? "expired" : "active",
      };
      setCoupons([...coupons, newCoupon]);
    }
    setIsFormOpen(false);
  };

  const filteredCoupons = coupons
    .filter(
      (coupon) =>
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (coupon) => statusFilter === "all" || coupon.status === statusFilter
    );

  return (
    <div className="">
      <Navbar
        title="Discount Management"
        subtitle="Manage special offers for your customers"
      />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Coupons & Discounts
              </h1>
              {/* <p className="text-sm text-gray-600 mt-1">
                Manage special offers for your customers
              </p> */}
            </div>
            <button
              onClick={handleAddCoupon}
              className="flex items-center px-4 py-2 bg-pryColor text-white rounded-md hover:bg-secColor transition-colors"
            >
              <Plus size={16} className="mr-2" />
              Create Coupon
            </button>
          </div>

          {/* Dashboard cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-secColor-Light text-pryColor mr-4">
                  <BadgePercent size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Coupons
                  </p>
                  <p className="text-2xl font-semibold">{coupons.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                  <Check size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Active Coupons
                  </p>
                  <p className="text-2xl font-semibold">{activeCoupons}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                  <X size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Expired Coupons
                  </p>
                  <p className="text-2xl font-semibold">{expiredCoupons}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and filter */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search coupons..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-pryColor focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pryColor focus:border-transparent"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>
          </div>

          {/* Coupon list */}
          <CouponList
            coupons={filteredCoupons}
            onEdit={handleEditCoupon}
            onDelete={handleDeleteCoupon}
          />

          {/* Coupon form modal */}
          {isFormOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    {editingCoupon ? "Edit Coupon" : "Create New Coupon"}
                  </h2>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
                <CouponForm
                  coupon={editingCoupon}
                  onSave={handleSaveCoupon}
                  onCancel={() => setIsFormOpen(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discount;
