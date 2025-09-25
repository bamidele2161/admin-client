import { EyeIcon } from "lucide-react";
import React from "react";

interface ProductInfoProps {
  name: string;
  description: string;
  material: string;
  rating: number;
  reviews: number;
  price: number;
  views: number;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  description,
  material,
  rating,
  reviews,
  price,
  views,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 tracking-tight">
        {name}
      </h2>

      <p className="text-gray-600 text-base md:text-md">{description}</p>

      <p className="text-pryColor text-sm md:text-base">
        A quality {material} material
      </p>

      {/* Ratings */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <div className="flex text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={i < rating ? "text-yellow-500" : "text-gray-300"}
            >
              &#9733;
            </span>
          ))}
        </div>
        <span className="text-gray-600 text-xs md:text-sm">
          ({reviews} reviews)
        </span>
        <span className="text-gray-600 text-xs md:text-sm">(42 Sold)</span>
      </div>

      {/* Price */}
      <div>
        <span className="text-sm font-medium text-gray-600">Price</span>
        <div className="flex gap-2 items-center">
          <p className="text-xl md:text-2xl font-semibold text-gray-800">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(price)}
          </p>
          <span className="text-muted-foreground line-through text-sm text-lightGreyColor">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(price * 1.2)}
          </span>
          <span className="ml-2 text-xs px-2 py-1 bg-secColor text-white rounded-full">
            Save 20%
          </span>
        </div>

        <div className="flex my-4 text-lightGreyColor items-center gap-2">
          <EyeIcon size={18} />
          <p className="text-sm ">{views} people viewed</p>{" "}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
