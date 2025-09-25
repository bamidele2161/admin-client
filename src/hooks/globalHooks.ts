import { useDispatch } from "react-redux";
import { toggleShow } from "../store/slice/globalSlice";

export const useGlobalHooks = () => {
  const dispatch = useDispatch();

  const handleShow = (id: string | number) => {
    dispatch(toggleShow(id));
  };

  const handleSearch = () => {};

  return {
    handleShow,
    handleSearch,
  };
};
