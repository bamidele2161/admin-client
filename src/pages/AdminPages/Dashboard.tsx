import { Link } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  // CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Navbar from "../../components/Navbar/Navbar";
import { useGetAllUsersQuery } from "../../service/auth";
import { useGetAllVendorsQuery } from "../../service/admin";
import { useGetAllOrdersQuery } from "../../service/product";

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 2000 },
  { name: "Apr", sales: 2780 },
  { name: "May", sales: 1890 },
  { name: "Jun", sales: 2390 },
];

const AdminDashboard = () => {
  const { data: users } = useGetAllUsersQuery();
  const { data } = useGetAllVendorsQuery();
  const { data: orders } = useGetAllOrdersQuery();
  const totalRevenue = orders?.data?.reduce(
    (sum: number, order: any) => sum + order?.totalAmount,
    0
  );
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
            Monthly Sales
          </h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesData}
                margin={{ top: 2, right: 30, left: 20 }}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#80BBEB" />
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
            <div className="border-l-4 border-processing-DEFAULT pl-4 py-1">
              <p className="font-medium text-greyColr">New admin added</p>
              <p className="text-sm text-lightGreyColor">Sarah Johnson</p>
              <p className="text-xs text-lightGreyColor">Yesterday</p>
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
