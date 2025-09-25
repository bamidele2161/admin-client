import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Download, Calendar } from "lucide-react";

const monthlySales = [
  { month: "Jan", sales: 4000, orders: 120 },
  { month: "Feb", sales: 3000, orders: 98 },
  { month: "Mar", sales: 5000, orders: 150 },
  { month: "Apr", sales: 2780, orders: 90 },
  { month: "May", sales: 1890, orders: 65 },
  { month: "Jun", sales: 2390, orders: 78 },
  { month: "Jul", sales: 3490, orders: 105 },
  { month: "Aug", sales: 2000, orders: 69 },
  { month: "Sep", sales: 2780, orders: 92 },
  { month: "Oct", sales: 1890, orders: 68 },
  { month: "Nov", sales: 3490, orders: 104 },
  { month: "Dec", sales: 3000, orders: 95 },
];

const categorySales = [
  { name: "Clothing", value: 4000 },
  { name: "Electronics", value: 3000 },
  { name: "Home", value: 2500 },
  { name: "Beauty", value: 1500 },
  { name: "Outdoor", value: 2000 },
];

const vendorPerformance = [
  { name: "Fashion Styles Inc.", sales: 4000, orders: 120 },
  { name: "Tech Gadgets Ltd", sales: 3000, orders: 90 },
  { name: "Home Essentials Co", sales: 2500, orders: 80 },
  { name: "Outdoor Adventures", sales: 2000, orders: 60 },
  { name: "Beauty Supplies Plus", sales: 1500, orders: 50 },
];

const COLORS = ["#254A76", "#80BBEB", "#D1E2C4", "#352F36", "#DBB950"];

const SalesAnalytics = () => {
  const [timeRange, setTimeRange] = useState("year");
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2023-12-31");

  const handleExportData = () => {
    console.log("Exporting analytics data...");
    // In a real application, this would generate a CSV/Excel file with the analytics data
    alert("Analytics data exported successfully!");
  };

  // Calculate total sales and orders
  const totalSales = monthlySales.reduce((sum, month) => sum + month.sales, 0);
  const totalOrders = monthlySales.reduce(
    (sum, month) => sum + month.orders,
    0
  );

  // Calculate average order value
  const averageOrderValue = totalSales / totalOrders;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-greyColr mb-4 md:mb-0">
          Sales Analytics
        </h2>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Calendar size={16} className="text-lightGreyColor" />
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="year">Last 12 Months</option>
              <option value="quarter">Last Quarter</option>
              <option value="month">Last Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {timeRange === "custom" && (
            <div className="flex space-x-2">
              <input
                type="date"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="flex items-center">to</span>
              <input
                type="date"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pryColor"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          )}

          <button
            onClick={handleExportData}
            className="px-4 py-2 bg-pryColor text-white rounded-md flex items-center hover:bg-opacity-90"
          >
            <Download size={16} className="mr-2" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-pryColor-Light p-4 rounded-lg">
          <h3 className="text-sm font-medium text-greyColr">Total Sales</h3>
          <div className="text-2xl font-bold text-pryColor mt-2">
            ₦{totalSales.toLocaleString()}
          </div>
        </div>

        <div className="bg-secColor-Light p-4 rounded-lg">
          <h3 className="text-sm font-medium text-greyColr">Total Orders</h3>
          <div className="text-2xl font-bold text-secColor mt-2">
            {totalOrders.toLocaleString()}
          </div>
        </div>

        <div className="bg-positive-Light p-4 rounded-lg">
          <h3 className="text-sm font-medium text-greyColr">
            Average Order Value
          </h3>
          <div className="text-2xl font-bold text-positive mt-2">
            ₦{averageOrderValue.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-greyColr">
          Monthly Sales Performance
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlySales}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" stroke="#254A76" />
              <YAxis yAxisId="right" orientation="right" stroke="#80BBEB" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="sales"
                name="Sales ($)"
                fill="#254A76"
              />
              <Bar
                yAxisId="right"
                dataKey="orders"
                name="Orders"
                fill="#80BBEB"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-greyColr">
            Sales by Category
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySales}
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
                  {categorySales.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, "Sales"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-greyColr">
            Top Vendor Performance
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={vendorPerformance}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                {/* <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                /> */}
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  name="Sales (₦)"
                  stroke="#254A76"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  name="Orders"
                  stroke="#80BBEB"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-greyColr">
          Top Performing Vendors
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Vendor
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Sales
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Orders
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Avg. Order Value
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendorPerformance.map((vendor, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-greyColr">
                    {vendor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₦{vendor.sales.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vendor.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₦{(vendor.sales / vendor.orders).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-pryColor h-2.5 rounded-full"
                        style={{ width: `${(vendor.sales / 4000) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;
