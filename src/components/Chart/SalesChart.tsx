import { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from "recharts";

import { useGetAllOrdersByVendorsQuery } from "../../service/product";
import { useAppSelector } from "../../hooks";
import { selectAuth } from "../../store/slice/authSlice";

const SalesChart = () => {
  const { userInfo } = useAppSelector(selectAuth);
  const { data: orders } = useGetAllOrdersByVendorsQuery(userInfo?.Vendor?.id);
  const [, setSelectedMonth] = useState<string | null>(null);

  const aggregateSalesByMonth = (orders: any) => {
    if (!orders?.data) return [];

    const salesByMonth: { [key: string]: number } = {};
    const monthOrder: { [key: string]: number } = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    orders.data.forEach((order: any) => {
      const month = new Date(order.createdAt).toLocaleString("default", {
        month: "short",
      });
      salesByMonth[month] = (salesByMonth[month] || 0) + order.totalAmount;
    });

    // Sort months chronologically
    return Object.keys(salesByMonth)
      .sort((a, b) => monthOrder[a] - monthOrder[b])
      .map((month) => ({
        name: month,
        sales: salesByMonth[month],
      }));
  };

  const salesData = aggregateSalesByMonth(orders);

  // Calculate total sales and growth
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const previousMonthSales =
    salesData.length > 1 ? salesData[salesData.length - 2]?.sales || 0 : 0;
  const currentMonthSales =
    salesData.length > 0 ? salesData[salesData.length - 1]?.sales || 0 : 0;
  const growthPercentage = previousMonthSales
    ? ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100
    : 0;

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Custom tooltip component
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-lg font-bold text-gray-900">
            {formatCurrency(payload[0].value as number)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Sales Overview
            </h2>
            <p className="text-sm text-gray-500">Monthly sales performance</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
              <span
                className={`flex items-center ${
                  growthPercentage >= 0 ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {growthPercentage >= 0 ? "+" : ""}
                {growthPercentage.toFixed(1)}%
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`ml-1 h-4 w-4 ${
                    growthPercentage < 0 ? "rotate-90" : ""
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span>vs last month</span>
            </div>
            <div className="flex items-center text-2xl font-bold text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 text-gray-400 mr-1"
              >
                <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z" />
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 11-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 111.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 01-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 011.653-.713V4.75A.75.75 0 0110 4z"
                  clipRule="evenodd"
                />
              </svg>
              {formatCurrency(totalSales)}
            </div>
          </div>
        </div>

        <div className="h-[350px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={salesData}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              onMouseMove={(e) => {
                if (e.activeLabel) {
                  setSelectedMonth(e.activeLabel);
                }
              }}
              onMouseLeave={() => setSelectedMonth(null)}
            >
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#80BBEB" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#80BBEB" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                padding={{ left: 10, right: 10 }}
                stroke="#94a3b8"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tickFormatter={(value) => formatCurrency(value)}
                stroke="#94a3b8"
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#80BBEB"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#salesGradient)"
                activeDot={{
                  r: 6,
                  strokeWidth: 2,
                  fill: "white",
                  stroke: "#80BBEB",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
