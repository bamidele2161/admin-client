import { BackArrowIcon } from "../../assets/svg/CustomSVGs";
import { setCurrentShoppingStep } from "../../store/slice/productSlice";
import { useAppDispatch } from "../../hooks";

const BackNavigation = ({ page }: { page: number }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex w-full justify-center">
      <button
        className="text-secColor text-md md:text-lg font-semibold text-bricolage flex gap-2 cursor-pointer items-center"
        onClick={() => dispatch(setCurrentShoppingStep(page))}
      >
        {" "}
        <BackArrowIcon />
        Go Back
      </button>
    </div>
  );
};

export default BackNavigation;
