import { type Route } from "../interfaces/Global";

import ProductManagement from "../pages/AdminPages/products/ProductManagement";
import OrderManagement from "../pages/AdminPages/orders/OrderManagement";
import UserManagement from "../pages/AdminPages/users/UserManagement";
import VendorManagement from "../pages/AdminPages/vendors/VendorManagement";
import ContentManagement from "../pages/AdminPages/content/ContentManagement";
import PayoutManagement from "../pages/AdminPages/payouts/PayoutManagement";
import AdminDashboard from "../pages/AdminPages/Dashboard";
import AdminSettings from "../pages/AdminPages/Settings";
import AdminAuth from "../pages/AdminPages/Auth/Auth";

const authRoutes: Route[] = [
  {
    path: "/",
    name: "Admin SignUp Page",
    element: <AdminAuth />,
  },
];

const adminRoutes: Route[] = [
  { path: "/admin-dashboard", name: "Home", element: <AdminDashboard /> },
  {
    path: "/admin-product-management",
    name: "Home",
    element: <ProductManagement />,
  },
  {
    path: "/admin-order-management",
    name: "Home",
    element: <OrderManagement />,
  },
  {
    path: "/admin-customer-management",
    name: "User",
    element: <UserManagement />,
  },
  { path: "/admin-vendor", name: "Home", element: <VendorManagement /> },

  { path: "/admin-content", name: "Discount", element: <ContentManagement /> },
  { path: "/admin-payouts", name: "Payouts", element: <PayoutManagement /> },
  { path: "/admin-settings", name: "Settings", element: <AdminSettings /> },
];
export { authRoutes, adminRoutes };
