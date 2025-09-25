const ProductCardSkeleton = () => {
  return (
    <div className="border rounded-md p-4 shadow-sm bg-white animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-40 bg-gray-200 rounded-md mb-2"></div>

      {/* Title skeleton */}
      <div className="h-5 bg-gray-200 rounded-md mb-2 w-3/4"></div>

      {/* Brand/vendor skeleton */}
      <div className="h-4 bg-gray-200 rounded-md mb-3 w-1/2"></div>

      {/* Price skeleton */}
      <div className="h-5 bg-gray-200 rounded-md w-1/3"></div>
    </div>
  );
};

export default ProductCardSkeleton;
