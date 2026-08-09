import { HiOutlineHome, HiOutlineCube, HiOutlineShoppingBag, HiOutlineCreditCard, HiOutlineTag, HiOutlineSquares2X2, HiOutlineBuildingStorefront, HiOutlineDocumentText, HiOutlineUsers, HiOutlineCog6Tooth, HiOutlineWallet, HiOutlineChartBarSquare, HiOutlineQueueList } from "react-icons/hi2";

export const SidebarData = [
  { id:"tab1", icon:HiOutlineHome, title:"Dashboard", url:"/dashboard" },
  { id:"tab2", icon:HiOutlineCube, title:"Product", url:"/product-management" },
  { id:"tab3", icon:HiOutlineShoppingBag, title:"Order", url:"/order-management" },
  { id:"tab4", icon:HiOutlineCreditCard, title:"Transaction", url:"/transactions" },
  { id:"tab5", icon:HiOutlineTag, title:"Discounts Coupons", url:"/discount" },
  { id:"tab6", icon:HiOutlineCog6Tooth, title:"Settings", url:"/settings" },
];

export const adminSidebarData = [
  { id:"tab1", icon:HiOutlineSquares2X2, title:"Dashboard", url:"/admin-dashboard" },
  { id:"tab2", icon:HiOutlineCube, title:"Product Mgt", url:"/admin-product-management" },
  { id:"tab3", icon:HiOutlineShoppingBag, title:"Order Mgt", url:"/admin-order-management" },
  { id:"tab4", icon:HiOutlineBuildingStorefront, title:"Vendor Mgt", url:"/admin-vendor" },
  { id:"tab5", icon:HiOutlineDocumentText, title:"Content Mgt", url:"/admin-content" },
  { id:"tab6", icon:HiOutlineUsers, title:"Customer Mgt", url:"/admin-customer-management" },
  { id:"tab7", icon:HiOutlineWallet, title:"Payout Mgt", url:"/admin-payouts" },
  { id:"tab8", icon:HiOutlineChartBarSquare, title:"Reports", url:"/admin-reports" },
  { id:"tab9", icon:HiOutlineQueueList, title:"Activity Logs", url:"/admin-activity-logs" },
  { id:"tab10", icon:HiOutlineCog6Tooth, title:"Settings", url:"/admin-settings" },
];
