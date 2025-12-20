import React from "react";
import { Edit, Trash2, Image, Layout } from "lucide-react";

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

interface PromotionCardProps {
  promotion: Promotion;
  onEdit: (promotion: Promotion) => void;
  onDelete: (promotion: Promotion) => void;
}

const PromotionCard: React.FC<PromotionCardProps> = ({
  promotion,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
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
            <div>
              <h3 className="font-semibold text-greyColr">{promotion.title}</h3>
              {promotion.description && (
                <p className="text-sm text-lightGreyColor mt-1 line-clamp-2">
                  {promotion.description}
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(promotion)}
                className="p-1 rounded text-secColor hover:bg-secColor-Light"
                title="Edit Promotion"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDelete(promotion)}
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
                  {promotion.position?.replace("_", " ")}
                </span>
              </p>
            </div>

            <div>
              <p className="text-sm text-lightGreyColor">
                Status:
                <span
                  className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                    promotion.status === "ACTIVE"
                      ? "bg-positive text-white"
                      : promotion.status === "SCHEDULED"
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
                  {promotion.startDate?.slice(0, 10)} to{" "}
                  {promotion.endDate?.slice(0, 10)}
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
  );
};

export default PromotionCard;
