import { AlertTriangle } from "lucide-react";

const lowStockItems = [
  { name: "Leather Boots", stock: 2 },
  { name: "Denim Jacket", stock: 1 },
];

const LowStockAlerts = () => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-default">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <AlertTriangle className="text-red-600" />
        Low Stock Alerts
      </h2>
      {lowStockItems.length === 0 ? (
        <p className="text-gray-500 text-sm">✅ All items are in stock!</p>
      ) : (
        <ul className="space-y-4">
          {lowStockItems.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 border rounded-lg bg-red-50"
            >
              <span className="font-medium text-gray-700">{item.name}</span>
              <span className="text-xs font-bold px-3 py-1 bg-red-600 text-white rounded-full">
                Only {item.stock} left!
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LowStockAlerts;
