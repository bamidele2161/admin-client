import DataTable from "react-data-table-component";
import { useGetAllOrdersByVendorsQuery } from "../../service/product";
import { selectAuth } from "../../store/slice/authSlice";
import { useAppSelector } from "../../hooks";

const RecentOrders = () => {
  const { userInfo } = useAppSelector(selectAuth);
  const { data } = useGetAllOrdersByVendorsQuery(userInfo?.Vendor?.id);

  const recentOrders = data?.data?.slice(0, 5);

  const columns = [
    {
      name: "Order ID",
      selector: (row: any) => `ORD-${row.id}`,
      sortable: true,
    },

    {
      name: "Date",
      selector: (row: any) => row.createdAt.slice(0, 10),
      sortable: true,
    },
    {
      name: "Total",
      selector: (row: any) => row.totalAmount,
      format: (row: any) => `#${row.totalAmount?.toFixed(2)}`,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
      cell: (row: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.status === "Pending"
              ? "bg-processing text-white"
              : row.status === "Paid"
              ? "bg-pryColor text-white"
              : row.status === "Shipped"
              ? "bg-secColor text-white"
              : row.status === "Delivered"
              ? "bg-positive text-white"
              : "bg-negative text-white"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "60px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        fontWeight: "bold",
        fontSize: "0.9rem",
        color: "#352F36",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-default">
      <div className="flex w-full flex-col rounded-md border">
        <DataTable
          columns={columns}
          data={recentOrders}
          customStyles={customStyles}
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
};

export default RecentOrders;
