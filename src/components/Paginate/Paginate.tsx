import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import ReactPaginate from "react-paginate";

interface IPaginate {
  handlePageClick?: (e: any) => void;
  pageCount: number;
  itemsPerPage: number;
  data: any;
}

const Paginate: React.FC<IPaginate> = ({
  pageCount,
  handlePageClick,
  itemsPerPage,
  data,
}) => {
  return (
    <section className="mt-3 flex flex-wrap justify-between w-full gap-4">
      <div className="flex items-center gap-3">
        <p className="font-medium text-xs text-[#464646]">
          {" "}
          Showing: <span className="text-pryColor">{pageCount}</span> -
          {itemsPerPage} out of {data?.length} entries
        </p>
      </div>
      <div className="flex items-center gap-3">
        <ReactPaginate
          breakLabel="..."
          nextLabel={<AiFillCaretRight />}
          previousLabel={<AiFillCaretLeft />}
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName="paginContainer"
          activeClassName="activePage"
          pageClassName="pageClass"
          previousClassName={"previous"}
          nextClassName={"next"}
          renderOnZeroPageCount={null}
        />
      </div>
    </section>
  );
};

export default Paginate;
