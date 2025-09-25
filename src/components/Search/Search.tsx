// import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setSearchQuery } from "../../store/slice/globalSlice";

// function Search({
//   setQueryData,
//   onSearchResults,
// }: {
//   setQueryData: Dispatch<SetStateAction<{ [key: string]: string | number }>>;
//   onSearchResults?: (results: any[]) => void;
// }) {
//   const dispatch = useDispatch();

//   const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     console.log(query);
//     setQueryData((prev) => ({
//       ...prev,
//       searchQuery: query,
//     }));
//     dispatch(setSearchQuery(query));

//     if (onSearchResults && query.trim() !== "") {
//       onSearchResults([{ searching: true }]);
//     } else if (onSearchResults) {
//       onSearchResults([]);
//     }
//   };

//   useEffect(() => {
//     dispatch(setSearchQuery(""));
//   }, [dispatch]);

//   return (
//     <div className="search flex w-full">
//       <div className="flex w-full">
//         <input
//           type="text"
//           placeholder="Search for products..."
//           className="flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-pryColor focus:border-pryColor outline-none transition-all"
//           onChange={handleSearchInputChange}
//         />
//       </div>
//     </div>
//   );
// }

// export default Search;

import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import { useAppDispatch } from "../../hooks";
import { setSearchQuery } from "../../store/slice/globalSlice";

interface SearchProps {
  setQueryData: Dispatch<SetStateAction<{ [key: string]: string | number }>>;
}

const Search = ({ setQueryData }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.trim() !== "") {
      setQueryData((prev) => ({
        ...prev,
        searchQuery: query,
      }));
      dispatch(setSearchQuery(query));
    } else {
      setQueryData((prev) => ({
        ...prev,
        searchQuery: "",
      }));
      dispatch(setSearchQuery(""));
    }
  };

  useEffect(() => {
    dispatch(setSearchQuery(""));
  }, [dispatch]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
