import React from "react";
import { HiOutlineHeart, HiOutlineShare } from "react-icons/hi";

interface ProductActionsProps {
  onAddToCart: () => void;
  onAddToWishlist: () => void;
  onShare?: () => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  onAddToCart,
  onAddToWishlist,
  onShare = () => {},
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Add to Cart */}
      <button
        onClick={onAddToCart}
        className="w-full bg-pryColor text-white py-3 rounded-lg hover:bg-pryColor/90 focus:outline-none focus:ring-2 focus:ring-pryColor-DEFAULT/50 transition-all duration-200 font-medium hover:shadow-md hover:translate-y-[-2px]"
      >
        + Add to Cart
      </button>

      {/* Wishlist and Share */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onAddToWishlist}
          className="flex justify-center items-center gap-2 cursor-pointer rounded-lg border border-black py-3 px-4 hover:border-transparent hover:bg-pryColor hover:text-white transition-all duration-200 flex-1 hover:shadow-md"
        >
          <span>WISH LIST</span>
          <HiOutlineHeart size={20} />
        </button>
        <button
          onClick={onShare}
          className="flex justify-center items-center gap-2 cursor-pointer rounded-lg border border-black py-3 px-4 hover:border-transparent hover:bg-pryColor hover:text-white transition-all duration-200 flex-1 hover:shadow-md"
        >
          <span>SHARE</span>
          <HiOutlineShare size={20} />
        </button>
      </div>

      <p className="text-center text-gray-600 text-xs md:text-sm mt-1">
        Free delivery on orders over #100,000.00
      </p>
    </div>
  );
};

export default ProductActions;
