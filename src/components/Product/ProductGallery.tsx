import React from "react";

interface ProductGalleryProps {
  mainImage: string;
  defaultImage: string;
  thumbnails: string[];
  productName: string;
  onImageChange: (image: string) => void;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  mainImage,
  defaultImage,
  thumbnails,
  productName,
  onImageChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnail Images - Vertical on mobile, horizontal on larger screens */}
      <div className="flex md:flex-col gap-2 md:gap-4 order-2 md:order-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
        {thumbnails?.slice(0, 4)?.map((thumbnail, index) => (
          <div
            key={index}
            className={`min-w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
              mainImage === thumbnail ? "ring-2 ring-pryColor shadow-md" : ""
            }`}
            onClick={() => onImageChange(thumbnail)}
          >
            <img
              src={thumbnail}
              alt={`${productName} thumbnail ${index + 1}`}
              className="w-full h-full object-cover rounded-lg md:rounded-xl shadow-default"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 aspect-square md:aspect-auto order-1 md:order-2 group">
        <img
          src={mainImage === "" ? defaultImage : mainImage}
          alt={productName}
          className="w-full h-auto max-h-[500px] object-contain rounded-lg md:rounded-xl shadow-default transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
