import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const vendors = [
  {
    id: 1,
    businessName: "Fashion Styles Inc.",
    status: "ACTIVE",
    totalSales: 24560,
    totalProducts: 45,
    avgRating: 4.7,
    totalOrders: 128,
  },
  {
    id: 2,
    businessName: "Tech Gadgets Ltd",
    status: "ACTIVE",
    totalSales: 18920,
    totalProducts: 32,
    avgRating: 4.2,
    totalOrders: 95,
  },
  {
    id: 3,
    businessName: "Home Essentials Co",
    status: "ACTIVE",
    totalSales: 32150,
    totalProducts: 67,
    avgRating: 4.5,
    totalOrders: 210,
  },
  {
    id: 4,
    businessName: "Outdoor Adventures",
    status: "ACTIVE",
    totalSales: 12780,
    totalProducts: 28,
    avgRating: 4.8,
    totalOrders: 64,
  },
  {
    id: 5,
    businessName: "Beauty Supplies Plus",
    status: "ACTIVE",
    totalSales: 8950,
    totalProducts: 52,
    avgRating: 3.9,
    totalOrders: 43,
  },
];

const monthlyData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 2780 },
  { month: "May", sales: 1890 },
  { month: "Jun", sales: 2390 },
  { month: "Jul", sales: 3490 },
  { month: "Aug", sales: 2000 },
  { month: "Sep", sales: 2780 },
  { month: "Oct", sales: 1890 },
  { month: "Nov", sales: 3490 },
  { month: "Dec", sales: 3000 },
];

const productDistribution = [
  { name: "Fashion", value: 45 },
  { name: "Electronics", value: 32 },
  { name: "Home", value: 67 },
  { name: "Outdoor", value: 28 },
  { name: "Beauty", value: 52 },
];

const COLORS = ["#254A76", "#80BBEB", "#D1E2C4", "#352F36", "#DBB950"];

const VendorPerformance = () => {
  const [selectedVendor, setSelectedVendor] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("totalSales");
  const [sortOrder, setSortOrder] = useState("desc");

  const sortedVendors = [...vendors].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy as keyof typeof a] > b[sortBy as keyof typeof b] ? 1 : -1;
    } else {
      return a[sortBy as keyof typeof a] < b[sortBy as keyof typeof b] ? 1 : -1;
    }
  });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const getSortIcon = (column: string) => {
    if (sortBy !== column) return null;
    return sortOrder === "asc" ? "↑" : "↓";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="col-span-2">
          <h2 className="text-lg font-semibold mb-4 text-greyColr">
            Monthly Sales Performance
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#254A76"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4 text-greyColr">
            Product Category Distribution
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {productDistribution.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4 text-greyColr">
        Vendor Performance Rankings
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Business Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("totalSales")}
              >
                Total Sales {getSortIcon("totalSales")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("totalProducts")}
              >
                Products {getSortIcon("totalProducts")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("totalOrders")}
              >
                Orders {getSortIcon("totalOrders")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("avgRating")}
              >
                Avg. Rating {getSortIcon("avgRating")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedVendors.map((vendor) => (
              <tr
                key={vendor.id}
                className={`hover:bg-gray-50 ${
                  selectedVendor === vendor.id ? "bg-secColor-Light" : ""
                }`}
                onClick={() => setSelectedVendor(vendor.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-greyColr">
                    {vendor.businessName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    ${vendor.totalSales.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vendor.totalProducts}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vendor.totalOrders}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span
                      className={`mr-2 ${
                        vendor.avgRating >= 4.5
                          ? "text-positive"
                          : vendor.avgRating >= 4.0
                          ? "text-processing"
                          : "text-negative"
                      }`}
                    >
                      {vendor.avgRating}
                    </span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          vendor.avgRating >= 4.5
                            ? "bg-positive"
                            : vendor.avgRating >= 4.0
                            ? "bg-processing"
                            : "bg-negative"
                        }`}
                        style={{ width: `${(vendor.avgRating / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorPerformance;
