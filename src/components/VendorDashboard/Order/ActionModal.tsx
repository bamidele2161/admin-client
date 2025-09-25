import { useAppSelector } from "../../../hooks";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { type OrderProps } from "../../../interfaces/Global";
import { selectGlobal } from "../../../store/slice/globalSlice";
import OrderDetails from "./OrderDetails";

interface ActionProps {
  id: number | string;
  row: OrderProps;
  setIsActionMenuOpen?: any;
}

const ActionMenu = ({ row }: ActionProps) => {
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();

  const handleViewDetails = () => {
    handleShow(`order-details`);
  };

  return (
    <div className="bg-white border rounded-lg w-[200px] shadow-lg px-2 py-1 ">
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
          <button className="w-full text-left py-1 text-sm text-[#e8787b] hover:font-semibold">
            Delete Transaction
          </button>
        </li>
      </ul>

      {toggle["order-details"] && <OrderDetails selectedRow={row} />}
    </div>
  );
};

export default ActionMenu;
