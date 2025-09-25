const ProductPageSkeleton = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-8">
        {/* Product Image */}
        <div className="flex-1">
          <div className="w-full h-96 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Product Info Skeleton */}
        <div className="flex-1">
          {/* Title */}
          <div className="h-8 bg-gray-200 rounded-md mb-4 animate-pulse w-3/4"></div>

          {/* Description */}
          <div className="h-4 bg-gray-200 rounded-md mb-6 animate-pulse w-5/6"></div>

          {/* Rating */}
          <div className="h-4 bg-gray-200 rounded-md mb-4 animate-pulse w-1/3"></div>

          {/* Price with Discount */}
          <div className="h-6 bg-gray-200 rounded-md mb-4 animate-pulse w-1/3"></div>

          {/* Color Options */}
          <div className="flex gap-2 mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          </div>

          {/* Size Options */}
          <div className="flex gap-2 mb-4">
            <div className="w-12 h-8 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="w-12 h-8 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="w-12 h-8 bg-gray-200 rounded-md animate-pulse"></div>
          </div>

          {/* Quantity Selector */}
          <div className="h-8 bg-gray-200 rounded-md mb-4 animate-pulse w-1/3"></div>

          {/* Buttons */}
          <div className="w-full h-12 bg-blue-200 rounded-md mb-4 animate-pulse"></div>
          <div className="w-1/3 h-12 bg-gray-200 rounded-md mb-4 animate-pulse"></div>

          {/* Wish List & Share */}
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
          </div>

          {/* Free Delivery Text */}
          <div className="h-6 bg-gray-200 rounded-md mt-6 animate-pulse w-2/3"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
