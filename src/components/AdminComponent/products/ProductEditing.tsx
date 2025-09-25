import { useState } from "react";
import DataTable from "react-data-table-component";
import { Edit, Trash2, Check, X, ChevronDown } from "lucide-react";

// Sample data - in a real app, this would come from your Redux/API
const products = [
  {
    id: 1,
    name: "Premium T-Shirt",
    price: 29.99,
    stock: 120,
    vendor: "Fashion Styles Inc.",
    category: "Clothing",
    rating: 4.5,
    approved: true,
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 89.99,
    stock: 45,
    vendor: "Tech Gadgets Ltd",
    category: "Electronics",
    rating: 4.2,
    approved: true,
  },
  {
    id: 3,
    name: "Kitchen Mixer",
    price: 199.99,
    stock: 30,
    vendor: "Home Essentials Co",
    category: "Kitchen",
    rating: 4.7,
    approved: false,
  },
  {
    id: 4,
    name: "Hiking Backpack",
    price: 79.99,
    stock: 65,
    vendor: "Outdoor Adventures",
    category: "Outdoor",
    rating: 4.8,
    approved: true,
  },
  {
    id: 5,
    name: "Face Cleanser",
    price: 24.99,
    stock: 80,
    vendor: "Beauty Supplies Plus",
    category: "Beauty",
    rating: 3.9,
    approved: true,
  },
];

const ProductEditing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [approvalFilter, setApprovalFilter] = useState("ALL");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleAction = (product: any, action: any) => {
    setSelectedProduct(product);
    setModalAction(action);

    if (action === "edit") {
      setEditForm({
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: "Product description goes here...", // Assuming we'd have this in real data
      });
    }

    setShowModal(true);
  };

  const handleEditChange = (e: any) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleModalAction = () => {
    // In a real app, you would call your API/Redux action here
    if (modalAction === "edit") {
      console.log(`Editing product:`, selectedProduct, "New data:", editForm);
    } else if (modalAction === "delete") {
      console.log(`Deleting product:`, selectedProduct);
    } else if (modalAction === "approve") {
      console.log(`Approving product:`, selectedProduct);
    } else if (modalAction === "reject") {
      console.log(`Rejecting product:`, selectedProduct);
    }
    setShowModal(false);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.vendor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "ALL" || product.category === categoryFilter;

    const matchesApproval =
      approvalFilter === "ALL" ||
      (approvalFilter === "APPROVED" && product.approved) ||
      (approvalFilter === "PENDING" && !product.approved);

    return matchesSearch && matchesCategory && matchesApproval;
  });

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
        <span className={row.stock < 50 ? "text-negative" : "text-positive"}>
          {row.stock}
        </span>
      ),
    },
    {
      name: "Vendor",
      selector: (row: any) => row.vendor,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row: any) => row.category,
      sortable: true,
    },
    {
      name: "Rating",
      selector: (row: any) => row.rating,
      sortable: true,
      cell: (row: any) => (
        <div className="flex items-center">
          <span
            className={`mr-2 ${
              row.rating >= 4.5
                ? "text-positive"
                : row.rating >= 4.0
                ? "text-processing"
                : "text-negative"
            }`}
          >
            {row.rating}
          </span>
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row: any) => row.approved,
      sortable: true,
      cell: (row: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.approved ? "bg-positive text-white" : "bg-processing text-white"
          }`}
        >
          {row.approved ? "Approved" : "Pending"}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleAction(row, "edit")}
            className="p-1 rounded text-pryColor hover:bg-pryColor"
            title="Edit Product"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleAction(row, "delete")}
            className="p-1 rounded text-negative hover:bg-negative"
            title="Delete Product"
          >
            <Trash2 size={16} />
          </button>
          {!row.approved && (
            <>
              <button
                onClick={() => handleAction(row, "approve")}
                className="p-1 rounded text-positive hover:bg-positive"
                title="Approve Product"
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => handleAction(row, "reject")}
                className="p-1 rounded text-negative hover:bg-negative"
                title="Reject Product"
              >
                <X size={16} />
              </button>
            </>
          )}
        </div>
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
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-greyColr mb-4 md:mb-0">
          Product Management
        </h2>

        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="w-full md:w-40">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="ALL">All Categories</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Beauty">Beauty</option>
            </select>
          </div>

          <div className="w-full md:w-40">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
              value={approvalFilter}
              onChange={(e) => setApprovalFilter(e.target.value)}
            >
              <option value="ALL">All Status</option>
              <option value="APPROVED">Approved</option>
              <option value="PENDING">Pending</option>
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

      <DataTable
        columns={columns}
        data={filteredProducts}
        pagination
        customStyles={customStyles}
        highlightOnHover
        responsive
        sortIcon={<ChevronDown size={16} />}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-greyColr">
              {modalAction === "edit"
                ? "Edit Product"
                : modalAction === "delete"
                ? "Delete Product"
                : modalAction === "approve"
                ? "Approve Product"
                : "Reject Product"}
            </h3>

            {modalAction === "edit" ? (
              <div className="mb-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-lightGreyColor mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-lightGreyColor mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={editForm.price}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-lightGreyColor mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={editForm.stock}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-lightGreyColor mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                  />
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <p className="mb-2">
                  <span className="font-semibold">Product:</span>{" "}
                  {selectedProduct.name}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Price:</span> $
                  {selectedProduct.price}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Vendor:</span>{" "}
                  {selectedProduct.vendor}
                </p>
              </div>
            )}

            <p className="mb-6 text-sm text-lightGreyColor">
              {modalAction === "edit"
                ? "Update the product details."
                : modalAction === "delete"
                ? "Are you sure you want to delete this product? This action cannot be undone."
                : modalAction === "approve"
                ? "Approve this product to make it visible to customers."
                : "Reject this product. It will not be visible to customers."}
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-lightGreyColor hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleModalAction}
                className={`px-4 py-2 rounded-md text-white ${
                  modalAction === "delete" || modalAction === "reject"
                    ? "bg-negative hover:bg-opacity-90"
                    : "bg-pryColor hover:bg-opacity-90"
                }`}
              >
                {modalAction === "edit"
                  ? "Save Changes"
                  : modalAction === "delete"
                  ? "Delete Product"
                  : modalAction === "approve"
                  ? "Approve Product"
                  : "Reject Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductEditing;
