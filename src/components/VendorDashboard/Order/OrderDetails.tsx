import { CloseIcon } from "../../../assets/svg/CustomSVGs";
import { type OrderProps } from "../../../interfaces/Global";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import PopUp from "../../PopUps/PopUp";
interface OrderDetailsProps {
  selectedRow: OrderProps;
}
const OrderDetails = ({ selectedRow }: OrderDetailsProps) => {
  const { handleShow } = useGlobalHooks();

  const handleClose = () => {
    handleShow(`order-details`);
  };
  return (
    <PopUp id={"order-details"}>
      <div className="bg-white rounded-lg flex flex-col py-10 px-20 gap-10 w-[650px]">
        <div className="gap-4 flex  justify-between items-center">
          <h3 className="text-pryColor font-semibold text-lg font-bricolage leading-6">
            Order Details
          </h3>
          <CloseIcon className="cursor-pointer" onClick={handleClose} />
        </div>

        <div className="gap-4 flex flex-col justify-center items-center">
          <p
            className={`rounded-2xl flex items-center py-2 px-6 text-center ${
              selectedRow?.status === "Delivered"
                ? "text-positive bg-[#f3fbf8]"
                : status === "Processing"
                ? "text-processing bg-[#FDFCF8]"
                : "text-negative bg-[#fff7f5]"
            }`}
          >
            {selectedRow?.status}
          </p>

          <h3 className="text-pryColor font-bold text-xl font-bricolage leading-6">
            NGN{" "}
            {new Intl.NumberFormat().format(selectedRow?.totalAmount as number)}
          </h3>
        </div>

        <div className="details flex flex-col gap-6">
          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-inter">
                Customer ID
              </p>
              <p className="text-base text-greyColr font-inter">
                {selectedRow?.id}
              </p>
            </div>
            <div className="flex flex-col justify-end items-end">
              <p className="tit text-sm text-lightGreyColor font-inter">
                Customer Name
              </p>
              <p className="text-base text-greyColr font-inter">
                {selectedRow?.userId}
              </p>
            </div>
          </div>

          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-inter">
                Payment Reference
              </p>
              <p className="text-base text-greyColr font-inter">
                {selectedRow?.paymentReference}
              </p>
            </div>
            <div className="flex flex-col justify-end items-end">
              <p className="tit text-sm text-lightGreyColor font-inter">Fees</p>
              <p className="text-sm text-negative font-semibold font-inter">
                -#50.00
              </p>
            </div>
          </div>

          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-inter">Date</p>
              <p className="text-base text-greyColr font-inter">
                {selectedRow?.createdAt}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start">
          <h3 className="text-lg font-semibold">Items</h3>

          <ul className="list-disc text-gray-600 flex flex-col pl-4">
            {selectedRow?.items.map((item: any, index: number) => (
              <li key={index} className="mt-1">
                {item.productName} (x{item.quantity}) - &#8358;
                {item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        <div className="form">
          <div className="flex flex-col w-full gap-4">
            <button
              className="w-full bg-pryColor text-white py-3 mt-4 rounded-lg hover:bg-gray-800"
              type="submit"
              // onClick={handleSubmit}
            >
              Share Receipt
            </button>
            <button
              className="w-full bg-secColor text-white py-3 mt-4 rounded-lg hover:bg-pryColor flex items-center justify-center space-x-2"
              type="submit"
              // onClick={handleSubmit}
            >
              Report An Issue
            </button>
          </div>
        </div>
      </div>
    </PopUp>
  );
};

export default OrderDetails;
