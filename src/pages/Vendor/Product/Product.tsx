import { useState } from "react";

import Navbar from "../../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
  useArchiveProductMutation,
  useGetAllProductCategoryQuery,
  useGetAllVendorProductsQuery,
} from "../../../service/product";

import { ChevronDown, Edit, Eye, X } from "lucide-react";
import { useAppSelector } from "../../../hooks";
import { selectAuth } from "../../../store/slice/authSlice";
import { toast } from "react-toastify";

const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const { userInfo } = useAppSelector(selectAuth);
  const [archive] = useArchiveProductMutation();
  const { data } = useGetAllVendorProductsQuery(userInfo?.Vendor?.id);
  const { data: categories } = useGetAllProductCategoryQuery();
  const navigate = useNavigate();
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleView = (product: any) => {
    setSelectedProduct(product);
    setModalAction("view");
    setShowModal(true);
  };

  const handleModalAction = () => {
    // In a real app, you would call your API/Redux action here
    if (modalAction === "approve") {
      console.log(`Approving product:`, selectedProduct);
    } else if (modalAction === "reject") {
      console.log(
        `Rejecting product:`,
        selectedProduct,
        "Reason:",
        rejectionReason
      );
    }
    setShowModal(false);
  };

  const filteredProducts = data?.data?.filter((product: any) => {
    const matchesSearch = product?.name
      ?.toLowerCase()
      ?.includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "ALL" ||
      product?.subCategoryItemName === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (row: any) => {
    try {
      const response = await archive({
        id: row.id,
        vendorId: row.vendorId,
      }).unwrap();

      toast.success(response?.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };
  const columns = [
    {
      name: "Image",
      selector: (row: any) => row.thumbnails[0],
      cell: (row: any) => (
        <img
          src={row.thumbnails[0]}
          alt="Product Image"
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
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
      name: "Category",
      selector: (row: any) => row.subCategoryItemName,
      sortable: true,
    },
    {
      name: "Submitted",
      selector: (row: any) => row.createdAt.slice(0, 10),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex justify-center items-center">
          <button
            onClick={() => handleView(row)}
            className="p-1 rounded text-pryColor hover:bg-white"
          >
            <Eye size={16} />
          </button>

          <button
            onClick={() =>
              navigate("/product-management/edit-product", {
                state: { product: row },
              })
            }
            className="p-1 rounded text-positive hover:bg-green-300"
          >
            <Edit size={16} />
          </button>

          <button
            onClick={() => handleDelete(row)}
            className="p-1 rounded text-negative hover:bg-red-300"
          >
            <X size={16} />
          </button>
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

  const subcategoryItems = categories?.data
    .flatMap((category: any) => category.subCategories)
    .flatMap((subCategory: any) => subCategory.items)
    .map((item: any) => ({ id: item.id, name: item.name }));
  console.log(selectedProduct);
  return (
    <div className="">
      <Navbar title="Product Management" subtitle="Manage your products here" />
      <div className="flex flex-col w-full">
        <div className="flex justify-end px-10">
          <button
            className=" px-4 bg-pryColor text-white py-3 mt-4 rounded-lg hover:bg-pryColor"
            onClick={() => navigate("/product-management/add-product")}
          >
            + Add Product
          </button>
        </div>

        <div className="flex p-10">
          <div className="bg-white p-6 rounded-lg shadow w-full">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-greyColr mb-4 md:mb-0">
                Products
              </h2>

              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                <div className="w-full md:w-48">
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="ALL">All Categories</option>
                    {subcategoryItems?.map((item: any) => (
                      <option value={item.name}>{item.name}</option>
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
                <div className="bg-white p-6 rounded-lg w-[700px]">
                  <h3 className="text-lg font-semibold mb-4 text-greyColr">
                    {modalAction === "view"
                      ? "Product Details"
                      : modalAction === "approve"
                      ? "Approve Product"
                      : "Reject Product"}
                  </h3>

                  <div className="mb-4">
                    <div className="flex justify-center items-center w-full mb-4">
                      <img
                        src={selectedProduct?.thumbnails[0]}
                        alt="Product Image"
                        className="w-32 h-32 object-cover rounded"
                      />
                    </div>

                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="mb-2">
                          <span className="font-semibold">Product:</span>{" "}
                          {selectedProduct?.name}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2">
                          <span className="font-semibold">Price:</span>{" "}
                          {selectedProduct?.price}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2">
                          <span className="font-semibold">Category:</span>{" "}
                          {selectedProduct?.subCategoryItemName}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2">
                          <span className="font-semibold">Stock:</span>{" "}
                          {selectedProduct?.stock}
                        </p>
                      </div>

                      <div className="md:col-span-2">
                        <p className="mb-2">
                          <span className="font-semibold">Description:</span>{" "}
                          {selectedProduct?.description}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2">
                          <span className="font-semibold">Views:</span>{" "}
                          {selectedProduct?.views}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2 flex gap-2">
                          <span className="font-semibold">Status:</span>{" "}
                          <p
                            className={`
                              px-3 py-1 rounded-full text-xs font-semibold w-20
                              ${
                                selectedProduct?.status === "Active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-orange-100 text-orange-700"
                              }
                            `}
                          >
                            {selectedProduct?.status === "Active"
                              ? "Pending Approval"
                              : selectedProduct?.status}
                          </p>
                        </p>
                      </div>
                      <div>
                        <p className="mb-2">
                          <span className="font-semibold">Material:</span>{" "}
                          {selectedProduct?.material}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2">
                          <span className="font-semibold">Submitted On:</span>{" "}
                          {selectedProduct?.createdAt.slice(0, 10)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {modalAction === "reject" && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-lightGreyColor mb-1">
                        Rejection Reason
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                        rows={3}
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Please provide a reason for rejection..."
                      />
                    </div>
                  )}

                  {modalAction !== "view" && (
                    <p className="mb-6 text-sm text-lightGreyColor">
                      {modalAction === "approve"
                        ? "Approving this product will make it visible to customers on the marketplace."
                        : "The rejection reason will be sent to the vendor via email."}
                    </p>
                  )}

                  <div className="flex justify-end space-x-3">
                    {/* {selectedProduct?.status !== "Approved" && ( */}
                    <button
                      onClick={() =>
                        navigate("/product-management/edit-product", {
                          state: { product: selectedProduct },
                        })
                      }
                      className="px-4 py-2 border rounded-md text-white hover:bg-secColor bg-pryColor"
                    >
                      {modalAction === "view" ? "Edit" : "Cancel"}
                    </button>
                    {/* )} */}
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-lightGreyColor hover:bg-gray-100"
                    >
                      {modalAction === "view" ? "Close" : "Cancel"}
                    </button>
                    {modalAction !== "view" && (
                      <button
                        onClick={handleModalAction}
                        className={`px-4 py-2 rounded-md text-white ${
                          modalAction === "approve"
                            ? "bg-positive hover:bg-opacity-90"
                            : "bg-negative hover:bg-opacity-90"
                        }`}
                        disabled={
                          modalAction === "reject" && !rejectionReason.trim()
                        }
                      >
                        {modalAction === "approve"
                          ? "Approve Product"
                          : "Reject Product"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
