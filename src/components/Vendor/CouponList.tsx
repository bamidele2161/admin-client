import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import DataTable from "react-data-table-component";

interface Coupon {
  id: string;
  code: string;
  type: string;
  value: number;
  minPurchase: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usedCount: number;
  status: string;
  products: string[];
  description: string;
}

interface CouponListProps {
  coupons: Coupon[];
  onEdit: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
}

const CouponList: React.FC<CouponListProps> = ({
  coupons,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns = [
    {
      name: "Code",
      grow: 1.8,
      selector: (row: Coupon) => row.code,
      sortable: true,
      cell: (row: Coupon) => (
        <div>
          <div className="font-medium">{row.code}</div>
          <div className="text-sm text-gray-500">{row.description}</div>
        </div>
      ),
    },
    {
      name: "Discount",
      selector: (row: Coupon) => row.value,
      sortable: true,
      cell: (row: Coupon) => (
        <div>
          <div>
            {row.type === "percentage" ? `${row.value}%` : `#${row.value}`}
          </div>
          <div className="text-xs text-gray-500">
            {row.type === "percentage" ? "Percentage" : "Fixed"}
          </div>
        </div>
      ),
    },
    {
      name: "Min Purchase",
      selector: (row: Coupon) => row.minPurchase,
      sortable: true,
      cell: (row: Coupon) => `#${row.minPurchase}`,
    },
    {
      name: "Validity",
      grow: 1.8,
      selector: (row: Coupon) => row.startDate,
      sortable: true,
      cell: (row: Coupon) => (
        <div className="text-sm">
          {formatDate(row.startDate)} - {formatDate(row.endDate)}
        </div>
      ),
    },
    {
      name: "Usage",
      selector: (row: Coupon) => row.usedCount,
      sortable: true,
      cell: (row: Coupon) => (
        <div className="text-sm text-gray-500">
          {row.usedCount} / {row.usageLimit}
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row: Coupon) => row.status,
      sortable: true,
      cell: (row: Coupon) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            row.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row: Coupon) => (
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(row)}
            className="text-secColor hover:text-pryColor"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(row.id)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
      right: true,
    },
  ];

  const customStyles = {
    table: {
      style: {
        backgroundColor: "white",
        borderRadius: "0.5rem",
        border: "1px solid #e5e7eb",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#f9fafb",
        borderTopLeftRadius: "0.5rem",
        borderTopRightRadius: "0.5rem",
        borderBottom: "1px solid #e5e7eb",
      },
    },
    headCells: {
      style: {
        fontSize: "0.75rem",
        fontWeight: "500",
        color: "#6b7280",
        padding: "0.75rem 1rem",
      },
    },
    cells: {
      style: {
        padding: "1rem",
      },
    },
    rows: {
      style: {
        "&:not(:last-of-type)": {
          borderBottom: "1px solid #e5e7eb",
        },
        "&:hover": {
          backgroundColor: "#f9fafb",
        },
      },
    },
  };

  if (coupons.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
        <p className="text-gray-500">
          No coupons found. Create your first coupon to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <DataTable
        columns={columns}
        data={coupons}
        customStyles={customStyles}
        pagination
        responsive
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
};

export default CouponList;
