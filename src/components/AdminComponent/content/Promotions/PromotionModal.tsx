import React from "react";
import ImageUpload from "../../../Upload/ImageUpload";

interface Promotion {
  id: string | number;
  title: string;
  type: string;
  status: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
  targetUrl: string;
  position: string;
}

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: string;
  selectedPromotion: Promotion | null;
  formData: Omit<Promotion, "id">;
  handleFormChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  setImage: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PromotionModal: React.FC<PromotionModalProps> = ({
  isOpen,
  onClose,
  action,
  selectedPromotion,
  formData,
  handleFormChange,
  setImage,
  onSubmit,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4 text-greyColr">
          {action === "add"
            ? "Add Promotion"
            : action === "edit"
            ? "Edit Promotion"
            : "Delete Promotion"}
        </h3>

        {action !== "delete" ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-lightGreyColor mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                placeholder="Enter promotion title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-lightGreyColor mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                placeholder="Enter promotion description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-lightGreyColor mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                >
                  <option value="banner">Banner</option>
                  <option value="featured">Featured</option>
                  <option value="carousel">Carousel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-lightGreyColor mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-lightGreyColor mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-lightGreyColor mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                />
              </div>
            </div>

            <div>
              <ImageUpload
                setDocument={setImage}
                isBase64={true}
                title="Promotion Image"
                name="promotion-image"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-lightGreyColor mb-1">
                Target URL
              </label>
              <input
                type="text"
                name="targetUrl"
                value={formData.targetUrl}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                placeholder="Enter target URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-lightGreyColor mb-1">
                Position
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
              >
                <option value="homepage_top">Homepage Top</option>
                <option value="homepage_middle">Homepage Middle</option>
                <option value="homepage_bottom">Homepage Bottom</option>
                <option value="category_top">Category Top</option>
                <option value="sidebar">Sidebar</option>
              </select>
            </div>
          </div>
        ) : (
          <p className="mb-6 text-sm text-lightGreyColor">
            Are you sure you want to delete the promotion "
            {selectedPromotion?.title}"? This action cannot be undone.
          </p>
        )}

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-lightGreyColor hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className={`px-4 py-2 rounded-md text-white ${
              action === "delete"
                ? "bg-negative hover:bg-opacity-90"
                : "bg-pryColor hover:bg-opacity-90"
            }`}
            disabled={
              (action !== "delete" &&
                (!formData.title.trim() ||
                  !formData.image.trim() ||
                  !formData.targetUrl.trim())) ||
              isLoading
            }
          >
            {isLoading
              ? "Processing..."
              : action === "add"
              ? "Add Promotion"
              : action === "edit"
              ? "Save Changes"
              : "Delete Promotion"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;
