import { type Dispatch, type SetStateAction, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useAppSelector } from "../../hooks";
import { selectGlobal } from "../../store/slice/globalSlice";

interface IPaginate {
  isLoading?: boolean;
  data: any[];
  currentPage: any;
  setCurrentPage: Dispatch<SetStateAction<any[]>>;
  setQueryData: Dispatch<SetStateAction<{ [key: string]: string | number }>>;
  searchParams: string;
  itemsPerPage: number;
  totalItemsCount: number;
  handleSearch: (
    data: any[],
    searchQuery: string,
    updateCurrentPage: (newData: any) => void,
    searchParams: string
  ) => void;
}

const Paginate: React.FC<IPaginate> = ({
  isLoading,
  data,
  currentPage,
  setCurrentPage,
  searchParams,
  handleSearch,
  itemsPerPage,
  totalItemsCount,
  setQueryData,
}) => {
  const { searchQuery } = useAppSelector(selectGlobal);

  const pageCount = totalItemsCount / itemsPerPage;

  const handlePageClick = (e: any) => {
    setQueryData((prev) => ({ ...prev, ["pageNumber"]: e?.selected + 1 }));
  };

  useEffect(() => {
    handleSearch(data, searchQuery, setCurrentPage, searchParams);
  }, [searchQuery, data, itemsPerPage, setCurrentPage]);

  return (
    <section className="mt-3 flex flex-wrap justify-between w-full  gap-4">
      <div className="flex items-center gap-3">
        <p className="font-medium text-xs text-grey-300">
          {" "}
          Showing: <span className="text-pryColor">{1}</span> of{" "}
          {totalItemsCount}{" "}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {!isLoading && data && (
          <ReactPaginate
            breakLabel="..."
            nextLabel={<FaChevronRight />}
            previousLabel={<FaChevronLeft />}
            pageCount={pageCount}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName="paginContainer"
            activeClassName="activePage"
            pageClassName="pageClass"
            previousClassName={currentPage === 0 ? "disabled" : "prev"}
            nextClassName={currentPage === pageCount - 1 ? "disabled" : "next"}
            renderOnZeroPageCount={null}
          />
        )}
      </div>
    </section>
  );
};

export default Paginate;
