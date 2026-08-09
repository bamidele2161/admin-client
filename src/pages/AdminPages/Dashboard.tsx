import { Link } from "react-router-dom";
import { useMemo } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { HiOutlineQueueList as Activity, HiOutlineClock as Clock, HiOutlineUser as User, HiOutlineExclamationTriangle as AlertTriangle, HiOutlineCheckCircle as CheckCircle, HiOutlineUsers as Users, HiOutlineBuildingStorefront as Store, HiOutlineShoppingBag as ShoppingCart, HiOutlineArrowRight as ArrowRight } from "react-icons/hi2";
import Navbar from "../../components/Navbar/Navbar";
import { useGetAllUsersQuery } from "../../service/auth";
import {
  useGetAllVendorsQuery,
  useGetActivityLogsQuery,
} from "../../service/admin";
import { useGetAllOrdersQuery } from "../../service/product";

interface Order {
  id: number;
  totalAmount: number;
  createdAt: string;
  status: string;
}

interface ActivityLog {
  id: number;
  action: string;
  details: string;
  userId?: number;
  userType: string;
  ipAddress: string;
  userAgent: string;
  user: { id: number; fullName: string; email: string };
  createdAt: string;
}

const AdminDashboard = () => {
  const { data: users } = useGetAllUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const { data } = useGetAllVendorsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const { data: orders } = useGetAllOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const { data: activityLogs, isLoading: isLoadingActivity } =
    useGetActivityLogsQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });

  const totalRevenue = orders?.data?.reduce(
    (sum: number, order: Order) => sum + order?.totalAmount,
    0
  );

  // Get latest 5 activity logs
  const recentActivities = useMemo(() => {
    if (!activityLogs?.data) return [];
    return [...activityLogs.data]
      .sort(
        (a: ActivityLog, b: ActivityLog) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 4);
  }, [activityLogs?.data]);

  // Function to get activity icon based on action type
  const getActivityIcon = (action: string) => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes("login") || actionLower.includes("auth")) {
      return <User className="h-4 w-4 text-[#6F8294]" />;
    } else if (actionLower.includes("create") || actionLower.includes("add")) {
      return <CheckCircle className="h-4 w-4 text-emerald-700" />;
    } else if (
      actionLower.includes("delete") ||
      actionLower.includes("remove")
    ) {
      return <AlertTriangle className="h-4 w-4 text-red-700" />;
    } else {
      return <Activity className="h-4 w-4 text-[#566170]" />;
    }
  };

  // Function to format time ago
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  // Process orders data to get monthly sales
  const salesData = useMemo(() => {
    if (!orders?.data) return [];

    const monthlyData: { [key: string]: number } = {};
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Initialize all months with 0
    monthNames.forEach((month) => {
      monthlyData[month] = 0;
    });

    // Aggregate sales by month
    orders.data.forEach((order: Order) => {
      const date = new Date(order.createdAt);
      const monthIndex = date.getMonth();
      const monthName = monthNames[monthIndex];
      monthlyData[monthName] += order.totalAmount;
    });

    // Convert to array format for recharts
    return monthNames.map((month) => ({
      name: month,
      sales: monthlyData[month],
    }));
  }, [orders?.data]);

  return (
    <div className="flex flex-col">
      <Navbar title="Overview" subtitle="A live view of your marketplace operations" />

      <div className="my-7 grid grid-cols-2 gap-3 px-10 lg:grid-cols-4 lg:gap-4">
        {/* Summary Cards */}
        <div className="rounded-[1.5rem] border border-black/[.08] bg-pryColor p-5 text-white shadow-default sm:p-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[.16em] text-white/50">
            Total Users
          </h3>
          <p className="mt-4 font-spaceGrotesk text-3xl font-semibold tracking-tight sm:text-4xl">
            {users?.data?.length || 0}{" "}
          </p>
          <p className="mt-2 text-xs text-white/45">Registered accounts</p>
        </div>

        <div className="rounded-[1.5rem] border border-black/[.08] bg-[#DCE4E8] p-5 sm:p-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[.16em] text-lightGreyColor">
            Active Vendors
          </h3>
          <p className="mt-4 font-spaceGrotesk text-3xl font-semibold tracking-tight sm:text-4xl">
            {data?.data?.length || 0}
          </p>
          <p className="mt-2 text-xs text-lightGreyColor">Vendor accounts</p>
        </div>

        <div className="rounded-[1.5rem] border border-black/[.08] bg-white/70 p-5 sm:p-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[.16em] text-lightGreyColor">
            Total Orders
          </h3>
          <p className="mt-4 font-spaceGrotesk text-3xl font-semibold tracking-tight sm:text-4xl">
            {orders?.data?.length || 0}
          </p>
          <p className="mt-2 text-xs text-lightGreyColor">All-time orders</p>
        </div>

        <div className="rounded-[1.5rem] border border-black/[.08] bg-[#F8F7F3] p-5 sm:p-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[.16em] text-lightGreyColor">
            Total Revenue
          </h3>
          <p className="mt-4 font-spaceGrotesk text-xl font-semibold tracking-tight sm:text-3xl">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(totalRevenue || 0)}
          </p>
          <p className="mt-2 text-xs text-lightGreyColor">Gross order value</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 px-10 mb-6">
        {/* Sales Chart */}
        <div className="w-full rounded-[1.75rem] border border-black/[.08] bg-white/75 p-5 shadow-default sm:p-7 lg:w-[65%]">
          <h2 className="text-lg font-semibold mb-4 text-greyColr">
            Monthly Sales Revenue
          </h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#666" }}
                  axisLine={{ stroke: "#e0e0e0" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#666" }}
                  axisLine={{ stroke: "#e0e0e0" }}
                  tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `₦${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                  labelStyle={{ color: "#333" }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#151A22"
                  fill="#6F8294"
                  fillOpacity={0.28}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="w-full rounded-[1.75rem] border border-black/[.08] bg-[#DCE4E8] p-5 sm:p-7 lg:w-[40%]">
          <div className="flex items-center justify-between mb-6">
            <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-lightGreyColor">Live audit trail</p><h2 className="mt-1 font-spaceGrotesk text-xl font-semibold tracking-tight text-greyColr">Recent activity</h2></div>
            <Link
              to="/admin-activity-logs"
              className="text-sm text-pryColor-DEFAULT hover:text-pryColor-Dark transition-colors"
            >
              View All
            </Link>
          </div>

          {isLoadingActivity ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentActivities.length > 0 ? (
            <ol className="divide-y divide-black/[.09] border-y border-black/[.09]">
              {recentActivities.map((activity: ActivityLog) => (
                <li key={activity.id} className="grid grid-cols-[2rem_1fr] gap-3 py-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-pryColor">
                      {getActivityIcon(activity.action)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-greyColr">{activity.action.replace(/_/g, " ")}</p>
                          <p className="mt-0.5 truncate text-[11px] font-medium text-lightGreyColor">{activity.user?.fullName || "System activity"}</p>
                        </div>
                        <time className="flex shrink-0 items-center gap-1 whitespace-nowrap text-[10px] font-medium text-lightGreyColor">
                          <Clock className="h-3 w-3" />{formatTimeAgo(activity.createdAt)}
                        </time>
                      </div>
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#566170]">{activity.details}</p>
                    </div>
                </li>
              ))}
            </ol>
          ) : (
            <div className="text-center py-8">
              <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-lightGreyColor">No recent activity</p>
            </div>
          )}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="px-10 mb-20">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin-customer-management"
            className="group relative overflow-hidden rounded-[1.5rem] bg-pryColor p-6 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#242B35]"
          >
            <div className="flex items-center justify-between">
              <div>
                <Users className="w-8 h-8 mb-3" />
                <h4 className="text-lg font-semibold">User Management</h4>
                <p className="mt-1 text-sm text-white/55">Manage all users</p>
              </div>
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </Link>

          <Link
            to="/admin-vendor"
            className="group relative overflow-hidden rounded-[1.5rem] bg-[#6F8294] p-6 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5f7181]"
          >
            <div className="flex items-center justify-between">
              <div>
                <Store className="w-8 h-8 mb-3" />
                <h4 className="text-lg font-semibold">Vendor Management</h4>
                <p className="mt-1 text-sm text-white/65">
                  Manage all vendors
                </p>
              </div>
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </Link>

          <Link
            to="/admin-order-management"
            className="group relative overflow-hidden rounded-[1.5rem] border border-black/[.08] bg-[#F8F7F3] p-6 text-pryColor transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <ShoppingCart className="w-8 h-8 mb-3" />
                <h4 className="text-lg font-semibold">Order Management</h4>
                <p className="mt-1 text-sm text-lightGreyColor">
                  Manage all orders
                </p>
              </div>
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
