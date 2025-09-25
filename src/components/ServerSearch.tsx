import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import { useAppDispatch } from "../hooks";
import { setSearchQuery } from "../store/slice/globalSlice";

function ServerSearch({
  placeholder,
  className,
  setQueryData,
  label,
}: {
  placeholder: string;
  className?: string;
  label: string;
  setQueryData: Dispatch<SetStateAction<{ [key: string]: string | number }>>;
}) {
  const dispatch = useAppDispatch();

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQueryData((prev) => ({
      ...prev,
      keyword: query,
    }));
    dispatch(setSearchQuery(query));
  };

  useEffect(() => {
    dispatch(setSearchQuery(""));
  }, [dispatch]);

  return (
    <div className="search flex flex-col">
      <p className="font-workSans font-medium text-greyColr">{label}</p>
      <input
        type="text"
        placeholder={placeholder}
        className={`form-controls ${className}`}
        onChange={handleSearchInputChange}
      />
    </div>
  );
}

export default ServerSearch;
