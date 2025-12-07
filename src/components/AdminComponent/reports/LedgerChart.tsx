import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent } from "../../Cards/Cards";
import { useGetLedgerReportQuery } from "../../../service/admin";

interface LedgerEntry {
  id: number;
  orderId: number;
  vendorId: number | null;
  vendorName: string | null;
  entryType: "VENDOR" | "LOGISTICS" | "ASHOBOX";
  amount: number;
  currency: string;
  createdAt: string;
  paymentReference: string;
}

interface LedgerData {
  entries: LedgerEntry[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ChartDataItem {
  name: string;
  value: number;
  count: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ChartDataItem;
  }>;
}

interface LegendProps {
  payload?: Array<{
    value: string;
    color: string;
  }>;
}

const LedgerChart: React.FC = () => {
  const {
    data: ledgerData,
    isLoading,
    error,
  } = useGetLedgerReportQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <p className="text-red-500">Error loading ledger data</p>
        </div>
      </Card>
    );
  }

  const data: LedgerData = ledgerData?.data || { entries: [], pagination: {} };

  // Process data for pie chart
  const chartData: ChartDataItem[] = data.entries.reduce(
    (acc: ChartDataItem[], entry) => {
      const existingEntry = acc.find((item) => item.name === entry.entryType);
      if (existingEntry) {
        existingEntry.value += entry.amount;
        existingEntry.count += 1;
      } else {
        acc.push({
          name: entry.entryType,
          value: entry.amount,
          count: 1,
        });
      }
      return acc;
    },
    []
  );

  // Colors for different entry types
  const COLORS = {
    VENDOR: "#80BBEB",
    LOGISTICS: "#254A76",
    ASHOBOX: "#3b82f6",
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-gray-600">
            Amount: {formatCurrency(data.value)}
          </p>
          <p className="text-sm text-gray-600">Transactions: {data.count}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: LegendProps) => {
    if (!payload) return null;

    return (
      <div className="flex justify-center gap-6 mt-4">
        {payload.map((entry, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm text-gray-600">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 border shadow-default rounded-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Ledger Distribution
        </h3>
        <p className="text-sm text-gray-500">
          Breakdown of financial entries by type
        </p>
      </div>

      {chartData.length > 0 ? (
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[entry.name as keyof typeof COLORS] || "#94a3b8"
                    }
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Summary stats */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {chartData.map((entry, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-4 h-4 rounded-full mx-auto mb-2"
                  style={{
                    backgroundColor:
                      COLORS[entry.name as keyof typeof COLORS] || "#94a3b8",
                  }}
                ></div>
                <p className="text-xs font-medium text-gray-900">
                  {entry.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatCurrency(entry.value)}
                </p>
                <p className="text-xs text-gray-400">
                  {entry.count} transactions
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No ledger data available</p>
        </div>
      )}
    </div>
  );
};

export default LedgerChart;
