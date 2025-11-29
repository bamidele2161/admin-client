import { useState } from "react";
import DataTable from "react-data-table-component";
import { Check, X, Eye, AlertCircle, ChevronDown } from "lucide-react";
import {
  useGetAllProductCategoryQuery,
  useUpdateProductTagsMutation,
} from "../../../service/product";
import { useGetAllProductsQuery } from "../../../service/admin";
import { toast } from "react-toastify";
import { useUpdateProductMutation } from "../../../service/admin";
import ProductModerationModal from "./ProductModerationModal";

function ProductModeration() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { data, refetch } = useGetAllProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const { data: categories } = useGetAllProductCategoryQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [updateVendor, { isLoading }] = useUpdateProductMutation();
  const [updateProductTags, { isLoading: isUpdatingTags }] =
    useUpdateProductTagsMutation();

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleAction = (product: any, action: string) => {
    setSelectedProduct(product);
    setModalAction(action);
    if (action === "reject") {
      setRejectionReason("");
    }
    if (action === "view") {
      const incomingTags = Array.isArray(product?.tags) ? product.tags : [];
      setSelectedTags(incomingTags);
    }
    setShowModal(true);
  };

  const toggleTag = (value: string) => {
    setSelectedTags((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleUpdateTags = async () => {
    if (!selectedProduct?.id) return;
    try {
      const response = await updateProductTags({
        productId: selectedProduct.id,
        body: { tags: selectedTags },
      });
      toast.success(response?.data?.message || "Tags updated successfully");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update tags");
    }
  };
  const handleModalAction = async () => {
    try {
      let response;

      if (modalAction === "approve") {
        console.log(`Approving product:`, selectedProduct);
        response = await updateVendor({
          id: selectedProduct.id,
          body: { status: "Approved" },
        }).unwrap();
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
        }).unwrap();
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

  const getPendingProducts = data?.data?.filter(
    (product: any) => product.status === "Active"
  );

  console.log(selectedProduct);
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
        <ProductModerationModal
          selectedProduct={selectedProduct}
          modalAction={modalAction as "view" | "approve" | "reject"}
          rejectionReason={rejectionReason}
          onRejectionReasonChange={setRejectionReason}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
          onUpdateTags={handleUpdateTags}
          isUpdatingTags={isUpdatingTags}
          onClose={() => setShowModal(false)}
          onPrimaryAction={handleModalAction}
          isPrimaryLoading={isLoading}
        />
      )}
    </div>
  );
}

export default ProductModeration;
