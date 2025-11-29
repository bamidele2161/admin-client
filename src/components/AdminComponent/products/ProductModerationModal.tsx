import Spinner from "../../Spinner/Spinner";

type ModalAction = "view" | "approve" | "reject";

interface ProductModerationModalProps {
  selectedProduct: any;
  modalAction: ModalAction;
  rejectionReason: string;
  onRejectionReasonChange: (value: string) => void;
  selectedTags: string[];
  onToggleTag: (value: string) => void;
  onUpdateTags: () => void;
  isUpdatingTags: boolean;
  onClose: () => void;
  onPrimaryAction: () => void;
  isPrimaryLoading: boolean;
}

const ProductModerationModal = ({
  selectedProduct,
  modalAction,
  rejectionReason,
  onRejectionReasonChange,
  selectedTags,
  onToggleTag,
  onUpdateTags,
  isUpdatingTags,
  onClose,
  onPrimaryAction,
  isPrimaryLoading,
}: ProductModerationModalProps) => {
  const inspirationTagOptions = [
    { id: 1, value: "wizkid", name: "Inspired By Wizkid" },
    { id: 2, value: "davido", name: "Inspired By Davido" },
    { id: 3, value: "ayra-star", name: "Inspired By Ayra Star" },
    { id: 4, value: "burna", name: "Inspired By Burna" },
    { id: 5, value: "rema", name: "Inspired By Rema" },
  ];

  return (
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
              src={selectedProduct?.thumbnails?.[0]}
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
                    px-3 py-1 rounded-full text-xs font-semibold
                    ${selectedProduct?.status === "Active" ? "w-32" : "w-20"} 
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
                {selectedProduct?.createdAt?.slice(0, 10)}
              </p>
            </div>
          </div>

          {modalAction === "view" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-lightGreyColor mb-2">
                Inspired By
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {inspirationTagOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={selectedTags.includes(opt.value)}
                      onChange={() => onToggleTag(opt.value)}
                    />
                    <span>{opt.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
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
              onChange={(e) => onRejectionReasonChange(e.target.value)}
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
          {modalAction === "view" && (
            <button
              onClick={onUpdateTags}
              className="px-4 py-2 rounded-md text-sm text-white bg-positive hover:bg-opacity-90"
              disabled={isUpdatingTags}
            >
              {isUpdatingTags ? <Spinner /> : "Update Tags"}
            </button>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 border text-sm border-gray-300 rounded-md text-lightGreyColor hover:bg-gray-100"
          >
            {modalAction === "view" ? "Close" : "Cancel"}
          </button>

          {modalAction !== "view" && (
            <button
              onClick={onPrimaryAction}
              className={`px-4 py-2 rounded-md text-sm text-white ${
                modalAction === "approve"
                  ? "bg-positive hover:bg-opacity-90"
                  : "bg-negative hover:bg-opacity-90"
              }`}
            >
              {isPrimaryLoading ? (
                <Spinner />
              ) : modalAction === "approve" ? (
                "Approve Product"
              ) : (
                "Reject Product"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModerationModal;
