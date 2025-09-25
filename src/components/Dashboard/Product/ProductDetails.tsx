import { X } from "lucide-react";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import PopUp from "../../PopUps/PopUp";
import { formatTimestamp } from "../../../util";
import { type ProductProps } from "../../../interfaces/Global";

interface DetailsProps {
  selectedRow: ProductProps;
  refetch: any;
}
const ProductDetails = ({ selectedRow }: DetailsProps) => {
  const { handleShow } = useGlobalHooks();

  const handleClose = () => {
    handleShow(`product-details`);
  };

  return (
    <PopUp id={"product-details"}>
      <div className="bg-white rounded-lg flex flex-col py-10 px-20 gap-6 w-[750px]">
        <div className="gap-4 flex justify-between items-center">
          <h3 className="text-pryColor font-semibold text-lg font-bricolage leading-6">
            Product Details
          </h3>
          <X className="cursor-pointer" onClick={handleClose} />
        </div>

        <div className="flex justify-center mb-6">
          <img
            src={selectedRow?.thumbnails[0]}
            alt={selectedRow?.name}
            className="w-64 h-64 rounded-lg object-cover"
          />
        </div>

        <div className="details flex flex-col gap-6">
          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Product Name
              </p>
              <p className="text-sm text-greyColr font-workSans font-medium">
                {selectedRow?.name}
              </p>
            </div>
            <div className="flex flex-col justify-end items-end">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Price
              </p>
              <p className="text-sm text-greyColr font-workSans font-medium">
                &#8358;{selectedRow?.price}
              </p>
            </div>
          </div>

          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Rating
              </p>
              <p className="text-sm text-greyColr font-workSans font-medium">
                {selectedRow?.rating} / 5
              </p>
            </div>
            <div className="flex flex-col items-end justify-end">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Gender
              </p>
              <p className="text-sm text-greyColr font-workSans font-medium">
                {selectedRow?.gender}
              </p>
            </div>
          </div>

          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Description
              </p>
              <p className="text-sm text-start text-greyColr font-workSans font-medium">
                {selectedRow?.description}
              </p>
            </div>
            <div className="flex flex-col items-end justify-end">
              <p className="tit text-sm text-lightGreyColor text-end font-workSans">
                Sizes Available
              </p>
              <p className="text-sm text-greyColr font-workSans font-medium">
                {selectedRow?.sizes.join(", ")}
              </p>
            </div>
          </div>

          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Available Colors
              </p>
              <p className="text-sm text-greyColr font-workSans font-medium">
                {selectedRow?.colors.join(", ")}
              </p>
            </div>
            <div className="flex flex-col justify-end items-end">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Stock
              </p>
              <p className="text-sm text-greyColr font-workSans font-medium">
                {selectedRow?.stock}
              </p>
            </div>
          </div>

          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Material
              </p>
              <p className="text-sm text-greyColr font-workSans font-medium">
                {selectedRow?.material}
              </p>
            </div>
            <div className="flex flex-col justify-end items-end">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Date Added
              </p>
              <p className="text-sm text-greyColr font-workSans font-medium">
                {formatTimestamp(selectedRow?.createdAt as string, true)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PopUp>
  );
};

export default ProductDetails;
