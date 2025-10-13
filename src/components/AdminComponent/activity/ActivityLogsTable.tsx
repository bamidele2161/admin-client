import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { Card } from "../../Cards/Cards";
import { useGetActivityLogsQuery } from "../../../service/admin";
import {
  Search,
  Activity,
  ChevronDown,
  User,
  Calendar,
  Eye,
} from "lucide-react";

interface ActivityLog {
  id: number;
  userId: number;
  action: string;
  entity: string;
  entityId: number;
  details: string;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  user: {
    id: number;
    fullName: string;
    email: string;
  };
}

interface ActivityLogsData {
  data: ActivityLog[];
  message: string;
}

const ActivityLogsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: activityLogsData,
    isLoading,
    error,
  } = useGetActivityLogsQuery();

  const data: ActivityLogsData = activityLogsData || {
    data: [],
    message: "",
  };

  // Filter activity logs based on search term
  const filteredLogs = useMemo(() => {
    if (!searchTerm) return data.data;

    return data.data.filter(
      (log) =>
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data.data, searchTerm]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "USER_LOGIN":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "PAYOUT_CREATED":
        return "bg-green-100 text-green-800 border-green-200";
      case "PRODUCT_ARCHIVED":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "ORDER_CREATED":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "USER_CREATED":
        return "bg-teal-100 text-teal-800 border-teal-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // const getActionIcon = (action: string) => {
  //   switch (action) {
  //     case "USER_LOGIN":
  //       return <User className="h-4 w-4" />;
  //     case "PAYOUT_CREATED":
  //       return <Activity className="h-4 w-4" />;
  //     case "PRODUCT_ARCHIVED":
  //       return <Eye className="h-4 w-4" />;
  //     default:
  //       return <Activity className="h-4 w-4" />;
  //   }
  // };

  const columns = [
    {
      name: "User",
      selector: (row: ActivityLog) => row.user.fullName,
      cell: (row: ActivityLog) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-4 w-4 text-pryColor" />
            </div>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">
              {row.user.fullName}
            </div>
            <div className="text-xs text-gray-500">{row.user.email}</div>
          </div>
        </div>
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "Action",
      selector: (row: ActivityLog) => row.action,
      cell: (row: ActivityLog) => (
        <div className="flex items-center">
          {/* <div className="flex-shrink-0 mr-2">{getActionIcon(row.action)}</div> */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getActionColor(
              row.action
            )}`}
          >
            {row.action.replace(/_/g, " ")}
          </span>
        </div>
      ),
      sortable: true,
      width: "190px",
    },
    {
      name: "Entity",
      selector: (row: ActivityLog) => row.entity,
      cell: (row: ActivityLog) => (
        <div className="text-sm">
          <div className="font-medium text-gray-900">{row.entity}</div>
          <div className="text-xs text-gray-500">ID: {row.entityId}</div>
        </div>
      ),
      sortable: true,
      width: "120px",
    },
    {
      name: "Details",
      selector: (row: ActivityLog) => row.details,
      cell: (row: ActivityLog) => (
        <div className="text-sm text-gray-700 max-w-xs">
          <div className="truncate" title={row.details}>
            {row.details}
          </div>
        </div>
      ),
      sortable: false,
      width: "340px",
    },

    {
      name: "Date & Time",
      selector: (row: ActivityLog) => row.createdAt,
      cell: (row: ActivityLog) => (
        <div className="flex items-center text-sm text-gray-600">
          {formatDate(row.createdAt)}
        </div>
      ),
      sortable: true,
      width: "200px",
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "70px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        fontWeight: "bold",
        fontSize: "0.9rem",
        color: "#374151",
        backgroundColor: "#f9fafb",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <Activity className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-500">Error loading activity logs</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="p-6 shadow-default rounded-lg bg-white">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              System Activity Logs
            </h3>
            <p className="text-sm text-gray-500">
              Complete system activity and audit trail
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Total: {data.data.length} activities
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by action, entity, details, user name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredLogs}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 50, 100]}
        customStyles={customStyles}
        highlightOnHover
        responsive
        sortIcon={<ChevronDown size={16} />}
        defaultSortFieldId={6}
        defaultSortAsc={false}
        noDataComponent={
          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {searchTerm
                ? `No activity logs found matching "${searchTerm}"`
                : "No activity logs available"}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
              >
                Clear search
              </button>
            )}
          </div>
        }
      />
    </div>
  );
};

export default ActivityLogsTable;
