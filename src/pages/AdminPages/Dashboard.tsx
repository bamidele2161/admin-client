import { Link } from "react-router-dom";
import { useMemo } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Activity,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  Users,
  Store,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
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
  const { data: users } = useGetAllUsersQuery();
  const { data } = useGetAllVendorsQuery();
  const { data: orders } = useGetAllOrdersQuery();
  const { data: activityLogs, isLoading: isLoadingActivity } =
    useGetActivityLogsQuery();

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
      return <User className="w-4 h-4 text-blue-500" />;
    } else if (actionLower.includes("create") || actionLower.includes("add")) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    } else if (
      actionLower.includes("delete") ||
      actionLower.includes("remove")
    ) {
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    } else {
      return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  // Function to get activity color based on action type
  const getActivityColor = (action: string) => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes("login") || actionLower.includes("auth")) {
      return "border-blue-500";
    } else if (actionLower.includes("create") || actionLower.includes("add")) {
      return "border-green-500";
    } else if (
      actionLower.includes("delete") ||
      actionLower.includes("remove")
    ) {
      return "border-red-500";
    } else {
      return "border-gray-400";
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

  // Colors for the bars
  const barColors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#00ff00",
    "#ff00ff",
    "#00ffff",
    "#ff0000",
    "#0000ff",
    "#ffff00",
    "#ff8000",
    "#8000ff",
  ];

  return (
    <div className="flex flex-col">
      <Navbar title="Admin Dashboard" subtitle="Manage your products here" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8 px-10">
        {/* Summary Cards */}
        <div className="bg-secColor-Light p-4 rounded-lg shadow-default">
          <h3 className="text-sm font-medium text-lightGreyColor">
            Total Users
          </h3>
          <p className="text-2xl font-bold text-greyColr">
            {users?.data?.length || 0}{" "}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-positive-DEFAULT text-sm">+12%</span>
            <span className="text-xs text-lightGreyColor ml-2">
              vs last month
            </span>
          </div>
        </div>

        <div className="bg-positive-Light p-4 rounded-lg shadow-default">
          <h3 className="text-sm font-medium text-lightGreyColor">
            Active Vendors
          </h3>
          <p className="text-2xl font-bold text-greyColr">
            {data?.data?.length || 0}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-positive-DEFAULT text-sm">+5%</span>
            <span className="text-xs text-lightGreyColor ml-2">
              vs last month
            </span>
          </div>
        </div>

        <div className="bg-negative-Light p-4 rounded-lg shadow-default">
          <h3 className="text-sm font-medium text-lightGreyColor">
            Total Orders
          </h3>
          <p className="text-2xl font-bold text-greyColr">
            {orders?.data?.length || 0}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-positive-DEFAULT text-sm">+18%</span>
            <span className="text-xs text-lightGreyColor ml-2">
              vs last month
            </span>
          </div>
        </div>

        <div className="bg-pryColor-Light p-4 rounded-lg shadow-default">
          <h3 className="text-sm font-medium text-lightGreyColor">
            Total Revenue
          </h3>
          <p className="text-2xl font-bold text-greyColr">
            ₦{totalRevenue || 0}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-positive-DEFAULT text-sm">+8%</span>
            <span className="text-xs text-lightGreyColor ml-2">
              vs last month
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 px-10 mb-6">
        {/* Sales Chart */}
        <div className="w-full lg:w-[65%] bg-white p-6 rounded-lg shadow-default">
          <h2 className="text-lg font-semibold mb-4 text-greyColr">
            Monthly Sales Revenue
          </h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                {/* <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /> */}
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
                <Bar
                  dataKey="sales"
                  radius={[4, 4, 0, 0]}
                  fill="url(#colorGradient)"
                >
                  {salesData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={barColors[index % barColors.length]}
                    />
                  ))}
                </Bar>
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#80BBEB" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#80BBEB" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="w-full lg:w-[40%] bg-white p-6 rounded-lg shadow-default">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-greyColr flex items-center gap-2">
              <Activity className="w-5 h-5 text-pryColor-DEFAULT" />
              Recent Activity
            </h2>
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
            <div className="space-y-4">
              {recentActivities.map((activity: ActivityLog) => (
                <div
                  key={activity.id}
                  className="group hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full ${getActivityColor(
                        activity.action
                      )} bg-white flex items-center justify-center`}
                    >
                      {getActivityIcon(activity.action)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-greyColr text-sm truncate">
                          {activity.action}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-lightGreyColor">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(activity.createdAt)}
                        </div>
                      </div>
                      <p className="text-sm text-lightGreyColor mt-1 line-clamp-2">
                        {activity.details}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-[10px] text-lightGreyColor">
                        <span className="px-2 py-1 bg-gray-100 rounded-full">
                          {activity.user?.fullName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
            to="/admin/users"
            className="group relative overflow-hidden bg-gradient-to-br from-blue-300 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <Users className="w-8 h-8 mb-3" />
                <h4 className="text-lg font-semibold">User Management</h4>
                <p className="text-blue-100 text-sm mt-1">Manage all users</p>
              </div>
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </Link>

          <Link
            to="/admin/vendors"
            className="group relative overflow-hidden bg-gradient-to-br from-emerald-300 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <Store className="w-8 h-8 mb-3" />
                <h4 className="text-lg font-semibold">Vendor Management</h4>
                <p className="text-emerald-100 text-sm mt-1">
                  Manage all vendors
                </p>
              </div>
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </Link>

          <Link
            to="/admin-order-management"
            className="group relative overflow-hidden bg-gradient-to-br from-purple-300 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <ShoppingCart className="w-8 h-8 mb-3" />
                <h4 className="text-lg font-semibold">Order Management</h4>
                <p className="text-purple-100 text-sm mt-1">
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
