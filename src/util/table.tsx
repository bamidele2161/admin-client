import { IoMdMore } from "react-icons/io";
import {
  type IColData,
  type OrderProps,
  type ProductProps,
} from "../interfaces/Global";
import ProductActionMenu from "../components/Dashboard/Product/ProductMenu";
import OrderActionMenu from "../components/Dashboard/Order/OrderMenu";

export const productColumnsData = (
  handleOpenModal: (row: ProductProps) => void,
  selectedRow: ProductProps,
  openAction: boolean,
  refetch: any,
  onClose: any
): IColData[] => {
  return [
    {
      name: "Image",
      id: "image",
      cell: ({ mainImage }) => (
        <div className="left-box">
          <img src={mainImage} loading="lazy" className="h-14 w-14" />
        </div>
      ),
    },
    {
      name: "Name",
      grow: 2,
      cell: ({ name }) => <div className="centered-box">{name}</div>,
    },

    {
      name: "Amount (NGN)",
      cell: ({ price }) => (
        <div className="centered-box">
          NGN {new Intl.NumberFormat().format(price)}
        </div>
      ),
    },
    {
      name: "Gender",
      cell: ({ gender }) => <div className="centered-box">{gender}</div>,
    },
    {
      name: "In Stock",
      cell: ({ stock }) => <div className="centered-box">{stock}</div>,
    },
    {
      name: "Action",
      cell: (row: ProductProps) => (
        <div className="centered-box">
          <button>
            {" "}
            <IoMdMore
              className="text-[#69728F] cursor-pointer"
              size={24}
              onClick={() => handleOpenModal(row)}
            />
          </button>

          {openAction && selectedRow?.id === row?.id && (
            <div className="absolute z-[1000] right-[70px] bottom-[-18px] ">
              <ProductActionMenu
                id={row?.id}
                row={row}
                refetch={refetch}
                onClose={onClose}
              />
            </div>
          )}
        </div>
      ),
    },
  ];
};

export const orderColumnsData = (
  handleOpenModal: (row: OrderProps) => void,
  selectedRow: OrderProps,
  openAction: boolean,
  refetch: any,
  onClose: any
): IColData[] => {
  return [
    {
      name: "Order Id",
      id: "image",
      selector: ({ id }) => id,
      cell: ({ id }) => <div className="left-box">{id}</div>,
    },
    {
      name: "Number of Items",

      cell: ({ items }) => (
        <div className="centered-box">{items?.length?.toString()}</div>
      ),
    },
    {
      name: "Amount (NGN)",
      grow: 1.2,
      selector: ({ totalAmount }) =>
        new Intl.NumberFormat().format(totalAmount),
      cell: ({ totalAmount }) => (
        <div className="centered-box">
          NGN {new Intl.NumberFormat().format(totalAmount)}
        </div>
      ),
    },
    {
      name: "Status",
      selector: ({ status }) => status,
      cell: ({ status }) => (
        <div className="centered-box">
          <span
            className={`rounded-2xl flex items-center py-2 px-4 text-center ${
              status === "Delivered"
                ? "text-positive bg-[#f3fbf8]"
                : status === "Processing"
                ? "text-processing bg-[#FDFCF8]"
                : "text-negative bg-[#fff7f5]"
            }`}
          >
            {status}
          </span>
        </div>
      ),
    },
    // {
    //   name: "Transaction Type",
    //   selector: ({ transactionType }) => transactionType,
    //   cell: ({ transactionType }) => (
    //     <div className="centered-box">{transactionType}</div>
    //   ),
    // },
    {
      name: "Order Date",
      selector: ({ createdAt }) => createdAt,
      cell: ({ createdAt }) => (
        <div className="centered-box">{createdAt.slice(0, 10)}</div>
      ),
    },

    {
      name: "Action",
      cell: (row: OrderProps) => (
        <div className="centered-box">
          <button>
            {" "}
            <IoMdMore
              className="text-[#69728F] cursor-pointer"
              size={24}
              onClick={() => handleOpenModal(row)}
            />
          </button>

          {openAction && selectedRow?.id === row?.id && (
            <div className="absolute z-[1000] right-[70px] bottom-[-18px] ">
              <OrderActionMenu
                id={row?.id}
                row={row}
                refetch={refetch}
                onClose={onClose}
              />
            </div>
          )}
        </div>
      ),
    },
  ];
};

export const homeOrderColumnsData = (): IColData[] => {
  return [
    {
      name: "Order Id",
      id: "image",
      cell: ({ id }) => <div className="left-box">{id}</div>,
    },

    {
      name: "Number of Items",

      cell: ({ items }) => (
        <div className="centered-box">{items?.length?.toString()}</div>
      ),
    },
    {
      name: "Amount (NGN)",
      grow: 1.2,
      selector: ({ totalAmount }) =>
        new Intl.NumberFormat().format(totalAmount),
      cell: ({ totalAmount }) => (
        <div className="centered-box">
          NGN {new Intl.NumberFormat().format(totalAmount)}
        </div>
      ),
    },
    {
      name: "Status",
      selector: ({ status }) => status,
      cell: ({ status }) => (
        <div className="centered-box">
          <span
            className={`rounded-2xl flex items-center py-2 px-4 text-center ${
              status === "Delivered"
                ? "text-positive bg-[#f3fbf8]"
                : status === "Processing"
                ? "text-processing bg-[#FDFCF8]"
                : "text-negative bg-[#fff7f5]"
            }`}
          >
            {status}
          </span>
        </div>
      ),
    },
    {
      name: "Order Date",
      cell: ({ createdAt }) => (
        <div className="centered-box">{createdAt?.slice(0, 10)}</div>
      ),
    },
  ];
};
