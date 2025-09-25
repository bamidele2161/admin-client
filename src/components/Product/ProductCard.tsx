// import React from "react";
// import { useAppDispatch } from "../../hooks";
// import { addToCart, addToWishlist } from "../../store/slice/productSlice";
// import { HiOutlineHeart } from "react-icons/hi";
// import { useNavigate } from "react-router-dom";

// interface ProductCardProps {
//   id: number;
//   image: string;
//   name: string;
//   brand: string;
//   vendorId: number;
//   description: string;
//   price: number;
//   rating: number;
//   wishlist?: boolean;
// }

// const ProductCard: React.FC<ProductCardProps> = ({
//   id,
//   image,
//   name,
//   brand,
//   vendorId,
//   price,
//   rating,
//   wishlist,
// }) => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const handleAddToCart = () => {
//     dispatch(
//       addToCart({
//         id: id,
//         name: name,
//         price: price,
//         quantity: 1,
//         image: image,
//         vendorId: vendorId,
//       })
//     );
//   };

//   const handleAddToWishlist = () => {
//     dispatch(addToWishlist(id));
//   };

//   const handleProductClick = (productId: number) => {
//     navigate(`/product/${productId}`);
//   };

//   return (
//     <div className="max-w-sm rounded-lg hover:shadow  transition duration-300 bg-white relative group">
//       {/* Image Section */}
//       <div className="flex  relative flex-col">
//         <img
//           src={image}
//           alt={name}
//           onClick={() => handleProductClick(id)}
//           className="w-full h-60 object-contain rounded-t-lg "
//           loading="lazy"
//         />
//         <button
//           onClick={handleAddToCart}
//           className="w-full bg-pryColor text-white py-3 hover:bg-gray-800 absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow group-hover:shadow"
//         >
//           Add to Cart
//         </button>
//       </div>

//       {/* Product Details */}
//       <div className="p-4" onClick={() => handleProductClick(id)}>
//         {/* Product Name */}
//         <h2 className="text-md font-semibold text-gray-800">{name}</h2>

//         {/* Brand */}
//         <p className="text-sm text-gray-500">{brand}</p>
//         <p className="text-xl font-bold text-pryColor mt-2">
//           &#8358;{price.toFixed(2)}
//         </p>
//         {/* Rating */}
//         <div className="flex items-center mt-2">
//           {Array.from({ length: 5 }).map((_, index) => (
//             <svg
//               key={index}
//               xmlns="http://www.w3.org/2000/svg"
//               className={`w-4 h-4 ${
//                 index < rating ? "text-yellow-500" : "text-gray-300"
//               }`}
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M12 2c.39 0 .76.19.97.5l2.59 5.26 5.8.84c.88.13 1.23 1.2.59 1.81l-4.2 4.09.99 5.76c.15.87-.77 1.54-1.54 1.13L12 18.26l-5.2 2.74c-.77.4-1.69-.26-1.54-1.13l.99-5.76-4.2-4.09c-.64-.61-.29-1.68.59-1.81l5.8-.84L11.03 2.5A1.1 1.1 0 0112 2z" />
//             </svg>
//           ))}
//         </div>
//       </div>

//       {!wishlist && (
//         <div
//           onClick={handleAddToWishlist}
//           className="flex justify-center items-center cursor-pointer text-secColor bg-gray-200 rounded-lg w-[30px] h-[30px] absolute top-2 right-2"
//         >
//           <HiOutlineHeart size={16} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductCard;

import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addToWishlist,
  removeFromWishlist,
  selectProduct,
} from "../../store/slice/productSlice";
import { useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import LazyLoad from "react-lazyload";
interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  brand: string;
  vendorId: number;
  description: string;
  price: number;
  stock?: number;
  rating: number;
  wishlist?: boolean;
  showWishlist?: boolean;
  city?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  brand,
  // vendorId,
  stock,
  price,
  rating,
  wishlist,
  showWishlist,
  city,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { wishlist: wishItems } = useAppSelector(selectProduct);
  // const handleAddToCart = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   dispatch(
  //     addToCart({
  //       id: id,
  //       name: name,
  //       price: price,
  //       quantity: 1,
  //       image: image,
  //       vendorId: vendorId,
  //     })
  //   );
  // };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (wishItems?.includes(id)) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(addToWishlist(id));
    }
  };

  const handleProductClick = () => {
    if ((stock as number) > 0) {
      navigate(`/product/${id}`);
    }
  };

  return (
    <div
      onClick={handleProductClick}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    >
      {/* Wishlist Button */}
      {showWishlist && (
        <button
          onClick={handleAddToWishlist}
          className={`absolute right-3 top-3 z-10 rounded-full p-1.5 backdrop-blur-sm transition-all duration-300 ${
            wishlist
              ? "bg-secColor/20 text-secColor"
              : "bg-white/70 text-gray-500 hover:bg-secColor hover:text-white"
          }`}
          aria-label="Add to wishlist"
        >
          <Heart size={18} className={wishlist ? "fill-secColor" : ""} />
        </button>
      )}

      {/* Image Container */}
      <div className="relative overflow-hidden pt-[100%]">
        {/* LazyLoad component would be needed for this to work correctly */}
        <LazyLoad height={200} offset={100}>
          <img
            src={image}
            alt={name}
            className="absolute inset-0 h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </LazyLoad>

        {/* Out of Stock Overlay */}
        {(stock as number) < 1 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <span className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md transform -rotate-12 text-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col px-2 sm:px-3 md:px-4 py-1 gap-1">
        {/* Brand Badge */}
        <div className="mt-2 w-fit text-[10px] md:text-xs font-normal text-greyColr bg-gray-50 border border-gray-300 rounded-xl px-2 py-0.5">
          {brand?.charAt(0).toUpperCase() + brand?.slice(1)} - {city}
        </div>

        {/* Product Name */}
        <h3 className="mb-1 line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-pryColor transition-colors truncate whitespace-nowrap overflow-hidden">
          {name?.charAt(0).toUpperCase() + name?.slice(1)}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={14}
              className={
                index < rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
          <span className="ml-1 text-xs text-gray-500">
            {/* ({rating?.toFixed(1)}) */}
          </span>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center">
          {/* {(stock as number) < 1 && (
            <span className="text-red-500 text-xs font-medium">
              Out of Stock
            </span>
          )} */}
          <p
            className={`text-[15px] md:text-xl font-semibold text-pryColor ${
              (stock as number) < 1 ? "opacity-70" : ""
            }`}
          >
            ₦
            {price.toLocaleString("en-NG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <span className="text-muted-foreground line-through text-[13px] md:text-sm text-gray-400">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(price * 1.1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
