import Spinner from "../../Spinner/Spinner";
import { AdminModal, DetailGrid, StatusBadge } from "../AdminUI";

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
  onChooseAction: (action: ModalAction) => void;
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
  onChooseAction,
}: ProductModerationModalProps) => {
  const inspirationTagOptions = [
    { id: 1, value: "wizkid", name: "Inspired By Wizkid" },
    { id: 2, value: "davido", name: "Inspired By Davido" },
    { id: 3, value: "ayra-star", name: "Inspired By Ayra Star" },
    { id: 4, value: "burna", name: "Inspired By Burna" },
    { id: 5, value: "rema", name: "Inspired By Rema" },
  ];

  return (
    <AdminModal onClose={onClose} title={modalAction === "view" ? "Product review" : modalAction === "approve" ? "Approve product" : "Reject product"}>

        <div className="mb-4">
          <div className="flex justify-center items-center w-full mb-4">
            <img
              src={selectedProduct?.thumbnails?.[0]}
              alt="Product Image"
              className="w-32 h-32 object-cover rounded"
            />
          </div>

          <DetailGrid items={[{label:"Product",value:selectedProduct?.name},{label:"Price",value:`₦${Number(selectedProduct?.price || 0).toLocaleString()}`},{label:"Category",value:selectedProduct?.subCategoryItemName},{label:"Stock",value:selectedProduct?.stock},{label:"Status",value:<StatusBadge value={selectedProduct?.status === "Active" ? "Pending" : selectedProduct?.status}/>},{label:"Material",value:selectedProduct?.material},{label:"Submitted",value:selectedProduct?.createdAt?.slice(0,10)},{label:"Views",value:selectedProduct?.views}]} />
          <p className="mt-4 rounded-2xl bg-[#EEF1F3] p-4 text-sm leading-6 text-[#566170]">{selectedProduct?.description || "No description provided."}</p>

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
          {modalAction === "view" && <div className="mt-6 flex flex-wrap gap-2 border-t border-black/10 pt-5">{selectedProduct?.status !== "Approved" && <button onClick={() => onChooseAction("approve")} className="rounded-full bg-pryColor px-5 py-2.5 text-sm font-semibold text-white">Approve product</button>}{selectedProduct?.status !== "Rejected" && <button onClick={() => onChooseAction("reject")} className="rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-700">Reject product</button>}</div>}
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
    </AdminModal>
  );
};

export default ProductModerationModal;
