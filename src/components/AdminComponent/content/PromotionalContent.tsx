import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  // MoveUp,
  // MoveDown,
  Image,
  Layout,
} from "lucide-react";
import image1 from "../../../assets/home1.jpg";
import image2 from "../../../assets/home2.jpg";
import image3 from "../../../assets/home3.jpg";
// Sample data - in a real app, this would come from your Redux/API
const promotions = [
  {
    id: 1,
    title: "Summer Collection",
    type: "banner",
    status: "active",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    image: image1,
    targetUrl: "/category/summer",
    position: "homepage_top",
  },
  {
    id: 2,
    title: "Back to School Sale",
    type: "featured",
    status: "scheduled",
    startDate: "2023-08-15",
    endDate: "2023-09-15",
    image: image2,
    targetUrl: "/category/school",
    position: "homepage_middle",
  },

  {
    id: 3,
    title: "Holiday Promotions",
    type: "banner",
    status: "draft",
    startDate: "2023-11-15",
    endDate: "2023-12-25",
    image: image3,
    targetUrl: "/category/holiday",
    position: "homepage_bottom",
  },
];

const PromotionalContent = () => {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "banner",
    status: "draft",
    startDate: "",
    endDate: "",
    image: "",
    targetUrl: "",
    position: "homepage_top",
  });

  const handleAddPromotion = () => {
    setModalAction("add");
    setFormData({
      title: "",
      type: "banner",
      status: "draft",
      startDate: "",
      endDate: "",
      image: "",
      targetUrl: "",
      position: "homepage_top",
    });
    setShowModal(true);
  };

  const handleEditPromotion = (promotion: any) => {
    setModalAction("edit");
    setSelectedPromotion(promotion);
    setFormData({
      title: promotion.title,
      type: promotion.type,
      status: promotion.status,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      image: promotion.image,
      targetUrl: promotion.targetUrl,
      position: promotion.position,
    });
    setShowModal(true);
  };

  const handleDeletePromotion = (promotion: any) => {
    setModalAction("delete");
    setSelectedPromotion(promotion);
    setShowModal(true);
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleModalAction = () => {
    // In a real app, you would call your API/Redux action here
    console.log(
      `${
        modalAction === "add"
          ? "Adding"
          : modalAction === "edit"
          ? "Editing"
          : "Deleting"
      } promotion`
    );
    console.log("Promotion:", selectedPromotion);
    console.log("Form Data:", formData);

    setShowModal(false);
  };

  // const handleMovePromotion = (promotion: any, direction: "up" | "down") => {
  //   // In a real app, you would call your API/Redux action here
  //   console.log(`Moving promotion ${promotion.id} ${direction}`);
  // };

  const filteredPromotions = promotions.filter((promo) => {
    const matchesStatus =
      statusFilter === "ALL" || promo.status === statusFilter;
    const matchesType = typeFilter === "ALL" || promo.type === typeFilter;

    return matchesStatus && matchesType;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-default">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-greyColr">
          Promotional Content
        </h2>
        <button
          onClick={handleAddPromotion}
          className="px-4 py-2 bg-pryColor text-white rounded-md flex items-center hover:bg-opacity-90"
        >
          <Plus size={16} className="mr-2" />
          <span>Add Promotion</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <div className="w-full md:w-48">
          <label className="block text-sm font-medium text-lightGreyColor mb-1">
            Filter by Status
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="active">Active</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="w-full md:w-48">
          <label className="block text-sm font-medium text-lightGreyColor mb-1">
            Filter by Type
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">All Types</option>
            <option value="banner">Banner</option>
            <option value="featured">Featured</option>
            <option value="carousel">Carousel</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredPromotions.map((promotion) => (
          <div
            key={promotion.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 p-4 bg-gray-50 flex items-center justify-center">
                <img
                  src={promotion.image}
                  alt={promotion.title}
                  className="max-h-32 object-cover rounded"
                />
              </div>

              <div className="md:w-3/4 p-4">
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold text-greyColr">
                    {promotion.title}
                  </h3>
                  <div className="flex space-x-2">
                    {/* <button
                      onClick={() => handleMovePromotion(promotion, "up")}
                      className="p-1 rounded text-pryColor hover:bg-pryColor-Light"
                      title="Move Up"
                    >
                      <MoveUp size={16} />
                    </button>
                    <button
                      onClick={() => handleMovePromotion(promotion, "down")}
                      className="p-1 rounded text-pryColor hover:bg-pryColor-Light"
                      title="Move Down"
                    >
                      <MoveDown size={16} />
                    </button> */}
                    <button
                      onClick={() => handleEditPromotion(promotion)}
                      className="p-1 rounded text-secColor hover:bg-secColor-Light"
                      title="Edit Promotion"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeletePromotion(promotion)}
                      className="p-1 rounded text-negative hover:bg-negative-Light"
                      title="Delete Promotion"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-lightGreyColor flex items-center">
                      <span className="inline-flex mr-2">
                        <Layout size={14} />
                      </span>
                      Type:{" "}
                      <span className="ml-1 text-greyColr capitalize">
                        {promotion.type}
                      </span>
                    </p>
                    <p className="text-sm text-lightGreyColor flex items-center mt-1">
                      <span className="inline-flex mr-2">
                        <Image size={14} />
                      </span>
                      Position:{" "}
                      <span className="ml-1 text-greyColr">
                        {promotion.position.replace("_", " ")}
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-lightGreyColor">
                      Status:
                      <span
                        className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                          promotion.status === "active"
                            ? "bg-positive text-white"
                            : promotion.status === "scheduled"
                            ? "bg-processing text-white"
                            : "bg-gray-300 text-gray-700"
                        }`}
                      >
                        {promotion.status}
                      </span>
                    </p>
                    <p className="text-sm text-lightGreyColor mt-1">
                      Active:{" "}
                      <span className="text-greyColr">
                        {promotion.startDate} to {promotion.endDate}
                      </span>
                    </p>
                  </div>
                </div>

                <p className="text-sm text-lightGreyColor mt-2">
                  Target URL:{" "}
                  <a
                    href={promotion.targetUrl}
                    className="text-pryColor hover:underline"
                  >
                    {promotion.targetUrl}
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))}

        {filteredPromotions.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-lightGreyColor">
              No promotional content matches your filters.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-greyColr">
              {modalAction === "add"
                ? "Add Promotion"
                : modalAction === "edit"
                ? "Edit Promotion"
                : "Delete Promotion"}
            </h3>

            {modalAction !== "delete" ? (
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
                      <option value="draft">Draft</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="active">Active</option>
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
                  <label className="block text-sm font-medium text-lightGreyColor mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                    placeholder="Enter image URL"
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
                {selectedPromotion.title}"? This action cannot be undone.
              </p>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-lightGreyColor hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleModalAction}
                className={`px-4 py-2 rounded-md text-white ${
                  modalAction === "delete"
                    ? "bg-negative hover:bg-opacity-90"
                    : "bg-pryColor hover:bg-opacity-90"
                }`}
                disabled={
                  modalAction !== "delete" &&
                  (!formData.title.trim() ||
                    !formData.image.trim() ||
                    !formData.targetUrl.trim())
                }
              >
                {modalAction === "add"
                  ? "Add Promotion"
                  : modalAction === "edit"
                  ? "Save Changes"
                  : "Delete Promotion"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionalContent;
