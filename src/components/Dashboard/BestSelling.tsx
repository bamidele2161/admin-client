import { TrendingUp } from "lucide-react";

const bestSellers = [
  { name: "Denim Jacket", sales: 230, totalStock: 300 },
  { name: "Sneakers", sales: 180, totalStock: 250 },
];

const BestSellingProducts = () => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-default">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <TrendingUp className="text-green-600" />
        Best Selling Products
      </h2>
      <ul className="space-y-4">
        {bestSellers.map((product, index) => {
          const salesPercentage = (product.sales / product.totalStock) * 100;
          return (
            <li key={index} className="p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">
                  {product.name}
                </span>
                <span className="text-sm font-bold text-green-600">
                  {product.sales} Sold
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${salesPercentage}%` }}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BestSellingProducts;
