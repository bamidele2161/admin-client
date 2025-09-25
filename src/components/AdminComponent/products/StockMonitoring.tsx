import { useState } from "react";
import DataTable from "react-data-table-component";
import { AlertTriangle, ChevronDown } from "lucide-react";

// Sample data - in a real app, this would come from your Redux/API
const products = [
  {
    id: 1,
    name: "Premium T-Shirt",
    price: 29.99,
    stock: 12,
    vendor: "Fashion Styles Inc.",
    category: "Clothing",
    lastRestocked: "2023-10-05",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 89.99,
    stock: 5,
    vendor: "Tech Gadgets Ltd",
    category: "Electronics",
    lastRestocked: "2023-09-15",
  },
  {
    id: 3,
    name: "Kitchen Mixer",
    price: 199.99,
    stock: 3,
    vendor: "Home Essentials Co",
    category: "Kitchen",
    lastRestocked: "2023-08-20",
  },
  {
    id: 4,
    name: "Hiking Backpack",
    price: 79.99,
    stock: 8,
    vendor: "Outdoor Adventures",
    category: "Outdoor",
    lastRestocked: "2023-07-10",
  },
  {
    id: 5,
    name: "Face Cleanser",
    price: 24.99,
    stock: 2,
    vendor: "Beauty Supplies Plus",
    category: "Beauty",
    lastRestocked: "2023-11-01",
  },
  {
    id: 6,
    name: "Running Shoes",
    price: 119.99,
    stock: 15,
    vendor: "Outdoor Adventures",
    category: "Footwear",
    lastRestocked: "2023-10-25",
  },
  {
    id: 7,
    name: "Smartphone Case",
    price: 19.99,
    stock: 4,
    vendor: "Tech Gadgets Ltd",
    category: "Electronics",
    lastRestocked: "2023-09-28",
  },
  {
    id: 8,
    name: "Cutting Board",
    price: 34.99,
    stock: 9,
    vendor: "Home Essentials Co",
    category: "Kitchen",
    lastRestocked: "2023-10-18",
  },
  {
    id: 9,
    name: "Moisturizer",
    price: 18.99,
    stock: 1,
    vendor: "Beauty Supplies Plus",
    category: "Beauty",
    lastRestocked: "2023-09-05",
  },
  {
    id: 10,
    name: "Casual Jeans",
    price: 59.99,
    stock: 6,
    vendor: "Fashion Styles Inc.",
    category: "Clothing",
    lastRestocked: "2023-10-10",
  },
];

const StockMonitoring = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("low");
  const [vendorFilter, setVendorFilter] = useState("ALL");

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleNotifyVendor = (product: any) => {
    // In a real app, you would call your API/Redux action here
    console.log(`Notifying vendor about low stock for:`, product);
    alert(
      `Notification sent to ${product.vendor} about low stock for ${product.name}`
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.vendor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStock =
      (stockFilter === "low" && product.stock <= 5) ||
      (stockFilter === "medium" && product.stock > 5 && product.stock <= 15) ||
      (stockFilter === "high" && product.stock > 15) ||
      stockFilter === "all";

    const matchesVendor =
      vendorFilter === "ALL" || product.vendor === vendorFilter;

    return matchesSearch && matchesStock && matchesVendor;
  });

  // Get unique vendors for the filter dropdown
  const vendors = ["ALL", ...new Set(products.map((p) => p.vendor))];

  const columns = [
    {
      name: "Product Name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row: any) => row.price,
      format: (row: any) => `₦${row.price}`,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row: any) => row.stock,
      sortable: true,
      cell: (row: any) => (
        <span
          className={`font-semibold ${
            row.stock <= 5
              ? "text-negative"
              : row.stock <= 15
              ? "text-processing"
              : "text-positive"
          }`}
        >
          {row.stock}
        </span>
      ),
    },
    {
      name: "Status",
      selector: (row: any) => row.stock,
      sortable: false,
      cell: (row: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.stock <= 5
              ? "bg-red-100 text-red-600"
              : row.stock <= 15
              ? "bg-yellow-100 text-yellow-600"
              : "bg-positive text-white"
          }`}
        >
          {row.stock <= 5 ? "Critical" : row.stock <= 15 ? "Low" : "Good"}
        </span>
      ),
    },
    {
      name: "Vendor",
      selector: (row: any) => row.vendor,
      sortable: true,
    },
    {
      name: "Last Restocked",
      selector: (row: any) => row.lastRestocked,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <button
          onClick={() => handleNotifyVendor(row)}
          className={`px-3 py-1 text-xs rounded ${
            row.stock <= 5
              ? "bg-red-200 text-black hover:bg-negative hover:text-white"
              : "bg-yellow-100 text-black hover:bg-processing hover:text-white"
          }`}
          disabled={row.stock > 15}
        >
          Notify Vendor
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
          Stock Monitoring
        </h2>

        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="w-full md:w-40">
            <select
              className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
            >
              <option value="low">Critical Stock (≤ 5)</option>
              <option value="medium">Low Stock (≤ 15)</option>
              <option value="high">Good Stock (&gt; 15)</option>
              <option value="all">All Stock Levels</option>
            </select>
          </div>

          <div className="w-full md:w-40">
            <select
              className="w-full px-3 text-sm py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
              value={vendorFilter}
              onChange={(e) => setVendorFilter(e.target.value)}
            >
              {vendors.map((vendor) => (
                <option key={vendor} value={vendor}>
                  {vendor}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {filteredProducts.filter((p) => p.stock <= 5).length > 0 && (
        <div className="mb-6 bg-red-400 border-l-4 border-negative p-4 flex items-start">
          <AlertTriangle
            size={20}
            className="text-negative mr-2 flex-shrink-0 mt-0.5"
          />
          <div>
            <h3 className="font-semibold text-black">Critical Stock Alert</h3>
            <p className="text-sm text-greyColr">
              {filteredProducts.filter((p) => p.stock <= 5).length} products
              have critically low stock levels (5 or fewer items). Consider
              notifying vendors.
            </p>
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={filteredProducts}
        pagination
        customStyles={customStyles}
        highlightOnHover
        responsive
        sortIcon={<ChevronDown size={16} />}
        defaultSortFieldId="stock"
        defaultSortAsc={true}
      />

      {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-negative p-4 rounded-lg">
          <h3 className="font-semibold text-greyColr">Critical Stock</h3>
          <div className="text-2xl font-bold text-negative mt-2">
            {products.filter((p) => p.stock <= 5).length}
          </div>
          <p className="text-sm text-lightGreyColor mt-1">
            Products with 5 or fewer items
          </p>
        </div>

        <div className="bg-processing p-4 rounded-lg">
          <h3 className="font-semibold text-greyColr">Low Stock</h3>
          <div className="text-2xl font-bold text-processing mt-2">
            {products.filter((p) => p.stock > 5 && p.stock <= 15).length}
          </div>
          <p className="text-sm text-lightGreyColor mt-1">
            Products with 6-15 items
          </p>
        </div>

        <div className="bg-positive p-4 rounded-lg">
          <h3 className="font-semibold text-greyColr">Good Stock</h3>
          <div className="text-2xl font-bold text-positive mt-2">
            {products.filter((p) => p.stock > 15).length}
          </div>
          <p className="text-sm text-lightGreyColor mt-1">
            Products with more than 15 items
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default StockMonitoring;
