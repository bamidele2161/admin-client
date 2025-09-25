import { Plus, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickAction = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white rounded-2xl shadow-default">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Add Product Card */}
        <div className="flex flex-col bg-white border rounded-lg shadow-default p-5 items-center justify-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Add a New Product
          </h3>
          <p className="text-sm text-gray-600 mb-4 text-center">
            Quickly add a new product to your inventory. Simply click the button
            below to start the process.
          </p>
          <button
            onClick={() => navigate("/product-management/add-product")}
            className="flex gap-2 px-5 py-3 bg-pryColor text-white rounded-lg shadow-default transition hover:bg-opacity-90 w-full items-center justify-center"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>

        {/* View Orders Card */}
        <div className="flex flex-col bg-white border rounded-lg shadow-default p-5 items-center justify-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            View Orders
          </h3>
          <p className="text-sm text-gray-600 mb-4 text-center">
            Check the latest orders and manage customer requests efficiently.
            Click the button to view order details.
          </p>
          <button
            onClick={() => navigate("/order-management")}
            className="flex gap-2 px-5 py-3 bg-secColor text-white rounded-lg shadow-default transition hover:bg-opacity-90 w-full items-center justify-center"
          >
            <Eye size={18} /> View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickAction;
