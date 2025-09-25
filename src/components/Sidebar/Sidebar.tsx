import { NavLink, useNavigate } from "react-router-dom";
import { adminSidebarData, SidebarData } from "./SidebarData";
import { LogoutIcon } from "../../assets/svg/CustomSVGs";
import { type SidebarDataProps } from "../../interfaces/Global";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VendorBrandIcon } from "../../assets/svg/Product";
import { LogoutAdmin, LogoutUser } from "../../util";
import { useAppSelector } from "../../hooks";
import { selectAuth } from "../../store/slice/authSlice";

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const { userInfo } = useAppSelector(selectAuth);

  const features = userInfo?.role === "VENDOR" ? SidebarData : adminSidebarData;
  return (
    <main
      className={`sidebar-container relative h-full flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-pryColor to-[#193c61] text-white rounded-r-2xl shadow-xl`}
    >
      <div
        className="absolute -right-3 top-16 bg-secColor rounded-full p-1 cursor-pointer shadow-md hover:scale-105 transition-transform z-10"
        onClick={toggleSidebar}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </div>

      <div className="flex flex-col gap-4 p-5">
        <div
          className={`flex items-center gap-3 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <VendorBrandIcon className="w-14" />
          {!collapsed && (
            <h1 className="font-bold text-xl text-white">ashoBox</h1>
          )}
        </div>

        <div
          className={`mt-8 border-t border-white/10 pt-6 ${
            collapsed ? "px-0" : "px-2"
          }`}
        >
          <ul className="flex flex-col gap-2">
            {features.map((item: SidebarDataProps) => (
              <li key={item.id}>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `flex items-center rounded-xl transition-all duration-300 ease-in-out p-3 hover:bg-white/10 ${
                      isActive
                        ? "bg-white text-pryColor font-medium shadow-md"
                        : "text-white font-normal"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <div
                      className={`flex items-center ${
                        collapsed ? "justify-center" : "justify-between w-full"
                      }`}
                    >
                      <div
                        className={`flex items-center ${
                          collapsed ? "justify-center" : "gap-3"
                        }`}
                      >
                        <div className="flex-shrink-0">
                          <item.icon
                            fillColor={isActive ? "#254A76" : "white"}
                          />
                        </div>

                        {!collapsed && (
                          <span
                            className={`text-sm transition-all ${
                              isActive ? "opacity-100" : "opacity-90"
                            }`}
                          >
                            {item.title}
                          </span>
                        )}
                      </div>

                      {!collapsed && isActive && (
                        <div className="h-1.5 w-1.5 rounded-full bg-secColor"></div>
                      )}
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="mt-auto p-5 border-t border-white/10 cursor-pointer"
        onClick={() =>
          userInfo?.role === "VENDOR"
            ? LogoutUser(navigate)
            : LogoutAdmin(navigate)
        }
      >
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          }`}
        >
          <div className="flex-shrink-0">
            <LogoutIcon />
          </div>

          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
