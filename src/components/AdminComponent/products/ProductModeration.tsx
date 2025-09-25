import { useState } from "react";
import DataTable from "react-data-table-component";
import { Check, X, Eye, AlertCircle, ChevronDown } from "lucide-react";
import { useGetAllProductCategoryQuery } from "../../../service/product";
import { useGetAllProductsQuery } from "../../../service/admin";
import { toast } from "react-toastify";
import { useUpdateProductMutation } from "../../../service/admin";
import Spinner from "../../Spinner/Spinner";

const ProductModeration = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const { data, refetch } = useGetAllProductsQuery();
  const { data: categories } = useGetAllProductCategoryQuery();
  const [updateVendor, { isLoading }] = useUpdateProductMutation();
  console.log(data);
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  // const handleView = (product: any) => {
  //   setSelectedProduct(product);
  //   setModalAction("view");
  //   setShowModal(true);
  // };

  const handleAction = (product: any, action: string) => {
    setSelectedProduct(product);
    setModalAction(action);
    if (action === "reject") {
      setRejectionReason("");
    }
    setShowModal(true);
  };

  const handleModalAction = async () => {
    try {
      let response;
      // In a real app, you would call your API/Redux action here
      if (modalAction === "approve") {
        console.log(`Approving product:`, selectedProduct);
        response = await updateVendor({
          id: selectedProduct.id,
          body: { status: "Approved" },
        });
        toast.success(response?.data?.message);
        refetch();
      } else if (modalAction === "reject") {
        console.log(
          `Rejecting product:`,
          selectedProduct,
          "Reason:",
          rejectionReason
        );

        response = await updateVendor({
          id: selectedProduct.id,
          body: { status: "Rejected" },
        });
        toast.success(response?.data?.message);
        refetch();
      }

      setShowModal(false);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const filteredProducts = data?.data?.filter((product: any) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.vendorBusinessName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "ALL" ||
      product.subCategoryItemName === categoryFilter;

    return matchesSearch && matchesCategory;
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
      name: "Vendor",
      selector: (row: any) => row.vendorBusinessName,
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
            onClick={() => handleAction(row, "view")}
            className="p-1 rounded text-pryColor hover:bg-white"
          >
            <Eye size={16} />
          </button>
          {row?.status !== "Approved" && (
            <button
              onClick={() => handleAction(row, "approve")}
              className="p-1 rounded text-positive hover:bg-green-300"
            >
              <Check size={16} />
            </button>
          )}

          {row?.status !== "Rejected" && (
            <button
              onClick={() => handleAction(row, "reject")}
              className="p-1 rounded text-negative hover:bg-red-300"
            >
              <X size={16} />
            </button>
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

  const subcategoryItems = categories?.data
    .flatMap((category: any) => category.subCategories)
    .flatMap((subCategory: any) => subCategory.items)
    .map((item: any) => ({ id: item.id, name: item.name }));

  // const handleApprove = (product: { id: number; name: string }) => {
  //   setSelectedProduct(product);
  //   // setShowApproveModal(true);
  // };

  // const handleReject = (product: { id: number; name: string }) => {
  //   setSelectedProduct(product);
  //   // setRejectReason('');
  //   // setShowRejectModal(true);
  // };
  const getPendingProducts = data?.data?.filter(
    (product: any) => product.status === "Active"
  );
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-greyColr mb-4 md:mb-0">
          Product Moderation
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

      <div className="mb-6 bg-processing-Light border-l-4 border-processing p-4 flex items-start">
        <AlertCircle
          size={20}
          className="text-processing mr-2 flex-shrink-0 mt-0.5"
        />
        <div>
          <h3 className="font-semibold text-greyColr">Pending Approval</h3>
          <p className="text-sm text-lightGreyColor">
            There are {getPendingProducts?.length} product(s) waiting for your
            review. Products must be approved before they appear to customers.
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredProducts}
        pagination
        customStyles={customStyles}
        highlightOnHover
        responsive
        selectableRows
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
                  <p className="mb-2 text-sm">
                    <span className="font-semibold">Product:</span>{" "}
                    {selectedProduct?.name}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm">
                    <span className="font-semibold">Price:</span>{" "}
                    {selectedProduct?.price}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm">
                    <span className="font-semibold">Category:</span>{" "}
                    {selectedProduct?.subCategoryItemName}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm">
                    <span className="font-semibold">Stock:</span>{" "}
                    {selectedProduct?.stock}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="mb-2 text-sm">
                    <span className="font-semibold">Description:</span>{" "}
                    {selectedProduct?.description}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm">
                    <span className="font-semibold">Views:</span>{" "}
                    {selectedProduct?.views}
                  </p>
                </div>
                <div>
                  <p className="mb-2 flex gap-2 text-sm">
                    <span className="font-semibold">Status:</span>{" "}
                    <p
                      className={`
                              px-3 py-1 rounded-full text-xs font-semibold        ${
                                selectedProduct?.status === "Active"
                                  ? "w-32"
                                  : "w-20"
                              } 
                              ${
                                selectedProduct?.status === "Approved"
                                  ? "bg-green-100 text-green-700"
                                  : selectedProduct?.status === "Active"
                                  ? "bg-yellow-100 text-yellow-600"
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
                  <p className="mb-2 text-sm">
                    <span className="font-semibold">Material:</span>{" "}
                    {selectedProduct?.material}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm">
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
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border text-sm border-gray-300 rounded-md text-lightGreyColor hover:bg-gray-100"
              >
                {modalAction === "view" ? "Close" : "Cancel"}
              </button>
              {modalAction !== "view" && (
                <button
                  onClick={handleModalAction}
                  className={`px-4 py-2 rounded-md text-sm text-white ${
                    modalAction === "approve"
                      ? "bg-positive hover:bg-opacity-90"
                      : "bg-negative hover:bg-opacity-90"
                  }`}
                  disabled={modalAction === "reject" && !rejectionReason.trim()}
                >
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      {modalAction === "approve"
                        ? "Approve Product"
                        : "Reject Product"}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductModeration;
