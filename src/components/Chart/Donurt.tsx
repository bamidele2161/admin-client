"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  type TooltipProps,
} from "recharts";

import { useGetAllOrdersByVendorsQuery } from "../../service/product";
import { useAppSelector } from "../../hooks";
import { selectAuth } from "../../store/slice/authSlice";

const SalesDonut = () => {
  const { userInfo } = useAppSelector(selectAuth);
  const { data: orders } = useGetAllOrdersByVendorsQuery(userInfo?.Vendor?.id);

  // Process orders by status
  const getOrdersByStatus = (orders: any) => {
    if (!orders?.data) return [];

    const statusCounts = {
      pending: 0,
      delivered: 0,
      paid: 0,
    };

    orders?.data?.forEach((order: any) => {
      const status = order?.status?.toLowerCase() || "pending";

      if (status.includes("pending")) {
        statusCounts.pending += 1;
      } else if (status.includes("delivered")) {
        statusCounts.delivered += 1;
      } else if (status.includes("paid")) {
        statusCounts.paid += 1;
      }
    });

    return [
      { name: "Pending", value: statusCounts.pending, color: "#f59e0b" },
      { name: "Delivered", value: statusCounts.delivered, color: "#3b82f6" },
      { name: "Paid", value: statusCounts.paid, color: "#10b981" },
    ];
  };

  const statusData = getOrdersByStatus(orders);

  const totalOrders = statusData.reduce((sum, item) => sum + item.value, 0);

  // Format number with commas
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
          <p className="text-sm font-medium" style={{ color: data.color }}>
            {data.name}
          </p>
          <p className="text-lg font-bold text-gray-900">
            {formatNumber(data.value)} orders
          </p>
          <p className="text-xs text-gray-500">
            {((data.value / totalOrders) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600">{entry.value}</span>
            <span className="text-sm font-medium text-gray-900 ml-2">
              ({formatNumber(entry.payload.value)})
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="mb-6 flex flex-col justify-start items-start">
          <h2 className="text-2xl font-semibold text-gray-800">Order Status</h2>
          <p className="text-sm text-gray-500">
            Distribution of orders by status
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center text showing total */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-gray-900">
                {formatNumber(totalOrders)}
              </p>
              <p className="text-sm text-gray-500">Total Orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDonut;
