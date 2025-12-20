import React, { useState } from "react";
import { Plus } from "lucide-react";
import {
  useGetAllPromotionsQuery,
  useCreatePromotionMutation,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
} from "../../../service/promotions";
import Spinner from "../../Spinner/Spinner";
import PromotionFilters from "./Promotions/PromotionFilters";
import PromotionCard from "./Promotions/PromotionCard";
import PromotionModal from "./Promotions/PromotionModal";
import { toast } from "react-toastify";

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

const PromotionalContent = () => {
  const {
    data: promotionsData,
    isLoading,
    refetch,
  } = useGetAllPromotionsQuery();
  const [createPromotion, { isLoading: isCreating }] =
    useCreatePromotionMutation();
  const [updatePromotion, { isLoading: isUpdating }] =
    useUpdatePromotionMutation();
  const [deletePromotion, { isLoading: isDeleting }] =
    useDeletePromotionMutation();

  const promotions = promotionsData?.data || [];

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );
  const [formData, setFormData] = useState({
    title: "",
    type: "banner",
    status: "DRAFT",
    description: "",
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
      status: "DRAFT",
      description: "",
      startDate: "",
      endDate: "",
      image: "",
      targetUrl: "",
      position: "homepage_top",
    });
    setShowModal(true);
  };

  const handleEditPromotion = (promotion: Promotion) => {
    setModalAction("edit");
    setSelectedPromotion(promotion);
    setFormData({
      title: promotion.title,
      type: promotion.type,
      status: promotion.status,
      description: promotion.description || "",
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      image: promotion.image,
      targetUrl: promotion.targetUrl,
      position: promotion.position,
    });
    setShowModal(true);
  };

  const handleDeletePromotion = (promotion: Promotion) => {
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

  const setImage = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      image: val,
    }));
  };

  const handleModalAction = async () => {
    let response;
    try {
      if (modalAction === "add") {
        response = await createPromotion(formData).unwrap();
        toast.success(response?.message);
      } else if (modalAction === "edit" && selectedPromotion) {
        response = await updatePromotion({
          id: selectedPromotion.id,
          body: formData,
        }).unwrap();
        toast.success(response?.message);
      } else if (modalAction === "delete" && selectedPromotion) {
        response = await deletePromotion(selectedPromotion.id).unwrap();
        toast.success(response?.message);
      }
      setShowModal(false);
      refetch();
    } catch (error) {
      console.error("Failed to execute action:", error);
    }
  };

  const filteredPromotions = promotions?.filter((promo: Promotion) => {
    const matchesStatus =
      statusFilter === "ALL" || promo.status === statusFilter;
    const matchesType = typeFilter === "ALL" || promo.type === typeFilter;

    return matchesStatus && matchesType;
  });

  if (isLoading) {
    return <Spinner />;
  }

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

      <PromotionFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      <div className="space-y-4">
        {filteredPromotions.map((promotion: Promotion) => (
          <PromotionCard
            key={promotion.id}
            promotion={promotion}
            onEdit={handleEditPromotion}
            onDelete={handleDeletePromotion}
          />
        ))}

        {filteredPromotions.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-lightGreyColor">
              No promotional content matches your filters.
            </p>
          </div>
        )}
      </div>

      <PromotionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        action={modalAction}
        selectedPromotion={selectedPromotion}
        formData={formData}
        handleFormChange={handleFormChange}
        setImage={setImage}
        onSubmit={handleModalAction}
        isLoading={isCreating || isUpdating || isDeleting}
      />
    </div>
  );
};

export default PromotionalContent;
