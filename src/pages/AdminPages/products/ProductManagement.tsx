import { useState } from "react";
import ProductModeration from "../../../components/AdminComponent/products/ProductModeration";
// import ProductEditing from "../../../components/AdminComponent/products/ProductEditing";
import StockMonitoring from "../../../components/AdminComponent/products/StockMonitoring";
import Navbar from "../../../components/Navbar/Navbar";

const ProductManagement = () => {
  const [activeTab, setActiveTab] = useState("moderation");

  return (
    <div className="flex-col h-screen gap-10 flex">
      <Navbar title="Product Management" subtitle="Manage vendor here" />
      <div className="px-10">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("moderation")}
              className={`py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === "moderation"
                  ? "border-secColor text-greyColr"
                  : "border-transparent text-lightGreyColor hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Product Moderation
            </button>
            {/* <button
              onClick={() => setActiveTab("editing")}
              className={`ml-8 py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === "editing"
                  ? "border-secColor text-greyColr"
                  : "border-transparent text-lightGreyColor hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Product Editing
            </button> */}
            <button
              onClick={() => setActiveTab("stock")}
              className={`ml-8 py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === "stock"
                  ? "border-secColor text-greyColr"
                  : "border-transparent text-lightGreyColor hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Stock Monitoring
            </button>
          </nav>
        </div>
      </div>

      <div className="px-10">
        {activeTab === "moderation" && <ProductModeration />}
        {/* {activeTab === "editing" && <ProductEditing />} */}
        {activeTab === "stock" && <StockMonitoring />}
      </div>
    </div>
  );
};

export default ProductManagement;
