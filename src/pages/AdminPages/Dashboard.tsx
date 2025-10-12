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
import Navbar from "../../components/Navbar/Navbar";
import { useGetAllUsersQuery } from "../../service/auth";
import { useGetAllVendorsQuery } from "../../service/admin";
import { useGetAllOrdersQuery } from "../../service/product";

interface Order {
  id: number;
  totalAmount: number;
  createdAt: string;
  status: string;
}

const AdminDashboard = () => {
  const { data: users } = useGetAllUsersQuery();
  const { data } = useGetAllVendorsQuery();
  const { data: orders } = useGetAllOrdersQuery();

  const totalRevenue = orders?.data?.reduce(
    (sum: number, order: Order) => sum + order?.totalAmount,
    0
  );

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-10 mb-20">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-default">
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
        <div className="bg-white p-6 rounded-lg shadow-default">
          <h2 className="text-lg font-semibold mb-4 text-greyColr">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-pryColor-DEFAULT pl-4 py-1">
              <p className="font-medium text-greyColr">New vendor registered</p>
              <p className="text-sm text-lightGreyColor">Fashion Styles Inc.</p>
              <p className="text-xs text-lightGreyColor">2 hours ago</p>
            </div>
            <div className="border-l-4 border-secColor-DEFAULT pl-4 py-1">
              <p className="font-medium text-greyColr">Order #3842 canceled</p>
              <p className="text-sm text-lightGreyColor">Refund processed</p>
              <p className="text-xs text-lightGreyColor">5 hours ago</p>
            </div>
            <div className="border-l-4 border-negative-DEFAULT pl-4 py-1">
              <p className="font-medium text-greyColr">Low stock alert</p>
              <p className="text-sm text-lightGreyColor">
                Summer dress (SKU: 58392)
              </p>
              <p className="text-xs text-lightGreyColor">12 hours ago</p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Link
              to="/admin/users"
              className="block w-full py-2 px-4 bg-pryColor-DEFAULT text-white text-center rounded hover:bg-opacity-90 transition-all"
            >
              User Management
            </Link>
            <Link
              to="/admin/vendors"
              className="block w-full py-2 px-4 bg-secColor-DEFAULT text-white text-center rounded hover:bg-opacity-90 transition-all"
            >
              Vendor Management
            </Link>
            <Link
              to="/admin-order-management"
              className="block w-full py-2 px-4 bg-pryColor text-white text-center rounded hover:bg-opacity-90 transition-all"
            >
              Order Management
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
