import {
  Home,
  Package,
  ShoppingCart,
  CreditCard,
  Tag,
  LayoutDashboard,
  Boxes,
  Store,
  FileText,
  Users,
  Settings,
} from "lucide-react";

export const SidebarData = [
  {
    id: "tab1",
    icon: Home,
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    id: "tab2",
    icon: Package,
    title: "Product",
    url: "/product-management",
  },
  {
    id: "tab3",
    icon: ShoppingCart,
    title: "Order",
    url: "/order-management",
  },
  {
    id: "tab4",
    icon: CreditCard,
    title: "Transaction",
    url: "/transactions",
  },
  {
    id: "tab5",
    icon: Tag,
    title: "Discounts Coupons",
    url: "/discount",
  },
  {
    id: "tab6",
    icon: Settings,
    title: "Settings",
    url: "/settings",
  },
];

export const adminSidebarData = [
  {
    id: "tab1",
    icon: LayoutDashboard,
    title: "Dashboard",
    url: "/admin-dashboard",
  },
  {
    id: "tab2",
    icon: Boxes,
    title: "Product Mgt",
    url: "/admin-product-management",
  },
  {
    id: "tab3",
    icon: ShoppingCart,
    title: "Order Mgt",
    url: "/admin-order-management",
  },
  {
    id: "tab4",
    icon: Store,
    title: "Vendor Mgt",
    url: "/admin-vendor",
  },
  {
    id: "tab5",
    icon: FileText,
    title: "Content Mgt",
    url: "/admin-content",
  },
  {
    id: "tab6",
    icon: Users,
    title: "Customer Mgt",
    url: "/admin-customer-management",
  },
  {
    id: "tab7",
    icon: Settings,
    title: "Settings",
    url: "/admin-settings",
  },
];
