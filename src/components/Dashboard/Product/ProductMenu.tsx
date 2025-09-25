import ProductDetails from "./ProductDetails";
import { useAppSelector } from "../../../hooks";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { selectGlobal } from "../../../store/slice/globalSlice";
import { useEffect, useRef } from "react";
import { type ProductProps } from "../../../interfaces/Global";

interface ProductActionProps {
  id: string | number;
  row: ProductProps;
  refetch: any;
  onClose: () => void;
}

const ProductActionMenu = ({ row, refetch, onClose }: ProductActionProps) => {
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();

  const menuRef = useRef<HTMLDivElement>(null);

  const handleViewDetails = () => {
    handleShow(`product-details`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="bg-white border rounded-lg w-[200px] shadow-lg px-2 py-1 "
    >
      <ul className="flex flex-col">
        <li>
          <button
            className="w-full text-left py-1 hover:font-semibold text-sm"
            onClick={handleViewDetails}
          >
            View Details
          </button>
        </li>
        <li>
          <button className="w-full text-left text-negative py-1 hover:font-semibold text-sm">
            Remove Product
          </button>
        </li>
      </ul>

      {toggle["product-details"] && (
        <ProductDetails selectedRow={row} refetch={refetch} />
      )}
    </div>
  );
};

export default ProductActionMenu;
