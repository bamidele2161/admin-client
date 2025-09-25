import { X } from "lucide-react";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import PopUp from "../../PopUps/PopUp";
import { formatTimestamp } from "../../../util";
import { type OrderProps } from "../../../interfaces/Global";

interface DetailsProps {
  selectedRow: OrderProps;
  refetch: any;
}
const OrderDetails = ({ selectedRow }: DetailsProps) => {
  const { handleShow } = useGlobalHooks();

  const handleClose = () => {
    handleShow(`order-details`);
  };

  return (
    <PopUp id={"order-details"}>
      <div className="bg-white rounded-lg flex flex-col py-10 px-20 gap-6 w-[750px]">
        <div className="gap-4 flex justify-between items-center">
          <h3 className="text-pryColor font-semibold text-lg font-bricolage leading-6">
            Order Details
          </h3>
          <X className="cursor-pointer" onClick={handleClose} />
        </div>

        <div className="details flex flex-col gap-6">
          {/* Order Info */}
          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Order Name
              </p>
              <p className="text-sm text-greyColr font-workSans font-medium">
                {selectedRow?.paymentReference}
              </p>
            </div>
            <div className="flex flex-col justify-end items-end">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Total Amount
              </p>
              <p className="text-sm text-greyColr font-workSans font-medium">
                &#8358;{selectedRow?.totalAmount.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Order Status */}
          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Order Status
              </p>
              <p className="text-sm text-greyColr font-workSans font-medium">
                {selectedRow?.status}
              </p>
            </div>
            <div className="flex flex-col items-end justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Payment Reference
              </p>
              <p className="text-sm text-greyColr font-workSans font-medium">
                {selectedRow?.paymentReference}
              </p>
            </div>
          </div>

          {/* Created At */}
          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Date Created
              </p>
              <p className="text-sm text-greyColr font-workSans font-medium">
                {formatTimestamp(selectedRow?.createdAt, true)}{" "}
                {/* Assuming the formatTimestamp function handles the formatting */}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="column flex flex-col gap-4">
            <p className="tit text-sm text-lightGreyColor font-workSans">
              Items
            </p>
            {selectedRow?.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex flex-col items-start justify-start">
                  <p className="text-sm text-greyColr font-workSans font-medium">
                    Product ID: {item.productId}
                  </p>
                  <p className="text-sm text-lightGreyColor font-workSans">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-end">
                  <p className="text-sm text-greyColr font-workSans font-medium">
                    Price: &#8358;{item.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PopUp>
  );
};

export default OrderDetails;
