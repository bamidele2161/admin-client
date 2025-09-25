import { ShoppingCart, DollarSign, Package, Star } from "lucide-react";
import { Card } from "./Cards";

import {
  useGetAllOrdersByVendorsQuery,
  useGetAllVendorProductsQuery,
} from "../../service/product";
import { selectAuth } from "../../store/slice/authSlice";
import { useAppSelector } from "../../hooks";

export default function OverviewCards() {
  const { userInfo } = useAppSelector(selectAuth);
  const { data } = useGetAllVendorProductsQuery(userInfo?.Vendor?.id);
  const { data: orders } = useGetAllOrdersByVendorsQuery(userInfo?.Vendor?.id);

  const subtotal =
    orders?.data?.reduce((acc: any, item: any) => acc + item.totalAmount, 0) ||
    0;

  const stats = [
    {
      title: "Total Orders",
      value: orders?.data?.length || 0,
      icon: <ShoppingCart size={28} className="text-blue-600" />,
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Revenue",
      value: `${new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(subtotal)}`,
      icon: <DollarSign size={28} className="text-green-600" />,
      bgColor: "bg-green-50",
    },
    {
      title: "Products Listed",
      value: data?.data?.length || 0,
      icon: <Package size={28} className="text-purple-600" />,
      bgColor: "bg-purple-50",
    },
    {
      title: "Average Rating",
      value: "4.8",
      icon: <Star size={28} className="text-yellow-500" />,
      bgColor: "bg-yellow-50",
    },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`flex items-center bg-${stat.bgColor} shadow-default`}
        >
          <div
            className={`${stat.bgColor} p-4 rounded-xl`}
            style={{ backgroundColor: stat.bgColor }}
          >
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
